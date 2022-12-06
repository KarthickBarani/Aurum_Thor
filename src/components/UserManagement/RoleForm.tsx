import React, { useEffect, useState } from "react"
import { Accordion } from "react-bootstrap"
import { axiosGet } from "../../helpers/Axios"
import { InputTextField } from "../components/InputField"
import { columnProps, TestGrid } from "../components/TableComponent"
import { AddSvg } from "../Svg/Svg"


export type RoleDataType = {
    RoleId: Number,
    Name: String,
    Description: String,
    IsActive: Boolean,
    Operations: [
        Operation: {
            operationId: Number,
            OperationName: String,
        },
        Permission: {
            Read: Boolean,
            Write: Boolean,
            Create: Boolean,

        }
    ]
}


export const RoleForm = ({ RoleData, setModalIsOpen }) => {


    const [roleData, setRoleData] = useState<any>({})
    const [permissions, setPermissions] = useState<any[]>([])
    const [currentFieldCollapse, setCurrentFieldCollapse] = useState<string>('')

    useEffect(() => {
        setRoleData(RoleData)
    }, [RoleData])


    useEffect(() => {
        axiosGet('/Role/Permission')
            .then(res => {
                setPermissions(res.data)
            }
            )
            .catch(err => {
                console.log(err)
            })
    }, [])


    const formInput = 'form-control form-control-solid form-control-sm'

    const changeHandler = (e) => {
        const name = e.target.name
        const id = e.target.id
        const type = e.target.type
        const checked = e.target.checked
        const value = e.target.value
        const array = [...permissions]
        const dataSet = e.target.dataset
        if (type === 'checkbox') {
            if (dataSet.type) {
                if (dataSet.subaccessor === 'Value') {
                    array[dataSet.id][dataSet.type][dataSet.sectionid][dataSet.accessor][dataSet.subaccessor][dataSet.valueid][name][id] = checked
                    console.log(array[dataSet.id][dataSet.type][dataSet.sectionid][dataSet.accessor][dataSet.subaccessor][dataSet.valueid][name], dataSet.valueid)
                } else {
                    array[dataSet.id][dataSet.type][dataSet.sectionid][dataSet.accessor][name][id] = checked
                    console.log(array[dataSet.id][dataSet.type][dataSet.sectionid][dataSet.accessor][name], dataSet.sectionid)
                }
            } else {
                console.log(e.target.dataset.type)
                array[id][name] = checked
            }
        }
        else {
            const obj = { ...roleData }
            obj[name] = value
            setRoleData(obj)
        }
        setPermissions(array)
    }
    const blurHandler = () => {

    }
    // ['Dashboard', 'Approval', 'User Management', 'Workflow', 'Vendor', 'Setting']


    const SectionCollapse = ({ Sections, IsCollapse, index }: { Sections: any[], IsCollapse: boolean, index: number }) => (
        <>

            {
                Sections.length > 0
                    ?
                    Sections.map((Section, SectionIndex) => (
                        <Accordion.Item eventKey={SectionIndex.toString()} bsPrefix="accordion-item">
                            <Accordion.Header bsPrefix="accordion-header">
                                <div className="d-flex align-items-center justify-content-between">
                                    <span className="text-gray-800 fs-6 fw-bold" >{Section.Field.Type}</span>
                                    <PermissionInputControl Operation={Section.Field.Operation} SectionIndex={SectionIndex} Index={index} />
                                </div>
                            </Accordion.Header>
                            <Accordion.Body bsPrefix="accordion-body">
                                <FieldCollapse Field={Section.Field} SectionIndex={SectionIndex} Index={index} />
                            </Accordion.Body>
                        </Accordion.Item>
                        // <div key={Section.FieldId} className='border rounded m-1'>
                        //     <div className="d-flex justify-content-between align-items-center p-3">
                        //         <span className="text-gray-800 fs-6 fw-bold" >{Section.Field.Type}</span>
                        //         <div className="d-flex align-items-center">
                        //             <PermissionInputControl Operation={Section.Field.Operation} SectionIndex={SectionIndex} Index={index} />
                        //             <span role={'button'} className="accordion-button bg-transparent collapsed" data-bs-toggle='collapse' data-bs-target={`#${Section.Field.Type}${SectionIndex}`} onClick={() => setCurrentFieldCollapse(`${Section.Field.Type}${SectionIndex}`)}></span>
                        //         </div>
                        //     </div>
                        //     <FieldCollapse Field={Section.Field} SectionIndex={SectionIndex} Index={index} />
                        // </div>
                    ))
                    :
                    null
            }
        </>
    )

    const FieldCollapse = ({ Field, SectionIndex, Index }) => (
        <div className="container">
            <div className="row p-3 bg-light border fs-6 fw-bolder">
                <div className="col-4">Field Name</div>
                <div className="col-2 ">Create</div>
                <div className="col-2 ">Read</div>
                <div className="col-2 ">Write</div>
                <div className="col-2 ">Delete</div>
            </div>
            {
                Field.Value.map(
                    (value, valueIndex) => (
                        <div className="row p-3 px-2 bg-hover-light fs-7 fw-bold">
                            <div className="col-4">{value.Field}</div>
                            <div className="col-2">
                                <span role={'none'} className="form-check form-check-sm form-check-custom form-check-solid ">
                                    <input type="checkbox" checked={value.Operation.Create} onChange={changeHandler} className="form-check-input" data-type={'Sections'} data-id={Index} data-sectionid={SectionIndex} data-accessor={'Field'} data-subaccessor={'Value'} data-valueid={valueIndex} name={'Operation'} id={"Create"} />
                                </span>
                            </div>
                            <div className="col-2">
                                <span role={'none'} className="form-check form-check-sm form-check-custom form-check-solid ">
                                    <input type="checkbox" checked={value.Operation.Read} onChange={changeHandler} className="form-check-input" data-type={'Sections'} data-id={Index} data-sectionid={SectionIndex} data-accessor={'Field'} data-subaccessor={'Value'} data-valueid={valueIndex} name={'Operation'} id={"Read"} />
                                </span>
                            </div>
                            <div className="col-2">
                                <span role={'none'} className="form-check form-check-sm form-check-custom form-check-solid ">
                                    <input type="checkbox" checked={value.Operation.Write} onChange={changeHandler} className="form-check-input" data-type={'Sections'} data-id={Index} data-sectionid={SectionIndex} data-accessor={'Field'} data-subaccessor={'Value'} data-valueid={valueIndex} name={'Operation'} id={"Write"} />
                                </span>
                            </div>
                            <div className="col-2">
                                <span role={'none'} className="form-check form-check-sm form-check-custom form-check-solid ">
                                    <input type="checkbox" checked={value.Operation.Delete} onChange={changeHandler} className="form-check-input" data-type={'Sections'} data-id={Index} data-sectionid={SectionIndex} data-accessor={'Field'} data-subaccessor={'Value'} data-valueid={valueIndex} name={'Operation'} id={"Delete"} />
                                </span>
                            </div>
                        </div>
                    )
                )
            }
        </div>
    )

    const PermissionElement = ({ permission, index }) => (
        <>
            <div className="d-flex justify-content-between align-items-center p-1">
                <span className="text-gray-700 fs-5 fw-bold" >{permission.Name}</span>
                <div className="d-flex">
                    <span className="d-flex gap-1">
                        <label className="form-check form-check-sm form-check-custom form-check-solid">
                            <input type="checkbox" checked={permission.Access} onChange={changeHandler} className="form-check-input" name="Access" id={index.toString()} />
                            <label className="form-check-label" >Access</label>
                        </label>
                        <div>
                            <button disabled={!permission.Access} role={'button'} className="accordion-button bg-transparent collapsed" data-bs-toggle='collapse' data-bs-target={`#${permission.Name}${index}`}></button>
                        </div>
                    </span>
                </div>
            </div>
            {/* <div id={`${permission.Name}${index}`} className={`collapse show`}>
                {
                    permission.Access
                        ?
                        <SectionCollapse Sections={permission.Sections} IsCollapse={permission.Access} index={index} />
                        :
                        null
                }
            </div> */}
            <Accordion>
                {
                    permission.Access
                        ?
                        <SectionCollapse Sections={permission.Sections} IsCollapse={permission.Access} index={index} />
                        :
                        null
                }
            </Accordion>

            {
                index !== permissions.length - 1
                    ?
                    <div className="separator border-2 separator-dashed"></div>
                    :
                    null
            }
        </>
    )
    const PermissionInputControl = ({ Operation, SectionIndex, Index }) => {
        return (
            <div className="d-flex flex-column p-5">
                {
                    Operation
                        ?
                        <span className="d-flex justify-content-start align-items-center gap-2">
                            <label className="form-check form-check-sm form-check-custom form-check-solid me-5">
                                <input type="checkbox" checked={Operation.Create} onChange={changeHandler} className="form-check-input" data-type={'Sections'} data-id={Index} data-accessor={'Field'} name={'Operation'} data-sectionid={SectionIndex} id={'Create'} />
                                <label className="form-check-label" >Create</label>
                            </label>
                            <label className="form-check form-check-sm form-check-custom form-check-solid me-5">
                                <input type="checkbox" checked={Operation.Read} onChange={changeHandler} className="form-check-input" data-type={'Sections'} data-id={Index} data-accessor={'Field'} name={'Operation'} data-sectionid={SectionIndex} id={'Read'} />
                                <span className="form-check-label" >Read</span>
                            </label>
                            <label className="form-check form-check-sm form-check-custom form-check-solid me-5">
                                <input type="checkbox" checked={Operation.Write} onChange={changeHandler} className="form-check-input" data-type={'Sections'} data-id={Index} data-accessor={'Field'} name={'Operation'} data-sectionid={SectionIndex} id={'Write'} />
                                <span className="form-check-label" >Write</span>
                            </label>
                            <label className="form-check form-check-sm form-check-custom form-check-solid me-5">
                                <input type="checkbox" checked={Operation.Delete} onChange={changeHandler} className="form-check-input" data-type={'Sections'} data-id={Index} data-accessor={'Field'} name={'Operation'} data-sectionid={SectionIndex} id={'Delete'} />
                                <span className="form-check-label" >Delete</span>
                            </label>
                        </span>
                        : null
                }
            </div>
        )
    }

    return (
        <>
            <div className="container gap-2">
                <div className="row">
                    <div className="col-6">
                        <InputTextField
                            label={'Name of Role'}
                            id={'Name'}
                            name={'Name'}
                            type={'text'}
                            className={'form-control form-control-solid form-control-sm'}
                            value={roleData.Name}
                            onChange={changeHandler}
                            onBlur={blurHandler}
                            placeHolder={'Role Name'}
                        />
                    </div>
                </div>
                <div className="row mt-10">
                    <div className="col">
                        <label className="form-label fw-bolder fs-6 gray-700">Permission Access</label>
                        <div className="border p-2 rounded">
                            <div className="d-flex  justify-content-between p-3">
                                <span className="text-gray-700 fs-5 fw-bold required" >
                                    Administrator Access</span>
                                <span className="d-flex align-items-center">
                                    <label className="form-check form-check-sm form-check-custom form-check-solid me-5">
                                        <input type="checkbox" className="form-check-input" name="" id="" />
                                        <label className="form-check-label" >Access</label>
                                    </label>
                                </span>
                            </div>
                            <div className="separator border-2 separator-dashed"></div>
                            {
                                permissions?.map((permission, index) => (
                                    <PermissionElement key={permission.PermissionId} permission={permission} index={index} />
                                ))
                            }
                        </div>
                        <div className="d-flex justify-content-end mt-10">
                            <div className="btn btn-sm btn-primary" onClick={() => console.log(RoleData)}>Save</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
