import { TestGrid } from "../components/TableComponent"

export const UserDetails = ({ data, columns }) => {
    return (
        <TestGrid data={data} columns={columns} setData={() => { }} />
    )
}