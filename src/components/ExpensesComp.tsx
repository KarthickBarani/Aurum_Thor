
import { useState } from "react"
import Swal from 'sweetalert2'



type expensesType = {
    ExpenseId: number | string,
    InvoiceId: number,
    Amount: number,
    Memo: null | string,
    AddedDateTime: null | string,
    isCheck: false
}[]


export const ExpensesComp = (props: {
    expenses: expensesType
    setExpenses: Function
}) => {

    const CopyList = () => {
        let newarr = [...props.expenses]
        let selArr = newarr.filter(arr => arr.isCheck !== false || undefined)
        for (let key in selArr)
            newarr.push({
                ExpenseId: Date.now() + key,
                InvoiceId: 0,
                Amount: selArr[key].Amount,
                Memo: '',
                AddedDateTime: '',
                isCheck: false
            })
        props.setExpenses(newarr)
        console.log(newarr)
    }

    const [toggle, setToggle] = useState<boolean>(false)
    const [current, setCurrent] = useState<number | string>(0)
    const [allCheck, setAllCheck] = useState<boolean>(false)
    const [anyOne, setAnyOne] = useState<boolean>(false)

    const reducer = (prevVal: any, currentVal: { Amount: any }) => prevVal + (currentVal.Amount)
    const exSubtotal: number = props.expenses?.reduce(reducer, 0)

    const set = (arr) => {
        for (let val of arr) {
            if (!val.isCheck)
                val.isCheck = false
        }
    }

    const isAllCheck = () => {
        let newArr = [...props?.expenses]
        set(newArr)
        for (let val of newArr) {
            if (val.isCheck === undefined) return false
            if (val.isCheck === false) return false
        }
        return true
    }

    const isAnyOneCheck = () => {
        let newArr = [...props?.expenses]
        set(newArr)
        for (let val of newArr)
            if (val.isCheck !== false) return true
        return false
    }

    const onCheck = (e, index) => {
        let newArr = [...props?.expenses]
        set(newArr)
        newArr[index].isCheck = e.target.checked
        props.setExpenses(newArr)
        setAllCheck(isAllCheck)
        setAnyOne(isAnyOneCheck)
        console.log(newArr)
        console.log('anyone:', anyOne, 'all', allCheck)
    }

    const onAllCheck = (e) => {
        let newArr = [...props?.expenses]
        set(newArr)
        setAllCheck(e.target.checked)
        for (let val of newArr)
            val.isCheck = e.target.checked
        setAnyOne(isAnyOneCheck)
        props.setExpenses(newArr)
        console.log(props.expenses)
    }

    const addExpenses = () => {
        let newArr: expensesType = [...props?.expenses]
        newArr.push({
            ExpenseId: Date.now(),
            InvoiceId: 0,
            Amount: 0,
            Memo: '',
            AddedDateTime: '',
            isCheck: false
        })
        props.setExpenses(newArr)
        console.log('Add :', newArr)
    }

    const deleteExpenses = () => {
        Swal.fire({
            title: 'Are you sure delete?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            let newarr = [...props?.expenses]
            if (result.isConfirmed) {
                set(newarr)
                console.log(newarr)
                let delarr = newarr.filter(arr => (arr.isCheck === false))
                console.log(delarr)
                props.setExpenses(delarr)
                console.log('Delete :', delarr)
                Swal.fire(
                    {
                        title: 'Deleted',
                        icon: 'success',
                        timer: 1000
                    }
                )
            }
        })
    }

    return (
        <>
            <div className="d-flex justify-content-end">

                {
                    anyOne ?
                        <>
                            <button title="Copy" onClick={CopyList} className="btn btn-active-light-primary btn-icon btn-sm m-1 btn-hover-rise">
                                <span className="svg-icon svg-icon-3 svg-icon-primary"><svg
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none">
                                    <rect opacity="0.5" x="7" y="2" width="14" height="16" rx="3"
                                        fill="black" />
                                    <rect x="3" y="6" width="14" height="16" rx="3" fill="black" />
                                </svg></span>
                            </button>
                            <button onClick={deleteExpenses} title="Delete" className="btn btn-active-light-danger btn-icon btn-sm m-1 btn-hover-rise">
                                <span className="svg-icon svg-icon-2 svg-icon-danger mx-1"><svg
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z"
                                        fill="black" />
                                    <path opacity="0.5"
                                        d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z"
                                        fill="black" />
                                    <path opacity="0.5"
                                        d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z"
                                        fill="black" />
                                </svg></span>
                            </button>
                        </> :
                        <>
                            <button title="Refresh" className="btn btn-active-light-primary btn-icon btn-sm m-1 btn-hover-rise">
                                <span className="svg-icon svg-icon-primary svg-icon-3"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none">
                                    <path d="M21 13V13.5C21 16 19 18 16.5 18H5.6V16H16.5C17.9 16 19 14.9 19 13.5V13C19 12.4 19.4 12 20 12C20.6 12 21 12.4 21 13ZM18.4 6H7.5C5 6 3 8 3 10.5V11C3 11.6 3.4 12 4 12C4.6 12 5 11.6 5 11V10.5C5 9.1 6.1 8 7.5 8H18.4V6Z" fill="black" />
                                    <path opacity="0.3" d="M21.7 6.29999C22.1 6.69999 22.1 7.30001 21.7 7.70001L18.4 11V3L21.7 6.29999ZM2.3 16.3C1.9 16.7 1.9 17.3 2.3 17.7L5.6 21V13L2.3 16.3Z" fill="black" />
                                </svg></span>
                            </button>
                            <button title="Add" onClick={addExpenses} className="btn btn-active-light-success btn-icon btn-sm m-1 btn-hover-rise">
                                <span className="svg-icon svg-icon-2 svg-icon-success mx-1"><svg
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none">
                                    <path opacity="0.3"
                                        d="M3 13V11C3 10.4 3.4 10 4 10H20C20.6 10 21 10.4 21 11V13C21 13.6 20.6 14 20 14H4C3.4 14 3 13.6 3 13Z"
                                        fill="black" />
                                    <path
                                        d="M13 21H11C10.4 21 10 20.6 10 20V4C10 3.4 10.4 3 11 3H13C13.6 3 14 3.4 14 4V20C14 20.6 13.6 21 13 21Z"
                                        fill="black" />
                                </svg></span>
                            </button>
                        </>
                }
            </div>
            <div className="table-responsive">
                <table className="table table-bordered h-80 bg-light rounded min-h-80 gs-3 ">
                    <thead className="fs-6 fw-bolder">
                        <tr>
                            <th><input type='checkbox' className="form-check form-check-sm" onChange={e => onAllCheck(e)} checked={allCheck} /></th>
                            <th>Account</th>
                            <th>Amount</th>
                            <th>Memo</th>
                            <th>Department</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white" >
                        {props.expenses?.map((expense, index) => {
                            return (
                                <tr key={expense.ExpenseId} className={expense.isCheck ? "table-active" : ''} >
                                    <td><input type='checkbox' className="form-check form-check-sm" onChange={(e) => onCheck(e, index)} checked={expense.isCheck} /></td>
                                    <td></td>
                                    <td onDoubleClick={
                                        () => {
                                            setToggle(true)
                                            setCurrent(expense.ExpenseId)
                                        }
                                    }>{
                                            toggle && current === expense.ExpenseId ?
                                                <input type="number" value={expense.Amount} onBlur={() => {
                                                    setToggle(false)
                                                    setCurrent(0)
                                                }} onChange={e => {
                                                    let newarry = [...props.expenses]
                                                    newarry[index].Amount = Number(e.target.valueAsNumber.toFixed(2))
                                                    props.setExpenses(newarry)
                                                }} />
                                                : `$ ${expense.Amount.toFixed(2)}`
                                        }</td>
                                    <td onDoubleClick={
                                        () => {
                                            setToggle(true)
                                            setCurrent(expense.ExpenseId)
                                        }
                                    }>{
                                            toggle && current === expense.ExpenseId ?
                                                <input type="text" value={expense.Memo?.toString()} onBlur={() => {
                                                    setToggle(false)
                                                    setCurrent(0)
                                                }} onChange={e => {
                                                    let newarry = [...props.expenses]
                                                    newarry[index].Memo = e.target.value
                                                    props.setExpenses(newarry)
                                                }} />
                                                : `$ ${expense.Memo}`
                                        }</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot>
                        <tr className="fw-bold">
                            <th colSpan={1}></th>
                            <th> Subtotal </th>
                            <th>{`$ ${exSubtotal?.toFixed(2)}`}</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
}