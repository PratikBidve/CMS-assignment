import { NextResponse } from 'next/server';
import { query } from '../../../../utils/db';

export async function POST(request: Request) {
  const { title, slug, content } = await request.json();

  try {
    const result = await query(
      'INSERT INTO Page (title, slug, content) VALUES ($1, $2, $3) RETURNING *',
      [title, slug, content]
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error: any) {
    if (error.code === '23505') { // Unique constraint violation for slug
      return NextResponse.json({ error: 'Slug must be unique. Please choose a different slug.' }, { status: 400 });
    }
    console.error('Error creating page:', error);
    return NextResponse.json({ error: 'Error creating page' }, { status: 500 });
  }
}
