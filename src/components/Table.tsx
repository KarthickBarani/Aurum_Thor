import { useTable, useSortBy, useGlobalFilter } from 'react-table'
import React from 'react'
import { useNavigate } from 'react-router-dom'


type InvoiceData = {
    InvoiceId: number,
    CustomerName: string,
    CustomerId: string,
    VendorName: string,
    VendorAddress: string,
    VendorAddressRecipient: string,
    InvoiceNumber: string,
    CustomerAddress: string,
    CustomerAddressRecipient: string,
    ShippingAddress: string,
    ShippingAddressRecipient: string,
    BillingAddress: string,
    BillingAddressRecipient: string,
    RemittanceAddress: string,
    RemittanceAddressRecipient: string,
    PurchaseNumber: string,
    DueDate: string,
    InvoiceDate: string,
    TotalAmount: number,
    LineItems: string,
    AmountDue: number,
    LastModifiedDateTime: string,
    TransactionDate: string,
    ReceivedDate: string

}[]


export const Table = (props:
    {
        setPass: Function
        data: any
    }) => {


    const data: InvoiceData = props.data




    const navigation = useNavigate()


    const columns = React.useMemo(
        () =>
            [
                {
                    Header: '#',
                    accessor: 'InvoiceId',

                },
                {
                    Header: 'Action',
                    accessor: 'Action',
                    Cell: () => {
                        return (
                            <>
                                <span role='button' className="svg-icon svg-icon-primary svg-icon-1"><svg
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path opacity="0.3"
                                        d="M19 22H5C4.4 22 4 21.6 4 21V3C4 2.4 4.4 2 5 2H14L20 8V21C20 21.6 19.6 22 19 22Z"
                                        fill="black" />
                                    <path d="M15 8H20L14 2V7C14 7.6 14.4 8 15 8Z" fill="black" />
                                </svg></span>&nbsp;&nbsp;

                                <span role='button'
                                    className="svg-icon svg-icon-warning svg-icon-1"><svg xmlns="http://www.w3.org/2000/svg"
                                        width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path opacity="0.3"
                                            d="M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z"
                                            fill="black" />
                                        <path
                                            d="M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z"
                                            fill="black" />
                                    </svg>
                                </span>&nbsp;&nbsp;
                                <span role="button" data-bs-toggle="popover" data-bs-dismiss="true" data-bs-placement="top" title="Error Code: No Error" className="svg-icon svg-icon-danger svg-icon-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="black" />
                                    <rect x="11" y="14" width="7" height="2" rx="1" transform="rotate(-90 11 14)" fill="black" />
                                    <rect x="11" y="17" width="2" height="2" rx="1" transform="rotate(-90 11 17)" fill="black" />
                                </svg></span>
                            </>
                        )
                    }
                },
                {
                    Header: 'Recevied Date',
                    accessor: row => new Date(row.ReceivedDate).toLocaleString(),

                },
                {
                    Header: 'Vendor Id',
                    accessor: 'vendorId',
                },
                {
                    Header: 'Vendor',
                    accessor: 'VendorName',
                },
                {
                    Header: 'Invoice Date',
                    accessor: (row) => new Date(row.InvoiceDate).toLocaleDateString(),
                },
                {
                    Header: 'Inv #',
                    accessor: 'InvoiceNumber',
                }, {
                    Header: 'Due Amount',
                    accessor: 'AmountDue',
                }, {
                    Header: 'PO',
                    accessor: 'PurchaseNumber',
                }, {
                    Header: 'PO Status',
                    accessor: 'poStatus',
                }, {
                    Header: 'Terms',
                    accessor: 'terms',

                }, {
                    Header: 'Assignment',
                    accessor: 'assignment',
                }, {
                    Header: 'Updated',
                    accessor: 'updated',
                }, {
                    Header: 'Currency',
                    accessor: 'currency',
                }, {
                    Header: 'Total',
                    accessor: (row: { TotalAmount: number }) => `$ ${row.TotalAmount.toFixed(2)}`,

                }
            ],
        []
    )
    const hideCols = ['terms', 'updated', 'assignment', 'currency']
    const initialState = { ...columns, hiddenColumns: hideCols }

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



    return (
        <div className="card card-flush card-stretch shadow-sm">
            <div className="card-header">
                <span className="card-title fw-bolder fs-4 text-gray-800" > Invoice Details
                </span>

                <div className="card-toolbar">
                    <span className='sm-ms-auto'><input value={globalFilter || ''} onChange={e => { setGlobalFilter(e.target.value) }} className='form-control form-control-solid' placeholder='Search Here' /></span>
                    <button type="button" className="btn btn-light m-2" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-start">
                        Columns
                    </button>
                    <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-200px py-4" data-kt-menu="true">
                        <div className="menu-item px-3 el">
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
            <div className="card-body ">
                <ul className="nav nav-tabs nav-line-tabs nav-line-tabs-2x mb-5 fs-6">
                    <li className="nav-item">
                        <a className="nav-link active" data-bs-toggle="tab" href="#pending"><p className="fw-bolder fs-6 text-gray-800"><span className="svg-icon svg-icon-warning svg-icon-2x"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="black" />
                            <rect x="11" y="14" width="7" height="2" rx="1" transform="rotate(-90 11 14)" fill="black" />
                            <rect x="11" y="17" width="2" height="2" rx="1" transform="rotate(-90 11 17)" fill="black" />
                        </svg></span> Pending<span className="badge badge-circle badge-sm badge-danger ms-2">4</span></p>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="tab" href="#myApprovalTab"><p className="fw-bolder fs-6 text-gray-800"><span className="svg-icon svg-icon-success svg-icon-2x"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path opacity="0.5" d="M12.8956 13.4982L10.7949 11.2651C10.2697 10.7068 9.38251 10.7068 8.85731 11.2651C8.37559 11.7772 8.37559 12.5757 8.85731 13.0878L12.7499 17.2257C13.1448 17.6455 13.8118 17.6455 14.2066 17.2257L21.1427 9.85252C21.6244 9.34044 21.6244 8.54191 21.1427 8.02984C20.6175 7.47154 19.7303 7.47154 19.2051 8.02984L14.061 13.4982C13.7451 13.834 13.2115 13.834 12.8956 13.4982Z" fill="black" />
                            <path d="M7.89557 13.4982L5.79487 11.2651C5.26967 10.7068 4.38251 10.7068 3.85731 11.2651C3.37559 11.7772 3.37559 12.5757 3.85731 13.0878L7.74989 17.2257C8.14476 17.6455 8.81176 17.6455 9.20663 17.2257L16.1427 9.85252C16.6244 9.34044 16.6244 8.54191 16.1427 8.02984C15.6175 7.47154 14.7303 7.47154 14.2051 8.02984L9.06096 13.4982C8.74506 13.834 8.21146 13.834 7.89557 13.4982Z" fill="black" />
                        </svg></span> My Approvals</p></a>
                    </li>
                </ul>
                <div className="tab-content">
                    <div className="tab-pane fade show active" id="myApprovalTab" role="tabpanel">
                        <div className="table-responsive">
                            <table {...getTableProps()} className='table table-rounded table-hover gs-3 gx-3 '>
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
                                            <tr role={'button'} onClick={() => {
                                                props.setPass(row.original.InvoiceId)
                                                setTimeout(() => navigation('/InvoiceDetail'), 1)
                                            }}
                                                {...row.getRowProps()} >
                                                {
                                                    row.cells.map(cell => {
                                                        return (
                                                            <td
                                                                {...cell.getCellProps()}
                                                            >
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
                    </div>
                </div>
            </div>
        </div>
    )
}
