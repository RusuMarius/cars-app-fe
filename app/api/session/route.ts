import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { isAuthenticated, getUser } = getKindeServerSession();

    if (!isAuthenticated) {
      return NextResponse.json({ authenticated: false });
    }

    const user = await getUser();
    return NextResponse.json({ authenticated: true, user });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get session', authenticated: false });
  }
}
