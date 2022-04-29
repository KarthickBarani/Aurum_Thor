
import { Charts } from "../components/Charts"
import { Table } from "../components/Table"
import { Error } from '../components/Error'
import { Loading } from "../components/Loading"





export const Home = (props: {
    setInvNumber: Function
    isLoading: boolean
    data: any
    isError: boolean
}) => {


    return (
        <div className="container-fluid">
            <div className="row mt-10">
                <div className="col">
                    <h4 className="text-white" >Dashboard</h4>
                </div>
            </div>
            <div className="row mt-10">
                <div className="col-md-4 my-2 ">
                    <div className="card card-flush shadow-sm">
                        <div className="card-header">
                            <h4 className="card-title">Chart</h4>
                        </div>
                        <div className="card-body">
                            <Charts />
                        </div>
                    </div>
                </div>
                <div className="col-md-4 my-2">
                    <div className="card card-flush shadow-sm">
                        <div className="card-header">
                            <h4 className="card-title">Chart</h4>
                        </div>
                        <div className="card-body">
                            <Charts />
                        </div>
                    </div>
                </div>
                <div className="col-md-4 my-2">
                    <div className="card card-flush shadow-sm">
                        <div className="card-header">
                            <h4 className="card-title">Chart</h4>
                        </div>
                        <div className="card-body">
                            <Charts />
                        </div>
                    </div>
                </div>

            </div>
            <div className="row justify-content-between g-5 my-1">
                <div className="col">
                    {props.isLoading ? <Loading /> : props.isError ? <Error /> : <Table setInvNumber={props.setInvNumber} data={props.data} isTemp={false} >Invoice Details</Table>}
                </div>
            </div>
        </div>
    )
}