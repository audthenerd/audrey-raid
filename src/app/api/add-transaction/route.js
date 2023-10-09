import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const totalPrice = searchParams.get('total');

    try {
        if (!totalPrice) throw new Error('Total price for transaction required!');
        const result = await sql`INSERT INTO Transactions (Total, Created) VALUES (${totalPrice}, LOCALTIMESTAMP);`;
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }

    const transactions = await sql`SELECT * FROM Transactions;`;
    return NextResponse.json({ transactions }, { status: 200 });
}
