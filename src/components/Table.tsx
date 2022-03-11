import { useTable, useSortBy, useGlobalFilter } from 'react-table'

import { useNavigate } from 'react-router-dom'
import { invDetailsType } from './Interface'



export const Table = (props:
    {
        setInvNumber: Function
        data: any
        isTemp: boolean
        children: string
        columns: any
    }) => {

    const navigation = useNavigate()

    const data: invDetailsType = props.data

    const columns = props.columns

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
                <span className="card-title fw-bolder fs-4 text-gray-800" > {props.children}
                </span>

                <div className="card-toolbar">
                    <span className='sm-ms-auto'><input value={globalFilter || ''} onChange={e => { setGlobalFilter(e.target.value) }} className='form-control form-control-solid' placeholder='Search Here' /></span>
                    <div className='dropdown'>
                        <button type="button" className="btn btn-light m-2 dropdown-toggle" data-bs-toggle="dropdown" >
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
                {props.isTemp ?
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
                    :
                    null}
                <div className="tab-content">
                    <div className="tab-pane fade" id="myApprovalTab" role="tabpanel">
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
                                                props.setInvNumber(row.original.InvoiceId)
                                                setTimeout(() => navigation('/InvoiceDetail'), 1)
                                            }}
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
                    </div>
                    <div className="tab-pane fade show active" id="pending" role="tabpanel">
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
                                                props.setInvNumber(row.original.InvoiceId)
                                                setTimeout(() => navigation('/InvoiceDetail'), 1)
                                            }}
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
                    </div>
                </div>
            </div>
        </div>
    )
}
