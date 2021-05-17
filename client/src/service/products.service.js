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
    addFavorite = (product_id => this.app.post('/product/favorite/add', product_id))
    removeFavorite = (product_id => this.app.post(`/product/favorite/remove/${product_id}`))
    getFavorites = () => this.app.get('product/favorite/myfavorite')

    createProduct = (productDetails, id) => this.app.post(`/supplier/myarea/${id}`, productDetails)
    getProductBySupplier = supplier_id => this.app.get(`/supplier/myarea/myproducts/${supplier_id}`)
    getMyProductDetails = product_id => this.app.get(`/supplier/myarea/myproductdetails/${product_id}`)

}

export default ProductsService