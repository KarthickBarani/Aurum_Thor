
import axios from "axios"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"

import { Error } from "../components/Error"
import { Form } from "../components/Form"
import { PdfViewer } from "../components/PdfViewer"
import { ListItemsComp } from "../components/ListItemsComp"
import { ExpensesComp } from "../components/ExpensesComp"
import { Loading } from "../components/Loading"


type expensesType = {
    ExpenseId: number,
    InvoiceId: number,
    Amount: number,
    Memo: null | string,
    AddedDateTime: null | string,
    isCheck: false
}[]

type lineItemsType = {
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
    TaxPercentage: number,
    isCheck: false
}[]


type invDetailsType = {
    InvoiceId: number,
    CustomerName: null | string,
    CustomerId: null | string,
    VendorId: null | string,
    VendorCode: string | number
    VendorName: null | string,
    VendorAddress: null | string,
    VendorAddressRecipient: null | string,
    InvoiceNumber: null | string,
    CustomerAddress: null | string,
    CustomerAddressRecipient: null | string,
    ShippingAddress: null | string,
    ShippingAddressRecipient: null | string,
    BillingAddress: null | string,
    BillingAddressRecipient: null | string,
    RemittanceAddress: null | string,
    RemittanceAddressRecipient: null | string,
    PurchaseNumber: null | string,
    DueDate: null | string,
    InvoiceDate: null | string,
    TotalAmount: number,
    TaxTotal: number,
    LineItems: [] | lineItemsType,
    Expenses: [] | expensesType,
    AmountDue: number,
    LastModifiedDateTime: null | string,
    TransactionDate: null | string,
    ReceivedDate: null | string
}



export const InvoiceDetail = (props: {
    data: any
}) => {


    const [init, set] = useState(true)
    const [invDetails, setInvDetails] = useState<invDetailsType>({} as invDetailsType)
    const [listItems, setListItems] = useState<lineItemsType>([] as lineItemsType)
    const [expenses, setExpenses] = useState<expensesType>([] as expensesType)


    const onSuccess = () => {
        setInvDetails(data?.data)
        setListItems(data?.data.LineItems)
        setExpenses(data?.data.Expenses)
    }

    const fetchInvDetails = () => {
        return axios.get(`https://invoiceprocessingapi.azurewebsites.net/api/invoice/details/${props.data}`,)
    }

    const { isLoading, data, isError, isSuccess } = useQuery('invDetails', fetchInvDetails, {
        refetchOnWindowFocus: false,
        onSuccess
    })



    useEffect(() => {
        setInvDetails(data?.data)
        setListItems(data?.data.LineItems)
        setExpenses(data?.data.Expenses)
    }, [data])



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
                                    <span role='button' className="svg-icon svg-icon-danger svg-icon-1"><svg xmlns="http://www.w3.org/2000/svg"
                                        width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path opacity="0.3"
                                            d="M6.7 19.4L5.3 18C4.9 17.6 4.9 17 5.3 16.6L16.6 5.3C17 4.9 17.6 4.9 18 5.3L19.4 6.7C19.8 7.1 19.8 7.7 19.4 8.1L8.1 19.4C7.8 19.8 7.1 19.8 6.7 19.4Z"
                                            fill="black" />
                                        <path
                                            d="M19.5 18L18.1 19.4C17.7 19.8 17.1 19.8 16.7 19.4L5.40001 8.1C5.00001 7.7 5.00001 7.1 5.40001 6.7L6.80001 5.3C7.20001 4.9 7.80001 4.9 8.20001 5.3L19.5 16.6C19.9 16.9 19.9 17.6 19.5 18Z"
                                            fill="black" />
                                    </svg></span>

                                    <span role='button' onClick={() => {
                                        setInvDetails({ ...invDetails, Expenses: expenses, LineItems: listItems })
                                        console.log(invDetails)
                                    }} className="svg-icon svg-icon-primary svg-icon-1 px-5"><svg xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px"
                                        viewBox="0 0 24 24" version="1.1">
                                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                <polygon points="0 0 24 0 24 24 0 24" />
                                                <path
                                                    d="M17,4 L6,4 C4.79111111,4 4,4.7 4,6 L4,18 C4,19.3 4.79111111,20 6,20 L18,20 C19.2,20 20,19.3 20,18 L20,7.20710678 C20,7.07449854 19.9473216,6.94732158 19.8535534,6.85355339 L17,4 Z M17,11 L7,11 L7,4 L17,4 L17,11 Z"
                                                    fill="#000000" fillRule="nonzero" />
                                                <rect fill="#000000" opacity="0.3" x="12" y="4" width="3" height="5" rx="0.5" />
                                            </g>
                                        </svg></span>
                                </div>
                            </div>
                            <div className="card-body">
                                {isLoading ? <Loading /> : isError ? <Error /> : isSuccess ? <Form invDetails={invDetails} setInvDetails={setInvDetails} ></Form> : null}
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
                                <div className="container-fluid">
                                    <div className="row d-flex">
                                        <div id="pdf" className=" col-6 collapse show fade">
                                            <div className="m-3">
                                                <PdfViewer pdfUrl={props.data} />
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

                                            <div className="tab-content h-100">
                                                <div className="tab-pane fade h-100" id="itemsTab" role="tabpanel">
                                                    {isLoading ? <Loading /> : isError ? <Error /> : isSuccess ? <ListItemsComp listItems={listItems} setListItems={setListItems} /> : null}
                                                </div>
                                                <div className="tab-pane fade show active h-100" id="expensesTab" role="tabpanel">
                                                    {isLoading ? <Loading /> : isError ? <Error /> : <ExpensesComp expenses={expenses} setExpenses={setExpenses} />}
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




