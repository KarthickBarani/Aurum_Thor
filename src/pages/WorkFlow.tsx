import { vendors, departments, locations, WorkFlowTableType, userProfileType } from "../components/Interface"
import { useEffect, useState } from "react"
import { NewWorkFlow } from "../components/NewWorkFlow"
import { WorkFlowTable } from "../components/WorkFlowTable"
import axios from "axios"
import { useFormik } from "formik"



export const WorkFlow = () => {


    const [vendors, setVendor] = useState<vendors>([] as vendors)
    const [departments, setDepartments] = useState<departments>([] as departments)
    const [locations, setLocation] = useState<locations>([] as locations)
    const [users, setUsers] = useState<userProfileType>([] as userProfileType)


    useEffect(() => {
        axios.get('https://invoiceprocessingapi.azurewebsites.net/api/v1/Vendor').then(res => {
            setVendor(res.data)
        }).catch(err => console.log(err))
        axios.get('https://invoiceprocessingapi.azurewebsites.net/api/v1/Vendor/Departments').then(res => {
            setDepartments(res.data)
        }).catch(err => console.log(err))
        axios.get('https://invoiceprocessingapi.azurewebsites.net/api/v1/Vendor/Locations').then(res => {
            setLocation(res.data)
        }).catch(err => console.log(err))
        axios.get('https://invoiceprocessingapi.azurewebsites.net/api/v1/UserProfile').then(res => {
            setUsers(res.data)
        }).catch(err => console.log(err))
    }, [])

    const [toggleWorkflow, setToggleWorkflow] = useState<boolean>(false)
    const [workFLowType, setWorkFlowType] = useState<' - Expenses' | ' - Purchase Order'>(' - Purchase Order')
    const [workFlows, setWorkFlows] = useState<WorkFlowTableType>([] as WorkFlowTableType)


    const initialValues = {
        account: 0,
        department: 0,
        location: 0,
        approver: [],
        amount: [],
        percentage: [],
    }

    const onSubmit = values => {
        console.log(values)
    }

    const formik = useFormik({
        initialValues,
        onSubmit
    })


    const save = () => {
        console.log('values', formik.values)
        setToggleWorkflow(false)
    }

    const addWorkFlow = () => {
        setToggleWorkflow(true)
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row my-10">
                    <div className="col">
                        <h4 className="text-white">Workflow</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card card-flush shadow-sm mb-5">
                            <div className="card-header">
                                <h4 className="card-title">
                                    Workflow{workFLowType}
                                </h4>
                                <div className="card-toolbar">
                                    {
                                        toggleWorkflow ?
                                            <>
                                                <button onClick={save} className="btn btn-sm btn-light-primary mx-2">Save</button>
                                                <button onClick={() => setToggleWorkflow(false)} className="btn btn-sm btn-light">Cancel</button>
                                            </>
                                            :
                                            <button onClick={addWorkFlow} className="btn btn-sm btn-light-primary">
                                                <span className="svg-icon svg-icon-2 svg-icon-primary"><svg
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
                                                Add Workflow</button>
                                    }

                                </div>
                            </div>
                            <div className="card-body card-scroll" style={{ 'height': '65vh' }} >
                                {toggleWorkflow ?
                                    <>
                                        <NewWorkFlow vendors={vendors} departments={departments} locations={locations} users={users} setWorkFlows={setWorkFlows} formik={formik} />
                                    </>
                                    :
                                    <>
                                        <ul className="nav nav-tabs nav-line-tabs mb-5 fs-6">
                                            <li className="nav-item">
                                                <a className="nav-link active fw-bolder text-gray-800" onClick={() => setWorkFlowType(' - Purchase Order')} data-bs-toggle="tab" href="#kt_tab_pane_7">Purchase Order</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link fw-bolder text-gray-800" onClick={() => setWorkFlowType(' - Expenses')} data-bs-toggle="tab" href="#kt_tab_pane_8">Expenses</a>
                                            </li>
                                        </ul>
                                        <WorkFlowTable workFlows={workFlows} />
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}