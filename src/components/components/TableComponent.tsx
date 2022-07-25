import React, { useState } from "react"
import { factory } from "typescript"


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
    columnFilter: boolean
}) => {

    const changeHandler = (e, index) => {
        if (e.target.type === 'checkbox') {
            const array = [...props?.columns]
            array[index].hidden = !e.target.checked
            return props?.setColumns(array)
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
            {
                props.columnFilter
                    ?
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
                    : null
            }
        </div>
    )
}

export const TableComponent = (props:
    {
        columns: any[]
        data: any[]
        selectable?: Boolean
    }) => {


    const changeHandler = (e, index) => {
        const array = [...currentData]
        const type = e.target.type
        if (type === 'checkbox') {
            array[index].isSelect = e.target.checked
            setCurrentData(array)
        }
    }

    const setIsSelectProperty = (array) => {
        const finalArray: any[] = []
        array.forEach(element => {
            finalArray.push({ ...element, isSelect: false })
        });
        return finalArray
    }

    const [currentColumns, setCurrentColumns] = useState([...props.columns])
    const [currentData, setCurrentData] = useState(setIsSelectProperty(props.data))
    console.log(currentData)

    return (

        <div className="table-responsive">
            <table className="table table-hover gy-3 gs-7 table-rounded">
                <thead className="fw-bolder fs-6 text-gray-800">
                    <tr className="border-bottom-2 border-gray-200 ">
                        {props.selectable ? <th key={0}><div className="form-check form-check-custom form-check-solid form-check-sm">
                            <input className="form-check-input" type="checkbox" checked={false} />
                        </div></th> : null}
                        {props.columns.map(column => (<th key={column.id}>{column.header}</th>))}
                    </tr>
                </thead>
                <tbody>
                    {
                        currentData?.map((datum, index) => (
                            <tr key={index}>
                                {
                                    <>
                                        {props.selectable ? <td key={0}><div className="form-check form-check-custom form-check-solid form-check-sm">
                                            <input className="form-check-input" type="checkbox" checked={datum?.isSelect} onChange={(e) => changeHandler(e, index)} />
                                        </div></td> : null}
                                        {/* {props.columns.map(column => <td key={column.id}>{datum[column.accessor]}</td>)} */}
                                        {currentColumns.map(header => {
                                            return header.hidden ?
                                                null
                                                :
                                                (
                                                    <td key={header.accessor} id={header.accessor} >
                                                        {

                                                            header.input
                                                                ?
                                                                <select name={header.accessor} className="form-select form-select-transparent form-select-sm" value={datum[header.accessor]} >
                                                                    <option key={0} value={0}></option>
                                                                    {header.input.inputSrc.map(
                                                                        src => (<option key={src[header.input.srcId]} value={src[header.input.srcId]} >{src[header.input.srcName]}</option>)
                                                                    )}
                                                                </select>
                                                                :
                                                                header.isEdit ? <input type={header.type} className='form-control form-control-transparent form-control-sm' autoFocus name={header.accessor} value={datum[header.accessor]} />
                                                                    :
                                                                    header?.cell ? header?.cell(datum) : datum[header.accessor]
                                                        }
                                                    </td>)
                                        })}
                                    </>
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}