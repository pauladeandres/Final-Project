import axios from 'axios'

class StripeService {
    constructor() {
        this.app = axios.create({
            baseURL: 'http://localhost:5000/api/stripe',
            withCredentials: true
        })
    }

    createPayment= (total, orderId) => this.app.post('/create-payment-intent', {total, orderId})
}

export default StripeService