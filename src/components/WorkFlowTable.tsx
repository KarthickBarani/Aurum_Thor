
import axios from "axios"
import { v4 as uuidv4 } from 'uuid'
import { WorkFlowTableType } from "./Interface"
import { EditSvg } from "../Svg/EditSvg"
import { RemoveSvg } from "../Svg/RomoveSvg"

export const WorkFlowTable = (props: {
    workFlows: WorkFlowTableType[]
    isNew: boolean
    setInitialValues: Function
    setToggleWorkflow: Function
    setLevelElements: Function
    type: number
    setIsNew: Function
}) => {

    const updateHandler = (index) => {
        console.log(props.workFlows?.filter(arr => arr.WorkFlowTypeId === props.type)[index]?.WorkFlowId)
        axios.get(`https://invoiceprocessingapi.azurewebsites.net/api/v1/Workflow/${props.workFlows?.filter(arr => arr.WorkFlowTypeId === props.type)[index]?.WorkFlowId}`)
            .then(res => {
                let arr: any = []
                for (let i = 0; i < res.data?.Approval[0].Level.length; i++) {
                    arr[i] = uuidv4()
                }
                props.setLevelElements(arr)
                props.setIsNew(false)
                props.setInitialValues({
                    WorkFlowId: res.data?.WorkFlowId,
                    workflowName: res.data?.Name,
                    account: 0,
                    department: 0,
                    location: 0,

                    approver: res.data?.Approval[0]?.Level?.map(arr => arr.Approver),
                    amount: res.data?.Approval[0]?.Level?.map(arr => arr.Amount),
                    percentage: res.data?.Approval[0]?.Level?.map(arr => arr.Percentage)
                })
                props.setToggleWorkflow(true)
            }).catch(err => console.log(err))
    }


    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover gy-3 gs-7 p-2 table-rounded">
                <thead>
                    <tr className="fw-bolder fs-6 text-gray-800 border-bottom-2 border-gray-200">
                        <th>SL.No</th>
                        <th>Workflow Name</th>
                        <th>Number of Levels</th>
                        <th>Created By</th>
                        <th>Last Modified Date Time</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.workFlows?.filter(arr => arr.WorkFlowTypeId === props.type)?.map((workFlow, index) => (
                            <tr key={workFlow.WorkFlowId} >
                                <td>{index + 1}</td>
                                <td>{workFlow.Name}</td>
                                <td>{workFlow.Approval[0].Level.length}</td>
                                <td>{workFlow.CreatedBy}</td>
                                <td>{workFlow.CreatedTimestamp}</td>
                                <td>
                                    <EditSvg clsName="svg-icon svg-icon-warning svg-icon-2" function={() => updateHandler(index)} />
                                    &nbsp;&nbsp;
                                    <RemoveSvg />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}