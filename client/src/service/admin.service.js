import axios from 'axios'

class AdminServices {

    constructor() {
        this.app = axios.create({
            baseURL: 'http://localhost:5000/api/admin'
        })
    }

    getAllClients = () => this.app.get('/clients')
    getAllSuppliers = () => this.app.get(`/suppliers`)
    getAllOrders = () => this.app.get(`/orders`)
}

export default AdminServices