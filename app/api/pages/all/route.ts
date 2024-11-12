import { NextResponse } from 'next/server';
import { query } from '../../../../utils/db';

export async function GET() {
  try {
    const result = await query('SELECT * FROM Page ORDER BY created_at DESC');
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error('Error fetching pages:', error);
    return NextResponse.json({ error: 'Error fetching pages' }, { status: 500 });
  }
}
