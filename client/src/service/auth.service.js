import axios from 'axios'

class AuthService {

    constructor() {
        this.app = axios.create({
            baseURL: 'http://localhost:5000/api/auth',
            withCredentials: true
        })
    }

    login = userDetails => this.app.post('/login', userDetails)
    signup = userDetails => this.app.post('/signup', userDetails)
    logout = () => this.app.get('/logout')
    isloggedin = () => this.app.post('/isloggedin')
    createUser = () => this.app.post('/supplier/new')
    editClient = (client_id, clientDetails) => this.app.put(`/client/${client_id}`, clientDetails)
    getAssignedClient = client_id => this.app.get(`/clientdetails/${client_id}`)
}

export default AuthService