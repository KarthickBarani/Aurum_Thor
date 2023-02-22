
import axios from "axios"
import { Charts } from "../components/Home/Charts"
import { Table } from "../components/Home/Table"
import { Error } from '../components/components/Error'
import { Loading } from "../components/components/Loading"
import { useEffect, useState } from "react"
import { axiosGet } from "../helpers/Axios"
import { invDetailsType } from "../components/Interface/Interface"
import { useFetch } from "../Hook/useFetch"
import { Button } from "react-bootstrap"





export const Home = (props: {
    setInvNumber: Function
    userId: number
}) => {

    const { isLoading, isError, data, isFetched, refetch } = useFetch('/Invoice')

    const [invoicesData, setInvoicesData] = useState<invDetailsType[]>([] as invDetailsType[])

    // const [isLoading, setIsLoading] = useState<boolean>(false)
    // const [isError, setIsError] = useState<boolean>(false)

    // useEffect(() => {
    //     setIsLoading(true)
    //     axiosGet('/Invoice')
    //         .then(res => {
    //             setInvoicesData(res.data)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //             setIsError(true)
    //         })
    //         .finally(() => {
    //             setIsLoading(false)
    //         })
    // }, [])

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
                    {
                        isFetched
                            ? <Table setInvNumber={props.setInvNumber} data={data} isTemp={false} userId={props.userId} >Invoice Details</Table>
                            : isLoading
                                ? <Loading />
                                : isError
                                    ? <Error path={'/Home'} />
                                    : <Table setInvNumber={props.setInvNumber} data={data} isTemp={false} userId={props.userId} >Invoice Details</Table>
                    }
                </div>
            </div>
        </div>
    )
}