import axios from 'axios'

class OrdersService {
    constructor() {
        this.app = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        })
    }

    createOrder = orderDetails => this.app.post('/order/new', orderDetails)
    getUserOrder = () => this.app.get('/order/customer')
}

export default OrdersService