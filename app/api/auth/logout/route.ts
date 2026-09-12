import { NextResponse } from 'next/server';
import * as cookie from 'cookie';

export async function POST() {
  const cookieStr = cookie.stringifySetCookie('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });

  const response = NextResponse.json({ message: 'Logged out successfully' });
  response.headers.set('Set-Cookie', cookieStr);
  return response;
}
export const dynamic = 'force-dynamic';
