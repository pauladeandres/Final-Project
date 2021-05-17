import axios from 'axios'

class CouponService {

    constructor() {
        this.app = axios.create({
            baseURL: 'http://localhost:5000/api/coupon',
            withCredentials: true
        })
    }

    getAllCoupons= () => this.app.get('/all')
    addCoupon = couponId => this.app.put(`/add/${couponId}`)
}

export default CouponService