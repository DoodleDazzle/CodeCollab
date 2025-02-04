import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

export async function GET() {
  const state = nanoid();
  
  const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
  githubAuthUrl.searchParams.append('client_id', process.env.GITHUB_CLIENT_ID || '');
  githubAuthUrl.searchParams.append('redirect_uri', `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/github/callback`);
  githubAuthUrl.searchParams.append('scope', 'read:user user:email');
  githubAuthUrl.searchParams.append('state', state);

  const response = NextResponse.redirect(githubAuthUrl.toString());
  
  // Set state cookie for CSRF protection
  response.cookies.set('github_oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 10, // 10 minutes
  });

  return response;
}