
import { Charts } from "../components/Charts"
import { Table } from "../components/Table"
import { Error } from '../components/Error'
import { Column } from '../components/Column'

import { useState } from "react"
import axios from "axios"
import { Loading } from "../components/Loading"
import { useQuery } from "react-query"




export const Home = (props: {
    setInvNumber: any
    isLoading: boolean
    data: any
    isError: boolean
}) => {


    // const fetchTableData = () => {
    //     return axios.get(`https://invoiceprocessingapi.azurewebsites.net/api/v1/Invoice`)
    // }


    // const { isLoading, data, isError } = useQuery('tableData', fetchTableData)


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
                    {props.isLoading ? <Loading /> : props.isError ? <Error /> : <Table setInvNumber={props.setInvNumber} data={props.data} isTemp={false} columns={Column}>Invoice Details</Table>}
                </div>
            </div>
        </div>
    )
}