import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation'

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const totalPrice = searchParams.get('total');
		const purchasedItems = searchParams.get('itemsList')
		const itemsArray = JSON.parse(decodeURI(purchasedItems))

    try {
        if (!totalPrice || !purchasedItems) throw new Error('Total price and items purchased for transaction required!');
        await sql`INSERT INTO Transactions (Total, Created) VALUES (${totalPrice}, LOCALTIMESTAMP);`;''
				for(const data of itemsArray) {
					const currentItem = data.name.toLowerCase()
					const selectQuantity = await sql`SELECT quantity from Products where NAME=${currentItem};`
					const currentQuantity = Number(selectQuantity.rows[0].quantity)
					await sql`UPDATE Products SET quantity = ${currentQuantity - Number(data.quantity)} where NAME = ${currentItem};`
				}
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }

    const transactions = await sql`SELECT * FROM Products;`;
    redirect(`/summary?total=${totalPrice}`)
}
