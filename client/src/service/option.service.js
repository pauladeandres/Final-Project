import axios from 'axios'

class OptionService {

    constructor() {
        this.app = axios.create({
            baseURL: `${process.env.REACT_APP_BASE_URL}/option`,
            withCredentials: true
        })
    }

    createOption = (product_id, optionDetails) => this.app.post(`/myarea/newoption/${product_id}`, optionDetails)
    getOption = option_id => this.app.get(`/option/${option_id}`)
    deleteOption = option_id => this.app.delete(`/delete/${option_id}`)
    updateStock = (option_id, stock) => this.app.put(`/update-stock/${option_id}`, stock)

}

export default OptionService