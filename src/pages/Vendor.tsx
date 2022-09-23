import { useEffect, useState } from "react"
import { TableFilterComponent, TableGridComponent } from "../components/components/TableComponent"
import { AddSvg, EditSvg, RemoveSvg, SaveSvg, UsersSvg } from "../components/Svg/Svg"
import { AxiosGet, AxiosInsert } from "../helpers/Axios"
import { VendorForm } from "../components/Vendor/VendorForm"
import { VendorTable } from "../components/Vendor/VendorTable"
import { Link } from "react-router-dom"
import { propsAddressList, propsVendorPost, vendors } from "../components/Interface/Interface"
import { SweetAlert } from "../Function/alert"


export const Vendor = () => {

    const columns = [
        {
            id: 1,
            header: 'Action',
            accessor: 'Action',
            cell: (data) => {
                return (
                    <div className="d-flex gap-3">
                        <EditSvg role={'button'} clsName="svg-icon svg-icon-warning svg-icon-2" title={'Edit'} function={() => {
                            setVendorId(data.VendorId)
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
            className: 'min-w-200px',
            sortable: true
        },
        {
            id: 3,
            header: 'Vendor Code',
            accessor: 'VendorCode',
            className: 'min-w-200px',
            sortable: true
        },
        {
            id: 4,
            header: 'Account Number',
            accessor: 'AccountNumber',
            className: 'min-w-200px',
            sortable: true
        },
    ]
    const [data, setData] = useState([])
    const [filterData, setFilterData] = useState([])
    const [toggleForm, setToggleForm] = useState<boolean>(false)
    const [vendorPost, setVendorPost] = useState<propsVendorPost>({} as propsVendorPost)
    const [vendorId, setVendorId] = useState<number>(0)
    const [formError, setFormError] = useState({
        Vendor: {
            VendorCode: null,
            VendorName: null,
            AccountNumber: null,
        },
        AddressList: [
            {
                AddressLine1: null,
                AddressLine2: null,
                AddressLine3: null,
                Addressee: null,
                City: null,
                State: null,
                ZipCode: null,
                Country: null,
                PhoneNumber: null,
                Fax: null,
            },
            {
                AddressLine1: null,
                AddressLine2: null,
                AddressLine3: null,
                Addressee: null,
                City: null,
                State: null,
                ZipCode: null,
                Country: null,
                PhoneNumber: null,
                Fax: null,
            }
        ]

    })

    const vendorDefaultAddress = {
        AddressId: 0,
        AddressLine1: '',
        AddressLine2: '',
        AddressLine3: '',
        Addressee: '',
        City: '',
        State: '',
        ZipCode: '',
        Country: '',
        PhoneNumber: '',
        Fax: '',
        AddressType: {
            AddressTypeId: 1,
            AddressType: ''
        }
    }

    const remitDefaultAddress = {
        AddressId: 0,
        AddressLine1: '',
        AddressLine2: '',
        AddressLine3: '',
        Addressee: '',
        City: '',
        State: '',
        ZipCode: '',
        Country: '',
        PhoneNumber: '',
        Fax: '',
        AddressType: {
            AddressTypeId: 2,
            AddressType: ''
        }
    }

    const vendorDefaultValue = {
        Vendor: {
            VendorId: 0,
            VendorCode: '',
            VendorName: '',
            AccountNumber: '',
        },
        AddressList: [vendorDefaultAddress, remitDefaultAddress]
    }

    const validation = () => {
        const obj = { ...formError }
        const vendorkeys = ['VendorName', 'VendorCode', 'AccountNumber']
        const vendorAddresskeys = ['AddressLine1']
        const remitAddresskeys = ['AddressLine1']
        vendorkeys.forEach(
            key => {
                if (vendorPost.Vendor[key] === "")
                    obj.Vendor[key] = 'Requied!'
            }
        )
        vendorAddresskeys.forEach(
            key => {
                if (vendorPost.AddressList[0][key] === "")
                    obj.AddressList[0][key] = 'Requied!'
            }
        )
        remitAddresskeys.forEach(
            key => {
                if (vendorPost.AddressList[1][key] === "")
                    obj.AddressList[1][key] = 'Requied!'
            }
        )
        console.log('now', obj)
        setFormError(obj)
    }

    const isVaild = () => {
        const vendorValue = Object.values(formError.Vendor)
        const vendorAddressValue = Object.values(formError.AddressList[0])
        const remitAddressValue = Object.values(formError.AddressList[1])
        return vendorValue.every(val => val === null) && vendorAddressValue.every(val => val === null) && remitAddressValue.every(val => val === null)
    }

    useEffect(() => {
        AxiosGet('/Vendor')
            .then(res => {
                setData(res)
                setFilterData(res)

            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        AxiosGet(`/Vendor/Address/${vendorId}`)
            .then((res) => {
                const vendor = res.AddressList.length === 0 ? { ...res, AddressList: [vendorDefaultAddress, remitDefaultAddress] } : { ...res }
                console.log(vendor)
                setVendorPost(vendor)
            })
            .catch(err => console.log(err))
    }, [vendorId])

    const save = () => {
        console.log('check', vendorPost)
        validation()
        if (isVaild()) {
            AxiosInsert('/Vendor/New', vendorPost)
                .then(res => {
                    if (res.Status) {
                        SweetAlert({
                            title: 'Saved',
                            text: res.Message,
                            icon: 'success'
                        })
                    } else {
                        SweetAlert({
                            icon: 'error',
                            title: 'Oops...',
                            text: res.Message
                        })
                    }
                })
                .catch(() => {
                    SweetAlert({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!'
                    })
                })
        }
    }


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
                                        ? <button className="btn btn-icon btn-active-primary btn-sm" onClick={save} disabled={!isVaild()}>
                                            <SaveSvg clsName="svg-icon svg-icon-3" role="button" />
                                        </button>
                                        : <TableFilterComponent columns={columns} setColumns={() => { }} datum={data} setDatum={setFilterData} columnFilter={false} />
                                }
                            </div>
                        </div>
                        <div className="card-body hover-scroll-overlay-y">
                            <div className="d-flex h-100 flex-column flex-lg-row">
                                <div className="d-flex">
                                    <ul className="nav nav-tabs nav-pills flex-row gap-2 flex-lg-column border-0 me-5 mb-3 mb-md-0 fs-6 min-w-lg-200px">
                                        <li className="nav-item  me-0 mb-md-2">
                                            <Link className={`nav-link w-100 btn btn-flex btn-active-light-success ${toggleForm ? null : 'active'}`} to={''} onClick={() => {
                                                setToggleForm(false)
                                            }} data-bs-toggle="tab" >
                                                <UsersSvg clsName="svg-icon svg-icon-1 svg-icon-primary" />
                                                <span className="d-flex flex-column align-items-start">
                                                    <span className="fs-4 fw-bold">View</span>
                                                    <span className="fs-7">Vendor Details</span>
                                                </span>
                                            </Link>
                                        </li>
                                        <li className="nav-item me-0 mb-md-2">
                                            <Link className={`nav-link w-100 btn btn-flex btn-active-light-success ${toggleForm ? 'active' : null}`} to={''} onClick={() => {
                                                setVendorId(0)
                                                setVendorPost(vendorDefaultValue)
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
                                </div>
                                <div className="w-100 hover-scroll-overlay-y">
                                    {
                                        toggleForm
                                            ? <VendorForm
                                                vendor={vendorPost}
                                                setVendor={setVendorPost}
                                                formError={formError}
                                                setFormError={setFormError}
                                            />
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