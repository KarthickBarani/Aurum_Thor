import { TestGrid } from "../components/TableComponent"

export const ApprovalHistory = ({ data, columns }) => {
    return (
        <TestGrid data={data} columns={columns} setData={() => { }} draggable={true} />
    )

}