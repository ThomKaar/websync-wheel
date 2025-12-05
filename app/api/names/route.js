import { NextResponse } from 'next/server'

// S3 URL for fetching names (configure via environment variable)
const NAMES_URL = process.env.NAMES_URL

export async function GET() {
  if (!NAMES_URL) {
    return NextResponse.json(
      { success: false, error: 'NAMES_URL is not configured' },
      { status: 500 }
    )
  }

  try {
    const response = await fetch(NAMES_URL, {
      // Cache for 5 minutes, revalidate in background
      next: { revalidate: 300 }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch names: ${response.status}`)
    }

    const { names } = await response.json() || {};



    // Validate that we got an array
    if (!Array.isArray(names)) {
      throw new Error('Names data is not an array');
    }

    return NextResponse.json({
      success: true,
      names
    })

  } catch (error) {
    console.error('Error fetching names from S3:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch names' },
      { status: 500 }
    );
  }
}
