import React from "react"


type columnProps = {
    id: string | number
    header: string | HTMLElement
    accessor: string
    input?: {
        inputType: React.InputHTMLAttributes<HTMLInputElement>
        inputSrc: any[]
        onClick: (e: React.MouseEventHandler<HTMLInputElement>) => {

        }

    }
}[]


export const TableFilterComponent = (props: {
    columns: any[]
    setColumns: Function
    datum: any[]
    setDatum: Function
}) => {

    const changeHandler = (e, index) => {
        if (e.target.type === 'checkbox') {
            const array = [...props.columns]
            array[index].hidden = !e.target.checked
            return props.setColumns(array)
        }
        const keys = props.datum[0] ? Object.keys(props?.datum[0]) : []
        props.setDatum(props.datum?.filter(
            arr => keys.some(key => {
                let currentStr: string = arr[key]?.toString()
                return currentStr?.toLowerCase()?.includes(e.target.value?.toLowerCase())
            })
        ))
    }
    return (
        <div className="d-flex">
            <input type="text" placeholder="Search here" className="form-control form-control-solid form-control-sm" onChange={(e) => changeHandler(e, 0)} />
            <div className='dropdown mx-2'>
                <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-bs-toggle="dropdown" >
                    Columns
                </button>
                <div className="dropdown-menu dropdown-menu-start mt-3 me-3" >
                    <div className="d-flex flex-column h-100 w-200px p-4">
                        {
                            props.columns.map((column, index) => {
                                return <div className="d-flex justify-content-even gap-2">
                                    <input type="checkbox" checked={!column.hidden} onChange={(e) => {
                                        console.log(props.columns)
                                        changeHandler(e, index)
                                    }} />
                                    <label className="fs-5 fw-bolder">{column.headerName}</label>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export const TableComponent = (props:
    {
        columns: columnProps
        data: any
        selectable: Boolean
    }) => {
    return (
        <div className="card">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table">
                        <thead className="fw-bolder fs-6 text-gray-800">
                            <tr>
                                {props.selectable ? <th key={0}><input type={'checkbox'} checked={false} /></th> : null}
                                {props.columns.map(column => (<th key={column.id}>{column.header}</th>))}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.data?.map((datum, index) => (
                                    <tr key={index}>
                                        {
                                            <>
                                                {props.selectable ? <td key={0}><input type={'checkbox'} checked={false} /></td> : null}
                                                {props.columns.map(column => <td key={column.id}>{datum[column.accessor]}</td>)}
                                            </>
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}