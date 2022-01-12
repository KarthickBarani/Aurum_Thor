import { useState } from "react"
import Swal from "sweetalert2"

type LineItemsType = {
    LineItemId: number,
    InvoiceId: number,
    Amount: number,
    PartNumber: null | string,
    ProductCode: null | string,
    Description: string,
    UnitPrice: number,
    Quantity: number,
    ShippingQuantity: number,
    Unit: number,
    Date: null | string,
    TaxAmount: number,
    TaxPercentage: number
    isCheck: false
}[]

export const ListItemsComp = (props: {
    listItems: LineItemsType
    setListItems: Function

}) => {


    const [toggle, setToggle] = useState<boolean>(false)
    const [current, setCurrent] = useState<number>(0)
    const [allCheck, setAllCheck] = useState<boolean>(false)
    const [anyOne, setAnyOne] = useState<boolean>(false)

    const reducer = (prevVal: any, currentVal: { Amount: any }) => prevVal + (currentVal.Amount)
    const poSubtotal: number = props.listItems?.reduce(reducer, 0)

    const set = (arr) => {
        for (let val of arr) {
            if (!val.isCheck)
                val.isCheck = false
        }
    }

    const isAllCheck = () => {
        let newArr = [...props?.listItems]
        set(newArr)
        for (let val of newArr) {
            if (val.isCheck === undefined) return false
            if (val.isCheck === false) return false
        }
        return true
    }

    const isAnyOneCheck = () => {
        let newArr = [...props?.listItems]
        set(newArr)
        for (let val of newArr)
            if (val.isCheck !== false) return true
        return false
    }

    const onCheck = (e, index) => {
        let newArr = [...props?.listItems]
        set(newArr)
        newArr[index].isCheck = e.target.checked
        props.setListItems(newArr)
        setAllCheck(isAllCheck)
        setAnyOne(isAnyOneCheck)
        console.log(newArr)
        console.log('anyone:', anyOne, 'all', allCheck)
    }

    const onAllCheck = (e) => {
        let newArr = [...props?.listItems]
        set(newArr)
        setAllCheck(e.target.checked)
        for (let val of newArr)
            val.isCheck = e.target.checked
        setAnyOne(isAnyOneCheck)
        props.setListItems(newArr)
        console.log(props.listItems)
    }

    const addListItems = () => {
        let newArr: LineItemsType = [...props?.listItems]
        newArr.push({
            LineItemId: Date.now(),
            InvoiceId: 0,
            Amount: 0,
            PartNumber: '',
            ProductCode: '',
            Description: '',
            UnitPrice: Number(0?.toFixed(5)),
            Quantity: 0,
            ShippingQuantity: 0,
            Unit: 0,
            Date: '',
            TaxAmount: 0,
            TaxPercentage: 0,
            isCheck: false
        })
        props.setListItems(newArr)
        console.log('Add :', newArr)
    }

    const deleteListItems = () => {
        Swal.fire({
            title: 'Are you sure delete?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            let newarr = [...props.listItems]
            if (result.isConfirmed) {
                set(newarr)
                console.log(newarr)
                let delarr = newarr.filter(arr => (arr.isCheck === false))
                console.log(delarr)
                props.setListItems(delarr)
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
                {anyOne ?
                    <button onClick={deleteListItems} title="Delete" className="btn btn-active-light-danger btn-icon btn-sm m-1 btn-hover-rise">
                        <span className="svg-icon svg-icon-2 svg-icon-danger"><svg
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
                    :
                    <button onClick={addListItems} title="Add" className="btn btn-active-light-success btn-icon btn-sm m-1 btn-hover-rise">
                        <span className="svg-icon svg-icon-2 svg-icon-success"><svg
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24" fill="none">
                            <path opacity="0.3"
                                d="M3 13V11C3 10.4 3.4 10 4 10H20C20.6 10 21 10.4 21 11V13C21 13.6 20.6 14 20 14H4C3.4 14 3 13.6 3 13Z"
                                fill="black" />
                            <path
                                d="M13 21H11C10.4 21 10 20.6 10 20V4C10 3.4 10.4 3 11 3H13C13.6 3 14 3.4 14 4V20C14 20.6 13.6 21 13 21Z"
                                fill="black" />
                        </svg>
                        </span>
                    </button>
                }
            </div>
            <div className="table-responsive mx-1">
                <table className="table table-rounded border bg-light gs-3 ">
                    <thead className="fw-bolder fs-6">
                        <tr>
                            <th><input type='checkbox' className="form-check form-check-sm" onChange={e => onAllCheck(e)} checked={allCheck} /></th>
                            <th className="min-w-150px">Qty</th>
                            <th className="min-w-80px">PO Qty</th>
                            <th className="min-w-100px">Item</th>
                            <th className="min-w-150px">Vendor Part#</th>
                            <th className="min-w-350px">Description</th>
                            <th className="min-w-100px">Department</th>
                            <th className="min-w-100px">Location</th>
                            <th className="min-w-100px">Inv Rate</th>
                            <th className="min-w-150px">Inv Amount</th>
                            <th className="min-w-100px">PO Rate</th>
                            <th className="min-w-150px">PO Line Total</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {
                            props.listItems?.map((listItem, index) => {
                                return (
                                    <tr key={listItem.LineItemId} className={listItem.isCheck ? "table-active" : ''} >
                                        <td><input type='checkbox' className="form-check form-check-sm" onChange={(e) => onCheck(e, index)} checked={listItem.isCheck} /></td>
                                        <td onDoubleClick={() => {
                                            setToggle(true)
                                            setCurrent(listItem.LineItemId)
                                        }} >
                                            {
                                                toggle && current === listItem.LineItemId ? <input type="number" value={listItem.Quantity} onBlur={() => {
                                                    setToggle(false)
                                                    setCurrent(0)
                                                }} onChange={(e) => {
                                                    let newarry = [...props.listItems]
                                                    newarry[index].Quantity = e.target.valueAsNumber
                                                    newarry[index].Amount = Number((newarry[index].UnitPrice * e.target.valueAsNumber).toFixed(2))
                                                    props.setListItems(newarry)
                                                }} /> : listItem.Quantity}
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td>{listItem.PartNumber}</td>
                                        <td> {listItem.Description}</td>
                                        <td></td>
                                        <td></td>
                                        <td onDoubleClick={() => {
                                            setToggle(true)
                                            setCurrent(listItem.LineItemId)
                                        }}>
                                            {
                                                toggle && current === listItem.LineItemId ?
                                                    <input type="number" value={listItem.UnitPrice} onBlur={() => {
                                                        setToggle(false)
                                                        setCurrent(0)
                                                    }} onChange={e => {
                                                        let newarry = [...props.listItems]
                                                        newarry[index].UnitPrice = Number(e.target.valueAsNumber.toFixed(5))
                                                        newarry[index].Amount = Number((newarry[index].Quantity * e.target.valueAsNumber).toFixed(2))
                                                        props.setListItems(newarry)
                                                    }} />
                                                    : `$ ${listItem.UnitPrice.toFixed(2)}`
                                            }
                                        </td>
                                        <td onDoubleClick={() => {
                                            setToggle(true)
                                            setCurrent(listItem.LineItemId)
                                        }}>
                                            {
                                                toggle && current === listItem.LineItemId ?
                                                    <input type="number" value={listItem.Amount} onBlur={() => {
                                                        setToggle(false)
                                                        setCurrent(0)
                                                    }} onChange={e => {
                                                        let newarry = [...props.listItems]
                                                        newarry[index].Amount = Number(e.target.valueAsNumber.toFixed(2))
                                                        newarry[index].UnitPrice = Number((e.target.valueAsNumber / listItem.Quantity).toFixed(5))
                                                        props.setListItems(newarry)
                                                    }} />
                                                    : current === listItem.LineItemId ? `$ ${(listItem.Quantity * listItem.UnitPrice).toFixed(2)}` : `$ ${listItem.Amount.toFixed(2)}`
                                            }</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr className="fw-bold">
                            <th colSpan={8}></th>
                            <th className="min-w-150px">Items Subtotal</th>
                            <th>{`$ ${poSubtotal?.toFixed(2)}`}</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
}