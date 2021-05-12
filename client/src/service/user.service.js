import axios from 'axios'

class UserService {

    constructor() {
        this.app = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        })
    }

    getOneSupplier= supplier_id => this.app.get(`/supplier/myarea/${supplier_id}`)
    
}

export default UserService