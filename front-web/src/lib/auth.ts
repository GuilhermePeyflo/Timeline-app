import decode from "jwt-decode";
import { cookies } from "next/headers";

export interface User {
    sub: string,
    name: string,
    avatarUrl: string
}

export function getUser(): User | boolean{
    const token = cookies().get('token')?.value
    if (!token) {
        return false
    }
    const user: User = decode(token)

    return user
}