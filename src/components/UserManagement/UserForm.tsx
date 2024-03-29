import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { axiosGet, axiosPost, axiosPut } from "../../helpers/Axios"
import { InputTextField } from "../components/InputField"
import { userProfileType } from "../Interface/Interface"
import { toastAlert } from "../../Function/toast"
import { SweetAlert } from "../../Function/alert"

export const UserForm = ({ userId, setModalIsOpen, setRefetch }) => {

    const [userFormData, setUserFormData] = useState<userProfileType>({} as userProfileType)
    const [role, setRole] = useState<any[]>([])
    const [formError, setFormError] = useState({
        UserName: null,
        FirstName: null,
        MiddleName: null,
        LastName: null,
        DisplayName: null,
        EmailAddress: null,
        Password: null
    })

    const formInput = 'form-control form-control-solid form-control-sm'


    const save = () => {
        if (userId === 0) {
            axiosPost('/UserProfile', userFormData)
                .then(res => {
                    SweetAlert({
                        icon: 'success',
                        titleText: res.data.Message
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
                    setRefetch(prev => !prev)
                    setModalIsOpen(false)
                })
        } else {
            axiosPut('/UserProfile', userFormData)
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
                    setRefetch(prev => !prev)
                    setModalIsOpen(false)
                })
        }
    }

    const changeHandler = (e) => {
        const name = e.target.name
        const type = e.target.type
        const value = e.target.value
        const checked = e.target.checked
        const dataSet = e.target.dataset
        const obj = { ...userFormData }
        if (type === 'checkbox') {
            if (name === 'Roles') {
                if (checked) {
                    obj.Roles.push(JSON.parse(dataSet.role))
                } else {
                    const lastIndex = obj.Roles.findIndex(role => role.RoleId === JSON.parse(dataSet.role).RoleId)
                    obj.Roles.splice(lastIndex)
                }
            } else {
                obj[name] = e.target.checked
            }
        } else {
            if (value === '') {
                setFormError({ ...formError, [name]: 'Required' })
            } else {
                setFormError({ ...formError, [name]: null })
            }
            obj[name] = value

        }
        setUserFormData(obj)
    }
    const blurHandler = () => {
    }

    const isValid = (): boolean => {
        const values = Object.values(formError)
        return !!!values.find(value => value !== null)
    }

    useEffect(() => {
        axiosGet(`/UserProfile/${userId}`)
            .then(res => {
                setUserFormData(res.data)
            })
            .catch(err => {
                if (userId !== 0) {
                    toastAlert('error', err.toString())
                }
            })
    }, [userId])

    useEffect(() => {
        axiosGet('/Role')
            .then(res => {
                setRole(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const RolesSelection = ({ role }) => {
        return (
            role.map((role, index) => (
                <div className="col-3 m-2" key={index}>
                    <label className="form-check form-check-sm form-check-custom form-check-solid me-5">
                        <input type="checkbox" checked={userFormData.Roles?.find(el => el.RoleId === role.RoleId)} onChange={changeHandler} className="form-check-input" name='Roles' data-role={JSON.stringify(role)} />
                        <label className="form-check-label" >{role.Name}</label>
                    </label>
                </div>
            ))
        )
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <InputTextField
                            label='First Name'
                            type="text"
                            id="FirstName"
                            name="FirstName"
                            className={formInput}
                            value={userFormData?.FirstName}
                            onChange={changeHandler}
                            onBlur={blurHandler}
                            required={true}
                            formError={formError}
                        />
                    </div>
                    <div className="col">
                        <InputTextField
                            label='Middle Name'
                            type="text"
                            id="MiddleName"
                            name="MiddleName"
                            className={formInput}
                            value={userFormData?.MiddleName}
                            onChange={changeHandler}
                            onBlur={blurHandler}

                        />
                    </div>
                    <div className="col">
                        <InputTextField
                            label='Last Name'
                            type="text"
                            id="LastName"
                            name="LastName"
                            className={formInput}
                            value={userFormData?.LastName}
                            onChange={changeHandler}
                            onBlur={blurHandler}
                            required={true}
                            formError={formError}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <InputTextField
                            label='Email'
                            type="text"
                            id="EmailAddress"
                            name="EmailAddress"
                            className={formInput}
                            value={userFormData?.EmailAddress}
                            onChange={changeHandler}
                            onBlur={blurHandler}
                            required={true}
                            formError={formError}

                        />
                    </div>
                    <div className="col">
                        <InputTextField
                            label='Display Name'
                            type="text"
                            id="DisplayName"
                            name="DisplayName"
                            className={formInput}
                            value={userFormData?.DisplayName}
                            onChange={changeHandler}
                            onBlur={blurHandler}
                            required={true}
                            formError={formError}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <InputTextField
                            label='User Name'
                            type="text"
                            id="UserName"
                            name="UserName"
                            className={formInput}
                            value={userFormData?.UserName}
                            onChange={changeHandler}
                            onBlur={blurHandler}
                            required={true}
                            formError={formError}

                        />
                    </div>
                    <div className="col align-self-end">
                        <div className="form-check form-check-custom form-check-solid">
                            <input className="form-check-input" type="checkbox" checked={userFormData.Active} onChange={changeHandler} name="Active" id="Active" />
                            <label className="form-check-label">
                                IsActive
                            </label>
                        </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col">
                        <div className="row">
                            <label
                                className={`form-label fw-bolder fs-6 gray-700 mt-2`}>
                                Roles
                            </label>
                            {
                                <RolesSelection role={role.filter(role => role.IsActive)} />
                            }
                        </div>
                        <div className="d-flex float-end justify-content-end align-items-center gap-2 mt-10">
                            <button disabled={!isValid()} role={'button'} className="btn btn-sm btn-light-primary" onClick={save} >Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}