import {haptic, openLinkExternal} from "../utils/telegramAPI";

export const useVideo = (Trainings, trainingId, videoRef, openInBrowser, setOpenInBrowser) => {
    const browserRedirect = async() => {
        haptic()

        await Trainings.getAccessToVideo(trainingId)
        openLinkExternal(Trainings.video_link)
    }

    const onFullscreen = () => {
        if(openInBrowser) {
            setOpenInBrowser(false)
            videoRef.current.play()
        } else {
            setOpenInBrowser(true)
            videoRef.current.pause()
        }
    }

    return {browserRedirect, onFullscreen}
}