import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'juanladinomoreno@gmail.com',
        pass: 'iqyu mrsi tqci gmjy'
        // user: process.env.GMAIL_ACCOUNT,
        // pass: process.env.GMAIL_PASSWORD
    }
})

export default transport