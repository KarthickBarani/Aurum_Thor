
import { invDetailsType } from "../components/Interface/Interface"
import { useTable, useSortBy, useGlobalFilter } from 'react-table'
import { useNavigate } from "react-router-dom"
import { useEffect, useMemo, useState } from "react"
import axios from 'axios'
import { Loading } from '../components/components/Loading'
import { Error } from '../components/components/Error'
import { DoubleTickSvg, ErrorSvg, ViewSvg } from '../components/Svg/Svg'



export const InvoiceDetailsTable = (props: {
    setInvNumber: Function
    userId: number
}) => {


    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false)
    const [pending, setPending] = useState([])
    const [approvals, setApprovals] = useState([])
    const [data, setData] = useState([])

    useEffect(() => {
        setIsLoading(true)
        axios.get(process.env.REACT_APP_BACKEND_BASEURL + `/api/v1/Invoice/Pendings/${props.userId}`)
            .then(res => {
                setPending(res.data)
            })
            .catch(err => console.log(err))
        axios.get(process.env.REACT_APP_BACKEND_BASEURL + `/api/v1/Invoice/Approvals/${props.userId}`)
            .then(res => {
                setApprovals(res.data)
                setData(res.data)
                setIsLoading(false)
            })
            .catch(err => {
                setIsLoading(false)
                setError(true)
                console.log(err)
            })
    }, [props.userId])


    const columns = useMemo(() => [
        {
            id: 'InvoiceId',
            Header: '#',
            accessor: 'InvoiceId',

        },
        {
            id: 'select',
            Header: '',
            accessor: 'select',
            Cell: ({ row }) => {
                return (
                    row.original.StatusId === 6 ?
                        <input type="checkbox" className='form-check'
                            onChange={(e) => {
                                row.row.values.select = e.target.checked
                                console.log(`${row.row.index}`, row.row.values.select)
                            }}
                        /> : null
                )
            }

        },
        {
            id: 'Action',
            Header: 'Action',
            accessor: 'Action',
            Cell: ({ row }) => {
                return (
                    <>
                        <ViewSvg
                            role='button'
                            clsName='svg-icon svg-icon-primary svg-icon-1'
                            function={() => {
                                props.setInvNumber(row.values.InvoiceId)
                                setTimeout(() => navigation('/InvoiceDetail'))
                            }} />
                        &nbsp;&nbsp;
                        <ErrorSvg clsName='svg-icon svg-icon-danger svg-icon-1' />
                    </>
                )
            }
        },
        {
            id: 'ReceivedDate',
            Header: 'Recevied Date',
            accessor: 'ReceivedDate',
            Cell: ({ row }) => new Date(row.values.ReceivedDate).toLocaleString(),
            width: '300px'

        },
        {
            id: 'VendorId',
            Header: 'Vendor Id',
            accessor: 'VendorId',
        },
        {
            id: 'VendorName',
            Header: 'Vendor',
            accessor: 'VendorName',
        },
        {
            id: 'InvoiceDate',
            Header: 'Invoice Date',
            accessor: 'InvoiceDate',
            Cell: ({ row }) => new Date(row.values.InvoiceDate).toLocaleDateString(),
        },
        {
            id: 'InvoiceNumber',
            Header: 'Inv #',
            accessor: 'InvoiceNumber',
        },
        // {
        //     id: 'AmountDue',
        //     Header: 'Due Amount',
        //     accessor: (row) => `$ ${row.AmountDue.toFixed(2)}`,
        // },
        {
            id: 'PurchaseNumber',
            Header: 'PO',
            accessor: 'PurchaseNumber',
        }, {
            id: 'poStatus',
            Header: 'PO Status',
            accessor: 'poStatus',
        }, {
            id: 'terms',
            Header: 'Terms',
            accessor: 'terms',

        }, {
            id: 'assignment',
            Header: 'Assignment',
            accessor: 'assignment',
        }, {
            id: 'updated',
            Header: 'Updated',
            accessor: 'updated',
        }, {
            id: 'currency',
            Header: 'Currency',
            accessor: 'currency',
        },
        {
            id: 'TotalAmount',
            Header: 'Total',
            accessor: 'TotalAmount',
            Cell: ({ row }) => `$ ${row.values.TotalAmount.toFixed(2)}`,

        }
        , {
            id: 'StatusId',
            Header: 'Status',
            accessor: 'StatusId',
            Cell: ({ row }) => {
                let style = 'primary'
                switch (row.original.StatusId) {
                    case 3:
                        style = 'warning'
                        break
                    case 4:
                        style = 'success'
                        break
                    case 5:
                        style = 'danger'
                        break
                    case 6:
                        style = 'success'
                        break
                    default:
                        style = 'primary'
                        break
                }
                return <span className={`badge badge-light-${style}`} >{`${row.original.StatusText}`}</span>
            }
        }
        , {
            id: 'PendingWith',
            Header: 'Pending With',
            accessor: 'PendingWith',
            Cell: ({ row }) => row.original.StatusId === 3 ? row.original.PendingWith : null
        }
    ], [])



    const navigation = useNavigate()


    const hiddenColumns = ['terms', 'updated', 'assignment', 'currency']
    const initialState = { columns, hiddenColumns }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        state,
        setGlobalFilter,
        prepareRow,
        allColumns,
        getToggleHideAllColumnsProps,
    } = useTable({ columns, data, initialState }, useGlobalFilter, useSortBy)

    const { globalFilter } = state


    const onRowClick = (row) => {
        props.setInvNumber(row.original.InvoiceId)
        navigation('/InvoiceDetail')
    }

    // if (isLoading) return <Loading />

    // if (isError) return <Error />

    return (
        <div className="container-fluid">
            <div className="row mt-10">
                <div className="col">
                    <h4 className="text-white">Approval</h4>
                </div>
            </div>
            <div className="row mt-10">
                <div className="col">
                    <div className="card card-flush card-stretch shadow-sm">
                        <div className="card-header">
                            <span className="card-title fw-bolder fs-4 text-gray-800" >Approval
                            </span>

                            <div className="card-toolbar">
                                <span className='sm-ms-auto'><input value={globalFilter || ''} onChange={e => { setGlobalFilter(e.target.value) }} className='form-control form-control-sm form-control-solid' placeholder='Search Here' /></span>
                                <div className='dropdown'>
                                    <button type="button" className="btn btn-sm btn-light m-2 dropdown-toggle" data-bs-toggle="dropdown" >
                                        Columns
                                    </button>
                                    <div className="dropdown-menu" >
                                        <div className=" px-3">
                                            <input type='checkbox' {...getToggleHideAllColumnsProps()} /> Toggle
                                            All
                                            {allColumns.map(column => {

                                                return (
                                                    < div key={column.id} >
                                                        <label>
                                                            <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
                                                            {column.Header}
                                                        </label>
                                                    </div>
                                                )
                                            }
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body card-scroll" style={{ 'height': '65vh' }}>
                            <>
                                <ul className="nav nav-tabs nav-line-tabs nav-line-tabs-2x mb-5 fs-6">
                                    <li className="nav-item">
                                        <a className="nav-link active" onClick={() => {
                                            setData(approvals)
                                        }} data-bs-toggle="tab" href="#myApprovalTab"><p className="fw-bolder fs-6 text-gray-800"><DoubleTickSvg clsName='svg-icon svg-icon-success svg-icon-1' /> My Approvals</p></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link " onClick={() => {
                                            setData(pending)
                                        }} data-bs-toggle="tab" href="#pending"><p className="fw-bolder fs-6 text-gray-800"><ErrorSvg clsName='svg-icon svg-icon-warning svg-icon-1' /> Pending{pending.length > 0 ? <span className="badge badge-circle badge-sm badge-danger ms-2">{pending.length}</span> : ''}</p>
                                        </a>
                                    </li>
                                </ul>

                                <div className="tab-content">
                                    {
                                        isLoading
                                            ? <Loading />
                                            : isError
                                                ? <Error />
                                                : <div className="table-responsive">
                                                    <table {...getTableProps()} className='table table-rounded table-stripted table-hover gs-3 gx-3'>
                                                        <thead className='fw-bolder fs-6'>
                                                            {headerGroups.map(headerGroup => (
                                                                <tr {...headerGroup.getHeaderGroupProps()}>
                                                                    {headerGroup.headers.map((column) => (
                                                                        <th{...column.getHeaderProps(column.getSortByToggleProps())} >
                                                                            {column.render('Header')}
                                                                            <span className=' ps-3 text-end'>
                                                                                {column.isSorted
                                                                                    ? column.isSortedDesc
                                                                                        ? '     ◢'
                                                                                        : '     ◣'
                                                                                    : ''}
                                                                            </span>
                                                                        </th>
                                                                    ))}
                                                                </tr>
                                                            ))}
                                                        </thead>
                                                        <tbody {...getTableBodyProps()} className='fw-bold fs-7' >
                                                            {rows.map(row => {
                                                                prepareRow(row)
                                                                return (
                                                                    <tr role={'button'} onClick={onRowClick}
                                                                        {...row.getRowProps()} >
                                                                        {
                                                                            row.cells.map(cell => {
                                                                                return (
                                                                                    <td {...cell.getCellProps()}>
                                                                                        {cell.render('Cell')}
                                                                                    </td>
                                                                                )
                                                                            })
                                                                        }
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                    }
                                </div>
                            </>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

