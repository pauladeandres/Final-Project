import axios from 'axios'

class AdminService {

    constructor() {
        this.app = axios.create({
            baseURL: `${process.env.REACT_APP_BASE_URL}/admin`,
            withCredentials: true
        })
    }

    getAllClients = () => this.app.get('/clients')
    getAllSuppliers = () => this.app.get(`/suppliers`)
    getAllOrders = () => this.app.get(`/orders`)
    getData = () => this.app.get('/data')
}

export default AdminService