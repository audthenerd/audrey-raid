import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation'

export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const inventory = searchParams.get('inventory');
	try {
		if (!inventory) throw new Error('Inventory data required!');
		const dataArray = JSON.parse(decodeURI(inventory))
		for(const data of dataArray) {
			await sql`UPDATE Products SET quantity = ${data.quantity} where NAME = ${data.name.toLowerCase()};`
		}
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 })
	}

	const products = await sql`SELECT * FROM Products;`;
	redirect('/inventory')
}
