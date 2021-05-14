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
    deleteProduct = product_id => this.app.delete(`/product/delete/${product_id}`)
    editProduct = (product_id, productDetails) => this.app.put(`/product/edit/${product_id}`, productDetails)

    createProduct = (productDetails, id) => this.app.post(`/supplier/myarea/${id}`, productDetails)
    getProductBySupplier = supplier_id => this.app.get(`/supplier/myarea/myproducts/${supplier_id}`)
    getMyProductDetails = product_id => this.app.get(`/supplier/myarea/myproductdetails/${product_id}`)

    createOption = (product_id, optionDetails) => this.app.post(`/supplier/myarea/newoption/${product_id}`, optionDetails)
    getOption = option_id => this.app.get(`/product/option/${option_id}`)
    deleteOption = option_id => this.app.delete(`/product/delete/${option_id}`)
    
}

export default ProductsService