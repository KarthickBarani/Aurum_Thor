import { Loading } from "../components/Loading"
import { TestGrid } from "../components/TableComponent"

export const UserDetails = ({ data, columns }: { data: any[], columns: any[] }) => {
    return (<>
        {
            (data.length > 0) ?
                <TestGrid data={data} columns={columns} setData={() => { }} />
                : <Loading />
        }
    </>
    )
}