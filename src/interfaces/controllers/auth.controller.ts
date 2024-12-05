import {CheckExistsUseCase} from "../../application/use-cases/auth/check-exists.use-case";
import {RequestHandler} from "express";
import createHttpError from "http-errors";
import jwt from 'jsonwebtoken';
import {sendVerificationEmail} from "../../shared/utils/nodemailer";
import env from "../../shared/utils/env";
import {SignUpUseCase} from "../../application/use-cases/auth/sign-up.use-case";
import {LoginUseCase} from "../../application/use-cases/auth/login.use-case";
import bcrypt from "bcrypt";

interface SignUpBody {
    name: string;
    email: string;
    password: string;
    surname?: string;
}

interface LoginBody {
    email: string;
    password: string;
}

export class AuthController {
    private checkExistsUseCase: CheckExistsUseCase;
    private signUpUseCase: SignUpUseCase;
    private loginUseCase: LoginUseCase

    constructor() {
        this.checkExistsUseCase = new CheckExistsUseCase();
        this.signUpUseCase = new SignUpUseCase();
        this.loginUseCase = new LoginUseCase();
    }

    signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async(req, res, next) => {
        const {name, email, password, surname} = req.body;

        try {
            if (!name || !email || !password) {
                throw createHttpError(400, 'Missing parameters');
            }

            await this.checkExistsUseCase.execute(email);

            const hashedPassword = await bcrypt.hash(password, 10);

            const tokenPayload = {name:name, email: email, password: hashedPassword, surname: surname};
            const token = jwt.sign(tokenPayload, env.JWT_SECRET, { expiresIn: '5m' });

            const confirmLink = `http://localhost:7238/api/auth/email-verify?token=${token}`;
            const emailSent = await sendVerificationEmail(email, confirmLink);

            if (!emailSent) {
                throw createHttpError(500, 'Failed to send verification email');
            }

            res.status(201).json({ message: 'Verification email sent' });

        }
        catch (error) {
            next(error)
        }
    }

    emailVerify: RequestHandler = async (req, res, next) => {
        const { token } = req.query;

        try {
            if (!token || typeof token !== "string") {
                throw createHttpError(400, "Missing parameters");
            }

            const decodedToken = jwt.verify(token, env.JWT_SECRET);

            if (decodedToken && typeof decodedToken !== "string") {
                const { name, email, password, surname } = decodedToken as {
                    name: string;
                    email: string;
                    password: string;
                    surname?: string;
                };

                await this.signUpUseCase.execute(name, email, password, surname);

                res.status(201).json({ message: "User registered successfully!" });
            }
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                res.status(401).json({error: 'Your token has expired. Please try the verification process again.'})
            }
            if (error instanceof  jwt.JsonWebTokenError) {
                res.status(400).json({error: 'Invalid token. Please provide a valid token.' })
            }
            next(error);
        }
    };

    login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
        const {email, password} = req.body;

        try {
            if (!email || !password) {
                throw createHttpError(400, "Missing parameters");
            }

            const user = await this.loginUseCase.execute(email, password);

            req.session.user_id = user._id
            res.status(200).json({ message: "User login successfully!" });
        }
        catch (error) {
            next(error)
        }
    }

    logout: RequestHandler = async (req, res, next) => {
        req.session.destroy((error)=>{
            if (error) {
                next(error)
            } else {
                res.clearCookie(env.COOKIE_NAME)
                res.status(200).json({message: "User logout successfully!"})
            }
        })
    }

}
