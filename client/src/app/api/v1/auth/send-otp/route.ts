import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { mobile } = body;

    if (!mobile || !/^[6-9]\d{9}$/.test(mobile)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid 10-digit Indian mobile number.' },
        { status: 400 }
      );
    }

    // In development environment, simulate OTP dispatch (e.g. 567890)
    return NextResponse.json({
      success: true,
      message: `OTP sent successfully to +91-${mobile}. (Dev OTP: 567890)`,
      expiresInMinutes: 10,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to send OTP.' }, { status: 500 });
  }
}
