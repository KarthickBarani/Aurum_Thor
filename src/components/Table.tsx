import { useTable, useSortBy, useGlobalFilter } from 'react-table'

import { useNavigate } from 'react-router-dom'
import { invDetailsType } from './Interface'
import { TableGrid } from './TableGrid'
import { TableFilter } from './TableFilter'



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


    const hiddenColumns = ['terms', 'updated', 'assignment', 'currency']
    const initialState = { ...props.columns, hiddenColumns }

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
    } = useTable({ columns: props.columns, data, initialState }, useGlobalFilter, useSortBy)

    const { globalFilter } = state



    return (
        <>
            <div className="card card-flush card-stretch shadow-sm">
                <TableFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} getToggleHideAllColumnsProps={getToggleHideAllColumnsProps} allColumns={allColumns}>{props.children}</TableFilter>
                <TableGrid getTableProps={getTableProps} getTableBodyProps={getTableBodyProps} headerGroups={headerGroups} rows={rows} prepareRow={prepareRow} setInvNumber={props.setInvNumber} />
            </div>
        </>
    )
}
