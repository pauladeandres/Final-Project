import axios from 'axios'

class CategoryService {

    constructor() {
        this.app = axios.create({
            baseURL: `${process.env.REACT_APP_BASE_URL}`,
            withCredentials: true
        })
    }

    getAllCategories = () => this.app.get('/client/')
}

export default CategoryService