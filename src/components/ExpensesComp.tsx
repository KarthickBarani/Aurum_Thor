import { time } from "console"
import { useState } from "react"
import Swal from 'sweetalert2'

type expensesType = {
    ExpenseId: number,
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

    const isAllCheck = () => {
        let newArr = [...props?.expenses]
        for (let val of newArr) {
            if (val.isCheck === undefined) return false
            if (val.isCheck === false) return false
        }
        return true
    }

    const isAnyOneCheck = () => {
        let newArr = [...props?.expenses]
        for (let val of newArr)
            if (val.isCheck !== false) return true
        return false
    }

    const [toggle, setToggle] = useState<boolean>(false)
    const [current, setCurrent] = useState<number>(0)
    const [allCheck, setAllCheck] = useState<boolean>(false)
    const [anyOne, setAnyOne] = useState<boolean>(false)

    const reducer = (prevVal: any, currentVal: { Amount: any }) => prevVal + (currentVal.Amount)
    const exSubtotal: number = props.expenses?.reduce(reducer, 0)

    const onCheck = (e, index) => {
        let newArr = [...props?.expenses]
        newArr[index].isCheck = e.target.checked
        props.setExpenses(newArr)
        setAllCheck(isAllCheck)
        setAnyOne(isAnyOneCheck)
        console.log(newArr)
        console.log('anyone:', isAnyOneCheck(), 'all', isAllCheck())
    }

    const onAllCheck = (e) => {
        let newArr = [...props?.expenses]
        for (let val of newArr) {
            val.isCheck = e.target.checked
        }
        props.setExpenses(newArr)
        setAllCheck(e.target.checked)
        setAnyOne(isAnyOneCheck)
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
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                let newArr = props.expenses.filter(arr => arr.isCheck === false)
                props.setExpenses(newArr)
                setAnyOne(false)
                setAllCheck(false)
                console.log('Delete :', newArr)
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
                            <button title="Copy" className="btn btn-active-light-primary btn-icon btn-sm m-1 btn-hover-rise">
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
                                <span className="svg-icon svg-icon-primary svg-icon-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M14.5 20.7259C14.6 21.2259 14.2 21.826 13.7 21.926C13.2 22.026 12.6 22.0259 12.1 22.0259C9.5 22.0259 6.9 21.0259 5 19.1259C1.4 15.5259 1.09998 9.72592 4.29998 5.82592L5.70001 7.22595C3.30001 10.3259 3.59999 14.8259 6.39999 17.7259C8.19999 19.5259 10.8 20.426 13.4 19.926C13.9 19.826 14.4 20.2259 14.5 20.7259ZM18.4 16.8259L19.8 18.2259C22.9 14.3259 22.7 8.52593 19 4.92593C16.7 2.62593 13.5 1.62594 10.3 2.12594C9.79998 2.22594 9.4 2.72595 9.5 3.22595C9.6 3.72595 10.1 4.12594 10.6 4.02594C13.1 3.62594 15.7 4.42595 17.6 6.22595C20.5 9.22595 20.7 13.7259 18.4 16.8259Z" fill="black" />
                                    <path opacity="0.3" d="M2 3.62592H7C7.6 3.62592 8 4.02592 8 4.62592V9.62589L2 3.62592ZM16 14.4259V19.4259C16 20.0259 16.4 20.4259 17 20.4259H22L16 14.4259Z" fill="black" />
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
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white" >
                        {props.expenses?.map((expense, index) => {
                            return (
                                <tr key={expense.ExpenseId}>
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
                                    <td>{expense.Memo}</td>
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