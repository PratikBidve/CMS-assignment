import { NextResponse } from 'next/server';
import { query } from '../../../../../utils/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;

  try {
    const result = await query('SELECT * FROM Post WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Error fetching post' }, { status: 500 });
  }
}
