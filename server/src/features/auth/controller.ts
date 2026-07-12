import type { Request, Response } from "express"
import { signInSchema } from "./validation.js"
import { findUser } from "./service.js";
import { comparePassword, generateJWT } from "./helper.js";

export const signin = async (req: Request, res: Response) => {
    try {
        const validation = signInSchema.safeParse(req.body)

        if (!validation.success) {
            return res.status(400).json({
                msg: `${validation.error.issues[0]?.message.toLowerCase()}`,
            });
        }

        const { email, password } = validation.data

        const user = await findUser(email)
        console.log('user: ', user);


        if (user) {
            const isValid = comparePassword(password, user.password)
            if (isValid) {

                const jwt = generateJWT({ userId: user.id }, {
                    expiresIn: 7 * 24 * 60 * 60 * 1000
                })

                return res.status(200).json({
                    jwt,
                    msg: 'Signed in successfully!'
                })
            }
            return res.status(400).json({
                msg: 'Wrong credentials.'
            })
        }

        return res.status(400).json({
            msg: 'Wrong credentials.'
        })


    } catch (error: any) {
        console.error(error.message)
        return res.status(400).json({
            msg: 'Something wrong happened.'
        })
    }
}