export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className="header">Point-of-Sale</div>
      <form>
        <label htmlFor="product" className="mb-2 italic">Product</label>
        <input type="text" name="product" />
        <label htmlFor="name" className="mb-2 italic">Quantity</label>
        <input type="number" name="quantity" />
        <button type="submit">Submit</button>
      </form>
    </main>
  )
}
