import { NextResponse } from 'next/server';
import { query } from '../../../../../utils/db';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  const { title, slug, content } = await request.json();

  try {
    const result = await query(
      'UPDATE Post SET title = $1, slug = $2, content = $3, updated_at = NOW() WHERE id = $4 RETURNING *',
      [title, slug, content, id]
    );
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Error updating post' }, { status: 500 });
  }
}
