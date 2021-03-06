import './Checkout.css'
import { Component } from 'react'
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap'
import OrdersService from '../../../service/order.service'
import CouponsService from '../../../service/coupon.service'
import CheckoutRow from './CheckoutRow'
import SignupForm from '../Auth/SignupForm'
import MyDetails from '../ClientArea/MyDetails'
import SpinnerRoll from 'components/shared/Spinner/SpinnnerRoll'
import Payment from '../Payment/Payment'

class Checkout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: undefined,
            total: undefined,
            customer: undefined,
            promoCode: undefined,
            couponValue: 0,
            showModal: false,
            orderId: undefined
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
                const reducer = (accumulator, currentValue) => accumulator + currentValue
                const products = response.data[0].products
                const orderId = response.data[0]._id
                products.length === 0? this.setState({ products, orderId, total: 0}) : this.setState({ products, orderId, total: products.map(elm => elm.option.price * elm.quantity).reduce(reducer) })
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
        couponArray.forEach(elm => {
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
                    (!this.state.products || !this.state.total || this.state.total <= 0  ) ? <SpinnerRoll /> :
                        
                        <Row>
                            <h1 className="checkout-title">Checkout</h1>
                            <Col md={8} className="checkout-column">
                                <h3>Billing address</h3>
                                {this.props.loggedUser.client ? <MyDetails history={this.props.history} handleAlert={this.props.handleAlert} loggedUser={this.props.loggedUser} /> : <SignupForm handleAlert={this.props.handleAlert} history={this.props.history} loggedUser={this.props.loggedUser} updateCurrentUser={this.props.updateCurrentUser} />}
                                {this.props.loggedUser.client && <Button variant='dark' onClick={() => this.setState({ showModal: true })} className="payment-btn">Continue to payment</Button>}
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
                        <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })}>
                            <Modal.Header> <Modal.Title>Enter your credit card details</Modal.Title> </Modal.Header>
                            <Modal.Body>
                                <Payment history={this.props.history} total={this.state.total} orderId={this.state.orderId}/>
                            </Modal.Body>
                        </Modal>
                        </Row>

                }
            </Container>
        )
    }
}

export default Checkout

