import axios from 'axios'

class ProductsService {

    constructor() {
        this.app = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        })
    }

    getAllProducts = () => this.app.get('/product')
    getOneProduct = product_id => this.app.get(`/product/${product_id}`)
    createProduct = productDetails => this.app.post(`/supplier`, productDetails)
}

export default ProductsService