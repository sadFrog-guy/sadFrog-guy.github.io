import {useState} from "react";

export default async function useLoading(callBack) {
    const [isLoading, setLoad] = useState(true)

    try {
        await callBack()
        setLoad(false)
    } catch (e) {
        console.log(e.message)
    } finally {
        setLoad(false)
    }

    return {
        isLoading,
    }

}