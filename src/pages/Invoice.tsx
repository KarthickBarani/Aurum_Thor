import { useEffect, useState } from "react"
import { Table } from "../components/Home/Table"
import { TestGrid } from "../components/components/TableComponent"
import axios from "axios"
import { axiosGet } from "../helpers/Axios"
import { invDetailsType } from "../components/Interface/Interface"
import { ViewSvg } from "../components/Svg/Svg"
import { useNavigate } from "react-router-dom"

export const Invoice = () => {

    const navigation = useNavigate()
    const [invoices, setInvoices] = useState<invDetailsType[]>([])

    const columns = [
        {
            id: 'InvoiceId',
            header: '#',
            accessor: 'InvoiceId',

        },
        // {
        //     id: 'select',
        //     header: '',
        //     accessor: 'select',
        //     Cell: ({ row }) => {
        //         return (
        //             row.original.StatusId === 6 ?
        //                 <input type="checkbox" className='form-check'
        //                     onChange={(e) => {
        //                         row.row.values.select = e.target.checked
        //                         console.log(`${row.row.index}`, row.row.values.select)
        //                     }}
        //                 /> : null
        //         )
        //     }

        // },
        {
            id: 'Action',
            header: 'Action',
            accessor: 'Action',
            cell: ({ row }) => {
                return (
                    <>
                        <div className="d-flex gap-2">
                            <ViewSvg
                                role='button'
                                title={'Detail View'}
                                clsName='svg-icon svg-icon-primary svg-icon-1'
                                function={() => {
                                    // props.setInvNumber(row.values.InvoiceId)
                                    return navigation('/InvoiceDetail')
                                }} />
                            {/* {
                                row.original.ErrorList.length > 0
                                    ?
                                    <ErrorSvg role={'button'} title={row.original.ErrorList.length > 0 ? row.original.ErrorList[0] : 'Error code not found'} clsName='svg-icon svg-icon-danger svg-icon-1' />
                                    : null
                            } */}
                        </div>
                    </>
                )
            }
        },
        {
            id: 'ReceivedDate',
            header: 'Recevied Date',
            accessor: 'ReceivedDate',
            // cell: ({ row }) => new Date(row.values.ReceivedDate).toLocaleString(),
            width: '300px'

        },
        {
            id: 'VendorId',
            header: 'Vendor Id',
            accessor: 'VendorId',
        },
        {
            id: 'VendorName',
            header: 'Vendor',
            accessor: 'VendorName',
        },
        {
            id: 'InvoiceDate',
            header: 'Invoice Date',
            accessor: 'InvoiceDate',
            // cell: ({ row }) => new Date(row.values.InvoiceDate).toLocaleDateString(),
        },
        {
            id: 'InvoiceNumber',
            header: 'Inv #',
            accessor: 'InvoiceNumber',
        },
        // {
        //     id: 'AmountDue',
        //     header: 'Due Amount',
        //     accessor: (row) => `$ ${row.AmountDue.toFixed(2)}`,
        // },
        {
            id: 'PurchaseNumber',
            header: 'PO',
            accessor: 'PurchaseNumber',
        }, {
            id: 'poStatus',
            header: 'PO Status',
            accessor: 'poStatus',
        }, {
            id: 'terms',
            header: 'Terms',
            accessor: 'terms',

        }, {
            id: 'assignment',
            header: 'Assignment',
            accessor: 'assignment',
        }, {
            id: 'updated',
            header: 'Updated',
            accessor: 'updated',
        }, {
            id: 'currency',
            header: 'Currency',
            accessor: 'currency',
        },
        {
            id: 'TotalAmount',
            header: 'Total',
            accessor: 'TotalAmount',
            // Cell: ({ row }) => `$ ${row.values.TotalAmount.toFixed(2)}`,

        }
        , {
            id: 'StatusId',
            header: 'Status',
            accessor: 'StatusId',
            // cell: ({ row }) => {
            //     let style = 'primary'
            //     switch (row.original.StatusId) {
            //         case 3:
            //             style = 'warning'
            //             break
            //         case 4:
            //             style = 'success'
            //             break
            //         case 5:
            //             style = 'danger'
            //             break
            //         case 6:
            //             style = 'success'
            //             break
            //         default:
            //             style = 'primary'
            //             break
            //     }
            //     return <span className={`badge badge-light-${style}`} >{`${row.original.StatusText}`}</span>
            // }
        }
        , {
            id: 'PendingWith',
            header: 'Pending With',
            accessor: 'PendingWith',
            Cell: ({ row }) => row.original.StatusId === 3 ? row.original.PendingWith : null
        }
    ]

    useEffect(() => {
        axiosGet('/Invoice')
            .then(res => {
                setInvoices(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <>
            <div className="container-fluid">
                <div className="row my-10">
                    <div className="col">
                        <h4 className="text-white">Invoice</h4>
                    </div>
                </div>
                <div className="row ">
                    <div className="col">
                        <div className="card card-flush shadow-sm" style={{ height: '75vh' }}>
                            <div className="card-header bg-white">
                                <h3 className="card-title fw-bolders">Invoice</h3>
                            </div>
                            <div className="card-body overflow-hidden">
                                <TestGrid data={invoices} columns={columns} setData={() => { }} />
                            </div>
                        </div>
                    </div >
                </div >
            </div>
        </>
    )
}