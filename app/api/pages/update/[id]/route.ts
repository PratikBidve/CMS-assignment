import { NextResponse } from 'next/server';
import { query } from '../../../../../utils/db';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  const { title, slug, content } = await request.json();

  try {
    const result = await query(
      'UPDATE Page SET title = $1, slug = $2, content = $3, updated_at = NOW() WHERE id = $4 RETURNING *',
      [title, slug, content, id]
    );
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }
    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error: any) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Slug must be unique. Please choose a different slug.' }, { status: 400 });
    }
    console.error('Error updating page:', error);
    return NextResponse.json({ error: 'Error updating page' }, { status: 500 });
  }
}
