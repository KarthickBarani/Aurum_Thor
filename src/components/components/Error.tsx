import { useNavigate } from "react-router-dom"

export const Error = (props: {
    path?: string
}) => {

    const navigation = useNavigate()

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <h1>Something went wrong!</h1>
            <button className="btn btn-light-primary" onClick={() => props.path ? navigation(props.path) : navigation('/')}>Return to home</button>
        </div>
    )
}