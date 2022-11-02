import {useContext} from "@types/react";
import {Context} from "./context";

export const tgWebApp = window.Telegram.WebApp
export const tgUser = tgWebApp.initDataUnsafe?.user
export const tgID = tgUser.id

const {Theme} = useContext(Context);

tgWebApp.onEvent('themeChanged', () => {
    Theme.setCurrentTheme()
})

export function openLinkExternal(link) {
    tgWebApp.openLink(link)
}

export function tgInintial() {
    tgWebApp.ready()
    tgWebApp.expand()
}