import { useEffect, useState } from "react"
import { Collapse } from "react-bootstrap"
import { axiosGet, axiosPut } from "../../helpers/Axios"
import { RemoveSvg, UserSvg } from "../Svg/Svg"
import { SweetAlert } from "../../Function/alert"
import { Loading } from "../components/Loading"

export const RoleDetails = ({ setModalIsOpen, setRoleId, refetch, setRefetch }) => {

    const [RoleData, setRoleData] = useState<any[]>([])

    useEffect(() => {
        axiosGet('/Role')
            .then(res => setRoleData(res.data))
    }, [refetch])

    const removeHandler = (e, obj) => {
        e.stopPropagation()
        SweetAlert({
            title: 'Are you sure?',
            text: "Role has been delete",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axiosPut(`/Role`, { ...obj, IsActive: false })
                        .then(res => {
                            SweetAlert({
                                title: 'Deleted!',
                                text: 'Role has been deleted.',
                                icon: 'success'
                            })
                        })
                        .catch(err => {
                            SweetAlert({
                                title: `Error`,
                                titleText: 'Sothing went Wrong !!!',
                                icon: 'error'
                            })
                        })
                        .finally(() => setRefetch(prev => !prev))
                }
            })
    }

    const RoleCard = ({ datum }) => {
        const [show, setShow] = useState<boolean>(false)

        return (
            <div className="card card-flush shadow-sm bg-hover-light" onClick={() => {
                setRoleId(datum.RoleId)
                setModalIsOpen(true)
            }}
                onMouseEnter={
                    () => {
                        setShow(true)
                    }
                }
                onMouseLeave={
                    () => setShow(false)
                }
            >
                <div className="card-header d-flex">
                    <h1 className="card-title">
                        <div className="d-flex gap-2">
                            <div className="align-self-center">
                                <UserSvg clsName="svg-icon svg-icon-gray svg-icon-2hx" />
                            </div>
                            <div className="d-flex flex-column gap-2">
                                <span>{datum.Name}</span>
                                <div className="d-flex gap-3">
                                    <small className="lead" >{datum.Description}</small>
                                    <span className={`badge badge-light-${datum.IsActive ? 'success' : 'danger'}`}>{`${datum.IsActive ? 'Active' : 'Inactive'}`}</span>
                                </div>
                            </div>
                        </div>
                    </h1>
                    <div className="card-toolbar">
                        <span title="Number of users" className="badge badge-square badge-light p-2"> <UserSvg clsName="svg-icon" /> 5</span>
                        <Collapse in={show}>
                            <div onClick={(e) => { removeHandler(e, datum) }}>
                                <button
                                    className="btn btn-sm btn-icon align-items-center"
                                ><RemoveSvg clsName="svg-icon svg-icon-danger svg-icon-2" ></RemoveSvg></button>
                            </div>
                        </Collapse>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <>
            {
                RoleData.length > 0
                    ?
                    <div className="row">
                        {RoleData.filter(role => role.IsActive)?.map((datum, index) => (
                            <div key={index} className="col-12 col-lg-6 mb-2">
                                <RoleCard datum={datum} />
                            </div>
                        ))}
                    </div>
                    : <Loading />
            }
        </>
    )
}