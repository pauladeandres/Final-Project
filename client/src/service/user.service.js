import axios from 'axios'

class UserService {

    constructor() {
        this.app = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        })
    }
    
}

export default UserService