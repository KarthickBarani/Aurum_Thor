import axios from "axios"
import { isDate } from "moment"
import React, { useEffect, useState } from "react"
import { SweetAlert } from "../../Function/alert"
import { setIsSelectProperty } from "../../Function/setSelect"
import { DownArrowSvg, RemoveSvg, UpArrowSvg } from "../Svg/Svg"


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
        props.setDatum([...props.datum]?.filter(
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
                                        return <div key={column.id} className="d-flex justify-content-even gap-2">
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

export const TableGridComponent = (props:
    {
        columns: any[]
        data: any[]
        setData: Function
        selectable?: Boolean
        sortable?: {
            startIndex?: number | undefined
            endIndex?: number | undefined
        }

    }) => {


    const [currentColumns, setCurrentColumns] = useState([...props.columns])
    const [currentData, setCurrentData] = useState(setIsSelectProperty([...props.data]))
    const [masterCheck, setMasterCheck] = useState(false)
    const [sortOption, setSortOption] = useState<'NONE' | 'ACS' | 'DES'>('NONE')


    useEffect(() => {
        setCurrentData(setIsSelectProperty([...props.data]))
    }, [props.data])

    useEffect(() => {
        setCurrentColumns([...props.columns])
    }, [props.columns])

    const isMasterCheck = (): boolean => {
        return currentData.every(data => data.isSelect === true)
    }

    const sort = (array, key, type) => {
        const sortArray = [...array].sort((a, b) => {
            const sortType = (current, next) => {
                if (type === 'ACS') return current - next
                if (type === 'DES') return next - current
                return 0
            }

            if (typeof a[key] === 'string') {
                if (new Date(a[key]).toString() !== 'Invalid Date') {
                    console.log('date')
                    return sortType(Number(new Date(a[key])), Number(new Date(b[key])))
                }
                if (a[key].toUpperCase() < b[key].toUpperCase()) {
                    return type === 'ACS' ? -1 : 1
                }
                else {
                    return type === 'DES' ? -1 : 1
                }
            }
            if (typeof a[key] === 'number') {
                console.log('number')
                return sortType(a, b)
            }
            return 0
        })
        console.log(type, array)
        setCurrentData(type === 'NONE' ? setIsSelectProperty([...props.data]) : sortArray)
        return sortArray
    }

    const changeHandler = (e, index) => {
        const array = [...currentData]
        const originalArray = setIsSelectProperty([...props.data])
        const type = e.target.type
        const name = e.target.name
        if (name === 'masterCheck') {
            array.forEach(el => el.isSelect = e.target.checked)
            setCurrentData(array)
            return setMasterCheck(!masterCheck)
        }
        if (type === 'checkbox') {
            array[index].isSelect = e.target.checked
            setCurrentData(array)
        }
        const keys = originalArray.length > 0 ? Object.keys(originalArray[0]) : []
        if (name === 'globalFilter') {
            if (e.target.value === '') {
                return setCurrentData(originalArray)
            }
            if (keys.length > 0) {
                setCurrentData([...originalArray]?.filter(
                    arr => keys.some(key => {
                        let currentStr: string = arr[key]?.toString()
                        return currentStr?.toLowerCase()?.includes(e.target.value?.toLowerCase())
                    })
                ))
            }
        }
        if (array.length > 0) {
            setMasterCheck(isMasterCheck)
        }
    }

    const removeHandler = () => {
        SweetAlert({
            title: 'Are you sure?',
            text: "Your file has been move to bin",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axios.post(`${process.env.REACT_APP_BACKEND_BASEURL}/api/v1/InvoiceProcess/Delete`, currentData.filter(data => data.isSelect === true))
                        .then(() => {
                            setCurrentData(currentData.filter(data => data.isSelect === false))
                            props.setData(currentData.filter(data => data.isSelect === false))
                            SweetAlert({
                                title: 'Deleted!',
                                text: 'Your file has been deleted.',
                                icon: 'success'
                            })
                        })
                        .catch(() => {
                            SweetAlert({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Something went wrong!',
                            })
                        })
                }
            })
        setMasterCheck(false)
    }

    return (
        <>
            <div className="d-flex  justify-content-between">
                <div>
                    <input type="text" placeholder="Search here" name='globalFilter' className="form-control form-control-solid form-control-sm" onChange={(e) => changeHandler(e, 0)} />
                </div>
                {/* <div>
                    <TableFilterComponent datum={props.data} setDatum={setCurrentData} columns={currentColumns} setColumns={setCurrentColumns} columnFilter={false} />
                </div> */}
                <div>
                    {
                        currentData.some(data => data.isSelect === true)
                            ? <button className="btn btn-icon btn-sm" onClick={removeHandler}><RemoveSvg clsName="svg-icon svg-icon-danger svg-icon-2" /></button>
                            : null
                    }
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-hover gy-3 gs-7 table-rounded">
                    <thead className="fw-bolder fs-6 text-gray-800">
                        <tr className="border-bottom-2 border-gray-200 ">
                            {
                                props.selectable
                                    ? <th key={0}>
                                        <div className="form-check form-check-custom form-check-solid form-check-sm">
                                            <input className="form-check-input" name='masterCheck' type="checkbox" checked={masterCheck} onChange={e => changeHandler(e, 0)} />
                                        </div>
                                    </th>
                                    : null
                            }
                            {
                                props.columns.map((column) => {
                                    return <th key={column.id} role={'button'} className={column.className} onClick={() => {
                                        if (column.sortable) {
                                            const type = sortOption === 'NONE'
                                                ? 'ACS'
                                                : sortOption === 'ACS'
                                                    ? 'DES'
                                                    : sortOption === 'DES'
                                                        ? 'NONE'
                                                        : 'NONE'
                                            setSortOption(type)
                                            if (column.sortable) {
                                                sort(currentData, column.accessor, type)
                                            }
                                        }
                                    }
                                    } >{column.header}{"   "}{
                                            column?.sortable
                                                ? sortOption !== 'NONE'
                                                    ? sortOption === 'ACS'
                                                        ? <DownArrowSvg clsName="svg-icon svg-icon-2 ms-auto" />
                                                        : <UpArrowSvg clsName="svg-icon svg-icon-2 ms-auto" />
                                                    : null
                                                : null
                                        }
                                    </th>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentData?.map((datum, index) => (
                                <tr key={index}>
                                    {
                                        <>
                                            {props.selectable
                                                ? <td key={0}>
                                                    <div className="form-check form-check-custom form-check-solid form-check-sm">
                                                        <input className="form-check-input" type="checkbox" checked={datum?.isSelect} onChange={(e) => changeHandler(e, index)} />
                                                    </div>
                                                </td>
                                                : null}
                                            {currentColumns?.map(header => {
                                                return header.hidden
                                                    ? null
                                                    :
                                                    (
                                                        <td key={header.accessor} id={header.accessor} >
                                                            {

                                                                header.input
                                                                    ? <select name={header.accessor} className="form-select form-select-transparent form-select-sm" value={datum[header.accessor]} >
                                                                        <option key={0} value={0}></option>
                                                                        {header.input.inputSrc.map(
                                                                            src => (<option key={src[header.input.srcId]} value={src[header.input.srcId]} >{src[header.input.srcName]}</option>)
                                                                        )}
                                                                    </select>
                                                                    : header.isEdit
                                                                        ? <input type={header.type} className='form-control form-control-transparent form-control-sm' autoFocus name={header.accessor} value={datum[header.accessor]} />
                                                                        : header?.cell
                                                                            ? header?.cell(datum)
                                                                            : datum[header.accessor]
                                                            }
                                                        </td>
                                                    )
                                            })}
                                        </>
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
