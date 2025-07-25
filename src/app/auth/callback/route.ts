import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;

  if (code) {
    const supabase = await createClient();
    
    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      
      if (error) {
        console.error('Auth callback error:', error);
        return NextResponse.redirect(`${origin}?auth=error`);
      }
    } catch (error) {
      console.error('Unexpected auth callback error:', error);
      return NextResponse.redirect(`${origin}?auth=error`);
    }
  }

  // Redirect to home page - the middleware will handle adding success params
  return NextResponse.redirect(`${origin}/`);
}
