import { useNavigate } from "react-router-dom"

export const Error = () => {

    const navigation = useNavigate()

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <h1>Something went wrong!</h1>
            <button className="btn btn-primary btn-sm" onClick={() => navigation('/Home')}>Retry</button>
        </div>
    )
}