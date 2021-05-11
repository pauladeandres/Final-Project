import axios from 'axios'

class CategoryService {

    constructor() {
        this.app = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        })
    }

    getAllCategories = () => this.app.get('/supplier')
}

export default CategoryService