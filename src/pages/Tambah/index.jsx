import { useState } from 'react'
import axios from 'axios'
import Input from '../../components/Input';
import './index.scss';

const Tambah = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    stock: '',
    status: true
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    params.append('name', product.name)
    params.append('price', product.price)
    params.append('stock', product.stock)
    params.append('status', product.status)
 
    try {
      axios.post('https://belajar-api-express-mongodb.herokuapp.com/api/v3/products', params)
      alert("Product Created")
    } catch(err) {
      console.log(err)
    }
  }

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <Input name="name" onChange={handleChange} type="text" placeholder="Nama Produk..." label="Nama"/>
          <Input name="price" onChange={handleChange} type="number" placeholder="Harga Produk..." label="Harga"/>
          <Input name="stock" onChange={handleChange} type="number" placeholder="Stock Produk..." label="Stock"/>
          <Input name="status"  onChange={(e) => setProduct({status: e.target.checked})} type="checkbox" label="Active"/>
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  )
}

export default Tambah;