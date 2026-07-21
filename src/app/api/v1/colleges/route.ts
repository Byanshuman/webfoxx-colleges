import { NextResponse } from 'next/server';
import { CollegeService } from '@/services/college.service';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || undefined;
    const state = searchParams.get('state') || undefined;
    const city = searchParams.get('city') || undefined;
    const ownership = searchParams.get('ownership') || undefined;
    const featuredOnly = searchParams.get('featured') === 'true';

    const colleges = await CollegeService.searchColleges({
      query,
      state,
      city,
      ownership,
      featuredOnly,
    });

    return NextResponse.json({
      success: true,
      count: colleges.length,
      data: colleges,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch colleges.' },
      { status: 500 }
    );
  }
}
