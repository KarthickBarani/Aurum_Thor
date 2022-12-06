import { InputSelectField } from "../components/InputField"


const changeHandler = () => {

}
const blurHandler = () => {

}
const Operations = ['Dashboard', 'Approval', 'User Management', 'Workflow', 'Vendor', 'Setting']

const PermissionElement = ({ permissionName, index }) => (
    <>
        <div className="d-flex justify-content-between p-3">
            <span className="text-gray-800" >{permissionName}</span>
            <PermissionInputControl />
        </div>
        {
            index !== Operations?.length - 1
                ?
                <div className="separator border-2 separator-dashed"></div>
                :
                null
        }
    </>
)
const PermissionInputControl = () => {
    return (
        <span className="d-flex align-items-center gap-1" >
            <label className="form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20">
                <input type="checkbox" className="form-check-input" name="" id="" />
                <label className="form-check-label" >Create</label>
            </label>
            <label className="form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20">
                <input type="checkbox" className="form-check-input" name="" id="" />
                <span className="form-check-label" >Read</span>
            </label>
            <label className="form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20">
                <input type="checkbox" className="form-check-input" name="" id="" />
                <span className="form-check-label" >Write</span>
            </label>
            <label className="form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20">
                <input type="checkbox" className="form-check-input" name="" id="" />
                <span className="form-check-label" >Delete</span>
            </label>
        </span >
    )
}


export const PermissionForm = () => {
    return (
        <>
            <div className="container gap-2">
                <div className="row">
                    <div className="col-6">
                        <InputSelectField
                            label={'Name of Role'}
                            id={'Name'}
                            name={'Name'}
                            className={'form-select form-select-solid form-select-sm'}
                            value={0}
                            onChange={changeHandler}
                            onBlur={blurHandler}
                            placeHolder={'Role Name'}
                            option={[]}
                        />
                    </div>
                </div>
                <div className="row mt-10">
                    <div className="col">
                        <label className="form-label fw-bolder fs-6 gray-700">Role Permission</label>
                        <div className="border p-2 rounded">
                            {
                                Operations?.map((el, index) => (<PermissionElement permissionName={el} index={index} />))
                            }
                        </div>
                        <div className="d-flex justify-content-end mt-10">
                            <div className="btn btn-sm btn-primary">Save</div>
                        </div>
                        {/* <div className="d-flex justify-content-start p-3 gap-5">
                            <span className="text-gray-800" >User Management</span>
                            <span className="d-flex align-items-center gap-2">
                                <label className="form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <span className="form-check-label" >Read</span>
                                </label>
                                <label className="form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <span className="form-check-label" >Write</span>
                                </label>
                                <label className="form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20">
                                    <input type="checkbox" className="form-check-input" name="" id="" />
                                    <span className="form-check-label" >Create</span>
                                </label>
                            </span>
                        </div>
                        <div className="separator border-3 separator-dashed"></div> */}
                    </div>
                </div>
            </div>
        </>
    )
}