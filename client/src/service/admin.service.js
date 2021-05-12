import axios from 'axios'

class AdminService {

    constructor() {
        this.app = axios.create({
            baseURL: 'http://localhost:5000/api/admin',
            withCredentials: true
        })
    }

    getAllClients = () => this.app.get('/clients')
    getAllSuppliers = () => this.app.get(`/suppliers`)
    getAllOrders = () => this.app.get(`/orders`)
    getOrdersData = () => this.app.get('/data')
}

export default AdminService