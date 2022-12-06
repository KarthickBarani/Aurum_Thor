import { Children } from "react"

export const Modal = ({ children }) => {
    return (
        <div className="modal fade-in" id="reactModal">
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                {children}
            </div>
        </div>
    )
}

export const ModalHeader = ({ title }) => {
    return (
        <div className="modal-header">
            <h3 className="modal-title">{title}</h3>
            <div className="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
                X
            </div>
        </div>
    )
}


export const ModalContent = ({ children }) => {
    return (
        <div className="modal-content">
            <div className="modal-body">
                {children}
            </div>
        </div>
    )
}