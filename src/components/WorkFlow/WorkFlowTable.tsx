
import axios from "axios"
import { WorkFlowTableType } from "../Interface/Interface"
import { EditSvg, RemoveSvg } from "../Svg/Svg"

export const WorkFlowTable = (props: {
    workFlows: WorkFlowTableType[]
    setWorkFlow: Function
    isNew: boolean
    setToggleWorkflow: Function
    type: number
    setIsNew: Function
}) => {

    const updateHandler = (index) => {
        let workFlowId = (props.workFlows?.filter(arr => arr.WorkFlowTypeId === props.type)[index]?.WorkFlowId)
        axios.get<WorkFlowTableType>(`${process.env.REACT_APP_BACKEND_BASEURL}/Workflow/${workFlowId}`)
            .then(res => {
                props.setWorkFlow(res.data)
                props.setIsNew(false)
                props.setToggleWorkflow(true)
            }).catch(err => console.log(err))
    }


    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover gy-3 gs-7 p-2 table-rounded">
                <thead>
                    <tr className="fw-bolder fs-6 text-gray-800 border-bottom-2 border-gray-200">
                        <th>Action</th>
                        <th>Workflow Name</th>
                        <th>Number of Levels</th>
                        <th>Created By</th>
                        <th>Last Modified Date Time</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.workFlows?.filter(arr => arr.WorkFlowTypeId === props.type)?.map((workFlow, index) => (
                            <tr key={workFlow.WorkFlowId} >
                                <td>
                                    <EditSvg role={'button'} clsName="svg-icon svg-icon-warning svg-icon-2" function={() => updateHandler(index)} />
                                    &nbsp;&nbsp;
                                    <RemoveSvg clsName="svg-icon svg-icon-danger svg-icon-2" />
                                </td>
                                <td>{workFlow.Name}</td>
                                <td>{workFlow.Approval?.Level.length}</td>
                                <td>{workFlow.CreatedBy}</td>
                                <td>{workFlow.CreatedTimestamp}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}