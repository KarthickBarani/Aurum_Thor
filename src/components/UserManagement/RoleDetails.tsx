import { deepStrictEqual } from "assert"
import { useEffect, useState } from "react"
import { axiosGet } from "../../helpers/Axios"
import { Modal, ModalContent, ModalHeader } from "../components/Model"
import { TestGrid } from "../components/TableComponent"
import { UsersSvg, UserSvg } from "../Svg/Svg"

export const RoleDetails = ({ setModalIsOpen, setRole }) => {

    //role
    type role = [
        {
            roleId: number
            roleName: string  // Admin
            description: string
            permission: [
                {
                    pageId: number
                    pageName: string // Approval | User Management | Workflow .....
                    access: boolean
                    section: [
                        {
                            id: number
                            sectionName: string //Invoice | Lineitems | Expense 
                            Access: {
                                create: boolean
                                read: boolean
                                write: boolean
                                delete: boolean
                            }
                            fieldList: [
                                {
                                    fieldId: number
                                    fieldname: string
                                    isEdit: boolean
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]

    //permission
    type Permissions = [
        {
            permissionId: number
            roleId: number
            permission: [
                {
                    pageId: number
                    section: [
                        {
                            id: number
                            sectionName: string //Invoice | Lineitems | Expense 
                            Access: {
                                create: boolean
                                read: boolean
                                write: boolean
                                delete: boolean
                            }
                            fieldList: [
                                {
                                    fieldId: number
                                    fieldname: string
                                    isEdit: boolean
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]

    const Operation = ['Full Access', 'Add/Edit/Remove', 'API']
    const [RoleData, setRoleData] = useState<any[]>([])

    useEffect(() => {
        axiosGet('/Role')
            .then(res => setRoleData(res.data))
    }, [])

    return (
        <>
            <div className="row">
                {RoleData?.map(datum => (
                    <div className="col-4 mb-2">
                        <div role={'button'} className="card card-flush shadow-sm bg-hover-light" onClick={() => {
                            setRole(datum)
                            setModalIsOpen(true)
                        }}>
                            <div className="card-header">
                                <h1 className="card-title">
                                    <div className="d-flex flex-column gap-2">
                                        <span>{datum.Name}</span>
                                        <small className="lead" >{datum.Description}</small>
                                    </div>
                                </h1>
                                <div className="card-toolbar">
                                    <span title="Number of users" role={'button'} className="badge badge-square badge-light p-2"> <UserSvg clsName="svg-icon" /> 5</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}