import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const decimate = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }
    const { searchParams } = new URL(request.url);
    const productName = searchParams.get('productName');
    const productPrice = decimate(searchParams.get('productPrice'));
    const quantity = Number(searchParams.get('quantity'));

    try {
        if (!productName || !productPrice || !quantity) throw new Error('Product names, prices and quantities required');
        const currentQty = await sql`SELECT quantity FROM Products where NAME = ${productName.toLowerCase()};`
        const currentQtyNum = Number(currentQty.rows[0].quantity)
        await sql`UPDATE Products SET quantity = ${quantity + currentQtyNum} where NAME = ${productName.toLowerCase()};`
    } catch (error) {
        try {
            if (!productName || !productPrice || !quantity) throw new Error('Product names, prices and quantities required');
            await sql`INSERT INTO Products (Name, Price, Quantity) VALUES (${productName.toLowerCase().toString()}, ${productPrice}, ${quantity});`;
        } catch {
            return NextResponse.json({ error }, { status: 500 })
        }
    }

    const products = await sql`SELECT * FROM Products where NAME = ${productName.toLowerCase()};`;
    return NextResponse.json({ products }, { status: 200 });
}
