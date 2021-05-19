import axios from 'axios'

class OrdersService {
    constructor() {
        this.app = axios.create({
            baseURL: 'http://localhost:5000/api/order',
            withCredentials: true
        })
    }

    createOrder = orderDetails => this.app.put('/new', orderDetails)
    getUserOrder = () => this.app.get('/customer')
    getUserPaidOrder = () => this.app.get('/customer/paid')
    deleteProduct = productId => this.app.put(`/remove/${productId}`)
    editQuantity = (productId, quantity) => this.app.put(`edit/${productId}`, quantity)
    getLastOrderId = () => this.app.get('/lastorder')
    makeAsPaid = () => this.app.put('/paid')
}

export default OrdersService