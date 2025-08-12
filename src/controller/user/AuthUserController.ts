import { Request, Response } from "express";
import { AuthUserService } from "../../service/user/AuthUserService";

class AuthUserController {
    async handle(req: Request, res: Response) {

        const { email, password } = req.body

        const authUseService = new AuthUserService()

        const auth = await authUseService.execute({email,password})

        res.json(auth)
    }
}

export {AuthUserController}