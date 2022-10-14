import axios from "axios"
import React, { ReactElement, useEffect, useState } from "react"
import { createNoSubstitutionTemplateLiteral } from "typescript"
import { array } from "yup"
import { SweetAlert } from "../../Function/alert"
import { setIsSelectProperty } from "../../Function/setSelect"
import { useDragAndDrop } from "../../Hook/useDragAndDrop"
import { expensesType } from "../Interface/Interface"
import { DownArrowSvg, RemoveSvg, UpArrowSvg } from "../Svg/Svg"
import tableStyle from "./TableComponent.module.css"



type selectSrcprops = {
    array: any[]
    id: string
    Name: string
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export type columnProps = {
    id: string | number
    header: string | HTMLElement
    accessor: string
    cell?: (data) => string | number
    className: string
    draggable?: boolean | undefined
    sortable?: boolean | undefined
    hidden?: boolean | undefined
    isEdit?: {
        input: React.InputHTMLAttributes<HTMLInputElement>
    },
    select?: selectSrcprops,

}[]

export const TestGrid = (props: {
    columns: columnProps
    data: any[]
    setData: Function
    selectable?: boolean
    draggable?: boolean
}) => {
    const [currentColumns, setCurrentColumns] = useState<columnProps>([...props.columns])
    const [currentData, setCurrentData] = useState<any[]>([])
    const [masterCheck, setMasterCheck] = useState(false)
    const originalArray = setIsSelectProperty([...props.data])
    type sortOptionProps = "None" | "Acs" | "Des"
    const [sortOption, setSortOption] = useState<sortOptionProps>("None")

    const [currentEditElement, setCurrentEditElement] = useState<string>('')
    const [isEdit, setIsEdit] = useState<boolean>(false)

    const afterDragEl = useDragAndDrop()


    useEffect(() => {
        setCurrentColumns(props.columns)
    }, [props.columns])
    useEffect(() => {
        setCurrentData(setIsSelectProperty([...props.data]))
    }, [props.data])


    const isMasterCheck = (): boolean => {
        return currentData.every(data => data.isSelect === true)
    }


    const editHandler = (e, index: number) => {
        setCurrentEditElement(index + e.target.id)
        setIsEdit(prev => !prev)
    }

    const changeHandler = (e, index) => {
        const array = [...currentData]
        const originalArray = setIsSelectProperty([...props.data])
        const type = e.target.type
        const name = e.target.name
        if (name === 'masterCheck') {
            array.forEach(el => el.isSelect = e.target.checked)
            setCurrentData(array)
            return setMasterCheck(!masterCheck)
        }
        if (type === 'checkbox') {
            array[index].isSelect = e.target.checked
            setCurrentData(array)
        }
        // const keys = originalArray.length > 0 ? Object.keys(originalArray[0]) : []
        // if (name === 'globalFilter') {
        //     if (e.target.value === '') {
        //         return setCurrentData(originalArray)
        //     }
        //     if (keys.length > 0) {
        //         setCurrentData([...originalArray]?.filter(
        //             arr => keys.some(key => {
        //                 let currentStr: string = arr[key]?.toString()
        //                 return currentStr?.toLowerCase()?.includes(e.target.value?.toLowerCase())
        //             })
        //         ))
        //     }
        // }
        if (array.length > 0) {
            setMasterCheck(isMasterCheck)
        }
    }

    const sort = (array: any[], key: string, type: sortOptionProps) => {
        if (type === 'None') {
            return originalArray
        }
        const sortArray = [...array].sort((a, b) => {
            const sortType = (current, next) => {
                if (type === 'Acs') return current - next
                if (type === 'Des') return next - current
                return 0
            }

            if (typeof a[key] === 'string') {
                if (new Date(a[key]).toString() !== 'Invalid Date') {
                    console.log('date')
                    return sortType(Number(new Date(a[key])), Number(new Date(b[key])))
                }
                if (a[key].toUpperCase() < b[key].toUpperCase()) {
                    return type === 'Acs' ? -1 : 1
                }
                else {
                    return type === 'Des' ? -1 : 1
                }
            }
            if (typeof a[key] === 'number') {
                console.log('number')
                return sortType(a, b)
            }
            return 0
        })
        return sortArray
    }
    return (
        <div className="table-responsive hover-scroll-overlay-y">
            <table className="table table-hover gy-3 gs-7 table-rounded hover-scroll-overlay-y">
                <thead className="fw-bolder fs-6 text-gray-800">
                    <tr className={`border-bottom-2 border-gray-200 ${props.draggable ? tableStyle.draggableContainer : ""}`} >
                        {
                            props.selectable
                                ? <th key={0}>
                                    <div className="form-check form-check-custom form-check-solid form-check-sm">
                                        <input className="form-check-input" name='masterCheck' type="checkbox" checked={masterCheck} onChange={e => changeHandler(e, 0)} />
                                    </div>
                                </th>
                                : null
                        }
                        {
                            props.columns.map((column) => {
                                return <th key={column.id} role={'button'} className={column.className} draggable={column.draggable ? column.draggable : false} onClick={() => {
                                    if (column.sortable) {
                                        let type: sortOptionProps = sortOption === "None" ? "Acs" : sortOption === "Acs" ? "Des" : sortOption === "Des" ? "None" : "None"
                                        setSortOption(prev => prev === "None" ? "Acs" : prev === "Acs" ? "Des" : prev === "Des" ? "None" : "None")
                                        setCurrentData(sort(currentData, column.accessor, type))
                                    }
                                }
                                } >
                                    {column.header}
                                    {"\t"}
                                    {
                                        column?.sortable
                                            ? sortOption !== 'None'
                                                ? sortOption === 'Acs'
                                                    ? <DownArrowSvg clsName="svg-icon svg-icon-3" />
                                                    : <UpArrowSvg clsName="svg-icon svg-icon-3" />
                                                : null
                                            : null
                                    }
                                </th>
                            })
                        }
                    </tr>
                </thead>
                <tbody className="hover-scroll-overlay-y">
                    {
                        currentData.length !== 0
                            ?
                            currentData?.map((datum, index) => (
                                <tr key={index}>
                                    {
                                        <>
                                            {props.selectable
                                                ? <td key={0}>
                                                    <div className="form-check form-check-custom form-check-solid form-check-sm">
                                                        <input className="form-check-input" type="checkbox" checked={datum?.isSelect} onChange={e => changeHandler(e, index)} />
                                                    </div>
                                                </td>
                                                : null}
                                            {currentColumns?.map((header) => {
                                                return header.hidden
                                                    ? null
                                                    :
                                                    (
                                                        <td key={header.accessor} id={header.accessor} onDoubleClick={e => editHandler(e, index)} onBlur={() => setIsEdit(false)}>
                                                            {

                                                                header.select
                                                                    ? <select className="form-select form-select-transparent form-select-sm" name={header.accessor} id={index.toString()} value={datum[header.accessor]} onChange={header.select.onChange} >
                                                                        <option key={0} value={0}></option>
                                                                        {header.select.array.map(
                                                                            array => (<option key={array[header.select?.id ? header.select?.id : 0]} value={array[header.select?.id ? header.select?.id : 0]} >{array[header.select?.Name ? header.select?.Name : 0]}</option>)
                                                                        )}
                                                                    </select>
                                                                    : header.isEdit && (currentEditElement === index + header.accessor) && isEdit
                                                                        ? <input type={header.isEdit.input?.type} className='form-control form-control-transparent form-control-sm' autoFocus name={header.accessor} id={index.toString()} onChange={header.isEdit.input?.onChange} value={datum[header.accessor]} />
                                                                        : header?.cell
                                                                            ? header?.cell(datum)
                                                                            : datum[header.accessor]
                                                            }
                                                        </td>
                                                    )

                                            })}
                                        </>
                                    }
                                </tr>
                            ))
                            :
                            <tr><td colSpan={currentColumns.length} ><p className="fw-bolder fs-6 text-gray-800" >Data not Fount</p></td></tr>
                    }
                </tbody>
            </table>
        </div>
    )
}


export type ActionButtonsProps = {
    buttonText: string | ReactElement
    buttonClass: string
    onClick: Function
}


export const TableActionComponent = (props: {
    data: any[]
    setData: Function
    buttons?: ActionButtonsProps[]
}) => {
    return (
        <>
            {props?.buttons?.map((button, index) => <button key={index} className={button.buttonClass} onClick={() => button.onClick()} >{button.buttonText}</button>)}
        </>
    )
}

export const TableGridComponent = (props:
    {
        columns: any[]
        data: any[]
        setData: Function
        selectable?: boolean
        filter?: boolean
        setDataFetch?: Function

    }) => {


    const [currentColumns, setCurrentColumns] = useState([...props.columns])
    const [currentData, setCurrentData] = useState(setIsSelectProperty([...props.data]))
    const [masterCheck, setMasterCheck] = useState(false)
    const [sortOption, setSortOption] = useState<'NONE' | 'ACS' | 'DES'>('NONE')


    const [afterDrag] = useDragAndDrop()


    useEffect(() => {
        const afterDragEl: any[] = []
        const remainEl: any[] = []
        afterDrag.forEach(el => {
            let col = [...currentColumns].find(arr => arr.header === el.header)
            if (col) {
                afterDragEl.push(col)
            }
        })
        props.columns.forEach(el => {
            if (![...afterDragEl].includes(el)) {
                remainEl.push(el)
            }
        })
        const finalArray = afterDragEl.concat(remainEl)
        console.log(finalArray)
        setCurrentColumns(finalArray)
    }, [afterDrag])



    useEffect(() => {
        setCurrentData(setIsSelectProperty([...props.data]))
    }, [props.data])

    useEffect(() => {
        setCurrentColumns([...props.columns])
    }, [props.columns])

    const isMasterCheck = (): boolean => {
        return currentData.every(data => data.isSelect === true)
    }

    const sort = (array, key, type) => {
        const sortArray = [...array].sort((a, b) => {
            const sortType = (current, next) => {
                if (type === 'ACS') return current - next
                if (type === 'DES') return next - current
                return 0
            }

            if (typeof a[key] === 'string') {
                if (new Date(a[key]).toString() !== 'Invalid Date') {
                    console.log('date')
                    return sortType(Number(new Date(a[key])), Number(new Date(b[key])))
                }
                if (a[key].toUpperCase() < b[key].toUpperCase()) {
                    return type === 'ACS' ? -1 : 1
                }
                else {
                    return type === 'DES' ? -1 : 1
                }
            }
            if (typeof a[key] === 'number') {
                console.log('number')
                return sortType(a, b)
            }
            return 0
        })
        console.log(type, array)
        setCurrentData(type === 'NONE' ? setIsSelectProperty([...props.data]) : sortArray)
        return sortArray
    }

    const changeHandler = (e, index) => {
        const array = [...currentData]
        const originalArray = setIsSelectProperty([...props.data])
        const type = e.target.type
        const name = e.target.name
        if (name === 'masterCheck') {
            array.forEach(el => el.isSelect = e.target.checked)
            setCurrentData(array)
            return setMasterCheck(!masterCheck)
        }
        if (type === 'checkbox') {
            array[index].isSelect = e.target.checked
            setCurrentData(array)
            if (props.setDataFetch !== undefined) {
                props.setDataFetch(!array.some(arr => arr.isSelect === true))
                console.log('it work')
            }
        }
        const keys = originalArray.length > 0 ? Object.keys(originalArray[0]) : []
        if (name === 'globalFilter') {
            if (e.target.value === '') {
                return setCurrentData(originalArray)
            }
            if (keys.length > 0) {
                setCurrentData([...originalArray]?.filter(
                    arr => keys.some(key => {
                        let currentStr: string = arr[key]?.toString()
                        return currentStr?.toLowerCase()?.includes(e.target.value?.toLowerCase())
                    })
                ))
            }
        }
        if (array.length > 0) {
            setMasterCheck(isMasterCheck)
        }
    }

    const removeHandler = () => {
        SweetAlert({
            title: 'Are you sure?',
            text: "Your file has been move to bin",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axios.post(`${process.env.REACT_APP_BACKEND_BASEURL}/InvoiceProcess/Delete`, currentData.filter(data => data.isSelect === true))
                        .then(() => {
                            setCurrentData(currentData.filter(data => data.isSelect === false))
                            props.setData(currentData.filter(data => data.isSelect === false))
                            SweetAlert({
                                title: 'Deleted!',
                                text: 'Your file has been deleted.',
                                icon: 'success'
                            })
                        })
                        .catch(() => {
                            SweetAlert({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Something went wrong!',
                            })
                        })
                }
            })
        setMasterCheck(false)
    }

    return (
        <>
            <div className="d-flex  justify-content-between">
                {
                    props?.filter
                        ? <div>
                            <input type="text" placeholder="Search here" name='globalFilter' className="form-control form-control-solid form-control-sm" onChange={(e) => changeHandler(e, 0)} />
                        </div>
                        : null
                }
                <div>
                    {/* {
                        currentData.some(data => data.isSelect === true)
                        ? <button className="btn btn-icon btn-sm" onClick={removeHandler}><RemoveSvg clsName="svg-icon svg-icon-danger svg-icon-2" /></button>
                        : null
                    } */}
                    {
                        currentData.some(data => data.isSelect === true)
                            ? <TableActionComponent data={props.data} setData={props.setData} buttons={[
                                {
                                    buttonText: <RemoveSvg clsName="svg-icon svg-icon-danger svg-icon-2" />,
                                    buttonClass: "btn btn-icon btn-sm btn-light-danger mx-2",
                                    onClick: removeHandler
                                }
                            ]} />
                            : null
                    }
                </div>
            </div>
            <div className="table-responsive hover-scroll-overlay-y">
                <table className="table table-hover gy-3 gs-7 table-rounded hover-scroll-overlay-y">
                    <thead className="fw-bolder fs-6 text-gray-800">
                        <tr className="border-bottom-2 border-gray-200 draggableContainer">
                            {
                                props.selectable
                                    ? <th key={0}>
                                        <div className="form-check form-check-custom form-check-solid form-check-sm">
                                            <input className="form-check-input" name='masterCheck' type="checkbox" checked={masterCheck} onChange={e => changeHandler(e, 0)} />
                                        </div>
                                    </th>
                                    : null
                            }
                            {
                                props.columns.map((column) => {
                                    return <th key={column.id} role={'button'} className={column.className} draggable={column.draggable ? column.draggable : false} onClick={() => {
                                        if (column.sortable) {
                                            const type = sortOption === 'NONE'
                                                ? 'ACS'
                                                : sortOption === 'ACS'
                                                    ? 'DES'
                                                    : sortOption === 'DES'
                                                        ? 'NONE'
                                                        : 'NONE'
                                            setSortOption(type)
                                            if (column.sortable) {
                                                sort(currentData, column.accessor, type)
                                            }
                                        }
                                    }
                                    } >
                                        {column.header}
                                        {"\t"}
                                        {
                                            column?.sortable
                                                ? sortOption !== 'NONE'
                                                    ? sortOption === 'ACS'
                                                        ? <DownArrowSvg clsName="svg-icon svg-icon-3" />
                                                        : <UpArrowSvg clsName="svg-icon svg-icon-3" />
                                                    : null
                                                : null
                                        }
                                    </th>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody className="hover-scroll-overlay-y">
                        {
                            currentData?.map((datum, index) => (
                                <tr key={index}>
                                    {
                                        <>
                                            {props.selectable
                                                ? <td key={0}>
                                                    <div className="form-check form-check-custom form-check-solid form-check-sm">
                                                        <input className="form-check-input" type="checkbox" checked={datum?.isSelect} onChange={(e) => changeHandler(e, index)} />
                                                    </div>
                                                </td>
                                                : null}
                                            {currentColumns?.map(header => {
                                                return header.hidden
                                                    ? null
                                                    :
                                                    (
                                                        <td key={header.accessor} id={header.accessor} >
                                                            {

                                                                header.input
                                                                    ? <select name={header.accessor} className="form-select form-select-transparent form-select-sm" value={datum[header.accessor]} >
                                                                        <option key={0} value={0}></option>
                                                                        {header.input.inputSrc.map(
                                                                            src => (<option key={src[header.input.srcId]} value={src[header.input.srcId]} >{src[header.input.srcName]}</option>)
                                                                        )}
                                                                    </select>
                                                                    : header.isEdit
                                                                        ? <input type={header?.type} className='form-control form-control-transparent form-control-sm' autoFocus name={header.accessor} value={datum[header.accessor]} />
                                                                        : header?.cell
                                                                            ? header?.cell(datum)
                                                                            : datum[header.accessor]
                                                            }
                                                        </td>
                                                    )
                                            })}
                                        </>
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export const TableFilterComponent = (props: {
    columns: any[]
    setColumns: Function
    datum: any[]
    setDatum: Function
    columnFilter: boolean
}) => {

    const changeHandler = (e, index) => {
        if (e.target.type === 'checkbox') {
            const array = [...props?.columns]
            array[index].hidden = !e.target.checked
            return props?.setColumns(array)
        }
        if (e.target.name === 'searchBox') {
            const keys = props.datum[0] ? Object.keys(props?.datum[0]) : []
            if (e.target.value === '') {
                props.setDatum([...props.datum])
            }
            else {
                const filterArray = [...props.datum]?.filter(
                    arr => keys.some(key => {
                        let currentStr: string = arr[key]?.toString()
                        return currentStr?.toLowerCase()?.includes(e.target.value?.toLowerCase())
                    })
                )
                props.setDatum(filterArray)
            }
        }
    }



    return (
        <div className="d-flex">
            <input type="text" placeholder="Search here" name={'searchBox'} className="form-control form-control-solid form-control-sm" onChange={(e) => changeHandler(e, 0)} />
            {
                props.columnFilter
                    ?
                    <div className='dropdown mx-2'>
                        <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-bs-toggle="dropdown" >
                            Columns
                        </button>
                        <div className="dropdown-menu dropdown-menu-start mt-3 me-3" >
                            <div className="d-flex flex-column h-100 w-200px p-4">
                                {
                                    props.columns.map((column, index) => {
                                        return <div key={column.id} className="d-flex justify-content-even gap-2">
                                            <input type="checkbox" checked={!column.hidden} onChange={(e) => {
                                                console.log(props.columns)
                                                changeHandler(e, index)
                                            }} />
                                            <label className="fs-5 fw-bolder">{column.headerName}</label>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
        </div>
    )
}

