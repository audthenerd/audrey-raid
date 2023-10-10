'use client'

import Link from 'next/link'
import Button from '@mui/material/Button'
import { useState, useEffect } from 'react'

export default function Inventory() {
	const [productData, setData] = useState(null)
	const [hideQuantityInput, setInputStatus] = useState(true)
	const [editButtonText, setEditText] = useState('Update Inventory')
	useEffect(() => {
		fetch('/api/get-products')
			.then((res) => res.json())
			.then((data) => {
				setData(data.products.rows)
			})
	}, [])
	const handleEdit = () => {
		if (hideQuantityInput) {
			setInputStatus(false)
			setEditText('Update Done')
			updateQuantityInputValue()
		} else {
			setInputStatus(true)
			setEditText('Update Inventory')
			sendData()
		}
	}
	const updateQuantityInputValue = () => {
		const quantityInput = document.getElementsByClassName('update-quantity')
		productData?.forEach((item, i) => {
			if (quantityInput[i].className.includes(item.name)) {
				quantityInput[i].value = item.quantity
			}
		})
	}
	const handleChange = async (e) => {
		const productName = e.target.className.split(' ')[1]
		const productDataCopy = productData.slice()
		await productDataCopy?.forEach((item, i) => {
			if (item.name === productName) {
				item.quantity = Number(e.target.value)
			}
		})
		await setData(productDataCopy)
	}

	const sendData = () => {
		const latestParams = encodeURIComponent(JSON.stringify(productData))
		location.href = "/api/update-inventory?inventory=" + latestParams
	}
	return (
		<main className="flex min-h-screen flex-col inventory">
			<div className="header">Inventory</div>
			<div className="navigation">
				<Link className="nav" href="/">New transaction</Link>
			</div>
			<div className="update-inventory">
				<Button
					className="edit"
					variant="contained"
					onClick={handleEdit}
					type="button"
				>{editButtonText}</Button>
			</div>
			<table id="inventory">
				<tr>
					<th>Product Name</th>
					<th>Price ($)</th>
					<th>Quantity</th>
				</tr>
				{
					productData?.map((item, i) => {
						return (
							<tr key={i}>
								<td>{item.name}</td>
								<td>{item.price}</td>
								<td className="quantity-field">
									<p className="original-quantity" hidden={!hideQuantityInput}>{item.quantity}</p>
									<input
										className={"update-quantity " + item.name}
										type="number"
										name="quantity"
										min="0"
										hidden={hideQuantityInput}
										onChange={handleChange}
									/>
								</td>
							</tr>
						)
					})
				}
			</table>
		</main>
	)
}