import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios'
import './index.scss';

const Detail = () => {
  const params = useParams()
  const [product, setProduct] = useState([])

  useEffect(() => {
    axios.get('https://belajar-api-express-mongodb.herokuapp.com/api/v3/products/' + params.id)
    .then(res => {
      const product = res.data
      setProduct(product)
    })
    .catch(err => console.log(err))
  }, [params.id])

  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">Kembali</Link>

      <table className="table">
        <tbody>
          <tr>
            <td>ID</td>
            <td>: {product._id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>: {product.name}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>: {product.price}</td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>: {product.stock}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Detail;