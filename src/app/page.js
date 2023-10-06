'use client'
import { useState, useEffect } from 'react'

export default function Home() {
  const [data, setData] = useState(null)
  const [productName, setProductName] = useState(null)
  const [ productQty, setQuantity] = useState(null)
  const [price, setPrice] = useState(null)
  const [itemsList, setList] = useState([])
  useEffect(() => {
    fetch('/api/get-products')
      .then((res) => res.json())
      .then((data) => {
        setData(data.products.rows)
      })
  }, [])
  const handleNameData = (e) => {
    const name = e.target.value
    setProductName(name)
    data.forEach((item) => {
      if(item.name === name) {
        setPrice(item.price)
      }
    })
  }
  const handleQuantityData = (e) => {
    setQuantity(e.target.value)
  }
  const addItem = (e) => {
    const totalPrice = (Number(price) * Number(productQty)).toFixed(2)
    console.log('totalPrice', totalPrice)
    const list = {'name': productName, 'quantity': productQty, 'price': totalPrice}
    console.log('list', list)
    setList((itemsList) => [
      ...itemsList,
      list
    ])
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="header">Point-of-Sale</div>
      <div className="items-list">
        <div className="product-headers">
          <div>Product Name</div>
          <div>Quantity</div>
          <div>Price</div>
        </div>
        {
          itemsList.map((item, i) => {
            return (
              <div className="products-summary">
                <div className={'item-' + item.name} key={'product-' + i}>{item.name}</div>
                <div className={'quantity-' + item.name} key={'quanity-' + i}>{item.quantity}</div>
                <div className={'price-' + item.name} key={'price' + i}>{item.price}</div>
              </div>
            )
          })
        }
      </div>
      <form>
        <label htmlFor="product" className="product-name">Product</label>
        <input className="text-gray-700 text-sm font-bold mb-2" type="text" name="product" onBlur={handleNameData} required />
        <label htmlFor="name" className="quantity">Quantity</label>
        <input type="number" name="quantity" required onBlur={handleQuantityData} />
        <div className="price">{price}</div>
        <button onClick={addItem} type="button">Add</button>
        <button className="block" type="submit">Submit</button>
      </form>
    </main>
  )
}
