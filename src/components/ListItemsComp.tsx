import { useState } from "react"
import { SweetAlert } from "../Function/alert"
import { lineItemsType, invDetailsType, departments, locations } from './Interface'



export const ListItemsComp = (props: {
    modifyInvDetails: invDetailsType
    listItems: lineItemsType
    departments: departments
    locations: locations
    setPOSubtotal: Function
    setListItems: Function
    setModifyInvDetails: Function
}
) => {


    const [toggle, setToggle] = useState<boolean>(false)
    const [current, setCurrent] = useState<number | string>(0)
    const [allCheck, setAllCheck] = useState<boolean>(false)
    const [anyOne, setAnyOne] = useState<boolean>(false)


    const poSubtotal = props?.listItems?.reduce((prev, crt) => (prev + crt.Amount), 0)
    const poSubtotal1 = props.listItems?.reduce((prev, crt) => (prev + crt.POAmount), 0)
    props.setPOSubtotal(poSubtotal1)



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
        let newArr: lineItemsType = [...props?.listItems]
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
            Date: new Date(Date.now()),
            TaxAmount: 0,
            TaxPercentage: 0,
            isCheck: false,
            isNew: true,
            POAmount: 0,
            PODepartment: 0,
            PODescription: "",
            POItem: 0,
            POQuantity: 0,
            POUnitPrice: 0
        })
        props.setListItems(newArr)
        props.setModifyInvDetails({ ...props.modifyInvDetails, LineItems: newArr })
        console.log('Add :', newArr)
    }

    const deleteListItems = () => {
        SweetAlert({ title: 'Are you sure delete?', icon: 'warning', timer: undefined, showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!' })
            .then(result => {
                let newarr = [...props.listItems]
                if (result.isConfirmed) {
                    set(newarr)
                    console.log(newarr)
                    let delarr = newarr.filter(arr => (arr.isCheck === false))
                    console.log(delarr)
                    props.setListItems(delarr)
                    props.setModifyInvDetails({ ...props.modifyInvDetails, LineItems: delarr })
                    setAllCheck(false)
                    setAnyOne(false)
                    console.log('Delete :', delarr)
                    SweetAlert({ title: 'Deleted', icon: 'success', timer: 1000 })
                }
            })

        // Swal.fire({
        //     title: 'Are you sure delete?',
        //     icon: 'warning',
        //     showCancelButton: true,
        //     confirmButtonColor: '#3085d6',
        //     cancelButtonColor: '#d33',
        //     confirmButtonText: 'Yes, delete it!'
        // }).then((result) => {
        //     let newarr = [...props.listItems]
        //     if (result.isConfirmed) {
        //         set(newarr)
        //         console.log(newarr)
        //         let delarr = newarr.filter(arr => (arr.isCheck === false))
        //         console.log(delarr)
        //         props.setListItems(delarr)
        //         props.setModifyInvDetails({ ...props.modifyInvDetails, LineItems: delarr })
        //         setAllCheck(false)
        //         setAnyOne(false)
        //         console.log('Delete :', delarr)
        //         Swal.fire(
        //             {
        //                 title: 'Deleted',
        //                 icon: 'success',
        //                 timer: 1000
        //             }
        //         )
        //     }
        // })
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
            <div className="table-responsive">
                <table className="table table-striped gy-3 gs-7  p-2 table-rounded">
                    <thead>
                        <tr className="fw-bolder fs-6 text-gray-800 border-bottom-2 border-gray-200">
                            <th><div className="form-check form-check-custom form-check-solid form-check-sm">
                                <input className="form-check-input" type="checkbox" onChange={e => onAllCheck(e)} checked={allCheck} />
                            </div></th>
                            <th className="min-w-150px">Inv Qty</th>
                            <th className="min-w-80px">PO Qty</th>
                            <th className="min-w-100px">Item</th>
                            <th className="min-w-150px">Vendor Part#</th>
                            <th className="min-w-350px">Description</th>
                            <th className="min-w-150px">Department</th>
                            <th className="min-w-150px">Location</th>
                            <th className="min-w-100px">Inv Rate</th>
                            <th className="min-w-100px">PO Rate</th>
                            <th className="min-w-150px">Inv Amount</th>
                            <th className="min-w-150px">PO Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.listItems?.map((listItem, index) => {
                                return (
                                    <tr key={listItem.LineItemId} className={listItem.isCheck ? "table-active" : ''} >
                                        <th><div className="form-check form-check-custom form-check-solid form-check-sm">
                                            <input className="form-check-input" type="checkbox" onChange={(e) => onCheck(e, index)} checked={listItem.isCheck} />
                                        </div></th>
                                        <td className={listItem.POQuantity < listItem.Quantity ? 'text-danger' : ''} onDoubleClick={() => {
                                            setToggle(true)
                                            setCurrent(listItem.LineItemId)
                                        }} >
                                            {
                                                toggle && current === listItem.LineItemId ? <input type="number" className="form-control form-control-transparent form-control-sm" value={listItem.Quantity} onBlur={() => {
                                                    setToggle(false)
                                                    setCurrent(0)
                                                }} onChange={(e) => {
                                                    let newarry = [...props.listItems]
                                                    newarry[index].Quantity = e.target.valueAsNumber
                                                    newarry[index].Amount = Number((newarry[index].UnitPrice * e.target.valueAsNumber).toFixed(2))
                                                    props.setListItems(newarry)
                                                }} /> : listItem.Quantity
                                            }
                                        </td>
                                        <td>{listItem.POQuantity}</td>
                                        <td>{listItem.POItem}</td>
                                        <td>{listItem.PartNumber}</td>
                                        <td>{listItem.Description}</td>
                                        <td><select name="" id="" className="form-select form-select-transparent form-select-sm">
                                            {props.departments.map(depts => (
                                                <option key={depts.DepartmentId} value={depts.DepartmentId} >{depts.DepartmentName}</option>
                                            ))}
                                        </select></td>
                                        <td><select name="" id="" className="form-select form-select-transparent form-select-sm">
                                            {props.locations.map(location => (
                                                <option key={location.LocationId} value={location.LocationId} >{location.Location}</option>
                                            ))}
                                        </select></td>
                                        <td onDoubleClick={() => {
                                            setToggle(true)
                                            setCurrent(listItem.LineItemId)
                                        }}>
                                            {
                                                toggle && current === listItem.LineItemId ?
                                                    <input type="number" className="form-control form-control-transparent form-control-sm" value={listItem.UnitPrice} onBlur={() => {
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
                                        <td>{`$ ${listItem.POUnitPrice.toFixed(2)}`}</td>
                                        <td onDoubleClick={() => {
                                            setToggle(true)
                                            setCurrent(listItem.LineItemId)
                                        }}>
                                            {
                                                toggle && current === listItem.LineItemId ?
                                                    <input type="number" className="form-control form-control-transparent form-control-sm" value={listItem.Amount} onBlur={() => {
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
                                        <td>{`$ ${listItem.POAmount.toFixed(2)}`}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr className="fw-bold fs-6 text-gray-800 border-top border-gray-200">
                            <th colSpan={9}></th>
                            <th className="min-w-150px">Items Subtotal</th>
                            <th>{`$ ${poSubtotal?.toFixed(2)}`}</th>
                            <th>{`$ ${poSubtotal1?.toFixed(2)}`}</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
}