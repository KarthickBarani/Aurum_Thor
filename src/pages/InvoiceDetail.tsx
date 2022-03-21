
import axios from "axios"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"

import { Error } from "../components/Error"
import { Form } from "../components/Form"
import { PdfViewer } from "../components/PdfViewer"
import { ListItemsComp } from "../components/ListItemsComp"
import { ExpensesComp } from "../components/ExpensesComp"
import { Loading } from "../components/Loading"
import { lineItemsType, expensesType, invDetailsType, vendors, departments, locations, subsidiary } from '../components/Interface'
import Swal from "sweetalert2"





export const InvoiceDetail = (props: {
    invNumber: number
    vendors: vendors
    departments: departments
    locations: locations
    subsidiary: subsidiary
    setVendor: Function
    setDepartments: Function
    setLocation: Function
    setSubsidiaries: Function
}) => {



    const [init, set] = useState(true)
    const [process, setProcess] = useState(false)

    const [modifyInvDetails, setModifyInvDetails] = useState<invDetailsType>({} as invDetailsType)
    const [invDetails, setInvDetails] = useState<invDetailsType>({} as invDetailsType)
    const [listItems, setListItems] = useState<lineItemsType>({} as lineItemsType)
    const [expenses, setExpenses] = useState<expensesType>({} as expensesType)
    const [exSubtotal, setExSubtotal] = useState<number>(0)
    const [POSubtotal, setPOSubtotal] = useState<number>(0)

    // const [vendors, setVendor] = useState<vendors>([] as vendors)
    // const [departments, setDepartments] = useState<departments>([] as departments)
    // const [locations, setLocation] = useState<locations>([] as locations)
    // const [subsidiaries, setSubsidiaries] = useState<subsidiary>([] as subsidiary)


    const fetchInvDetails = () => {
        return axios.get(`https://invoiceprocessingapi.azurewebsites.net/api/v1/invoice/details/${props.invNumber}`,)
    }

    const { isLoading, data, isError, isSuccess } = useQuery('invDetails', fetchInvDetails, {
        refetchOnWindowFocus: false,
        // onSuccess
    })




    useEffect(() => {
        setModifyInvDetails(data?.data)
        setInvDetails(data?.data)
        setListItems(data?.data?.LineItems)
        setExpenses(data?.data?.Expenses)
    }, [data?.data])


    const save = () => {
        console.log(modifyInvDetails)
        setProcess(true)
        setProcess(false)
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
                                {isLoading ? <Loading /> : isError ? <Error /> : isSuccess ? <Form invDetails={invDetails} setInvDetails={setInvDetails} POSubtotal={POSubtotal} exSubtotal={exSubtotal} vendors={props.vendors}
                                    departments={props.departments} locations={props.locations} setModifyInvDetails={setModifyInvDetails} origin={data?.data} subsidiaries={props.subsidiary} ></Form> : null}
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
                                                {isLoading ? <Loading /> : isError ? <Error /> : isSuccess ? <ListItemsComp listItems={listItems} setListItems={setListItems} setPOSubtotal={setPOSubtotal} modifyInvDetails={modifyInvDetails} setModifyInvDetails={setModifyInvDetails} departments={props.departments} locations={props.locations} /> : null}
                                            </div>
                                            <div className="tab-pane fade show active h-100" id="expensesTab" role="tabpanel">
                                                {isLoading ? <Loading /> : isError ? <Error /> : isSuccess ? <ExpensesComp expenses={expenses} setExpenses={setExpenses} setExSubtotal={setExSubtotal} departments={props.departments} locations={props.locations} modifyInvDetails={modifyInvDetails} setModifyInvDetails={setModifyInvDetails} /> : null}
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
                                            <table className="table table-rounded bg-light border table-row-gray-300 gs-3">
                                                <thead className="fs-6 fw-bolder">
                                                    <tr>
                                                        <th>Approver</th>
                                                        <th>Date Time</th>
                                                        <th>Comments</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="fs-6 fw-bold bg-white">
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
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
        </>
    )
}




