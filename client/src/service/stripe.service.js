import axios from 'axios'

class StripeService {
    constructor() {
        this.app = axios.create({
            baseURL: `${process.env.REACT_APP_BASE_URL}/stripe`,
            withCredentials: true
        })
    }

    createPayment = (total, orderId) => this.app.post('/create-payment-intent', { total, orderId })
}

export default StripeService