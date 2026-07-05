import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename') || 'file';

  if (!request.body) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  try {
    const blob = await put(filename, request.body, {
      access: 'public',
    });

    return NextResponse.json(blob);
  } catch (error: any) {
    console.error("Blob upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

