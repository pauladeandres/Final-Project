import axios from 'axios'

class AuthService {

    constructor() {
        this.app = axios.create({
            baseURL: `${process.env.REACT_APP_BASE_URL}/auth`,
            withCredentials: true
        })
    }

    login = userDetails => this.app.post('/login', userDetails)
    signup = userDetails => this.app.post('/signup', userDetails)
    logout = () => this.app.get('/logout')
    isloggedin = () => this.app.post('/isloggedin')
    deleteUser = user_id => this.app.delete(`/delete/${user_id}`)
    updateUser = () => this.app.get('/client/details')
    updateRole = (userDetails) => this.app.put('/client/update', userDetails)
}

export default AuthService