import axios from 'axios'

class OptionService {

    constructor() {
        this.app = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        })
    }

    createOption = (product_id, optionDetails) => this.app.post(`/option/myarea/newoption/${product_id}`, optionDetails)
    getOption = option_id => this.app.get(`/option/option/${option_id}`)
    deleteOption = option_id => this.app.delete(`/option/delete/${option_id}`)

}

export default OptionService