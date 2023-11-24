import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export default function middleware(request: NextRequest) {
    const isLogin = request.cookies.has('_user_');
    const pathname = request.nextUrl.pathname;

    if (pathname !== '/login' && !isLogin)
        return NextResponse.redirect(new URL('/login', request.url));

    if (pathname === '/login' && isLogin)
        return NextResponse.redirect(new URL('/', request.url));


    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}