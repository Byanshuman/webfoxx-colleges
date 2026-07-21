import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { mobile, otp } = body;

    if (!mobile || !otp) {
      return NextResponse.json(
        { success: false, message: 'Mobile number and OTP are required.' },
        { status: 400 }
      );
    }

    // Dev test OTP verification
    if (otp === '567890' || otp === '123456') {
      return NextResponse.json({
        success: true,
        message: 'Authentication successful.',
        user: {
          id: 'usr-student-001',
          mobile,
          role: 'STUDENT',
          isMobileVerified: true,
          fullName: 'Student Aspirant',
        },
        token: 'mock-jwt-token-webfoxx-colleges-2026',
      });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid OTP. Please check and try again.' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to verify OTP.' }, { status: 500 });
  }
}
