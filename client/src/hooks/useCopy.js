import {useState} from "react";

export const useCopy = () => {
    const [copied, setCopied] = useState(false)

    const onCopyHandler = () => {
        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, 2000)
    }

    return {copied, onCopyHandler}
}