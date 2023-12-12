const sendMessageModule = require("./sendMessageModule")
const { isUtf8 } = require('buffer')
const fs = require('fs')

const smtpConfig = {
    auth: {
        user: "hamza@gmail.com",
        pass: "ecnshzfqvvtptgwa"
    },
    service: "gmail"
}
const data = fs.readFileSync('./data.json');
const jsonData = JSON.parse(data);
const messaging = new sendMessageModule(smtpConfig)

// messaging.SendMessage('test','test message','hamza.s.workout@gmail.com').then((info) => {
//     console.log(info.response)
// }).catch((error) => {
//     console.error(error)
// })

// messaging.SendMessageHtml('test','test message','oualidha1998@gmail.com','./htmlText.html').then((info) => {
//     console.log(info.response)
// }).catch((error) => {
//     console.error(error)
// })
messaging.SendMessageToAll('test', 'Hello ',jsonData);
