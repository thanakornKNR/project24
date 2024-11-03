import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest): Promise<NextResponse> {
    const user = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const { pathname } = request.nextUrl;

    if (
        pathname.startsWith('/protected') &&
        (!user || user.role !== 'admin')
    ) {
        return NextResponse.redirect(new URL('/profile', request.url))
    }


    return NextResponse.next();
}

// กำหนด middleware สำหรับ path ที่ต้องการ
export const config = {
    matcher: ['/admin/:path*'],
};
