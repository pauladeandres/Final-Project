import axios from 'axios'

class CouponService {

    constructor() {
        this.app = axios.create({
            baseURL: `${process.env.REACT_APP_BASE_URL}/coupon`,
            withCredentials: true
        })
    }

    getAllCoupons = () => this.app.get('/all')
    addCoupon = couponId => this.app.put(`/add/${couponId}`)
}

export default CouponService