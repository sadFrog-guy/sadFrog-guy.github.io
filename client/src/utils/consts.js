export const tgWebApp = window.Telegram.WebApp
export const tgUser = tgWebApp.initDataUnsafe?.user
export const tgID = tgUser.id

export function openLinkExternal(link) {
    tgWebApp.openLink(link)
}

export function tgInintial() {
    tgWebApp.ready()
    tgWebApp.expand()
}