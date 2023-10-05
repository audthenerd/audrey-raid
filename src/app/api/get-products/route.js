import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request) {
  const products = await sql`SELECT * FROM Products;`;
  return NextResponse.json({ products }, { status: 200 });
}
