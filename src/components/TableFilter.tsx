export const TableFilter = (props: {
    globalFilter: any
    setGlobalFilter: Function
    getToggleHideAllColumnsProps: Function
    allColumns: any
    children: string
}) => {
    return (
        <>
            <div className="card-header">
                <span className="card-title fw-bolder fs-4 text-gray-800" > {props.children}
                </span>

                <div className="card-toolbar">
                    <span className='sm-ms-auto'><input value={props.globalFilter || ''} onChange={e => { props.setGlobalFilter(e.target.value) }} className='form-control form-control-solid' placeholder='Search Here' /></span>
                    <div className='dropdown'>
                        <button type="button" className="btn btn-light m-2 dropdown-toggle" data-bs-toggle="dropdown" >
                            Columns
                        </button>
                        <div className="dropdown-menu" >
                            <div className=" px-3">
                                <input type='checkbox' {...props.getToggleHideAllColumnsProps()} /> Toggle
                                All
                                {props.allColumns.map(column => {

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
        </>
    )
}