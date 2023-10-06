'use client'
import { useState, useEffect } from 'react'

export default function Home() {
  const [data, setData] = useState(null)
  const [productName, setProductName] = useState(null)
  const [ productQty, setQuantity] = useState(null)
  const [price, setPrice] = useState(null)
  const [itemsList, setList] = useState([])
  const [finalTotalPrice, setFinalPrice] = useState(0)
  console.log('final', finalTotalPrice)

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
  const clearInputFields = () => {
    const nameInput = document.getElementById('name-input')
    const quantityInput = document.getElementById('quantity-input')
    nameInput.value = ''
    quantityInput.value = ''
    setProductName(null)
    setQuantity(null)
    setPrice(null)
  }
  const addItem = async (e) => {
    const itemTotalPrice = (Number(price) * Number(productQty)).toFixed(2)
    await setFinalPrice((Number(finalTotalPrice) + Number(itemTotalPrice)).toFixed(2))

    const list = {'name': productName, 'quantity': productQty, 'price': itemTotalPrice}
    await setList((itemsList) => [
      ...itemsList,
      list
    ])

    clearInputFields()
  }
  return (
    <main className="flex min-h-screen flex-col justify-between p-24">
      <div className="header">
        <div className="header-logo-group">
          <img className="header-logo" src="./fresh-veg-logo.jpeg" />
          <div className="header-logo-name">aud's supermart</div>
        </div>
        <div className="header-text">Point-of-Sale</div>
      </div>
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
        <div className="total">
          <div className="header">Total</div>
          <div className="final-price">{finalTotalPrice}</div>
        </div>
      </div>
      <div className="form-section">
        <form>
          <div className="add-product-section">
            <label htmlFor="product" className="product-name">Product</label>
            <input id="name-input" className="text-gray-700 text-sm font-bold mb-2" type="text" name="product" onBlur={handleNameData} required />
            <label htmlFor="name" className="quantity">Quantity</label>
            <input id="quantity-input" type="number" name="quantity" required onBlur={handleQuantityData} />
            <div className="price">{price}</div>
            <button onClick={addItem} type="button" >Add</button>
          </div>
          <div className="closing-section">
            <button className="block" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </main>
  )
}
