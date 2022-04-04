
import axios from "axios"
import React, { useEffect, useState } from "react"
import { Error } from "../components/Error"
import { Form } from "../components/Form"
import { PdfViewer } from "../components/PdfViewer"
import { ListItemsComp } from "../components/ListItemsComp"
import { ExpensesComp } from "../components/ExpensesComp"
import { Loading } from "../components/Loading"
import { lineItemsType, expensesType, invDetailsType, vendors, departments, locations, subsidiary, account, ApprovalHistory, userProfileType, WorkFlowTableType, WorkFlowLevel } from '../components/Interface'
import Swal from "sweetalert2"






export const InvoiceDetail = (props: {
    invNumber: number
    users: userProfileType[]
    vendors: vendors
    departments: departments
    locations: locations
    subsidiary: subsidiary
    userid: number
    account: account
    refetch: Function
}) => {



    const [init, set] = useState(true)
    const [process, setProcess] = useState(false)

    const [isError, setIsError] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [origin, setOrigin] = useState<invDetailsType>({} as invDetailsType)
    const [modifyInvDetails, setModifyInvDetails] = useState<invDetailsType>({} as invDetailsType)
    const [invDetails, setInvDetails] = useState<invDetailsType>({} as invDetailsType)
    const [listItems, setListItems] = useState<lineItemsType>({} as lineItemsType)
    const [expenses, setExpenses] = useState<expensesType>({} as expensesType)
    const [approvers, setApprover] = useState<WorkFlowLevel>([] as WorkFlowLevel)
    const [approvalHistory, setApprovalHistory] = useState<ApprovalHistory[]>([] as ApprovalHistory[])
    const [workFlows, setWorkFlows] = useState<WorkFlowTableType[]>([] as WorkFlowTableType[])
    const [exSubtotal, setExSubtotal] = useState<number>(0)
    const [POSubtotal, setPOSubtotal] = useState<number>(0)




    useEffect(() => {

        axios.get<WorkFlowTableType[]>('https://invoiceprocessingapi.azurewebsites.net/api/v1/Workflow')
            .then(res => {
                setWorkFlows(res.data)
                setApprover(res.data.filter(arr => arr.WorkFlowTypeId === 1)[0].Approval[0].Level)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    useEffect(() => {
        setIsLoading(true)
        axios.get<invDetailsType>(`https://invoiceprocessingapi.azurewebsites.net/api/v1/invoice/details/${props.invNumber}`)
            .then(res => {
                setOrigin(res.data)
                setModifyInvDetails(res.data)
                setInvDetails(res.data)
                setListItems(res.data.LineItems)
                setExpenses(res.data.Expenses)
                setIsLoading(false)
                setIsError(false)
            })
            .catch(err => {
                setIsLoading(false)
                console.log(err)
            })
    }, [props.invNumber])



    useEffect(() => {
        axios.get(`https://invoiceprocessingapi.azurewebsites.net/api/v1/Invoice/ApprovalFlow/${props.invNumber}`)
            .then(res => {
                setApprovalHistory(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }, [props.invNumber])

    const addLevel = () => {
        let arr = [...approvers]
        arr.push({
            Level: approvers.length + 1,
            Approver: 0,
            Amount: 0,
            Percentage: 0,
        })
        setApprover(arr)
    }
    const removeLevel = (index) => {
        let delarr = approvers.filter(arr => approvers.indexOf(arr) !== index)
        setApprover(delarr)
        console.log(delarr)
    }

    const moveUp = (index) => {
        let arr = [...approvers]
        console.table(arr)
        let temp = arr[index]
        arr[index] = arr[index - 1]
        arr[index - 1] = temp
        setApprover(arr)
    }
    const moveDown = (index) => {
        let arr = [...approvers]
        console.table(arr)
        let temp = arr[index]
        arr[index] = arr[index + 1]
        arr[index + 1] = temp
        setApprover(arr)
    }


    const save = () => {
        console.log(modifyInvDetails)
        setProcess(true)
        axios.post(`https://invoiceprocessingapi.azurewebsites.net/api/v1/Invoice`, modifyInvDetails)
            .then(res => {
                console.log('Response:', res)
                setProcess(false)
                Swal.fire(
                    {
                        title: '<h1>Saved</h1>',
                        icon: 'success',
                        timer: 4000,
                    }
                )
            })
            .catch(err => {
                console.log('Error:', err)
                setProcess(false)
                Swal.fire(
                    {
                        title: 'Error',
                        icon: 'error',
                        timer: 1000,
                    }
                )
            })
    }

    const pdfToggle = init ? 'Hide Invoice' : 'Show Invoice'
    const collapseClass = init ? 'col-6' : 'col-12'


    return (

        <>

            <div className="container-fluid">
                <div className="row my-10">
                    <div className="col">
                        <h4 className="text-white">Invoice Details</h4>
                    </div>
                </div>
                <div className="row ">
                    <div className="col">
                        <div className="card card-flush shadow-sm">
                            <div className="card-header bg-white">
                                <h3 className="card-title fw-bolders">Invoice Details</h3>
                                <div className="card-toolbar">
                                    <button onClick={save} className="btn btn-active-light-primary btn-icon btn-sm m-1 btn-hover-scale" >
                                        {process ? <span className="spinner-border spinner-border-sm text-primary"></span> : <span className="svg-icon svg-icon-primary svg-icon-1 px-5">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px"
                                                viewBox="0 0 24 24" version="1.1">
                                                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                    <polygon points="0 0 24 0 24 24 0 24" />
                                                    <path
                                                        d="M17,4 L6,4 C4.79111111,4 4,4.7 4,6 L4,18 C4,19.3 4.79111111,20 6,20 L18,20 C19.2,20 20,19.3 20,18 L20,7.20710678 C20,7.07449854 19.9473216,6.94732158 19.8535534,6.85355339 L17,4 Z M17,11 L7,11 L7,4 L17,4 L17,11 Z"
                                                        fill="#000000" fillRule="nonzero" />
                                                    <rect fill="#000000" opacity="0.3" x="12" y="4" width="3" height="5" rx="0.5" />
                                                </g>
                                            </svg></span>}
                                    </button>
                                </div>
                            </div>
                            <div className="card-body">
                                {isLoading ? <Loading /> : isError ? <Error /> : <Form refetch={props.refetch} users={props.users} approvers={approvers} invNumber={props.invNumber} userid={props.userid} invDetails={invDetails} setInvDetails={setInvDetails} POSubtotal={POSubtotal} exSubtotal={exSubtotal} vendors={props.vendors}
                                    departments={props.departments} locations={props.locations} setModifyInvDetails={setModifyInvDetails} origin={origin} subsidiaries={props.subsidiary} ></Form>}
                            </div>
                        </div>
                    </div >
                </div >
                <div className="row my-2 ">
                    <div className="col">
                        <div className="card card-flush">
                            <div className="card-header ribbon ribbon-start">
                                <h3 className="card-title fw-bolders">Invoice</h3>
                                <div role="button" data-bs-toggle="collapse" onClick={() => set(!init)} data-bs-target="#pdf" className="ribbon-label bg-primary">{pdfToggle}</div>
                            </div>
                            <div className="card-body">
                                <div className="row d-flex h-100">
                                    <div id="pdf" className=" col-6 collapse show fade">
                                        <div className="m-3">
                                            <PdfViewer pdfUrl={props.invNumber} />
                                        </div>
                                    </div>
                                    <div className={collapseClass}>
                                        <ul className="nav nav-tabs nav-line-tabs nav-line-tabs-2x mb-5 fs-6 ">
                                            <li className="nav-item">
                                                <a className="nav-link active " role="button" data-bs-toggle="tab"
                                                    href="#expensesTab">
                                                    <h4>Expenses</h4>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link " role="button" data-bs-toggle="tab" href="#itemsTab">
                                                    <h4>Items</h4>
                                                </a>
                                            </li>
                                        </ul>

                                        <div className="tab-content h-95">
                                            <div className="tab-pane fade h-100" id="itemsTab" role="tabpanel">
                                                {isLoading ? <Loading /> : isError ? <Error /> : <ListItemsComp listItems={listItems} setListItems={setListItems} setPOSubtotal={setPOSubtotal} modifyInvDetails={modifyInvDetails} setModifyInvDetails={setModifyInvDetails} departments={props.departments} locations={props.locations} />}
                                            </div>
                                            <div className="tab-pane fade show active h-100" id="expensesTab" role="tabpanel">
                                                {isLoading ? <Loading /> : isError ? <Error /> : <ExpensesComp expenses={expenses} setExpenses={setExpenses} account={props.account} setExSubtotal={setExSubtotal} departments={props.departments} locations={props.locations} modifyInvDetails={modifyInvDetails} setModifyInvDetails={setModifyInvDetails} />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row my-5">
                                    <div className="col">
                                        <div className="d-flex flex-stack">
                                            <div>
                                                <p className="fw-bolder fs-4">Approval History</p>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table table-striped gy-3 gs-7 table-hover p-2 table-rounded">
                                                <thead >
                                                    <tr className="fw-bolder fs-6 text-gray-800 border-bottom-2 border-gray-200">
                                                        <th>Approver</th>
                                                        <th>Date Time</th>
                                                        <th>Comments</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        approvalHistory?.map((History, index) => (
                                                            <tr key={index} >
                                                                <td>{History.ApproverName}</td>
                                                                <td>{History.ActionOn}</td>
                                                                <td>{History.Comments}</td>
                                                                <td>{History.StatusText}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                    </div >
                </div>
            </div>
            <div className="modal fade" tabIndex={-1} id="kt_modal_1">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Attachment</h5>

                            <div className="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
                                <span className="svg-icon svg-icon-2x">x</span>
                            </div>

                        </div>

                        <div className="modal-body">
                            <form>
                                <div className="form-group m-2">
                                    <label htmlFor="descprition" className="form-label fw-bold">Descprition</label>
                                    <textarea data-kt-autosize="true" className="form-control"></textarea>
                                </div>
                                <div className="form-group m-2">
                                    <label className="form-label fw-bold">Attachment</label>
                                    <input type="file" className="form-control invalid" accept="application/pdf,image/jpg,image/jpeg,image/png" />
                                    <small className="text-muted">File Format :.pdf,.jpeg,.png File Size :(max:10mb)</small>
                                </div>
                            </form>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Add</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" tabIndex={-1} id="level">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-body">
                            {
                                approvers.map((approver, index) => (
                                    <React.Fragment key={index}>
                                        <div className="row m-4">
                                            <div className="col-8">
                                                <div className="row">
                                                    <div className="col-2 align-self-center">
                                                        <label htmlFor="level" className="form-label fw-bolder">Level-{index + 1}</label>
                                                    </div>
                                                    <div className="col-10">
                                                        <label htmlFor={'approver[' + index + ']'} className="form-label">Approver</label>
                                                        <select name={'approver[' + index + ']'} id={'approver[' + index + ']'} value={approver.Approver} onChange={
                                                            (e) => {
                                                                let arr = [...approvers]
                                                                arr[index].Approver = e.target.value
                                                                setApprover(arr)
                                                                console.log(e.target.value)
                                                            }
                                                        } className="form-select form-select-sm">
                                                            <option key={0} value={0}></option>
                                                            {
                                                                props.users?.map(user => (
                                                                    <option key={user.Id} value={user.Id}>{`${user.FirstName} ${user.LastName}`}</option>
                                                                ))
                                                            }
                                                            {/* {console.log('check', props.users?.filter((arr, index) => arr?.Id === approvers[index]?.Approver))} */}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-4 align-self-end">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="row">
                                                            <div className="col-6">{index !== 0 ? <button onClick={() => removeLevel(index)} title="Delete" className="btn btn-active-light-danger btn-icon btn-sm btn-hover-rise">
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
                                                            </button> : null}
                                                                {index === approvers.length - 1 ? <button onClick={addLevel} title="Add Level" className="btn btn-active-light-Primary btn-icon btn-sm  btn-hover-rise">
                                                                    <span className="svg-icon svg-icon-2 svg-icon-primary">
                                                                        <svg
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
                                                                </button> : null}
                                                            </div>
                                                            <div className="col-6 align-self-center">
                                                                {
                                                                    index === 0 ?
                                                                        <span onClick={() => moveDown(index)} role='button' title="Down" className="svg-icon svg-icon-primary svg-icon-1 ms-auto"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                            <path opacity="0.5" d="M12.5657 9.63427L16.75 5.44995C17.1642 5.03574 17.8358 5.03574 18.25 5.44995C18.6642 5.86416 18.6642 6.53574 18.25 6.94995L12.7071 12.4928C12.3166 12.8834 11.6834 12.8834 11.2929 12.4928L5.75 6.94995C5.33579 6.53574 5.33579 5.86416 5.75 5.44995C6.16421 5.03574 6.83579 5.03574 7.25 5.44995L11.4343 9.63427C11.7467 9.94669 12.2533 9.94668 12.5657 9.63427Z" fill="black" />
                                                                            <path d="M12.5657 15.6343L16.75 11.45C17.1642 11.0357 17.8358 11.0357 18.25 11.45C18.6642 11.8642 18.6642 12.5357 18.25 12.95L12.7071 18.4928C12.3166 18.8834 11.6834 18.8834 11.2929 18.4928L5.75 12.95C5.33579 12.5357 5.33579 11.8642 5.75 11.45C6.16421 11.0357 6.83579 11.0357 7.25 11.45L11.4343 15.6343C11.7467 15.9467 12.2533 15.9467 12.5657 15.6343Z" fill="black" />
                                                                        </svg></span>
                                                                        :
                                                                        <>
                                                                            {
                                                                                index === approvers.length - 1 ?
                                                                                    <span onClick={() => moveUp(index)} role='button' title="up" className="svg-icon svg-icon-primary svg-icon-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                                        <path opacity="0.5" d="M11.4343 14.3657L7.25 18.55C6.83579 18.9643 6.16421 18.9643 5.75 18.55C5.33579 18.1358 5.33579 17.4643 5.75 17.05L11.2929 11.5072C11.6834 11.1166 12.3166 11.1166 12.7071 11.5072L18.25 17.05C18.6642 17.4643 18.6642 18.1358 18.25 18.55C17.8358 18.9643 17.1642 18.9643 16.75 18.55L12.5657 14.3657C12.2533 14.0533 11.7467 14.0533 11.4343 14.3657Z" fill="black" />
                                                                                        <path d="M11.4343 8.36573L7.25 12.55C6.83579 12.9643 6.16421 12.9643 5.75 12.55C5.33579 12.1358 5.33579 11.4643 5.75 11.05L11.2929 5.50716C11.6834 5.11663 12.3166 5.11663 12.7071 5.50715L18.25 11.05C18.6642 11.4643 18.6642 12.1358 18.25 12.55C17.8358 12.9643 17.1642 12.9643 16.75 12.55L12.5657 8.36573C12.2533 8.05331 11.7467 8.05332 11.4343 8.36573Z" fill="black" />
                                                                                    </svg></span>
                                                                                    :
                                                                                    <>
                                                                                        <span onClick={() => moveUp(index)} role='button' title="up" className="svg-icon svg-icon-primary svg-icon-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                                            <path opacity="0.5" d="M11.4343 14.3657L7.25 18.55C6.83579 18.9643 6.16421 18.9643 5.75 18.55C5.33579 18.1358 5.33579 17.4643 5.75 17.05L11.2929 11.5072C11.6834 11.1166 12.3166 11.1166 12.7071 11.5072L18.25 17.05C18.6642 17.4643 18.6642 18.1358 18.25 18.55C17.8358 18.9643 17.1642 18.9643 16.75 18.55L12.5657 14.3657C12.2533 14.0533 11.7467 14.0533 11.4343 14.3657Z" fill="black" />
                                                                                            <path d="M11.4343 8.36573L7.25 12.55C6.83579 12.9643 6.16421 12.9643 5.75 12.55C5.33579 12.1358 5.33579 11.4643 5.75 11.05L11.2929 5.50716C11.6834 5.11663 12.3166 5.11663 12.7071 5.50715L18.25 11.05C18.6642 11.4643 18.6642 12.1358 18.25 12.55C17.8358 12.9643 17.1642 12.9643 16.75 12.55L12.5657 8.36573C12.2533 8.05331 11.7467 8.05332 11.4343 8.36573Z" fill="black" />
                                                                                        </svg></span>
                                                                                        <span onClick={() => moveDown(index)} role='button' title="Down" className="svg-icon svg-icon-primary svg-icon-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                                            <path opacity="0.5" d="M12.5657 9.63427L16.75 5.44995C17.1642 5.03574 17.8358 5.03574 18.25 5.44995C18.6642 5.86416 18.6642 6.53574 18.25 6.94995L12.7071 12.4928C12.3166 12.8834 11.6834 12.8834 11.2929 12.4928L5.75 6.94995C5.33579 6.53574 5.33579 5.86416 5.75 5.44995C6.16421 5.03574 6.83579 5.03574 7.25 5.44995L11.4343 9.63427C11.7467 9.94669 12.2533 9.94668 12.5657 9.63427Z" fill="black" />
                                                                                            <path d="M12.5657 15.6343L16.75 11.45C17.1642 11.0357 17.8358 11.0357 18.25 11.45C18.6642 11.8642 18.6642 12.5357 18.25 12.95L12.7071 18.4928C12.3166 18.8834 11.6834 18.8834 11.2929 18.4928L5.75 12.95C5.33579 12.5357 5.33579 11.8642 5.75 11.45C6.16421 11.0357 6.83579 11.0357 7.25 11.45L11.4343 15.6343C11.7467 15.9467 12.2533 15.9467 12.5657 15.6343Z" fill="black" />
                                                                                        </svg></span>
                                                                                    </>

                                                                            }
                                                                        </>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="separator border-1 border-light my-2"></div>
                                        </div>
                                    </React.Fragment>
                                ))
                            }
                            <div className="d-flex justify-content-end">

                                <button className="mx-2 btn btn-light btn-sm" data-bs-dismiss="modal">Close</button>
                                <button className="mx-2 btn btn-light-primary btn-sm" onClick={() => {
                                    setProcess(true)
                                    axios.post(`https://invoiceprocessingapi.azurewebsites.net/api/v1/Workflow/CustomFlow/${props.invNumber}/${props.userid}`, approvers)
                                        .then(res => {
                                            console.log(res.data)
                                            setProcess(false)
                                        })
                                        .catch(err => {
                                            console.error(err)
                                            setProcess(false)
                                        })
                                }}>

                                    {process ? <span className="spinner-border spinner-border-sm align-middle ms-2"></span> : <span>Save</span>}</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}






