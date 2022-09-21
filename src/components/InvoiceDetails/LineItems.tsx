import moment from "moment"

import { useEffect, useState } from "react"
import { AxiosGet, AxiosInsert } from '../../helpers/Axios'
import { AddSvg, CopySvg, RecallSvg, RemoveSvg } from '../Svg/Svg'
import { TableFilterComponent } from '../components/TableComponent'
import { SweetAlert } from "../../Function/alert"


export const LineItems = (props:
    {
        headers: any
        setColumns: Function
        datum: any
        setDatum: Function
        subtotal: number
        isExpense: boolean
        userId: number
        invoiceId: number
        invoiceNumber: string
    }) => {


    const [checkAll, setCheckAll] = useState<boolean>(false)
    const [checkAnyOne, setCheckAnyOne] = useState<boolean>(false)
    const [isLoading, SetIsLoading] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [currentInput, setCurrentInput] = useState<string | null>(null)

    const [filterDatum, setFilterDatum] = useState([...props.datum])
    type afterDragElementProps = {
        index: number
        header: string
    }[]
    const [afterDragElement, setAfterDragElement] = useState<afterDragElementProps>([])
    const [customColumns, setCustomColumns] = useState([...props.headers])

    const replacer = (key, val) => {
        if (typeof val === 'function') {
            return val.toString()
        }
        return val
    }

    const reviver = (key, val) => {
        if (key === 'cell' || key === 'footer') {
            return new Function('data', 'return ' + val)()
        }
        return val
    }

    useEffect(() => {
        AxiosGet(`/UserPreference/${props.userId}`)
            .then(res => {
                const col = props.isExpense ? res.find(data => data.ListTypeId === 3)?.Value : res.find(data => data.ListTypeId === 2)?.Value
                setCustomColumns(col ? JSON.parse(col, reviver) : props.headers)
                console.log('test', JSON.parse(col, reviver))
            })
            .catch(err => console.log(err))
    }, [props.headers, props.userId])

    useEffect(() => {
        setCustomColumns([...props.headers])
    }, [props.headers])

    useEffect(() => {
        setFilterDatum([...props.datum])
    }, [props.datum])

    useEffect(() => {
        saveColumnOrder(customColumns)
    }, [customColumns])



    const addHandler = () => {

        const newRow = props.isExpense ? {
            ExpenseId: Date.now(),
            InvoiceId: props.invoiceId,
            Account: 0,
            Amount: 0,
            Memo: '',
            AddedDateTime: new Date(moment().format('LLLL')),
            Department: 0,
            LocationId: 0,
            isCheck: false,
            isNew: true
        } : {
            LineItemId: Date.now(),
            InvoiceId: props.invoiceId,
            Amount: 0,
            PartNumber: '',
            ProductCode: '',
            Description: '',
            UnitPrice: Number(0?.toFixed(5)),
            Quantity: 0,
            ShippingQuantity: 0,
            Unit: 0,
            Date: new Date(Date.now()),
            TaxAmount: 0,
            TaxPercentage: 0,
            isCheck: false,
            isNew: true,
            POAmount: 0,
            PODepartment: 0,
            PODescription: "",
            POItem: '',
            POQuantity: 0,
            POUnitPrice: 0
        }
        props.setDatum([...props.datum, newRow])
    }

    const removeHandler = () => {
        SweetAlert({
            title: 'Are you sure?',
            text: "Your lineitems has been delete",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    const arr = props.datum.filter(arr => arr.isCheck !== true)
                    console.log(arr)
                    props.setDatum(arr)
                    setCheckAll(arr.length !== 0 ? arr.length === arr.filter(arr => arr.isCheck === true).length : false)
                    setCheckAnyOne(arr.filter(arr => arr.isCheck === true).length > 0)
                    SweetAlert({
                        title: 'Deleted!',
                        text: 'Your data has been deleted.',
                        icon: 'success'
                    })
                }
            })
    }

    const copyHandler = () => {
        const copyArr = props.datum.filter(arr => arr.isCheck === true)
        const arr = [...props.datum]
        for (let ind in copyArr) {
            arr.push({
                Account: copyArr[ind].Account,
                ExpenseId: Date.now(),
                InvoiceId: copyArr[ind].InvoiceId,
                Amount: copyArr[ind].Amount,
                Memo: copyArr[ind].Memo,
                AddedDateTime: new Date(moment().format('LLLL')),
                Department: copyArr[ind].Department,
                LocationId: copyArr[ind].LocationId,
                isCheck: false,
                isNew: true
            })
        }
        props.setDatum(arr)
        setCheckAll(arr.length !== 0 ? arr.length === arr.filter(arr => arr.isCheck === true).length : false)
        setCheckAnyOne(arr.filter(arr => arr.isCheck === true).length > 0)
    }

    const masterCheckHandler = e => {
        for (let ind in props.datum) {
            props.datum[ind].isCheck = e.target.checked
        }
        setCheckAll(e.target.checked)
        setCheckAnyOne(e.target.checked)
    }

    const recallHandler = () => {
        SetIsLoading(true)
        AxiosGet(`/Invoice/Recall/${props.invoiceNumber}`)
            .then(res => props.setDatum(res))
            .catch(err => console.log(err))
            .finally(() => SetIsLoading(false))
    }

    const changeHandler = (e, index) => {
        const target = e.target
        const name = target.name
        let arr = [...props.datum]
        if (target.type === 'checkbox')
            arr[index][name] = target.checked
        else if (target.type === 'number')
            arr[index][name] = target.valueAsNumber
        else
            arr[index][name] = target.value
        console.log('check', arr[index][name])
        if (name === 'Quantity' || name === 'POQuantity' || name === 'POUnitPrice' || name === 'UnitPrice') {
            arr[index].Amount = (arr[index].Quantity * arr[index].UnitPrice).toFixed(2)
            arr[index].POAmount = (arr[index].POQuantity * arr[index].POUnitPrice).toFixed(2)
        }
        setCheckAll(arr.length === arr.filter(arr => arr.isCheck === true).length)
        setCheckAnyOne(arr.filter(arr => arr.isCheck === true).length > 0)
        props.setDatum(arr)
    }

    const editHandler = (e, index) => {
        setCurrentInput(e.target.id + index)
        setIsEdit(true)
    }

    const saveColumnOrder = (array) => {
        AxiosInsert('/UserPreference', {
            UserId: props.userId,
            ListId: 0,
            ListType: props.isExpense ? 'Expense' : 'LineItem',
            Value: JSON.stringify(array, replacer),
            ModifiedDateTime: null
        })
            .then((res) => {
                console.log(array, res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        const draggableContainer = document.querySelectorAll('.draggableContainer')
        const dragEls = document.querySelectorAll('.dragEl')

        dragEls.forEach((dragEl) => {
            dragEl.addEventListener('dragstart', () => {
                dragEl.classList.add('dragging')
            })
            dragEl.addEventListener('dragend', () => {
                dragEl.classList.remove('dragging')
                const array: afterDragElementProps = []
                draggableContainer.forEach((el) => {
                    el?.querySelectorAll('th').forEach(elChild => {
                        array.push({
                            index: elChild.cellIndex,
                            header: (elChild.innerText[elChild.innerText.length - 1] === '◢' || elChild.innerText[elChild.innerText.length - 1] === '◣') ? elChild.innerText.substring(0, elChild.innerText.length - 1).trim() : elChild.innerText
                        })
                    })
                })
                if (array.length > 0) {
                    setAfterDragElement(array)
                }
            })
        })

        draggableContainer.forEach((el) => {
            el?.addEventListener('dragover', (e: any) => {
                e.preventDefault()
                const afterElement = getDragAfterElement(el, e.clientX)
                const currentDragEl = document.querySelector('.dragging')
                if (afterElement == null) {
                    el.appendChild(currentDragEl as Element)
                }
                else {
                    el.insertBefore(currentDragEl as Element, afterElement)
                }
            })
        })

        function getDragAfterElement(draggableContainer, x: number) {
            const draggableElements = [...draggableContainer?.querySelectorAll('.dragEl:not(.dragging)')]

            return draggableElements.reduce((closest, child) => {
                const box = child.getBoundingClientRect()
                const offset = x - box.left - box.width / 2
                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child }
                } else {
                    return closest
                }
            }, { offset: Number.NEGATIVE_INFINITY }).element
        }

    }, [filterDatum, customColumns])

    // useEffect(() => {
    //     if (afterDragElement.length > 0) {
    //         let array: any[] = []
    //         const reminingColumns: any[] = []
    //         // afterDragElement.forEach((el) => {
    //         // })
    //         const isInArray = (obj): boolean => {
    //             for (let i = 0; i < afterDragElement.length; i++) {
    //                 if (afterDragElement[i].header === obj.headerName) {
    //                     return true
    //                 }
    //             }
    //             return false
    //         }
    //         const ddd = customColumns.filter(isInArray)
    //         const ccc = customColumns.filter(!(isInArray))
    //         // console.log(afterDragElement.includes())
    //         // array.shift()
    //         console.log('check', ddd)
    //         customColumns.forEach(Column => {
    //             if (!array.includes(Column)) return reminingColumns.push(Column)
    //         })
    //         const Finalarray = array.concat(reminingColumns)
    //         if (Finalarray.length > 0) {
    //             setCustomColumns(Finalarray)
    //             saveColumnOrder(Finalarray)
    //         }
    //     }
    // }, [afterDragElement])


    useEffect(() => {
        if (afterDragElement.length > 0) {
            const array: any[] = []
            const reminingColumns: any[] = []
            afterDragElement.forEach((el) => {
                array.push(customColumns.find(arr => arr.headerName === el.header))
            })
            array.shift()
            customColumns.forEach(Column => {
                if (!array.includes(Column)) return reminingColumns.push(Column)
            })
            const Finalarray = array.concat(reminingColumns)
            if (Finalarray.length > 0) {
                setCustomColumns(Finalarray)
                saveColumnOrder(Finalarray)
            }
        }
    }, [afterDragElement])

    return (
        <>
            <div className="d-flex justify-content-between">
                <div className="pb-3 px-5">
                    <>
                        <TableFilterComponent columns={customColumns} setColumns={setCustomColumns} datum={props.datum} setDatum={setFilterDatum} columnFilter={true} />
                    </>
                </div>
                <div>
                    {checkAnyOne
                        ?
                        <>
                            {props.isExpense
                                ?
                                <button title="Copy" onClick={copyHandler} className="btn btn-active-light-primary btn-icon btn-sm m-1 btn-hover-rise">
                                    <CopySvg clsName='svg-icon svg-icon-3 svg-icon-primary' />
                                </button>
                                :
                                null
                            }
                            <button onClick={removeHandler} title="Delete" className="btn btn-active-light-danger btn-icon btn-sm m-1 btn-hover-rise">
                                <RemoveSvg clsName='svg-icon svg-icon-3 svg-icon-danger' />
                            </button>
                        </>
                        :
                        <>
                            {props.isExpense
                                ?
                                <button title="Recall" onClick={recallHandler} className="btn btn-active-light-success btn-icon btn-sm m-1 btn-hover-rise">
                                    {isLoading ? <span className="spinner-border spinner-border-sm text-primary"></span> : <RecallSvg clsName='svg-icon svg-icon-success svg-icon-3' />}
                                </button>
                                :
                                null
                            }
                            <button title="Add" onClick={addHandler} className="btn btn-active-light-primary btn-icon btn-sm m-1 btn-hover-rise">
                                <AddSvg clsName='svg-icon svg-icon-3 svg-icon-primary mx-1' />
                            </button>
                        </>
                    }
                </div>

            </div>
            <div className="table-responsive">
                <table className="table table-striped gy-3 gs-7 p-2 table-rounded max-h-200px">
                    {
                        filterDatum.length > 0 ?
                            <>
                                <thead>
                                    <tr className='fw-bolder fs-6 text-gray-800 border-bottom-2 border-gray-200 draggableContainer'>
                                        <th key={'masterCheck'}>
                                            <div className="form-check form-check-custom form-check-solid form-check-sm">
                                                <input name='masterCheck' className="form-check-input" type="checkbox" checked={checkAll} onChange={masterCheckHandler} />
                                            </div>
                                        </th>
                                        {customColumns.map(header => {
                                            return header?.hidden ? null : <th key={header?.headerName} draggable={header?.draggable} className={header?.className}>{header?.headerName}</th>
                                        })}
                                    </tr>
                                </thead>
                                <tbody >

                                    {
                                        filterDatum?.map((data, index) => (
                                            <tr key={props.isExpense ? data?.ExpenseId : data?.LineItemId} >
                                                <td key={0}>
                                                    <div className="form-check form-check-custom form-check-solid form-check-sm">
                                                        <input name="isCheck" className="form-check-input" type="checkbox" checked={data?.isCheck} onChange={e => changeHandler(e, index)} />
                                                    </div>
                                                </td>
                                                {customColumns.map(header => {
                                                    return header.hidden ?
                                                        null
                                                        :
                                                        (
                                                            <td key={header.accessor} id={header.accessor} onDoubleClick={e => editHandler(e, index)} onBlur={() => setIsEdit(false)}>
                                                                {

                                                                    header.input
                                                                        ?
                                                                        <select name={header.accessor} className="form-select form-select-transparent form-select-sm" value={data[header.accessor]} onChange={e => changeHandler(e, index)} >
                                                                            <option key={0} value={0}></option>
                                                                            {header.input.inputSrc.map(
                                                                                src => (<option key={src[header.input.srcId]} value={src[header.input.srcId]} >{src[header.input.srcName]}</option>)
                                                                            )}
                                                                        </select>
                                                                        :
                                                                        header.isEdit && isEdit && (currentInput === header.accessor + index) ? <input type={header.type} className='form-control form-control-transparent form-control-sm' autoFocus name={header.accessor} value={data[header.accessor]} onChange={e => changeHandler(e, index)} />
                                                                            :
                                                                            header?.cell ? header?.cell(data) : data[header.accessor]
                                                                }
                                                            </td>)
                                                })}
                                            </tr>
                                        ))}
                                </tbody>
                                <tfoot>
                                    <tr className="fw-bold fs-6 text-gray-800 border-top border-gray-200">
                                        {
                                            <>
                                                <td key={0}></td>
                                                {customColumns?.map(
                                                    col => col.hidden ? null : <td key={col.id}>{col?.footer ? col?.footer(props.datum) : null}</td>
                                                )}
                                            </>

                                        }


                                    </tr>
                                </tfoot>
                            </>
                            :
                            <tbody className="">
                                <tr><td><h4 className='text-center'>Data not found</h4></td></tr>
                            </tbody>
                    }
                </table>
            </div>
        </>
    )
} 