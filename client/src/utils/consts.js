export const tgWebApp = window.Telegram.WebApp
export const tgUser = tgWebApp.initDataUnsafe?.user
export const tgID = 875571046//tgUser.id
const tgMainButton = tgWebApp.MainButton

export function openLinkExternal(link) {
    tgWebApp.openLink(link)
}

export function tgInintial() {
    tgWebApp.ready()
    tgWebApp.expand()
}

export function tgToggleButton(viewed) {
    tgMainButton.textColor = tgWebApp.themeParams.button_text_color
    tgMainButton.color = tgWebApp.themeParams.button_color

    if(viewed) {
        tgMainButton.text = "Прочитано"
    } else {
        tgMainButton.text = "Завершить"
    }

    tgMainButton.show()
}

export function tgHideButton() {
    tgMainButton.hide()
}

export function tgChangeButtonText(text) {
    tgMainButton.text = text
}

export function tgButtonOnClick(callback) {
    tgMainButton.onClick(callback)
}