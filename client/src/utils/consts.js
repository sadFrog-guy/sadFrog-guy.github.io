export const tgWebApp = window.Telegram.WebApp
export const tgUser = tgWebApp.initDataUnsafe?.user
export const tgID = tgUser.id
export const tgMainButton = tgWebApp.MainButton
export const vibrationDuration = 100

export function openLinkExternal(link) {
    tgWebApp.openLink(link)
}

export function tgInintial() {
    tgWebApp.ready()
    tgWebApp.expand()
}

export function tgButtonInitial() {
    tgMainButton.textColor = tgWebApp.themeParams.button_text_color
    tgMainButton.color = tgWebApp.themeParams.button_color
}

export function tgButtonText(text) {
    tgMainButton.text = text
}