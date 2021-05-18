import './Checkout.css'
import { Component } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import OrdersService from '../../../service/order.service'
import CouponsService from '../../../service/coupon.service'
import CheckoutRow from './CheckoutRow'
import SignupForm from '../Auth/SignupForm'
import MyDetails from '../ClientArea/MyDetails'
import SpinnerRoll from 'components/shared/Spinner/SpinnnerRoll'

class Checkout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: undefined,
            total: undefined,
            customer: undefined,
            promoCode: undefined,
            couponValue: 0
        }

        this.orderService = new OrdersService()
        this.couponService = new CouponsService()
    }

    componentDidMount() {
        this.props.updateCurrentUser()
        this.updateProducts()
        this.updateCoupon()
    }

    updateProducts() {
        this.orderService
            .getUserOrder()
            .then(response => {
                this.setState({ products: response.data[0].products })
                const reducer = (accumulator, currentValue) => accumulator + currentValue
                this.setState({ total: this.state.products.map(elm => elm.option.price * elm.quantity).reduce(reducer) })
            })
            .catch(err => console.log(err))
    }

    handleInputChange(e) {
        const promoCode = e.target.value
        this.setState({ promoCode: promoCode })
    }

    handleSubmit(e) {
        e.preventDefault()
        this.state.couponValue !== 0 ? this.props.handleAlert('You can only use one coupon') :
            this.couponService
                .getAllCoupons()
                .then(response => this.checkCoupon(response.data))
                .catch(err => console.log(err))
    }

    checkCoupon(couponArray) {
        couponArray.map(elm => {
            if (elm.name === this.state.promoCode) {
                this.setState({ couponValue: elm.value, total: this.state.total - elm.value })
                this.applyCoupon(elm._id)
            } else {
                this.props.handleAlert('Your coupon is not working')
            }
        })
    }

    applyCoupon(couponId) {
        this.couponService
            .addCoupon(couponId)
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }

    updateCoupon() {
        this.orderService
            .getUserOrder()
            .then(response => {
                if (response.data[0].coupon) {
                    this.setState({ couponValue: response.data[0].coupon.value })
                    this.setState({ total: this.state.total - response.data[0].coupon.value })
                }
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Container>
                {
                    !this.state.products ? <SpinnerRoll /> :

                        <Row>
                            <h1 className="checkout-title">Checkout</h1>
                            <Col md={8} className="checkout-column">
                                <h3>Billing address</h3>
                                {this.props.loggedUser.client ? <MyDetails history={this.props.history} handleAlert={this.props.handleAlert} loggedUser={this.props.loggedUser} /> : <SignupForm handleAlert={this.props.handleAlert} history={this.props.history} loggedUser={this.props.loggedUser} updateCurrentUser={this.props.updateCurrentUser} />}
                            </Col>
                            <Col md={4} className="total-column">
                                <div className="checkout-column">
                                    <h3>Your cart</h3>
                                    {this.state.products.map(elm => <CheckoutRow key={elm._id} {...elm} />)}
                                    {this.state.couponValue !== 0 && <p className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">Coupon <span>- ${this.state.couponValue}</span></p>}
                                    <p className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0"><b>Total</b> <span><b>${this.state.total}</b></span></p>
                                    <Form className="coupon-form" onSubmit={e => this.handleSubmit(e)}>
                                        <Row>
                                            <Col md={7}>
                                                <Form.Group controlId="secondName">
                                                    <Form.Control type="text" placeholder="Promo code" value={this.state.promoCode} onChange={e => this.handleInputChange(e)} name="promoCode" />
                                                </Form.Group>
                                            </Col>
                                            <Col md={5}>
                                                <Button variant="dark" style={{ width: '100%' }} type="submit">Apply</Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            </Col>
                        </Row>

                }
            </Container>
        )
    }
}

export default Checkout

