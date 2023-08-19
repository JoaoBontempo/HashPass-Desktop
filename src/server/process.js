const { Notification } = require('electron');

const PROCESS_DATA_FUNCTION = {
    1 : copyPassword
}

function copyPassword(ws, data) {
    clipboard.writeText(data.password)
    new Notification({
        title: 'HashPass',
        body: `Senha ${data.title} copiada com sucesso!`,
    }).show()
}

module.exports = PROCESS_DATA_FUNCTION;