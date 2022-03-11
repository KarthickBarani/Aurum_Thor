import { Table } from "../components/Table"
import { InvoiceColumn } from '../components/Column'


export const InvoiceDetailsTable = (props: {
    setInvNumber: Function
    data: any
}) => {
    return (
        <div className="container-fluid">
            <div className="row mt-10">
                <div className="col">
                    <h4 className="text-white" >Approval</h4>
                </div>
            </div>
            <div className="row mt-10">
                <div className="col">
                    <Table setInvNumber={props.setInvNumber} data={props.data} isTemp={true} columns={InvoiceColumn} >Approval</Table>
                </div>
            </div>
        </div>

    )
}