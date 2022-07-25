
import axios from "axios"
import { useEffect, useState } from "react"
import { Error } from "../components/components/Error"
import { PdfViewer } from "../components/Auth/PdfViewer"
import { Loading } from "../components/components/Loading"
import { lineItemsType, expensesType, invDetailsType, vendors, departments, locations, subsidiary, account, ApprovalHistory, userProfileType, NextApprovers, WorkFlowTableType } from '../components/Interface/Interface'
import { SweetAlert } from "../Function/alert"
import { AxiosGet } from "../helpers/Axios"
import { LevelElement } from "../components/WorkFlow/LevelElement"
import { LineItems } from "../components/InvoiceDetails/LineItems"
import { InvoiceDetailsForm } from "../components/InvoiceDetails/InvoiceDetailsForm"
import { SaveSvg } from "../components/Svg/Svg"





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

    const [trigger, setTrigger] = useState(false)
    const [isValid, setValid] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [invDetails, setInvDetails] = useState<invDetailsType>({} as invDetailsType)
    const [listItems, setListItems] = useState<lineItemsType[]>([] as lineItemsType[])
    const [expenses, setExpenses] = useState<expensesType[]>([] as expensesType[])
    const [approvalHistory, setApprovalHistory] = useState<ApprovalHistory[]>([] as ApprovalHistory[])
    const [workFlow, setWorkFlow] = useState<WorkFlowTableType>({} as WorkFlowTableType)
    const [exSubtotal, setExSubtotal] = useState<number>(0)
    const [POSubtotal, setPOSubtotal] = useState<number>(0)
    const [nextApprovers, setNextApprover] = useState<NextApprovers[]>([] as NextApprovers[])
    // const [approvers, setApprover] = useState<WorkFlowApproval>({} as WorkFlowApproval)

    // const [filterApprover, setFilterApprover] = useState<WorkFlowLevel>([] as WorkFlowLevel)
    const [error, setError] = useState<number[]>([])
    const [formError, setFormError] = useState({
        VendorId: null,
        VendorName: null,
        VendorCode: null,
        VendorAddress: null,
        VendorAddressRecipient: null,
        InvoiceNumber: null,
        RemittanceAddress: null,
        PurchaseNumber: null,
        DueDate: null,
        InvoiceDate: null,
        TotalAmount: null,
        TaxTotal: null,
    })


    const validation = () => {
        for (let val of Object.values(formError)) {
            if (val !== null) {
                return true
            }
        }
        return false
    }

    const [lineItemsToggle, setLineItemsToggle] = useState<'Expense' | 'LineItems'>('Expense')
    const [afterDragElement, setAfterDragElement] = useState<any>([])

    const [expensesHeaders, setExpensesHeaders] = useState([
        {
            id: 1,
            headerName: 'Account',
            accessor: 'Account',
            className: 'min-w-150px dragEl',
            input: {
                inputSrc: props.account,
                srcId: 'AccountId',
                srcName: 'AccountName'

            },
            draggable: true,
            hidden: false,

        },
        {
            id: 2,
            headerName: 'Amount',
            accessor: 'Amount',
            className: 'min-w-150px dragEl',
            isEdit: true,
            type: 'Number',
            draggable: true,
            hidden: false,
            footer: (data: expensesType[]) => {
                return `$ ${data.reduce((prev: number, current) => {
                    return prev + Number(current?.Amount)
                }, 0).toFixed(2)}`
            }
        },
        {
            id: 3,
            headerName: 'Memo',
            accessor: 'Memo',
            className: 'min-w-400px dragEl',
            type: 'text',
            draggable: true,
            hidden: false
        },
        {
            id: 4,
            headerName: 'Department',
            accessor: 'Department',
            className: 'min-w-150px dragEl',
            input: {
                inputSrc: props.departments,
                srcId: 'DepartmentId',
                srcName: 'DepartmentName'

            },
            draggable: true,
            hidden: false
        },
        {
            id: 5,
            headerName: 'Location',
            accessor: 'LocationId',
            className: 'min-w-150px dragEl',
            input: {
                inputSrc: props.locations,
                srcId: 'LocationId',
                srcName: 'Location'
            },
            draggable: true,
            hidden: false
        }
    ])

    const [listItemsHeaders, setListItemsHeaders] = useState([
        {
            id: 1,
            headerName: 'Inv Qty',
            accessor: 'Quantity',
            className: 'min-w-100px dragEl',
            isEdit: true,
            type: 'Number',
            draggable: true,
            hidden: false
        },
        {
            id: 2,
            headerName: 'PO Qty',
            accessor: 'POQuantity',
            className: 'min-w-100px dragEl',
            isEdit: true,
            type: 'Number',
            draggable: true,
            hidden: false
        },
        {
            id: 3,
            headerName: 'Item',
            accessor: 'POItem',
            className: 'min-w-150px dragEl',
            draggable: true,
            hidden: false
        },
        {
            id: 4,
            headerName: 'Vendor part#',
            accessor: 'PartNumber',
            className: 'min-w-150px dragEl',
            draggable: true,
            hidden: false
        },
        {
            id: 5,
            headerName: 'Description',
            accessor: 'Description',
            className: 'min-w-300px dragEl',
            isEdit: true,
            type: 'text',
            draggable: true,
            hidden: false
        },
        {
            id: 6,
            headerName: 'Department',
            accessor: 'Department',
            className: 'min-w-150px dragEl',
            input: {
                inputSrc: props.departments,
                srcId: 'DepartmentId',
                srcName: 'DepartmentName'
            },
            draggable: true,
            hidden: false
        },
        {
            id: 7,
            headerName: 'Location',
            accessor: 'LocationId',
            className: 'min-w-150px dragEl',
            input: {
                inputSrc: props.locations,
                srcId: 'LocationId',
                srcName: 'Location'
            },
            draggable: true,
            hidden: false
        },
        {
            id: 8,
            headerName: 'Inv Rate',
            accessor: 'UnitPrice',
            className: 'min-w-150px dragEl',
            isEdit: true,
            type: 'Number',
            draggable: true,
            hidden: false
        },
        {
            id: 9,
            headerName: 'PO Rate',
            accessor: 'POUnitPrice',
            className: 'min-w-150px dragEl',
            isEdit: true,
            type: 'Number',
            draggable: true,
            hidden: false
        },
        {
            id: 10,
            headerName: 'Inv Amount',
            accessor: 'Amount',
            cell: (data) => '$ ' + data?.Amount,
            className: 'min-w-150px dragEl',
            draggable: true,
            hidden: false,
            footer: (data: any[]) => {
                return `$ ${data.reduce((prev: number, current) => {
                    return prev + Number(current?.Amount)
                }, 0).toFixed(2)}`
            }
        },
        {
            id: 11,
            headerName: 'PO Amount',
            accessor: 'POAmount',
            cell: (data) => '$ ' + data?.POAmount,
            className: 'min-w-150px dragEl',
            draggable: true,
            hidden: false,
            footer: (data: any[]) => {
                return `$ ${data.reduce((prev: number, current) => {
                    return prev + Number(current?.POAmount)
                }, 0).toFixed(2)}`
            }
        }
    ])

    useEffect(() => {
        if (afterDragElement.length > 0) {
            const array: any[] = []
            afterDragElement.forEach((el) => {
                array.push(afterDragElement.length > 6 ? listItemsHeaders.find(arr => arr.headerName === el.header) : expensesHeaders.find(arr => arr.headerName === el.header))
            })
            if (array.length > 0) {
                array.shift()
                afterDragElement.length > 6 ? setListItemsHeaders(array) : setExpensesHeaders(array)
            }
        }
    }, [afterDragElement])

    useEffect(() => {
        setValid(validation)
    }, [formError])

    useEffect(() => {
        const obj = { ...invDetails }
        obj.Expenses = expenses
        setInvDetails(obj)
    }, [expenses])

    useEffect(() => {
        const obj = { ...invDetails }
        obj.LineItems = listItems
        setInvDetails(obj)
    }, [listItems])

    useEffect(() => {
        setExSubtotal(invDetails.Expenses?.reduce((prev, current) => prev + current.Amount, 0))
        setPOSubtotal(invDetails.LineItems?.reduce((prev, current) => prev + (current.POQuantity * current.POUnitPrice), 0))
    }, [expenses, listItems])

    useEffect(() => {
        setIsLoading(true)
        AxiosGet(`Invoice/Details/${props.invNumber}`)
            .then(res => {
                setInvDetails(res)
                setListItems(res.LineItems)
                setExpenses(res.Expenses)
                setIsLoading(false)
                setIsError(false)
                AxiosGet(`Invoice/InvoiceWorkflow/${props.invNumber}`)
                    .then(res => {
                        setWorkFlow(res)
                    })
                    .catch(err => console.error(err))
                AxiosGet(`Invoice/NextApprovers/${props.invNumber}`)
                    .then(ress => {
                        setNextApprover(ress)
                    })
                    .catch(err => console.error(err))
                AxiosGet(`Invoice/ApprovalFlow/${props.invNumber}`)
                    .then(res => {
                        setApprovalHistory(res)
                        console.log(res)
                    })
                    .catch(err => console.error(err))
            })
            .catch(err => {
                setIsLoading(false)
                setIsError(true)
                console.log(err)
            })
    }, [props.invNumber])

    const save = () => {
        if (invDetails.TotalAmount !== (invDetails.TaxTotal + exSubtotal + POSubtotal)) {
            return SweetAlert({
                title: 'Invoice Error',
                icon: 'info',
                text: 'Invoice Amount must be equal to the sum of Expenses Amount, PO Amount, Tax Amount'
            })
        }
        setProcess(true)
        axios.post(`https://invoiceprocessingapi.azurewebsites.net/api/v1/Invoice`, invDetails)
            .then(res => {
                console.log('Response:', res)
                setProcess(false)
                SweetAlert({
                    title: '<h1>Saved</h1>',
                    icon: 'success',
                    timer: 4000
                })
            })
            .catch(err => {
                console.log('Error:', err)
                setProcess(false)
                SweetAlert({
                    title: '<h1>Somthing wrong from the server</h1>',
                    icon: 'error',
                    timer: 4000
                })
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
                                    <button onClick={save} disabled={isValid} className="btn btn-active-light-primary btn-icon btn-sm m-1 btn-hover-scale" >
                                        {process ? <span className="spinner-border spinner-border-sm text-primary"></span> : <SaveSvg clsName="svg-icon svg-icon-primary svg-icon-1 px-5" />}
                                    </button>
                                </div>
                            </div>
                            <div className="card-body">
                                {isLoading ? <Loading /> : isError ? <Error /> : <InvoiceDetailsForm users={props.users} nextApprovers={nextApprovers} invNumber={props.invNumber} userid={props.userid} invDetails={invDetails} setInvDetails={setInvDetails} POSubtotal={POSubtotal} exSubtotal={exSubtotal} vendors={props.vendors}
                                    departments={props.departments} locations={props.locations} subsidiaries={props.subsidiary} formError={formError} setFormError={setFormError} setValid={setValid} refetch={props.refetch} approvalHistory={approvalHistory} />}
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
                                                <a className={`nav-link ${lineItemsToggle === 'Expense' ? 'active' : ''}`} role="button" onClick={() => setLineItemsToggle('Expense')} data-bs-toggle="tab"
                                                    href="#expensesTab">
                                                    <h4>Expenses</h4>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className={`nav-link ${lineItemsToggle === 'LineItems' ? 'active' : ''}`} role="button" onClick={() => setLineItemsToggle('LineItems')} data-bs-toggle="tab" href="#itemsTab">
                                                    <h4>Items</h4>
                                                </a>
                                            </li>
                                        </ul>
                                        <div className="tab-content h-95">
                                            {lineItemsToggle === 'Expense' ?
                                                isLoading ? <Loading /> : isError ? <Error /> : <LineItems headers={expensesHeaders} setColumns={setExpensesHeaders} datum={expenses} subtotal={exSubtotal} setDatum={setExpenses} isExpense={true} userId={props.userid} />
                                                :
                                                isLoading ? <Loading /> : isError ? <Error /> : <LineItems headers={listItemsHeaders} setColumns={setListItemsHeaders} datum={listItems} subtotal={POSubtotal} isExpense={false} setDatum={setListItems} userId={props.userid} />
                                            }
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
            <div className="modal fade" id="level">
                <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">

                        <div className="modal-body">
                            {
                                workFlow.Approval?.Level?.filter(arr => nextApprovers[(nextApprovers.findIndex(narr => narr.ApproverId === arr.Approver))]?.Status !== 4)?.map((approver, index) => (
                                    < LevelElement key={`${approver.Level}${index}`} workFlow={workFlow} setWorkFlow={setWorkFlow} type={workFlow.WorkFlowTypeId} filterApproval={workFlow.Approval?.Level?.filter(arr => nextApprovers[(nextApprovers.findIndex(narr => narr.ApproverId === arr.Approver))]?.Status !== 4)} index={index} users={props?.users} />

                                ))
                            }
                            <div className="d-flex justify-content-end">

                                <button className="mx-2 btn btn-light btn-sm" data-bs-dismiss="modal">Close</button>
                                <button className="mx-2 btn btn-light-primary btn-sm" disabled={error.length > 0 ? true : false} onClick={() => {
                                    let obj = { ...workFlow.Approval }
                                    let temp = obj.Level.filter(arr => nextApprovers[nextApprovers.findIndex(farr => farr.ApproverId === arr.Approver)]?.Status === 4)
                                    console.log('temp', temp)
                                    let final = temp.concat(workFlow.Approval?.Level?.filter(arr => nextApprovers[(nextApprovers.findIndex(narr => narr.ApproverId === arr.Approver))]?.Status !== 4))
                                    console.log('final', final)
                                    obj.Level = final
                                    setProcess(true)
                                    axios.post(`https://invoiceprocessingapi.azurewebsites.net/api/v1/Workflow/CustomFlow/${props.invNumber}/${props.userid}`, obj)
                                        .then(res => {
                                            console.log('data', res.data)
                                            setProcess(false)
                                            setTrigger(!trigger)
                                        })
                                        .catch(err => {
                                            console.error(err)
                                            setProcess(false)
                                            setTrigger(!trigger)
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







