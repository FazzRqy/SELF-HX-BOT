const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const fs = require('fs')
const { banner, start, success } = require('./lib/functions')
const { color } = require('./lib/color')

require('./index.js')
nocache('./index.js', module => console.log(`${module} is now updated!`))

const starts = async (minsZ = new WAConnection()) => {
    minsZ.logger.level = 'warn'
    minsZ.version = [2, 2123, 8]
    minsZ.browserDescription = [ 'minsBoTz', 'Chrome', '3.0' ]
    console.log(banner.string)
    minsZ.on('qr', () => {
        console.log(color('[','white'), color('!','red'), color(']','white'), color(' Scan bang'))
    })

    fs.existsSync('./session.json') && minsZ.loadAuthInfo('./session.json')
    minsZ.on('connecting', () => {
        start('2', 'sabar gan, lagi disambungin ke WhatsApp.web...')
    })
    minsZ.on('open', () => {
        success('2', 'nice udah kesambung bang tinggal ketik .menu/.help')
    })
    await minsZ.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./session.json', JSON.stringify(minsZ.base64EncodedAuthInfo(), null, '\t'))

    minsZ.on('chat-update', async (message) => {
        require('./index.js')(minsZ, message)
    })
}

/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional> 
 */
function nocache(module, cb = () => { }) {
    console.log('Module', `'${module}'`, 'is now being watched for changes')
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

starts()
