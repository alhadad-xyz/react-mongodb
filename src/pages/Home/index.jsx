import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import './index.scss';

const Home = () => {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  const getProducts = () => {
    axios.get('https://belajar-api-express-mongodb.herokuapp.com/api/v3/products')
    .then(res => {
      const products = res.data
      setProducts(products)
      setLoading(false)
    })
    .catch(err => console.log(err))
  }


  useEffect(() => {
    if(search === '') {
      getProducts()
    } else {
      axios.get('https://belajar-api-express-mongodb.herokuapp.com/api/v3/products/query/' + search)
      .then(res => {
        const products = res.data
        setProducts(products)
        setLoading(false)
      })
      .catch(err => console.log(err))
    }
  }, [search])


  const handleDelete = (id) => {
   axios.delete('https://belajar-api-express-mongodb.herokuapp.com/api/v3/products/' + id)
    .then(res => {
      alert('Product Deleted')
      getProducts()
    })
    .catch(err => console.log(err)) 
  }

  return(
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">Tambah Produk</Link>
      <div className="search">
        <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Masukan kata kunci..."/>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
        { loading ? (<tr><td>Loading...</td></tr>) : products.map((product, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.stock}</td>
            <td>{product.status ? "Available" : "Not Available"}</td>
            <td className="text-center">
              <Link to={`/detail/${product._id}`} className="btn btn-sm btn-info">Detail</Link>
              <Link to={`/edit/${product._id}`} className="btn btn-sm btn-warning">Edit</Link>
              <button onClick={() => handleDelete(product._id)} className="btn btn-sm btn-danger">Delete</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default Home;