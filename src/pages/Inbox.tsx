import { useState } from "react"
import { PdfViewer } from "../components/Auth/PdfViewer"
import { Modal, ModalContent, ModalHeader } from "../components/components/Model"
import { TableComponent, TableFilterComponent } from "../components/components/TableComponent"
import { DownloadSvg, ViewSvg } from "../components/Svg/Svg"

export const Inbox = () => {


    const columns = [
        {
            id: 1,
            header: 'From',
            accessor: 'From',
            className: 'min-w-150px dragEl',
            cell: (data) => {
                return (
                    <div className="d-flex">
                        <div className="symbol symbol-25px align-self-center ">
                            <div className="symbol-label fs-6 fw-bold text-success">{data?.From[0]}</div>
                        </div>
                        <div className='mx-2'>
                            <p className='pt-4 fs-5 text-start text-gray-800' >{data.From}</p>
                        </div>
                    </div>
                )
            }
        },
        {
            id: 2,
            header: 'Received Date',
            accessor: 'ReceivedDate',
            className: 'min-w-150px'
        },
        {
            id: 3,
            header: 'Subject',
            accessor: 'Subject',
            className: 'min-w-150px'
        },
        {
            id: 4,
            header: 'Status',
            accessor: 'Status',
            className: 'min-w-150px',
            cell: (data) => {
                return <span className={`badge badge-light-${data.Status === 'Processing' ? 'primary' : 'warning'}`} >{data.Status}</span>
            }
        },
        {
            id: 5,
            header: 'Action',
            accessor: 'Action',
            cell: (data) => {
                return (
                    <div className="d-flex justify-content-evenly">
                        <a role={'button'} title={'View'} data-bs-toggle="modal" data-bs-target="#reactModal">
                            <ViewSvg role={"button"} clsName={"svg-icon svg-icon-primary svg-icon-2"} />
                        </a>
                        <DownloadSvg role={"button"} clsName={"svg-icon svg-icon-warning svg-icon-2"} />
                    </div>
                )
            },
            className: 'min-w-150px'
        },

    ]

    const data = [
        { "From": "nblonfield0@theguardian.com", "ReceivedDate": "12/29/2021", "Subject": "Vestibulum ac est lacinia nisi venenatis tristique..", "Status": "Processing" },
        { "From": "relan1@freewebs.com", "ReceivedDate": "10/17/2021", "Subject": "Vestibulum Aliquam erat volutpat. In congue.", "Status": "Pending" },
        { "From": "egenese2@imgur.com", "ReceivedDate": "9/7/2021", "Subject": "Ut at dolor quis odio consequat varius. Integer ac leo.", "Status": "Processing" },
        { "From": "harnecke3@hao123.com", "ReceivedDate": "7/31/2021", "Subject": "Suspendisse potenti. Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet.", "Status": "Processing" },
        { "From": "mhrihorovich4@un.org", "ReceivedDate": "10/17/2021", "Subject": "Mauris egestas metus. Aenean fermentum.", "Status": "Pending" }
    ]
    console.log(data[0].From)
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
                                    <input type="text" placeholder="Search here" className="form-control form-control-solid form-control-sm" />
                                </div>
                            </div>
                            <div className="card-body">
                                <TableComponent data={data} columns={columns} selectable={true} />
                            </div>
                        </div>
                    </div >
                </div >
            </div>
            <Modal>
                <ModalContent>
                    <ModalHeader title={'Invoice'} />
                    <PdfViewer pdfUrl={10}></PdfViewer>
                </ModalContent>
            </Modal>
        </>
    )
}