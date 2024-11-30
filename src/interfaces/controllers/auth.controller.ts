import {SignUpUseCase} from "../../application/use-cases/sign-up.use-case";
import {RequestHandler} from "express";
import createHttpError from "http-errors";
import jwt from 'jsonwebtoken';
import {sendVerificationEmail} from "../../shared/utils/nodemailer";
import env from "../../shared/utils/env";


const signUpUseCase = new SignUpUseCase();

interface SignUpBody {
    name: string;
    email: string;
    password: string;
    surname?: string;
}

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async(req, res, next) => {
    const {name, email, password, surname} = req.body;

    try {
        if (!name || !email || !password) {
            throw createHttpError(400, 'Missing parameters');
        }

        await signUpUseCase.execute(name, email);

        const tokenPayload = {name:name, email: email, password: password, surname: surname};
        const token = jwt.sign(tokenPayload, env.JWT_SECRET, { expiresIn: '5m' });

        const confirmLink = `http://localhost:3000/mail-verification?token=${token}`;
        const emailSent = await sendVerificationEmail(email, confirmLink);

        if (!emailSent) {
            throw createHttpError(500, 'Failed to send verification email');
        }

        res.status(201).json({ message: 'User registered successfully, verification email sent' });

    }
    catch (error) {
        next(error)
    }
}