import axios from 'axios'

class ClientService {

    constructor() {
        this.app = axios.create({
            baseURL: 'http://localhost:5000/api/client',
            withCredentials: true
        })
    }

    getOneSupplier = supplier_id => this.app.get(`/myarea/${supplier_id}`)
    editClient = (client_id, clientDetails) => this.app.put(`/client/${client_id}`, clientDetails)
    getAssignedClient = client_id => this.app.get(`/clientdetails/${client_id}`)
    createUser = clientDetails => this.app.post('/supplier/new', clientDetails)

}

export default ClientService