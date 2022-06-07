import { v4 as uuidv4 } from 'uuid'
import moment from "moment"
import { useState } from "react"
import { expensesType } from "./Interface"
import { AxiosGet } from '../helpers/Axios'
import { AddSvg, CopySvg, RecallSvg, RemoveSvg } from '../Svg/Svg'

export const LineItems = (props: { headers: any, datum: expensesType[], setDatum: Function }) => {


    const [checkAll, setCheckAll] = useState<boolean>(false)
    const [checkAnyOne, setCheckAnyOne] = useState<boolean>(false)
    const [isLoading, SetIsLoading] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [currentInput, setCurrentInput] = useState<string | null>(null)


    const addHandler = () => {
        const newRow: expensesType = {
            ExpenseId: uuidv4(),
            InvoiceId: props.datum[props.datum.length - 1].InvoiceId,
            Account: 0,
            Amount: 0,
            Memo: '',
            AddedDateTime: new Date(moment().format('LLLL')),
            Department: 0,
            LocationId: 0,
            isCheck: false,
            isNew: true
        }
        props.setDatum([...props.datum, newRow])
    }

    const removeHandler = () => {
        const arr = props.datum.filter(arr => arr.isCheck !== true)
        console.log(arr)
        props.setDatum(arr)
    }

    const copyHandler = () => {
        const copyArr = props.datum.filter(arr => arr.isCheck === true)
        const arr = [...props.datum]
        for (let ind in copyArr) {
            arr.push({
                Account: copyArr[ind].Account,
                ExpenseId: uuidv4(),
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
        AxiosGet(`/api/v1/Invoice/Recall/${11}`)
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
        else
            arr[index][name] = target.value
        console.log('check', arr[index][name])
        setCheckAll(arr.length === arr.filter(arr => arr.isCheck === true).length)
        setCheckAnyOne(arr.filter(arr => arr.isCheck === true).length > 0)
        props.setDatum(arr)
    }

    const editHandler = (e, index) => {
        setCurrentInput(e.target.id + index)
        setIsEdit(true)
    }


    return (
        <>
            <div className="d-flex justify-content-end">
                {checkAnyOne
                    ?
                    <>
                        <button title="Copy" onClick={copyHandler} className="btn btn-active-light-primary btn-icon btn-sm m-1 btn-hover-rise">
                            <CopySvg clsName='svg-icon svg-icon-3 svg-icon-primary' />
                        </button>
                        <button onClick={removeHandler} title="Delete" className="btn btn-active-light-danger btn-icon btn-sm m-1 btn-hover-rise">
                            <RemoveSvg clsName='svg-icon svg-icon-3 svg-icon-danger' />
                        </button>
                    </>
                    :
                    <>
                        <button title="Recall" onClick={recallHandler} className="btn btn-active-light-success btn-icon btn-sm m-1 btn-hover-rise">
                            {isLoading ? <span className="spinner-border spinner-border-sm text-primary"></span> : <RecallSvg clsName='svg-icon svg-icon-success svg-icon-3' />}
                        </button>
                        <button title="Add" onClick={addHandler} className="btn btn-active-light-primary btn-icon btn-sm m-1 btn-hover-rise">
                            <AddSvg clsName='svg-icon svg-icon-3 svg-icon-primary mx-1' />
                        </button>
                    </>
                }

            </div>
            <div className="table-responsive">
                <table className="table table-striped gy-3 gs-7 p-2 table-rounded">
                    <thead>
                        <tr className='fw-bolder fs-6 text-gray-800 border-bottom-2 border-gray-200'>
                            <th key={'masterCheck'}>
                                <div className="form-check form-check-custom form-check-solid form-check-sm">
                                    <input name='masterCheck' className="form-check-input" type="checkbox" checked={checkAll} onChange={masterCheckHandler} />
                                </div>
                            </th>
                            {props.headers.map(header => {
                                return <th key={header.headerName} className={header.className}>{header.headerName}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {props.datum?.map((data, index) => (
                            <tr key={data.ExpenseId} >
                                <td key={0}>
                                    <div className="form-check form-check-custom form-check-solid form-check-sm">
                                        <input name="isCheck" className="form-check-input" type="checkbox" checked={data?.isCheck} onChange={e => changeHandler(e, index)} />
                                    </div>
                                </td>
                                {props.headers.map(header => {
                                    return (
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
                                                    isEdit && (currentInput === header.accessor + index) ? <input type="text" className='form-control form-control-transparent form-control-sm' autoFocus name={header.accessor} value={data[header.accessor]} onChange={e => changeHandler(e, index)} />
                                                        :
                                                        data[header.accessor]
                                            }
                                        </td>)
                                })}
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="fw-bold fs-6 text-gray-800 border-top border-gray-200">
                            <th colSpan={1}></th>
                            <th> Subtotal </th>
                            <th>{`$ ${props.datum.reduce((prev, current) => { return prev + current.Amount }, 0).toFixed(2)}`}</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
} 