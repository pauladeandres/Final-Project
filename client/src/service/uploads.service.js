import axios from 'axios'

class UploadsService {

    constructor() {
        this.app = axios.create({
            baseURL: `${process.env.REACT_APP_BASE_URL}/uploads`,
            withCredentials: true
        })
    }

    uploadimage = imageForm => this.app.post('/image', imageForm)
}

export default UploadsService