import { TestGrid } from "../components/TableComponent"

export const PermissionDetails = ({ data, column }) => {
    return (
        <TestGrid data={data} columns={column} setData={() => { }} />
    )
}