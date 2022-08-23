import axios from "axios"
import { useEffect, useMemo, useState } from "react"
import { PdfViewer } from "../components/components/PdfViewer"
import { Error } from "../components/components/Error"
import { Loading } from "../components/components/Loading"
import { Modal, ModalContent, ModalHeader } from "../components/components/Model"
import { TableGridComponent } from "../components/components/TableComponent"
import { MailSvg, RecallSvg, RemoveSvg, ViewSvg } from "../components/Svg/Svg"
import moment from "moment"
import { Link } from "react-router-dom"

export const Inbox = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [isBinLoading, setIsBinLoading] = useState<boolean>(false)
    const [isBinError, setIsBinError] = useState<boolean>(false)
    const [tabToggle, setTabToggle] = useState<'Inbox' | 'Bin'>('Inbox')
    const [dataFetch, setDataFetch] = useState<boolean>(true)

    const [pdfUrl, setPdfUrl] = useState('')




    const columns = useMemo(() => [
        {
            id: 1,
            header: 'Action',
            accessor: 'Action',
            cell: (data) => {
                return (
                    <div className="d-flex justify-content-evenly">
                        {
                            data.Status === 3
                                ? <Link to={''} role={'button'} title={'View'} data-bs-toggle="modal" onClick={() => console.log(pdfUrl)} data-bs-target="#reactModal">
                                    <ViewSvg role={"button"} clsName={"svg-icon svg-icon-primary svg-icon-2"} function={() => {

                                        setPdfUrl(data.FileURL)
                                    }} />
                                </Link>
                                : <Link to={''} role={'button'} title={'Reprocess'} >
                                    <RecallSvg role={"button"} clsName={"svg-icon svg-icon-primary svg-icon-2"} />
                                </Link>

                        }
                    </div>
                )
            },
            className: 'min-w-50px'
        },
        {
            id: 2,
            header: 'From',
            accessor: 'FromAddress',
            className: 'min-w-150px',
            cell: (data) => {
                return (
                    <div className="d-flex">
                        <div className="symbol symbol-25px align-self-center ">
                            <div className="symbol-label fs-6 fw-bold text-success">{data?.FromAddress[0]?.toUpperCase()}</div>
                        </div>
                        <div className='mx-2'>
                            <p className='pt-4 fs-5 fw-bold text-start text-gray-800' >{data?.FromAddress}</p>
                        </div>
                    </div>
                )
            },
            sortable: true
        },
        {
            id: 3,
            header: 'Subject',
            accessor: 'Subject',
            className: 'min-w-300px',
            sortable: true
        },
        {
            id: 4,
            header: 'Received Date',
            accessor: 'ReceivedDateTime',
            className: 'min-w-150px',
            cell: (data) => moment(data.ReceivedDateTime).format('MM-DD-YYYY'),
            sortable: true
        },
        {
            id: 5,
            header: 'Invoice Date',
            accessor: 'InvoiceDateTime',
            className: 'min-w-150px',
            cell: (data) => moment(data.InvoiceDateTime).format('MM-DD-YYYY'),
            sortable: true
        },
        {
            id: 6,
            header: 'Invoice Number',
            accessor: 'InvoiceNumber',
            className: 'min-w-150px',
            sortable: true
        },
        {
            id: 7,
            header: 'Total',
            accessor: 'TotalAmount',
            className: 'min-w-150px',
            cell: (data) => `$ ${data.TotalAmount.toFixed(2)}`,
            sortable: true
        },
        {
            id: 8,
            header: 'Status',
            accessor: 'Status',
            className: 'min-w-150px',
            cell: (data) => {
                let statusColor = 'primary'
                switch (data.Status) {
                    case 3:
                        statusColor = 'primary'
                        break
                    case 5:
                        statusColor = 'warning'
                        break
                    case 1:
                        statusColor = 'success'
                        break
                    default:
                        statusColor = 'primary'
                        break
                }
                return <span className={`badge badge-light-${statusColor}`} >{data.StatusText}</span>
            },
            sortable: true
        }
    ], [pdfUrl])

    const [binData, setBinData] = useState([])
    const [InboxData, setInboxData] = useState([])



    useEffect(() => {
        setIsLoading(true)
        setIsBinLoading(true)
        const fetchData = setInterval(() => {
            if (dataFetch) {
                axios.get(`${process.env.REACT_APP_BACKEND_BASEURL}/InvoiceProcess/Inbox`)
                    .then(res => {
                        setInboxData(res.data)
                        setIsLoading(false)
                        console.log(dataFetch)
                    })
                    .catch(err => {
                        setIsLoading(false)
                        setIsError(true)
                        console.log(err)
                    })
            } else {
                setIsLoading(false)
                setIsBinLoading(false)
            }
        }, 3000)
        axios.get(`${process.env.REACT_APP_BACKEND_BASEURL}/InvoiceProcess/Trash`)
            .then(res => {
                setBinData(res.data)
                setIsBinLoading(false)
            })
            .catch(err => {
                setIsBinLoading(false)
                setIsBinError(true)
                console.log(err)
            })
        return () => {
            clearInterval(fetchData)
        }
    }, [dataFetch])

    return (
        <>
            <div className="container-fluid">
                <div className="row my-10">
                    <div className="col">
                        <h4 className="text-white">Inbox</h4>
                    </div>
                </div>
                <div className="row ">
                    <div className="col">

                        <div className="card card-flush shadow-sm" style={{ height: '75vh' }}>
                            <div className="card-header bg-white">
                                <h3 className="card-title fw-bolders">Inbox</h3>
                                <div className="card-toolbar">
                                    <ul className="nav nav-tabs nav-line-tabs nav-stretch fs-6 border-1 fw-bold ">
                                        <li className="nav-item">
                                            <Link to={''} role={'button'} className={`nav-link ${tabToggle === 'Inbox' ? 'active' : null}`} onClick={() => setTabToggle('Inbox')} ><MailSvg clsName="svg-icon svg-icon-primary svg-icon-3 me-1" />Inbox</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to={''} role={'button'} className={`nav-link ${tabToggle === 'Bin' ? 'active' : null}`} onClick={() => setTabToggle('Bin')} ><RemoveSvg clsName="svg-icon svg-icon-danger svg-icon-3 me-1" />Trash</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="card-body card-scroll">
                                {
                                    tabToggle === 'Inbox'
                                        ? <>
                                            {
                                                isLoading
                                                    ? <Loading />
                                                    : isError
                                                        ? <Error />
                                                        : <TableGridComponent data={InboxData} columns={columns} selectable={true} setData={setInboxData} filter={true} setDataFetch={setDataFetch} />
                                            }
                                        </>
                                        : <>
                                            {
                                                isBinLoading
                                                    ? <Loading />
                                                    : isBinError
                                                        ? <Error />
                                                        : <TableGridComponent data={binData} columns={columns} selectable={true} setData={setInboxData} filter={true} setDataFetch={setDataFetch} />
                                            }
                                        </>
                                }
                            </div>
                        </div>
                    </div >
                </div >
            </div>
            <Modal>
                <ModalContent>
                    <ModalHeader title={'Invoice'} />
                    <PdfViewer pdfUrl={pdfUrl}></PdfViewer>
                </ModalContent>
            </Modal>
        </>
    )
}