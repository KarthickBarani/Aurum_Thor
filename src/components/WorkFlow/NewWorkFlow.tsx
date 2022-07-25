
import { vendors, departments, locations, userProfileType, account, WorkFlowTableType, WorkFlowLevel } from "../Interface/Interface"
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

                {props.workFlow.WorkFlowTypeId === 2 ?
                    <>
                        <div className="col-3 mt-2">
                            <label htmlFor={'Account'} className="form-label">Account</label>
                            <select name={'Account'} id={'Account'} value={props.workFlow.Approval.Fields.find(arr => arr.Type === 'Account')?.Id} onChange={e => {
                                let obj = { ...props.workFlow }
                                let currentIndex = props.workFlow.Approval.Fields.findIndex(arr => arr.Type === 'Account') === -1 ? 0 : props.workFlow.Approval.Fields.findIndex(arr => arr.Type === 'Account')
                                let currentList = props.Account.find(arr => arr.AccountId === Number(e.target.value))
                                if (obj.Approval.Fields.length === 0) {
                                    let temp = {
                                        Id: currentList?.AccountId as number,
                                        FieldName: currentList?.AccountName as string,
                                        Type: e.target.name,
                                    }
                                    obj.Approval.Fields.push(temp)
                                    props.setWorkFlow(obj)
                                } else {
                                    obj.Approval.Fields[currentIndex].Id = currentList?.AccountId as number
                                    obj.Approval.Fields[currentIndex].FieldName = currentList?.AccountName as string
                                    obj.Approval.Fields[currentIndex].Type = e.target.name
                                    props.setWorkFlow(obj)
                                }
                            }} className="form-select form-select-sm">
                                <option key={0} value={0} ></option>
                                {
                                    props.Account?.map(acc => {
                                        return (
                                            <option key={acc.AccountId} value={acc.AccountId}>{acc.AccountName}</option>)
                                    }
                                    )
                                }
                            </select>
                        </div>
                        <div className="col-3 mt-2">
                            <label htmlFor={'Department'} className="form-label">Department</label>
                            <select name={'Department'} id={'Department'} value={props.workFlow.Approval.Fields.find(arr => arr.Type === 'Department')?.Id} onChange={e => {
                                let obj = { ...props.workFlow }
                                let currentIndex = props.workFlow.Approval.Fields.findIndex(arr => arr.Type === 'Department') === -1 ? 0 : props.workFlow.Approval.Fields.findIndex(arr => arr.Type === 'Department')
                                console.log(currentIndex)
                                let currentList = props.Department.find(arr => arr.DepartmentId === Number(e.target.value))
                                if (obj.Approval.Fields.length === 0) {
                                    let temp = {
                                        Id: currentList?.DepartmentId as number,
                                        FieldName: currentList?.DepartmentName as string,
                                        Type: e.target.name,
                                    }
                                    obj.Approval.Fields.push(temp)
                                    props.setWorkFlow(obj)
                                } else {
                                    obj.Approval.Fields[currentIndex].Id = currentList?.DepartmentId as number
                                    obj.Approval.Fields[currentIndex].FieldName = currentList?.DepartmentName as string
                                    obj.Approval.Fields[currentIndex].Type = e.target.name
                                    props.setWorkFlow(obj)
                                }
                            }} className="form-select form-select-sm">
                                <option key={0} value={0} ></option>
                                {
                                    props.Department?.map(dept => {
                                        return (
                                            <option key={dept.DepartmentId} value={dept.DepartmentId}>{dept.DepartmentName}</option>)
                                    }
                                    )
                                }
                            </select>
                        </div>
                        <div className="col-3 mt-2">
                            <label htmlFor={'locations'} className="form-label">locations</label>
                            <select name={'locations'} id={'locations'} value={props.workFlow.Approval.Fields.find(arr => arr.Type === 'locations')?.Id} onChange={e => {
                                let obj = { ...props.workFlow }
                                let currentIndex = props.workFlow.Approval.Fields.findIndex(arr => arr.Type === 'locations') === -1 ? 0 : props.workFlow.Approval.Fields.findIndex(arr => arr.Type === 'locations')
                                let currentList = props.locations.find(arr => arr.LocationId === Number(e.target.value))
                                if (obj.Approval.Fields.length === 0) {
                                    let temp = {
                                        Id: currentList?.LocationId as number,
                                        FieldName: currentList?.Location as string,
                                        Type: e.target.name,
                                    }
                                    obj.Approval.Fields.push(temp)
                                    props.setWorkFlow(obj)
                                } else {
                                    obj.Approval.Fields[currentIndex].Id = currentList?.LocationId as number
                                    obj.Approval.Fields[currentIndex].FieldName = currentList?.Location as string
                                    obj.Approval.Fields[currentIndex].Type = e.target.name
                                    props.setWorkFlow(obj)
                                }
                            }} className="form-select form-select-sm">
                                <option key={0} value={0} ></option>
                                {
                                    props.locations?.map(location => {
                                        return (
                                            <option key={location.LocationId} value={location.LocationId}>{location.Location}</option>)
                                    }
                                    )
                                }
                            </select>
                        </div>
                    </> : null}
                {/* {props.workFlow.Approval?.Fields?.map((filed, index) => {
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
                })} */}
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
