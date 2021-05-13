import './Checkout.css'
import { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import OrdersService from '../../../service/order.service'
import CheckoutRow from './CheckoutRow'


class Checkout extends Component {
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
                console.log(response)
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
                        <h1 className="cart-title">Checkout</h1>
                        <Col md={8} className="cart-column">
                            <h3>Billing address</h3>
                            <p>form </p>
                        </Col>
                        <Col md={4} className="total-column">
                            <h3>Your cart</h3>
                            {console.log(this.state.products)}
                            {this.state.products.map(elm => <CheckoutRow key={elm._id} {...elm} />)}
                            {this.state.total}
                        </Col>
                    </Row>
                } 
            </Container>
        )
    }
    
}

export default Checkout