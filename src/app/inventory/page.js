'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Inventory() {
	const [productData, setData] = useState(null)
	useEffect(() => {
		fetch('/api/get-products')
			.then((res) => res.json())
			.then((data) => {
				setData(data.products.rows)
			})
	}, [])
	return (
		<main className="flex min-h-screen flex-col inventory">
			<div className="header">Inventory</div>
			<div className="navigation">
				<Link className="nav" href="/">New transaction</Link>
			</div>
			<div className="update-inventory">
				<button className="edit">Edit</button>
			</div>
			<table id="inventory">
				<tr>
					<th>Product Name</th>
					<th>Price</th>
					<th>Quantity</th>
				</tr>
				{
					productData?.map((item, i) => {
						return (
							<tr key={i}>
								<td>{item.name}</td>
								<td>{item.price}</td>
								<td>{item.quantity}</td>
							</tr>
						)
					})
				}
			</table>
		</main>
	)
}