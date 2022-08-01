import { Body, Controller, Inject, Post } from "@midwayjs/decorator";
import { Context } from "koa";
import { UserService } from "../service/user.service";
import { Validate } from '@midwayjs/validate';
import { UserLoginDTO } from "../dto/user.dto";
import { JwtService } from '@midwayjs/jwt';

@Controller('/api/user')
export class UserController {
    @Inject()
    ctx: Context;

    @Inject()
    userService: UserService;

    @Inject()
    jwtService: JwtService;

    @Post("/login")
    @Validate()
    async login(@Body() { username, password }: UserLoginDTO) {
        const user = await this.userService.getUserByUsernameAndPassword({ username, password });

        if (user) {
            const token = await this.jwtService.sign({ username, password }, "demo", { expiresIn: "2d" });

            return {
                code: 200,
                result: "success",
                message: "登录成功",
                data: {
                    token
                }
            }
        }

        return {
            code: 400,
            result: "error",
            message: "账号或密码不正确",
            data: null
        };
    }

    @Post("/save_user")
    @Validate()
    async saveUser(@Body() { username, password }: UserLoginDTO) {
        const result = await this.userService.saveUser({ username, password });

        return { code: 400, message: 'OK', data: result };
    }
}