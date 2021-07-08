import { UserI } from "./user.interface";

export interface AuthResponseI {
    user?: UserI,
    token?: string,
    refreshToken?: string
}