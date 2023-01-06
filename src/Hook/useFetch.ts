import { useEffect, useState } from "react";
import { axiosGet } from "../helpers/Axios";

export const useFetch = (url: string) => {
    const [isLoading, setLoading] = useState<boolean>(true)
    const [isError, setError] = useState<boolean>(false)
    const [data, setData] = useState<any>(undefined)

    useEffect(() => {
        axiosGet(url)
            .then(res => {
                console.log()
                setData(res.data)
            })
            .catch(err => {
                setError(true)
            })
            .finally(() => setLoading(false))
    }, [])

    return { isLoading, isError, data }
}