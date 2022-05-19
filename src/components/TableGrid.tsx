

export const TableGrid = (props: {
    getTableProps: Function
    getTableBodyProps: Function
    headerGroups: any
    rows: any
    prepareRow: any
    isTemp: boolean

}) => {



    return (

        <div className="card-body card-scroll" style={{ 'height': '45vh' }}>
            <div className="table-responsive">
                <table {...props.getTableProps()} className='table table-rounded table-hover gs-3 gx-3'>
                    <thead className='fw-bolder fs-6'>
                        {props.headerGroups.map(headerGroup => (
                            <tr  {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th{...column.getHeaderProps(column.getSortByToggleProps())} >
                                        {column.render('Header')}
                                        <span className='ps-3 text-end'>
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
                    <tbody {...props.getTableBodyProps()} className='fw-bold fs-7' >
                        {props.rows.map(row => {
                            props.prepareRow(row)
                            return (
                                <tr className={row.values.select === true ? 'table-active' : ''} {...row.getRowProps()} >
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
    )
}