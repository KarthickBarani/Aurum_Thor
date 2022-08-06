import { useTable, useSortBy, useGlobalFilter } from 'react-table'
import { invDetailsType } from '../Interface/Interface'
import { TableGrid } from '../Home/TableGrid'
import { TableFilter } from '../Home/TableFilter'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { ErrorSvg, SaveSvg, ViewSvg } from '../Svg/Svg'
import axios from 'axios'



export const Table = (props:
    {
        setInvNumber: Function
        data: any
        isTemp: boolean
        children: string
        userId: number
    }) => {

    type afterDragElementProps = {
        index: number
        header: string
    }

    const [afterDragElement, setAfterDragElement] = useState<afterDragElementProps[]>([] as afterDragElementProps[])
    const defaultColumns = [
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
                                navigation('/InvoiceDetail')
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
    ]
    const [columns, setColumns] = useState(defaultColumns)
    const [process, setProcess] = useState<boolean>(false)

    const replacer = (key, val) => {
        if (typeof val === 'function') {
            return val.toString()
        }
        return val
    }

    const reviver = (key, val) => {
        if (key === 'Cell') {
            return new Function('row', 'return ' + val)()
        }
        return val
    }

    useEffect(() => {
        axios.get(`https://invoiceprocessingapi.azurewebsites.net/api/v1/UserPreference/${props.userId}`)
            .then(res => {
                const col = res.data.find(data => data.ListTypeId === 1)?.Value
                const parse = JSON.parse(col, reviver)
                const array: any[] = []
                parse.forEach(element => {
                    array.push(defaultColumns.find(arr => arr.id === element.id))
                });
                // console.log(JSON.parse(col, reviver))
                // setColumns(defaultColumns)
                setColumns(parse ? array : defaultColumns)
            })
            .catch(err => console.log(err))
    }, [props.userId])

    const navigation = useNavigate()

    const data: invDetailsType = props.data

    useEffect(() => {
        if (afterDragElement.length > 0) {
            const array: any = []
            afterDragElement.forEach((el) => {
                array.push(defaultColumns.find(arr => arr.Header === el.header))
            }
            )
            if (array.length > 0) {
                setColumns(array)
                saveColumnOrder(array)
            }
        }
    }, [afterDragElement])



    const hiddenColumns = ['Due Amount', 'terms', 'updated', 'assignment', 'currency']
    const initialState = { ...columns, hiddenColumns }

    const saveColumnOrder = (array) => {

        axios.post(`https://invoiceprocessingapi.azurewebsites.net/api/v1/UserPreference`, {
            UserId: props.userId,
            ListId: 0,
            ListType: 'Invoice',
            Value: JSON.stringify(array, replacer),
            ModifiedDateTime: null
        })
            .then((res) => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }


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
        <>
            <div className="card card-flush card-stretch shadow-sm">
                <TableFilter globalFilter={globalFilter} rows={rows} setGlobalFilter={setGlobalFilter} getToggleHideAllColumnsProps={getToggleHideAllColumnsProps} allColumns={allColumns}>{props.children}</TableFilter>
                <TableGrid getTableProps={getTableProps} getTableBodyProps={getTableBodyProps} headerGroups={headerGroups} rows={rows} prepareRow={prepareRow} isTemp={false} setAfterDragElement={setAfterDragElement} />
            </div>
        </>
    )
}
