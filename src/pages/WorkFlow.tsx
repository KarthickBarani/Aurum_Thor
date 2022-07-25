import { vendors, departments, locations, WorkFlowTableType, userProfileType, WorkFlowType, Fields, account } from "../components/Interface/Interface"
import { useEffect, useState } from "react"
import { NewWorkFlow } from "../components/WorkFlow/NewWorkFlow"
import { WorkFlowTable } from "../components/WorkFlow/WorkFlowTable"
import axios from "axios"
import { v4 as uuidv4 } from 'uuid'
import { useQuery } from "react-query"
import { Error } from "../components/components/Error"
import { Loading } from "../components/components/Loading"
import { SweetAlert } from "../Function/alert"
import { AddSvg, SaveSvg } from "../components/Svg/Svg"





export const WorkFlow = (
    props: {
        vendors: vendors
        departments: departments
        locations: locations
        account: account
    }
) => {

    const [users, setUsers] = useState<userProfileType[]>([] as userProfileType[])
    const [workFLowType, setWorkFlowType] = useState<WorkFlowType>([] as WorkFlowType)

    const [toggleWorkflow, setToggleWorkflow] = useState<boolean>(false)
    const [workFlows, setWorkFlows] = useState<WorkFlowTableType[]>([] as WorkFlowTableType[])
    const [workFlow, setWorkFlow] = useState<WorkFlowTableType>({} as WorkFlowTableType)
    const [fields, setFields] = useState<Fields>([] as Fields)


    const [type, setType] = useState<number>(0)
    const [IsLoading, setIsLoading] = useState<boolean>(false)
    const [isNew, setIsNew] = useState<boolean>(true)




    const fetchWorkflows = () => {
        return axios.get('https://invoiceprocessingapi.azurewebsites.net/api/v1/Workflow')
    }

    const { isLoading, data, isError, refetch } = useQuery('invDetails', fetchWorkflows)

    useEffect(() => {
        axios.get('https://invoiceprocessingapi.azurewebsites.net/api/v1/UserProfile')
            .then(res => setUsers(res.data))
            .catch(err => console.log(err))
        axios.get('https://invoiceprocessingapi.azurewebsites.net/api/v1/Workflow/Type')
            .then(res => {
                setWorkFlowType(res.data)
            })
            .catch(err => console.log(err))
        axios.get('https://invoiceprocessingapi.azurewebsites.net/api/v1/Settings')
            .then(res => {
                setFields(res.data)
            })
            .catch(err => console.log(err))

        setWorkFlows(data?.data)

    }, [data?.data])

    const save = () => {
        setIsLoading(true)
        console.log('save:', workFlow)
        // setIsLoading(false)
        axios[isNew ? 'post' : 'patch'](`https://invoiceprocessingapi.azurewebsites.net/api/v1/Workflow`, workFlow)
            .then(res => {
                console.log('Response:', res)
                setIsLoading(false)
                SweetAlert({
                    title: isNew ? '<h1>Saved</h1>' : '<h1>Updated</h1>',
                    icon: 'success',
                    timer: 4000
                })
                back()
            })
            .catch(err => {
                console.log('Error:', err)
                SweetAlert({
                    title: 'Error',
                    icon: 'error',
                    timer: 1000,
                })
                setIsLoading(false)
                back()
            })
    }

    const back = () => {
        setToggleWorkflow(false)
        setIsNew(true)
        refetch()
    }

    const addWorkFlow = () => {
        setIsNew(true)
        setToggleWorkflow(true)
        setWorkFlow({
            WorkFlowId: uuidv4(),
            EnterpriseId: '',
            CompanyId: '',
            Name: '',
            WorkFlowTypeId: workFLowType[type].WorkflowTypeId,
            Approval: {
                Fields: [],
                Level: [
                    {
                        Level: 1,
                        Approver: 0,
                        Amount: 0,
                        Percentage: 0
                    }
                ]
            },
            CreatedBy: '',
            CreatedTimestamp: new Date(),
            LastModifiedTimestamp: new Date()
        })
    }

    // const addFields = arr => {
    //     const filedObj = {
    //         id: arr.
    //     }
    // }


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
                                    Workflow{` - ${workFLowType[type]?.Name}`}
                                </h4>
                                <div className="card-toolbar">
                                    {
                                        toggleWorkflow
                                            ?

                                            <>
                                                <div className="dropdown">
                                                    <button className="btn btn-active-light-primary btn-sm mx-2 btn-hover-scale dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                                        Add Field &nbsp;
                                                    </button>
                                                    <ul className="dropdown-menu">
                                                        {fields.find(arr => arr.Type === workFLowType[type].Name)?.Value.map(value => (
                                                            <li key={value.Id} role={'button'} className="dropdown-item" onClick={() => {
                                                                const fieldObj = {
                                                                    Id: value.Id,
                                                                    FieldName: value.Label[0],
                                                                    Type: value.Type
                                                                }
                                                                const obj = { ...workFlow }
                                                                obj.Approval.Fields.push(fieldObj)
                                                                setWorkFlow(obj)
                                                            }} > {value.Field}</li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <button onClick={back} className="btn btn-active-light-danger btn-sm m-1 btn-hover-scale">
                                                    <span className="svg-icon svg-icon-danger svg-icon-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                        <path opacity="0.5" d="M14.2657 11.4343L18.45 7.25C18.8642 6.83579 18.8642 6.16421 18.45 5.75C18.0358 5.33579 17.3642 5.33579 16.95 5.75L11.4071 11.2929C11.0166 11.6834 11.0166 12.3166 11.4071 12.7071L16.95 18.25C17.3642 18.6642 18.0358 18.6642 18.45 18.25C18.8642 17.8358 18.8642 17.1642 18.45 16.75L14.2657 12.5657C13.9533 12.2533 13.9533 11.7467 14.2657 11.4343Z" fill="black" />
                                                        <path d="M8.2657 11.4343L12.45 7.25C12.8642 6.83579 12.8642 6.16421 12.45 5.75C12.0358 5.33579 11.3642 5.33579 10.95 5.75L5.40712 11.2929C5.01659 11.6834 5.01659 12.3166 5.40712 12.7071L10.95 18.25C11.3642 18.6642 12.0358 18.6642 12.45 18.25C12.8642 17.8358 12.8642 17.1642 12.45 16.75L8.2657 12.5657C7.95328 12.2533 7.95328 11.7467 8.2657 11.4343Z" fill="black" />
                                                    </svg>
                                                    </span>Back
                                                </button>


                                                <button onClick={save} title='Save' className="btn btn-active-light-primary btn-sm mx-2 btn-hover-scale" >
                                                    {IsLoading ?
                                                        <>
                                                            <span className="spinner-border spinner-border-sm text-primary"></span>
                                                            &nbsp; Please Wait
                                                        </>
                                                        :
                                                        <>
                                                            <SaveSvg clsName="svg-icon svg-icon-primary svg-icon-1" />
                                                            &nbsp; {isNew ? 'Save' : 'Update'}
                                                        </>
                                                    }
                                                </button>
                                            </>
                                            :
                                            workFLowType[type]?.WorkflowTypeId === 1
                                                ?
                                                null
                                                :
                                                <button onClick={addWorkFlow} title='Add Workflow' className="btn btn-active-light-primary btn-icon btn-sm m-1 btn-hover-rise">
                                                    <AddSvg clsName='svg-icon svg-icon-primary svg-icon-3' />
                                                </button>

                                    }

                                </div>
                            </div>
                            <div className="card-body card-scroll" style={{ 'height': '65vh' }} >
                                {toggleWorkflow ?
                                    <>

                                        <NewWorkFlow workFlow={workFlow} setWorkFlow={setWorkFlow} vendors={props.vendors} Department={props.departments} locations={props.locations} Account={props.account} users={users} type={workFLowType[type].WorkflowTypeId} />
                                    </>
                                    :
                                    isLoading
                                        ?
                                        <Loading />
                                        :
                                        isError ?
                                            <Error />
                                            :
                                            <>
                                                <ul className="nav nav-tabs nav-line-tabs mb-5 fs-6">
                                                    {workFLowType.map((types, index) => (
                                                        <li key={index} className="nav-item">
                                                            <a className={`nav-link ${index === type ? 'active' : ''} fw-bolder text-gray-800`} onClick={() => setType(index)} data-bs-toggle="tab" href={`#tab-${index}`}>{types.Name}</a>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <div className="tab-content" id="myTabContent">
                                                    {workFLowType.map((types, index) => (
                                                        <div key={index} className="tab-pane fade show active" id={`tab-${index}`} role="tabpanel">
                                                            {workFLowType[type].WorkflowTypeId === workFLowType[index].WorkflowTypeId ? <WorkFlowTable isNew={isNew} setIsNew={setIsNew} workFlows={workFlows} setWorkFlow={setWorkFlow} setToggleWorkflow={setToggleWorkflow} type={types.WorkflowTypeId} /> : null}
                                                        </div>)
                                                    )}
                                                </div>
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