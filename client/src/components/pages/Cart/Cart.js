import './Cart.css'
import { Component } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import OrdersService from '../../../service/order.service'
import CartRow from './CartRow'


class Cart extends Component {
    constructor() {
        super()
        this.state = {
            products: undefined,
            total: undefined
        }

        this.orderService = new OrdersService()
    }

    componentDidMount() {

        this.updateProducts()
    }

    updateProducts() {
        this.orderService
            .getUserOrder()
            .then(response => {
                this.setState({products: response.data[0].products})
                const reducer = (accumulator, currentValue) => accumulator + currentValue
                this.setState({total: this.state.products.map(elm => elm.option.price*elm.quantity).reduce(reducer)})
            })
            .catch(err => console.log(err)) 
    }

    render() {
        return (
            <Container>
                {
                    !this.state.products ? <h1>Loading...</h1> :

                    <Row>
                        <h1 className="cart-title">Shopping Cart</h1>
                        <Col md={8} className="cart-column">
                            <h3>Cart (<span>{this.state.products.length}</span> items)</h3>
                            {this.state.products.map(elm => <CartRow key={elm._id} {...elm} />)}
                        </Col>
                        <Col md={4} className="total-column">
                            <div className="cart-column">
                                <h3>Total amount</h3>
                                <br></br>
                                <p className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">Temporary amount <span>${this.state.total}</span></p>
                                <p className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">Shipping <span>Gratis</span></p>
                                <hr></hr>
                                <p className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0"><b>Total amount including VAT</b><b><span>${this.state.total}</span></b></p>
                                <Button className="checkout-btn">Go to checkout</Button>
                            </div>
                        </Col>
                    </Row>
                }
            </Container>
        )
    }
    
}

export default Cart