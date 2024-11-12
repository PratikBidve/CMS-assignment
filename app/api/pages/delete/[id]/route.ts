import { NextResponse } from 'next/server';
import { query } from '../../../../../utils/db';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;

  try {
    const result = await query('DELETE FROM Page WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Page deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting page:', error);
    return NextResponse.json({ error: 'Error deleting page' }, { status: 500 });
  }
}
