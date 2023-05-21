import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { signinUrl } from "./settings";


export function middleware(req: NextRequest){
    const token = req.cookies.get('token')?.value

    if (!token){
        return NextResponse.redirect(signinUrl, {
            headers: {
                'Set-Cookie': `redirectTo=${req.url}; Path=/; HttpOnly max-age=${60 * 10}`
            }
        })
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/memories/:path*'
}