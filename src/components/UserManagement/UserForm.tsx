import { useEffect, useState } from "react"
import { Modal } from "react-bootstrap"
import { toast } from "react-hot-toast"
import { axiosGet, axiosPatch, axiosPost } from "../../helpers/Axios"
import { InputSelectField, InputTextField } from "../components/InputField"
import { userProfileType } from "../Interface/Interface"

export const UserForm = ({ userData, setModalIsOpen }) => {

    const formInput = 'form-control form-control-solid form-control-sm'

    const [show, setShow] = useState<boolean>(false)


    const save = () => {
        // if (toggleType === 'Add') {
        //     axiosPost('/UserProfile', userFormData)
        //         .then(res => toast.success(res.statusText))
        //         .catch(err => toast.error(err.toString()))
        // } else {
        // }
        axiosPatch('/UserProfile', userFormData)
            .then(res => toast.success(res.statusText))
            .catch(err => toast.error(err.toString()))
            .finally(() => setModalIsOpen(false))
    }

    const changeHandler = (e) => {
        const name = e.target.name
        const type = e.target.type
        const value = e.target.value
        const obj = { ...userFormData }
        obj[name] = type === 'checkbox' ? e.target.checked : value
        setUserFormData(obj)
    }
    const blurHandler = () => {
    }

    const [userFormData, setUserFormData] = useState<userProfileType>(userData)
    const [role, setRole] = useState<any[]>([
        {
            id: 1,
            value: 'Admin'
        },
        {
            id: 2,
            value: 'User'
        },
        {
            id: 3,
            value: 'Developer'
        },
        {
            id: 4,
            value: 'Support'
        },
    ])

    useEffect(() => {
        setUserFormData(userData)
    }, [userData])

    useEffect(() => {
        axiosGet('/Role')
            .then(res => {
                setRole(res.data)
            }
            )
            .catch(err => {
                console.log(err)
            })
    }, [])

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
                        <InputSelectField
                            label='Role'
                            id="Role"
                            name="Role"
                            className={formInput}
                            value={userFormData?.UserName}
                            onChange={changeHandler}
                            onBlur={blurHandler}
                            option={role.map(role => {
                                return ({ id: role.id, value: role.Name })
                            })}
                            multiple={true}
                        />
                        <div className="d-flex float-end justify-content-end align-items-center gap-2 mt-10">
                            <button role={'button'} className="btn btn-sm btn-light-primary" onClick={save} >Save</button>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}