import { TableGridComponent } from "../components/TableComponent"

export const VendorTable = (props: {
    columns: any[]
    data: any[]
    setData: Function
    filter: boolean
}) => {
    return (
        <TableGridComponent
            columns={props.columns}
            data={props.data}
            setData={props.setData}
            filter={false}
        />
    )
}