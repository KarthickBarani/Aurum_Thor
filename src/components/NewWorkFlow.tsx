
import { vendors, departments, locations, userProfileType, FieldValue, account, WorkFlowTableType } from "./Interface"
import { DynamicField } from "./DynamicField"
import { LevelElement } from "./LevelElement"

export const NewWorkFlow = (props: {
    workFlow: WorkFlowTableType
    setWorkFlowFields: Function
    vendors: vendors
    Department: departments
    locations: locations
    account: account
    users: userProfileType[]
    formik: any
    levelElements: number[]
    type: number
    DyFields: FieldValue[]
    setDyFields: Function
    setLevelElements: Function
    setInitialValues: Function
}) => {



    return (
        <div className="container-fluid">
            {
                true ?
                    <>
                        <div className="row">
                            <div className="col-3 mt-2">
                                <label htmlFor="workflowName" className="form-label">Name</label>
                                <input name="workflowName" id="workflowName" type="text" value={props.formik.values.workflowName} onChange={props.formik.handleChange} onBlur={props.formik.handleBlur} className="form-control form-control-sm" />
                            </div>
                            {/* {console.log('check', props.workFlow.Approval.Fields)} */}
                            {props.workFlow.Approval.Fields?.map((filed, index) => {
                                return (
                                    <div key={index} className="col-3 mt-2">
                                        <label htmlFor={filed.Type} className="form-label">{filed.Type}</label>
                                        <select name={filed.Type} id={filed.Type} value={filed.Id} onChange={e => {
                                            let arr = [...props.workFlow.Approval.Fields]
                                            let type = props[filed.Type].find(arr => arr.DepartmentId === Number(e.target.value))
                                            arr[index].Id = type?.DepartmentId as number
                                            arr[index].FieldName = type?.DepartmentName as string
                                            props.setWorkFlowFields(arr)
                                        }} className="form-select form-select-sm">
                                            <option key={0} value={0} ></option>
                                            {console.log('dept', props.Department)}
                                            {
                                                props[filed.Type]?.map(dept => (
                                                    <option key={dept.DepartmentId} value={dept.DepartmentId} onClick={e => {

                                                    }} >{dept.DepartmentName}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                )
                            })}
                            {/* {
                                props.type === 2 ?
                                    <>
                                        <div className="col-3 mt-2">
                                            <label htmlFor="account" className="form-label">Account</label>
                                            <select name="account" id="account" value={props.formik.values.account} onChange={props.formik.handleChange} onBlur={props.formik.handleBlur} className="form-select form-select-sm">
                                                <option key={0} value={0} ></option>
                                                {
                                                    props.account?.map(acc => (
                                                        <option key={acc.AccountId} value={acc.AccountId} >{acc.AccountName}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="col-3 mt-2">
                                            <label htmlFor="department" className="form-label">Department</label>
                                            <select name="department" value={props.formik.values.department} onChange={props.formik.handleChange} onBlur={props.formik.handleBlur} id="department" className="form-select form-select-sm">
                                                <option key={0} value={0} ></option>
                                                {
                                                    props.departments?.map(dept => (
                                                        <option key={dept.DepartmentId} value={dept.DepartmentId} >{dept.DepartmentName}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="col-3 mt-2">
                                            <label htmlFor="location" className="form-label">Location</label>
                                            <select name="location" value={props.formik.values.location} onChange={props.formik.handleChange} onBlur={props.formik.handleBlur} id="location" className="form-select form-select-sm">
                                                <option key={0} value={0} ></option>
                                                {
                                                    props.locations?.map(location => (
                                                        <option key={location.LocationId} value={location.LocationId} >{location.Location}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </>
                                    :
                                    null
                            } */}
                            {props.DyFields.map((field, index) => (<DynamicField key={field.Id} index={index} field={field} DyFields={props.DyFields} setDyFields={props.setDyFields} />))}
                        </div>
                        <div className="separator border-1 border-gray my-5"></div>
                    </>
                    :
                    <>
                        <div className="row">
                            <div className="col-3">
                                <label htmlFor="workflowName" className="form-label">Name</label>
                                <input name="workflowName" id="workflowName" type="text" value={props.formik.values.workflowName} onChange={props.formik.handleChange} onBlur={props.formik.handleBlur} className="form-control form-control-sm" />
                            </div>
                            <div className="separator border-1 border-gray my-5"></div>
                        </div>
                    </>
            }
            <div className="row justify-content-end my-2">

                {
                    props.levelElements.map((elements, index) => (
                        <LevelElement type={props.type} key={elements} index={index} levelElements={props.levelElements} setLevelElements={props.setLevelElements} setInitialValues={props.setInitialValues} formik={props.formik} users={props?.users} />
                    )
                    )
                }
            </div>
        </div>
    )
}
