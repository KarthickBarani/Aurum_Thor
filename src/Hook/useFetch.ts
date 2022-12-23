import { useState } from "react";
import { AxiosGet } from "../helpers/Axios";

export const useFetch = (url: string) => {
    const [isLoading, setLoading] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false)
    const [data, setData] = useState<any>()
    AxiosGet(url)
        .then(res => {
            setLoading(true)
            setData(res.data)
        })
        .catch(err => {
            setError(true)
        })
        .finally(() => setLoading(false))

    return [isLoading, isError, data]
}