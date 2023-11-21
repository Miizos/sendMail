const nodeMailer = require('nodemailer');
const fs = require('fs')
const { promises } = require('nodemailer/lib/xoauth2');
const { isUtf8 } = require('buffer');
const data = require("./data.json");

class SendMessageModule {
    config = "";
    constructor(smtpConfig) {
        this.transporter = nodeMailer.createTransport(smtpConfig);
        this.config = smtpConfig;

    }

    //send message format text
    SendMessage(subject, message, recepter) {
        // console.log(this.config)
        const mailOption = {
            from: this.config.auth.user,
            to: recepter,
            subject: subject,
            text: message
        }

        return new Promise((resolve, reject) => {
            this.transporter.sendMail(mailOption, (error, info) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(info);
                }
            })
        })

    }

    // send email with format html
    SendMessageHtml(subject, message, recepter, htmlFilepath) {
        // console.log(this.config)
        const htmlcontent = fs.readFileSync(htmlFilepath, 'Utf-8')
        const mailOption = {
            from: this.config.auth.user,
            to: recepter,
            subject: subject,
            text: message,
            html: htmlcontent
        }

        return new Promise((resolve, reject) => {
            this.transporter.sendMail(mailOption, (error, info) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(info);
                }
            })
        })

    }

    // send message for multipal user from json file

    SendMessageToAll(subject, message,jsonData) {

        jsonData.forEach(user => {
            const mailOption = {
                from: this.config.auth.user,
                to: user.mail,
                subject: subject,
                text: message + user.name
            }
            return new Promise((resolve, reject) => {
                this.transporter.sendMail(mailOption, (error, info) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(info);
                    }
                })
            })
        });

    }


}

module.exports = SendMessageModule