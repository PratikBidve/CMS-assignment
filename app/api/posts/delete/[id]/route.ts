import { NextResponse } from 'next/server';
import { query } from '../../../../../utils/db';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;

  try {
    const result = await query('DELETE FROM Post WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Post deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Error deleting post' }, { status: 500 });
  }
}
