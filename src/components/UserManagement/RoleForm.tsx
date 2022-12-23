import React, { useContext, useEffect, useState } from "react"
import { Accordion, Card, useAccordionButton } from "react-bootstrap"
import { toast } from "react-hot-toast"
import { axiosGet, axiosPost, axiosPut } from "../../helpers/Axios"
import { InputTextField } from "../components/InputField"
import { PermissionContext } from "../../router/Router"


export type RoleDataType = {
    RoleId: number,
    Name: string,
    Description: string,
    IsActive: boolean,
    Permission: []
}



export const RoleForm = ({ RoleId, setModalIsOpen }: { RoleId: number, setModalIsOpen: Function }) => {


    const CurrentPermission = useContext(PermissionContext)

    const [roleData, setRoleData] = useState<any>({})
    const [permissions, setPermissions] = useState<any[]>([])
    const [currentFieldCollapse, setCurrentFieldCollapse] = useState<string | null>(null)
    const [valid, setValid] = useState<boolean>(false)
    const [formError, setFormError] = useState({
        RoleId: null,
        Name: null,
        Description: null,
        IsActive: null
    })

    useEffect(() => {
        if (RoleId === 0) {
            setRoleData({
                RoleId: 0,
                Name: '',
                Description: '',
                IsActive: false,
                Permission: null
            })
        } else {
            axiosGet(`/Role/${RoleId}`)
                .then(res => {
                    setRoleData(res.data)
                })
                .catch(err => console.log(err))
        }
    }, [RoleId])

    useEffect(() => {
        if (roleData.Permission === null) {
            axiosGet('/Role/Permission')
                .then(res => {
                    setRoleData({ ...roleData, Permission: res.data })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [roleData.Permission])



    const formInput = 'form-control form-control-solid form-control-sm'

    const changeHandler = (e) => {
        const name = e.target.name
        const id = e.target.id
        const type = e.target.type
        const checked = e.target.checked
        const value = e.target.value
        const array = [...roleData.Permission]
        const dataSet = e.target.dataset
        if (type === 'checkbox') {
            if (dataSet.type) {
                if (dataSet.subaccessor === 'Value') {
                    array[dataSet.id][dataSet.type][dataSet.sectionid][dataSet.accessor][dataSet.subaccessor][dataSet.valueid][name][id] = checked
                    console.log(array[dataSet.id][dataSet.type][dataSet.sectionid][dataSet.accessor][dataSet.subaccessor][dataSet.valueid][name], dataSet.valueid)
                } else {
                    array[dataSet.id][dataSet.type][dataSet.sectionid][dataSet.accessor][name][id] = checked
                    array[dataSet.id][dataSet.type][dataSet.sectionid][dataSet.accessor]['Value'].forEach((value) => {
                        value['Operation'][id] = array[dataSet.id][dataSet.type][dataSet.sectionid][dataSet.accessor][name][id]
                    })
                }
            } else {
                if (id === 'All' && name === 'Access') {
                    array.forEach(obj => obj[name] = checked)
                } else {
                    array[id][name] = checked
                }
            }
        }
        else {
            const obj = { ...roleData }
            obj[name] = value
            setRoleData(obj)
            if (obj[name] === '')
                setFormError({ ...formError, [name]: 'required !' })
            else {
                setFormError({ ...formError, [name]: null })
            }
        }
        setPermissions(array)

    }
    const blurHandler = () => {

    }

    const validation = (): boolean => {
        for (let val of Object.values(formError)) {
            if (val !== null) {
                return true
            }
        }
        return false
    }

    const onSumbit = () => {
        if (roleData.RoleId === 0) {
            axiosPost("/Role", { ...roleData, Permission: permissions })
                .then(res => {
                    toast.success(res.statusText)
                    console.log({ ...roleData, Permission: permissions })
                })
                .catch(err => {
                    toast.error(err.toString())
                    console.log({ ...roleData, Permission: permissions })
                })
                .finally(() => {
                    CurrentPermission?.permissionSetMethod({ ...roleData, Permission: permissions })
                    setModalIsOpen(false)
                })
        } else {
            axiosPut("/Role", { ...roleData, Permission: permissions })
                .then(res => {
                    toast.success(res.statusText)
                })
                .catch(err => toast.error(err.toString()))
                .finally(() => {
                    CurrentPermission?.permissionSetMethod({ ...roleData, Permission: permissions })
                    setModalIsOpen(false)
                })
        }

    }

    useEffect(() => {
        setValid(validation)
    }, [formError])


    const CustomToggle = ({ eventKey }) => {
        const decoratedOnClick = useAccordionButton(eventKey, () => {
            setCurrentFieldCollapse(prev => prev !== '' ? '' : eventKey)
        })

        return (
            <button
                type="button"
                className="accordion-button bg-transparent"
                onClick={decoratedOnClick}
            >
            </button>
        );
    }


    const SectionCollapse = ({ Sections, index }: { Sections: any[], IsCollapse: boolean, index: number }) => (
        <>

            {
                Sections.length > 0
                    ?
                    Sections.map((Section, SectionIndex) => (
                        <Accordion.Item eventKey={SectionIndex.toString()} bsPrefix="accordion-item" key={SectionIndex}>
                            <Card>
                                <Card.Header bsPrefix="">
                                    <div className="d-flex align-items-center justify-content-between w-100">
                                        <div className="d-flex align-items-center justify-content-between w-100">
                                            <span className="text-gray-800 fs-6 fw-bold" >{Section.Field.Type}</span>
                                            <div>
                                                <PermissionInputControl Operation={Section.Field.Operation} SectionIndex={SectionIndex} Index={index} />
                                            </div>
                                        </div>
                                        <div>
                                            <CustomToggle eventKey={SectionIndex.toString()} />
                                        </div>
                                    </div>
                                </Card.Header>
                                <Accordion.Collapse eventKey={SectionIndex.toString()} in={currentFieldCollapse === SectionIndex.toString()} >
                                    <FieldCollapse Field={Section.Field} SectionIndex={SectionIndex} Index={index} />
                                </Accordion.Collapse>
                            </Card>
                        </Accordion.Item>
                    ))
                    :
                    null
            }
        </>
    )

    const FieldCollapse = ({ Field, SectionIndex, Index }) => (
        <div className="container-fluid">
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
                        <div key={valueIndex} className="row p-3 px-2 bg-hover-light fs-7 fw-bold">
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
            <div className="d-flex justify-content-between align-items-center p-3">
                <span className="text-gray-700 fs-5 fw-bold" >{permission.Name}</span>
                <div className="d-flex">
                    <span className="d-flex gap-1">
                        <label className="form-check form-check-sm form-check-custom form-check-solid">
                            <input type="checkbox" checked={permission.Access} onChange={changeHandler} className="form-check-input" name="Access" id={index.toString()} />
                            <label className="form-check-label" >Access</label>
                        </label>
                        {/* <div>
                            <button disabled={!permission.Access} role={'button'} className="accordion-button bg-transparent collapsed" data-bs-toggle='collapse' data-bs-target={`#${permission.Name}${index}`}></button>
                        </div> */}
                    </span>
                </div>
            </div>
            <Accordion >
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
                    <div className="col-12">
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
                            required={true}
                            formError={formError}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <InputTextField
                            label={'Description'}
                            id={'Description'}
                            name={'Description'}
                            type={'text'}
                            className={'form-control form-control-solid form-control-sm'}
                            value={roleData.Description}
                            onChange={changeHandler}
                            onBlur={blurHandler}
                            placeHolder={'Description'}
                        />
                    </div>
                </div>
                <div className="row mt-10">
                    <div className="col">
                        <div className="d-flex justify-content-end mb-5">
                            <label className="form-check form-check-sm form-check-custom form-check-solid me-5">
                                <input type="checkbox" className="form-check-input" id={'All'} name="Access" onChange={changeHandler} />
                                <label className="form-check-label" >Full Access</label>
                            </label>
                        </div>
                        <div className="border p-2 rounded">
                            {
                                roleData.Permission?.map((permission, index) => (
                                    <PermissionElement key={permission.PermissionId} permission={permission} index={index} />
                                ))
                            }
                        </div>
                        <div className="d-flex justify-content-end mt-10">
                            <button className="btn btn-sm btn-primary" disabled={valid} onClick={onSumbit}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
