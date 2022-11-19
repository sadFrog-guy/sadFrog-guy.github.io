import {useState} from "react";
import {haptic} from "../utils/telegramAPI";

export const useCopy = () => {
    const [copied, setCopied] = useState(false)

    const onCopyHandler = () => {
        haptic()

        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, 2000)
    }

    return {copied, onCopyHandler}
}