import axios from 'axios'

class ClientService {

    constructor() {
        this.app = axios.create({
            baseURL: `${process.env.REACT_APP_BASE_URL}/client`,
            withCredentials: true
        })
    }

    getOneSupplier = supplier_id => this.app.get(`/myarea/${supplier_id}`)
    editClient = (client_id, clientDetails) => this.app.put(`/client/${client_id}`, clientDetails)
    getAssignedClient = client_id => this.app.get(`/clientdetails/${client_id}`)
    createUser = clientDetails => this.app.post('/new', clientDetails)
    deleteClient = client_id => this.app.delete(`/delete/${client_id}`)
    addOrder = (order_id, client_id) => this.app.put('/add-order', { order_id, client_id })
    sendMail = mail => this.app.post('/contact', mail)
}

export default ClientService