import { Table } from "../components/Table"
import { InvoicePendingColumn, InvoiceMyApprovalColumn } from '../components/Column'
import { Loading } from "../components/Loading"
import { Error } from "../components/Error"


export const InvoiceDetailsTable = (props: {
    setInvNumber: Function
    data: any
    isLoading: Boolean
    isError: Boolean
}) => {

    const columns = {
        InvoicePendingColumn,
        InvoiceMyApprovalColumn
    }


    return (
        <div className="container-fluid">
            <div className="row mt-10">
                <div className="col">
                    <h4 className="text-white" >Approval</h4>
                </div>
            </div>
            <div className="row mt-10">
                <div className="col">
                    {props.isLoading ? <Loading /> : props.isError ? <Error /> : <Table setInvNumber={props.setInvNumber} data={props.data} isTemp={true} columns={InvoiceMyApprovalColumn} >Approval</Table>}
                </div>
            </div>
        </div>

    )
}