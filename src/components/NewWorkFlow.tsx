
import { vendors, departments, locations, userProfileType, account, WorkFlowTableType, WorkFlowLevel } from "./Interface"
import { LevelElement } from "./LevelElement"


export const NewWorkFlow = (props: {
    workFlow: WorkFlowTableType
    setWorkFlow: Function
    vendors: vendors
    Department: departments
    locations: locations
    Account: account
    users: userProfileType[]
    type: number
}) => {


    const changeHandler = (e) => {
        let obj = { ...props.workFlow }
        obj.Name = e.target.value
        props.setWorkFlow(obj)
    }
    const filterApproval: WorkFlowLevel = props.workFlow.Approval.Level
    return (
        <div className="container-fluid">

            <div className="row">
                <div className="col-3 mt-2">
                    <label htmlFor="workflowName" className="form-label">Name</label>
                    <input name="workflowName" id="workflowName" type="text" value={props.workFlow.Name} onChange={changeHandler} className="form-control form-control-sm" />
                </div>
                {props.workFlow.Approval?.Fields?.map((filed, index) => {
                    let currentFiled
                    if (filed.Type === 'Department') {
                        currentFiled = {
                            id: Object.keys(props[filed.Type][0]).find(arr => arr === 'DepartmentId'),
                            name: Object.keys(props[filed.Type][0]).find(arr => arr === 'DepartmentName')
                        }
                    }
                    if (filed.Type === 'Account') {
                        currentFiled = {
                            id: Object.keys(props[filed.Type][0]).find(arr => arr === 'AccountId'),
                            name: Object.keys(props[filed.Type][0]).find(arr => arr === 'AccountName'),
                        }
                    }

                    return (
                        <div key={index} className="col-3 mt-2">
                            <label htmlFor={filed.Type} className="form-label">{filed.Type}</label>
                            <select name={filed.Type} id={filed.Type} value={filed.Id} onChange={e => {
                                let obj = { ...props.workFlow }
                                let type = props[filed.Type].find(arr => arr[currentFiled.id] === Number(e.target.value))
                                obj.Approval.Fields[index].Id = type[currentFiled.id] as number
                                obj.Approval.Fields[index].FieldName = type[currentFiled.name] as string
                                console.log('now', obj.Approval.Fields)
                                props.setWorkFlow(obj)
                            }} className="form-select form-select-sm">
                                <option key={0} value={0} ></option>
                                {
                                    props[filed.Type]?.map(dept => {
                                        return (
                                            <option key={dept[currentFiled.id]} value={dept[currentFiled.id]}>{dept[currentFiled.name]}</option>)
                                    }
                                    )
                                }
                            </select>
                        </div>
                    )
                })}
                {/* {props.DyFields.map((field, index) => (<DynamicField key={field.Id} index={index} field={field} DyFields={props.DyFields} setDyFields={props.setDyFields} />))} */}
            </div>
            <div className="separator border-1 border-gray my-5"></div>
            <div className="row justify-content-end my-2">

                {
                    props.workFlow.Approval?.Level.map((level, index) => (
                        <LevelElement key={`${level.Level}${index}`} workFlow={props.workFlow} setWorkFlow={props.setWorkFlow} filterApproval={filterApproval} type={props.type} index={index} users={props?.users} />
                    )
                    )
                }
            </div>
        </div>
    )
}
