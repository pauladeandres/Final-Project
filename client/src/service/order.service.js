import axios from 'axios'

class OrdersService {
    constructor() {
        this.app = axios.create({
            baseURL: 'http://localhost:5000/api/order',
            withCredentials: true
        })
    }

    createOrder = orderDetails => this.app.post('/new', orderDetails)
    getUserOrder = () => this.app.get('/customer')
    getUserPaidOrder = () => this.app.get('customer/paid')
    deleteProduct = productId => this.app.post(`/remove/${productId}`)
    editQuantity = (productId, quantity) => this.app.post(`edit/${productId}`, quantity)
}

export default OrdersService