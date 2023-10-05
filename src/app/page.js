'use client'
import { useState, useEffect } from 'react'

export default function Home() {
  const [data, setData] = useState(null)
  const [price, setPrice] = useState(null)
  useEffect(() => {
    fetch('/api/get-products')
      .then((res) => res.json())
      .then((data) => {
        setData(data.products.rows)
      })
  }, [])
  const handleData = (e) => {
    data.forEach((item, i) => {
      if(item.name === e.target.value) {
        setPrice(item.price)
      }
    })
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="header">Point-of-Sale</div>
      <div></div>
      <form>
        <label htmlFor="product" className="product-name">Product</label>
        <input className="text-gray-700 text-sm font-bold mb-2" type="text" name="product" onBlur={handleData}/>
        <label htmlFor="name" className="quantity">Quantity</label>
        <input type="number" name="quantity" required />
        <div className="price">{price}</div>
        <button>Add</button>
        <button className="block" type="submit">Submit</button>
      </form>
    </main>
  )
}
