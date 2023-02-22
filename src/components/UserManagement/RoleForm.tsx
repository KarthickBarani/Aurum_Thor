import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { Collapse, useAccordionButton } from "react-bootstrap"
import { toast } from "react-hot-toast"
import { axiosGet, axiosPost, axiosPut } from "../../helpers/Axios"
import { InputTextField } from "../components/InputField"
import { PermissionContext } from "../../router/Router"
import { UpArrowSvg } from "../Svg/Svg"
import { toastAlert } from "../../Function/toast"
import { SweetAlert } from "../../Function/alert"


export type RoleDataType = {
    RoleId: number,
    Name: string,
    Description: string,
    IsActive: boolean,
    Permission: []
}



export const RoleForm = ({ RoleId, setModalIsOpen, setRefetch }: { RoleId: number, setModalIsOpen: Function, setRefetch: Function }) => {


    const CurrentPermission = useContext(PermissionContext)

    const [roleData, setRoleData] = useState<any>({})
    const [permissions, setPermissions] = useState<any[]>([])
    const [currentFieldCollapse, setCurrentFieldCollapse] = useState<string | null>(null)
    // const [test, setTest] = useState<boolean>(false)
    const [valid, setValid] = useState<boolean>(false)
    const [formError, setFormError] = useState({
        RoleId: null,
        Name: null,
        Description: null,
        IsActive: null
    })

    const roleNameRef = useRef<HTMLInputElement>(null)
    const roleDescriptionRef = useRef<HTMLInputElement>(null)

    let FinalPermission: any[] = []

    useEffect(() => {
        if (RoleId === 0) {
            setRoleData({
                RoleId: 0,
                Name: '',
                Description: '',
                IsActive: false,
                Permission: []
            })
            FinalPermission = []
        } else {
            axiosGet(`/Role/${RoleId}`)
                .then(res => {
                    setRoleData(res.data)
                    FinalPermission = [...res.data.Permission]
                })
                .catch(err => console.log(err))
        }
    }, [RoleId])

    useEffect(() => {
        if (roleData.Permission === null || roleData.Permission?.length === 0) {
            axiosGet('/Role/Permission')
                .then(res => {
                    console.log('now')
                    setRoleData({ ...roleData, Permission: res.data })
                    FinalPermission = [...res.data]
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [roleData.Permission])



    const formInput = 'form-control form-control-solid form-control-sm'

    // const changeHandler = (e) => {
    //     const name = e.target.name
    //     const id = e.target.id
    //     const type = e.target.type
    //     const checked = e.target.checked
    //     const value = e.target.value
    //     const array = [...roleData.Permission]
    //     const dataSet = e.target.dataset
    //     // if (type === 'checkbox') {
    //     //     if (dataSet.type) {
    //     //         if (dataSet.subaccessor === 'Value') {
    //     //             array[dataSet.id][dataSet.type][dataSet.sectionid][dataSet.accessor][dataSet.subaccessor][dataSet.valueid][name][id] = checked
    //     //             console.log(array[dataSet.id][dataSet.type][dataSet.sectionid][dataSet.accessor][dataSet.subaccessor][dataSet.valueid][name], dataSet.valueid)
    //     //         } else {
    //     //             array[dataSet.id][dataSet.type][dataSet.sectionid][dataSet.accessor][name][id] = checked
    //     //             array[dataSet.id][dataSet.type][dataSet.sectionid][dataSet.accessor]['Value'].forEach((value) => {
    //     //                 value['Operation'][id] = array[dataSet.id][dataSet.type][dataSet.sectionid][dataSet.accessor][name][id]
    //     //             })
    //     //         }
    //     //     } else {
    //     //         if (id === 'All' && name === 'Access') {
    //     //             array.forEach(obj => obj[name] = checked)
    //     //         } else {
    //     //             array[id][name] = checked
    //     //         }
    //     //     }
    //     // }

    //     // const obj = { ...roleData }
    //     // obj[name] = value
    //     // setRoleData(obj)
    //     // if (obj[name] === '')
    //     //     setFormError({ ...formError, [name]: 'required !' })
    //     // else {
    //     //     setFormError({ ...formError, [name]: null })
    //     // }
    //     // setPermissions(array)

    // }
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

    const onSubmit = (e) => {
        e.preventDefault()
        const value = roleNameRef.current?.value
        const value2 = roleDescriptionRef.current?.value
        // console.log('now', { ...roleData, Name: value, Description: value2, Permission: FinalPermission })
        console.log('now', FinalPermission)
        if (roleData.RoleId === 0) {
            axiosPost("/Role", { ...roleData, Name: value, Description: value2, Permission: FinalPermission })
                .then(res => {
                    SweetAlert({
                        icon: 'success',
                        titleText: res.statusText
                    })
                    // toastAlert('success', res.statusText)
                    console.log({ ...roleData, Name: value, Description: value2, Permission: FinalPermission })
                })
                .catch(err => {
                    SweetAlert({
                        icon: 'error',
                        titleText: err.toString()
                    })
                    // toastAlert('error', err.toString())
                    console.log({ ...roleData, Name: value, Description: value2, Permission: FinalPermission })
                })
                .finally(() => {
                    CurrentPermission?.permissionSetMethod({ ...roleData, Name: value, Description: value2, Permission: FinalPermission })
                    setModalIsOpen(false)
                    setRefetch(prev => !prev)
                })
        } else {
            axiosPut("/Role", { ...roleData, Name: value, Description: value2, Permission: FinalPermission })
                .then(res => {
                    SweetAlert({
                        icon: 'success',
                        titleText: res.statusText
                    })
                    // toastAlert('success', res.statusText)
                })
                .catch(err => {
                    SweetAlert({
                        icon: 'error',
                        titleText: err.toString()
                    })
                    // toastAlert('error', err.toString())
                })
                .finally(() => {
                    CurrentPermission?.permissionSetMethod({ ...roleData, Name: value, Description: value2, Permission: FinalPermission })
                    setModalIsOpen(false)
                    setRefetch(prev => !prev)
                })
        }
    }

    useEffect(() => {
        setValid(validation)
    }, [formError])



    const SectionItem = ({ section, sectionIndex, permissionIndex, setCurrentPermissions, currentPermissions }: { section: any, sectionIndex: number, permissionIndex: number, setCurrentPermissions: Function, currentPermissions: any[] }) => {

        const [collapse, setCollapse] = useState<boolean>(false)
        const [operation, setOperation] = useState<any>(section.Field.Operation)

        useEffect(() => {
            const obj = { ...section.Field.Operation }
            FinalPermission = [...roleData.Permission]
            if (section.Field.Operation.Read) {
                obj.Create = false
                obj.Update = false
                obj.Delete = false
                obj.Read = section.Field.Operation.Read
                FinalPermission[permissionIndex].Sections[sectionIndex].Field.Operation = obj
                setOperation(obj)
                FinalPermission[permissionIndex].Sections[sectionIndex].Field.Value.forEach(value => {
                    value.Operation = obj
                })
                setCurrentPermissions(FinalPermission)
            }
        }, [])

        const changeHandler = (e) => {
            const id = e.target.id
            const checked = e.target.checked
            console.log(checked)
            const obj = { ...operation }
            if (id === 'Read' && checked) {
                obj.Create = false
                obj.Update = false
                obj.Delete = false
                obj.Read = checked
                FinalPermission[permissionIndex].Sections[sectionIndex].Field.Operation = obj
                FinalPermission[permissionIndex].Sections[sectionIndex].Field.Value.forEach(value => {
                    value.Operation = obj
                })
                setOperation(obj)
                console.log(FinalPermission[permissionIndex].Sections[sectionIndex].Field.Value)
                setCurrentPermissions(FinalPermission)
            } else {
                obj[id] = checked
                FinalPermission[permissionIndex].Sections[sectionIndex].Field.Operation = obj
                FinalPermission[permissionIndex].Sections[sectionIndex].Field.Value.forEach(value => {
                    value.Operation = obj
                })
                setOperation(obj)
                console.log(FinalPermission[permissionIndex].Sections[sectionIndex].Field.Value)
                setCurrentPermissions(FinalPermission)
            }
        }

        return (
            <div className="card card-flush" >
                <div className="card-header">
                    <div className="d-flex align-items-center justify-content-between w-100">
                        <div className="d-flex align-items-center justify-content-between w-100">
                            <span className="text-gray-800 fs-6 fw-bold" >{section.Field.Type}</span>
                            <div>
                                <PermissionInputControl Operation={operation} changeHandler={changeHandler} />
                            </div>
                        </div>
                        <div>
                            <button
                                type="button"
                                className={`btn btn-icon bg-transparent me-5 rotate ${collapse ? 'active' : ''}`}
                                onClick={() => setCollapse(prev => !prev)}
                            >
                                <span className="svg-icon svg-icon-2 rotate-180"><UpArrowSvg clsName="svg-icon svg-icon-primary svg-icon-2" /></span>
                            </button>
                        </div>
                    </div>
                </div>
                <Collapse in={collapse}>
                    <div className="card-body m-0">
                        <div className="border border-2 rounded p-2">
                            {
                                section.Field.Value.map((value, index) => (<FieldItem key={index} value={value} index={index} permissionIndex={permissionIndex} sectionIndex={sectionIndex} currentPermissions={currentPermissions} />))

                            }
                        </div>
                    </div>
                </Collapse >
            </div >
        )
    }


    const FieldItem = ({ value, index, permissionIndex, sectionIndex, currentPermissions }) => {
        const [operation, setOperation] = useState<any>(value.Operation)

        useEffect(() => {
            const obj = { ...value.Operation }
            FinalPermission = [...currentPermissions]
            if (value.Operation.Read) {
                obj.Create = false
                obj.Update = false
                obj.Delete = false
                obj.Read = value.Operation.Read
                FinalPermission[permissionIndex].Sections[sectionIndex].Field.Value[index].Operation = obj
            } else {
                FinalPermission[permissionIndex].Sections[sectionIndex].Field.Value[index].Operation = obj
            }
            setOperation(obj)
        }, [currentPermissions])


        const changeHandler = (e) => {
            const id = e.target.id
            const checked = e.target.checked
            const obj = { ...operation }
            if (id === 'Read' && checked) {
                obj.Create = false
                obj.Update = false
                obj.Delete = false
                obj.Read = true
                FinalPermission[permissionIndex].Sections[sectionIndex].Field.Value[index].Operation = obj
                setOperation(obj)
            }
            else {
                obj[id] = checked
                FinalPermission[permissionIndex].Sections[sectionIndex].Field.Value[index].Operation = obj
                setOperation(obj)
            }
        }

        return (
            <div key={index} className="row p-3 px-2 bg-hover-light fs-7 fw-bold">
                <div className="col-4">{value.Field}</div>
                <div className="col-2">
                    <span role={'none'} className="form-check form-check-sm form-check-custom form-check-solid ">
                        <input type="checkbox" checked={operation.Create} onChange={changeHandler} className="form-check-input" name={'Operation'} id={"Create"} disabled={operation.Read} />
                        <label className="form-check-label" >Create</label>
                    </span>
                </div>
                <div className="col-2">
                    <span role={'none'} className="form-check form-check-sm form-check-custom form-check-solid ">
                        <input type="checkbox" checked={operation.Read} onChange={changeHandler} className="form-check-input" name={'Operation'} id={"Read"} />
                        <label className="form-check-label" >Read</label>
                    </span>
                </div>
                <div className="col-2">
                    <span role={'none'} className="form-check form-check-sm form-check-custom form-check-solid ">
                        <input type="checkbox" checked={operation.Update} onChange={changeHandler} className="form-check-input" name={'Operation'} id={"Update"} disabled={operation.Read} />
                        <label className="form-check-label" >Update</label>
                    </span>
                </div>
                <div className="col-2">
                    <span role={'none'} className="form-check form-check-sm form-check-custom form-check-solid ">
                        <input type="checkbox" checked={operation.Delete} onChange={changeHandler} className="form-check-input" name={'Operation'} id={"Delete"} disabled={operation.Read} />
                        <label className="form-check-label" >Delete</label>
                    </span>
                </div>
            </div>
        )
    }

    const PermissionElement = ({ permission, index, setCurrentPermissions, currentPermissions }) => {
        const [collapse, setCollapse] = useState<boolean>(permission.Access)

        const changeHandler = (e) => {
            FinalPermission[index].Access = e.target.checked
            setCollapse(prev => !prev)
        }

        return (
            <>
                <div className="d-flex justify-content-between align-items-center p-3">
                    <span className="text-gray-700 fs-5 fw-bold" >{permission.Name}</span>
                    <div className="d-flex">
                        <span className="d-flex gap-1">
                            <label className="form-check form-check-sm form-check-custom form-check-solid">
                                <input type="checkbox" checked={permission.Access} onChange={changeHandler} className="form-check-input" />
                                <label className="form-check-label" >Access</label>
                            </label>
                        </span>
                    </div>
                </div>
                <Collapse in={collapse}>
                    <div>
                        {
                            permission && permission.Sections.length > 0
                                ?
                                permission.Sections.map((section, sectionIndex) => (
                                    <SectionItem key={sectionIndex} section={section} sectionIndex={sectionIndex} permissionIndex={index} setCurrentPermissions={setCurrentPermissions} currentPermissions={currentPermissions} />
                                ))
                                :
                                null
                        }
                    </div>
                </Collapse>
            </>
        )
    }

    const PermissionInputControl = ({ Operation, changeHandler }) => {
        return (
            <div className="d-flex flex-column p-5">
                {
                    Operation
                        ?
                        <span className="d-flex justify-content-start align-items-center gap-2">
                            <label className="form-check form-check-sm form-check-custom form-check-solid me-5">
                                <input type="checkbox" checked={Operation.Create} onChange={changeHandler} className="form-check-input" id={'Create'} disabled={Operation.Read} />
                                <label className="form-check-label" >Create</label>
                            </label>
                            <label className="form-check form-check-sm form-check-custom form-check-solid me-5">
                                <input type="checkbox" checked={Operation.Read} onChange={changeHandler} className="form-check-input" id={'Read'} />
                                <span className="form-check-label" >Read</span>
                            </label>
                            <label className="form-check form-check-sm form-check-custom form-check-solid me-5">
                                <input type="checkbox" checked={Operation.Update} onChange={changeHandler} className="form-check-input" id={'Update'} disabled={Operation.Read} />
                                <span className="form-check-label" >Update</span>
                            </label>
                            <label className="form-check form-check-sm form-check-custom form-check-solid me-5">
                                <input type="checkbox" checked={Operation.Delete} onChange={changeHandler} className="form-check-input" id={'Delete'} disabled={Operation.Read} />
                                <span className="form-check-label" >Delete</span>
                            </label>
                        </span>
                        : null
                }
            </div>
        )
    }

    const PermissionForm = ({ permissions }: { permissions: any[] }) => {

        const [currentPermissions, setCurrentPermissions] = useState<any[]>(permissions)

        useEffect(() => {
            FinalPermission = permissions
        }, [])

        return (
            <>
                <div className="border p-2 rounded">
                    {
                        currentPermissions?.map((permission, index) => (
                            <PermissionElement key={index} permission={permission} index={index} setCurrentPermissions={setCurrentPermissions} currentPermissions={currentPermissions} />
                        ))
                    }
                </div>
                <div className="d-flex justify-content-end mt-10">
                    <button className="btn btn-sm btn-primary" disabled={valid} onClick={onSubmit} >Save</button>
                </div>
            </>
        )
    }

    console.log('render')

    return (
        <>
            <div className="container gap-2">
                <form onSubmit={onSubmit}>
                    <div className="row">
                        <div className="col-12">
                            {/* <InputTextField
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
                            /> */}
                            <label className="form-label" >Name of Role</label>
                            <input ref={roleNameRef} className={'form-control form-control-solid form-control-sm'} type="text" defaultValue={roleData.Name} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            {/* <InputTextField
                                label={'Description'}
                                id={'Description'}
                                name={'Description'}
                                type={'text'}
                                className={'form-control form-control-solid form-control-sm'}
                                value={roleData.Description}
                                onChange={changeHandler}
                                onBlur={blurHandler}
                                placeHolder={'Description'}
                            /> */}
                            <label className="form-label" >Descrpition</label>
                            <input ref={roleDescriptionRef} className={'form-control form-control-solid form-control-sm'} type="text" defaultValue={roleData.Description} />
                        </div>
                    </div>
                    <div className="row mt-10">
                        <div className="col">
                            <div className="d-flex justify-content-end mb-5">
                                <label className="form-check form-check-sm form-check-custom form-check-solid me-5">
                                    <input type="checkbox" className="form-check-input" id={'All'} name="Access" />
                                    <label className="form-check-label" >Full Access</label>
                                </label>
                            </div>
                            {roleData && <PermissionForm permissions={roleData.Permission} />}
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
