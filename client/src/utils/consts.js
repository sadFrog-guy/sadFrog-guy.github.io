export const tgWebApp = window.Telegram.WebApp
export const tgUser = tgWebApp.initDataUnsafe?.user
export const tgID = tgUser.id
export const tgMainButton = tgWebApp.MainButton

export function backButtonShow(callback) {
    tgWebApp.BackButton.show()
    tgWebApp.BackButton.onClick(callback)
}

export function backButtonHide() {
    tgWebApp.BackButton.hide()
}

export function haptic() {
    tgWebApp.HapticFeedback.impactOccurred("light")
}

export function exitConfirmation() {
    const exitButton = {
        id: 'exit',
        type: 'close',
        text: 'Да, уверен'
    }

    const cancelButton = {
        id: 'cancel',
        type: 'cancel',
        text: 'Нет, не уверен'
    }

    const params = {
        title: '',
        message: 'Вы уверены, что хотите выйти?',
        buttons: [exitButton, cancelButton]
    }

    tgWebApp.showPopup(params)
}

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