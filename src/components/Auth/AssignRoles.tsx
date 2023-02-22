import { useNavigate } from "react-router-dom"
import { axiosGet } from "../../helpers/Axios"
import { PermissionContext } from "../../router/Router"
import { useContext, useEffect } from "react"
import { toastAlert } from "../../Function/toast"
import { UserSvg } from "../Svg/Svg"
import { Loading } from "../components/Loading"
import { Error } from "../components/Error"




export const AssignRoles = ({ User }) => {

    const navigation = useNavigate()
    const CurrentPermission = useContext(PermissionContext)


    if (!User) return <Error />

    return (
        <>
            <div className="d-flex flex-column h-100">
                <div className="d-flex m-1 p-3 gap-3 justify-content-center">
                    <div className='d-flex flex-column text-center'>
                        <p className='text-gray-900 fs-2 fw-bold'>{`${User.FirstName} ${User.LastName}`}</p>
                        <p className='text-gray-400 '>{User.EmailAddress}</p>
                    </div>
                </div>
                <div className='d-flex justify-content-around'>
                    {
                        User && User.Roles.filter(role => role.IsActive).map(role => (
                            <div
                                key={role.RoleId}
                                className="symbol symbol-150px"
                                role={'button'}
                                onClick={() => {
                                    axiosGet(`/Role/${role.RoleId}`)
                                        .then(res => {
                                            navigation('/Home')
                                            CurrentPermission?.permissionSetMethod(res.data)
                                        })
                                        .catch(() => {
                                            toastAlert('error', 'Something Went Wrong !!!')
                                        })
                                }}>
                                <div className="symbol-label fs-2 fw-semibold text-success bg-hover-light-success d-flex flex-column text-center">
                                    <UserSvg clsName='svg-icon svg-icon-success svg-icon-3x'></UserSvg>
                                    <p className='text-gray-900 fs-4 fw-bold'>{role.Name}</p>
                                    <p className='text-gray-400 fs-6'>{role.Descprition}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
} 