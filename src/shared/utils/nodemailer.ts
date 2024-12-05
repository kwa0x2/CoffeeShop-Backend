import * as nodemailer from "nodemailer"
import env from "../../shared/utils/env";

const transports = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: env.EMAIL,
        pass: env.EMAIL_PASSWORD,
    }
})

export const sendVerificationEmail = async (email: string, confirmLink: string) => {
    try {
        await transports.sendMail({
            from: {
                name: "CoffeeShop",
                address: env.EMAIL,
            },
            to: email,
            subject: "Verification email",
            html: `<a href="${confirmLink}">hesabını onaylamak için tıkla</a>`,
        })
        return true
    }
    catch (error) {
        console.error(error)
        return false;
    }
}

export const sendOrderMail = async (email: string, order: string) => {
    try {
        await transports.sendMail({
            from: {
                name: "CoffeeShop",
                address: env.EMAIL,
            },
            to:email,
            subject: "Order Mail",
            html:`<p>${order}</p>`
        })
        return true
    }
    catch (error) {
        console.error(error)
        return false;
    }
}