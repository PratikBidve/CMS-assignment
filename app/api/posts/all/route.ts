import { NextResponse } from 'next/server';
import { query } from '../../../../utils/db';

export async function GET() {
  try {
    const result = await query('SELECT * FROM Post ORDER BY created_at DESC');
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 });
  }
}
