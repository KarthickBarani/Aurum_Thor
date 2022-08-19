import { useEffect, useState } from "react"
import { TableFilterComponent, TableGridComponent } from "../components/components/TableComponent"
import { AddSvg, EditSvg, RemoveSvg, SaveSvg, UsersSvg } from "../components/Svg/Svg"
import { AxiosGet } from "../helpers/Axios"
import { VendorForm } from "../components/Vendor/VendorForm"
import { VendorTable } from "../components/Vendor/VendorTable"
import { Link } from "react-router-dom"

export const Vendor = () => {

    const columns = [
        {
            id: 1,
            header: 'Action',
            accessor: 'Action',
            cell: (data) => {
                return (
                    <div className="d-flex justify-content-evenly">
                        <EditSvg role={'button'} clsName="svg-icon svg-icon-warning svg-icon-2" title={'Edit'} function={() => {
                            setIndex(data.VendorId)
                            setToggleForm(true)
                        }
                        } />
                        <RemoveSvg role={'button'} clsName="svg-icon svg-icon-danger svg-icon-2" title={'Delete'} function={() => {
                        }
                        } />
                    </div>

                )
            },
            className: 'max-w-50px'
        },
        {
            id: 2,
            header: 'Vendor Name',
            accessor: 'VendorName',
            className: 'min-w-50px',
            sortable: true
        },
        {
            id: 3,
            header: 'Vendor Code',
            accessor: 'VendorCode',
            className: 'min-w-50px',
            sortable: true
        },
        {
            id: 4,
            header: 'Vendor City',
            accessor: 'VendorCity',
            cell: (data) => `${data.VendorCity} - ${data.VendorZipCode}`,
            className: 'min-w-50px',
            sortable: true
        },
        {
            id: 5,
            header: 'Contact Number',
            accessor: 'VendorPhoneNumber',
            className: 'min-w-50px',
            sortable: true
        },
    ]
    const [index, setIndex] = useState<number | undefined>()
    const [data, setData] = useState([])
    const [filterData, setFilterData] = useState([])
    const [toggleForm, setToggleForm] = useState<boolean>(false)


    useEffect(() => {
        AxiosGet('/Vendor')
            .then(res => {
                setData(res)
                setFilterData(res)
            })
            .catch(err => console.log(err))
    }, [])


    return (

        <div className="container-fluid">
            <div className="row my-10">
                <div className="col">
                    <h4 className="text-white" >Vendor Details</h4>
                </div>
            </div>
            <div className="row justify-content-between g-5">
                <div className="col">
                    <div className="card card-flush " style={{ height: "75vh" }}>
                        <div className="card-header">
                            <h4 className="card-title">
                                Vendor Details
                            </h4>
                            <div className="toolbar">
                                {
                                    toggleForm
                                        ? <SaveSvg clsName="svg-icon svg-icon-1" />
                                        : <TableFilterComponent columns={columns} setColumns={() => { }} datum={data} setDatum={setFilterData} columnFilter={false} />
                                }
                            </div>
                        </div>
                        <div className="card-body card-scroll">
                            <div className="d-flex">
                                <ul className="nav nav-tabs nav-pills flex-row border-0 flex-md-column me-5 mb-3 mb-md-0 fs-6 min-w-lg-200px">
                                    <li className="nav-item w-100 me-0 mb-md-2">
                                        <Link className="nav-link w-100 btn btn-flex btn-active-light-success" to={''} onClick={() => {
                                            setToggleForm(false)
                                        }} data-bs-toggle="tab" >
                                            <UsersSvg clsName="svg-icon svg-icon-1 svg-icon-primary" />
                                            <span className="d-flex flex-column align-items-start">
                                                <span className="fs-4 fw-bold">View</span>
                                                <span className="fs-7">Vendor Details</span>
                                            </span>
                                        </Link>
                                    </li>
                                    <li className="nav-item w-100 me-0 mb-md-2">
                                        <Link className="nav-link w-100 btn btn-flex btn-active-light-success" to={''} onClick={() => {
                                            setIndex(undefined)
                                            setToggleForm(true)
                                        }} data-bs-toggle="tab" >
                                            <UsersSvg clsName="svg-icon svg-icon-1 svg-icon-primary" />
                                            <span className="d-flex flex-column align-items-start">
                                                <span className="fs-4 fw-bold">Add New</span>
                                                <span className="fs-7">Vendor Details</span>
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                                <div className="w-100">
                                    {
                                        toggleForm
                                            ? <VendorForm data={data} setData={setData} index={index} />
                                            : <VendorTable
                                                columns={columns}
                                                data={filterData}
                                                setData={setFilterData}
                                                filter={false}
                                            />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}