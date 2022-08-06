import axios from "axios"
import { useState } from "react"
import { SaveSvg, SendSvg } from "../Svg/Svg"

export const TableFilter = (props: {
    globalFilter: any
    setGlobalFilter: Function
    getToggleHideAllColumnsProps: Function
    allColumns: any
    rows: any
    children: string
}) => {


    return (
        <>
            <div className="card-header">
                <span className="card-title fw-bolder fs-4 text-gray-800" > {props.children}
                </span>

                <div className="card-toolbar">
                    <span className='sm-ms-auto'><input value={props.globalFilter || ''} onChange={e => { props.setGlobalFilter(e.target.value) }} className='form-control form-control-sm form-control-solid' placeholder='Search Here' /></span>
                    <div className='dropdown'>
                        <button type="button" className="btn btn-sm btn-light m-2 dropdown-toggle" data-bs-toggle="dropdown" >
                            Columns
                        </button>
                        <div className="dropdown-menu dropdown-menu-end mt-3 me-3" >
                            <div className="d-flex w-200px h-300px p-4">
                                <div className="flex-column w-100 overflow-scroll">
                                    <div key={0} >
                                        <label className="form-label">
                                            <input type='checkbox' {...props.getToggleHideAllColumnsProps()} /> Toggle
                                            All
                                        </label>

                                    </div>
                                    {props.allColumns.map(column => {

                                        return (
                                            < div key={column.id} >
                                                <label className="form-label">
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
                    <button onClick={() => console.log(props.rows.filter(arr => arr.values.select)[0]?.values?.InvoiceId)} className="btn btn-success btn-sm"><SendSvg clsName="svg-icon svg-icon-3" /> Post</button>
                </div>
            </div>
        </>
    )
}