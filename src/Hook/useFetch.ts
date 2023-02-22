import { useEffect, useState } from "react";
import { axiosGet } from "../helpers/Axios";

export const useFetch = (url: string) => {
    const [isLoading, setLoading] = useState<boolean>(true)
    const [isFetched, setIsFetched] = useState<boolean>(false)
    const [fetch, setFetch] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false)
    const [data, setData] = useState<any>(null)


    useEffect(() => {
        axiosGet(url)
            .then(res => {
                console.log()
                setData(res.data)
            })
            .catch(err => {
                setError(true)
            })
            .finally(() => {
                setLoading(false)
                setIsFetched(true)
            })
    }, [fetch])

    const refetch = () => {
        setFetch(prev => !prev)
    }

    return { isLoading, isError, data, isFetched, refetch }
}