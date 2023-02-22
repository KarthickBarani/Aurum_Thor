import { Modal } from "react-bootstrap"

export const MyModel = ({ title, body }) => {
    return (
        <Modal>
            <Modal.Header>
                <Modal.Title>
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {body}
            </Modal.Body>
        </Modal>
    )
}