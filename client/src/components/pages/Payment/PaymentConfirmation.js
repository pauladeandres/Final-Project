import { Container, Col, Form, Button } from 'react-bootstrap'
import { Component } from 'react'
import confirm from './confirm.gif'
import { Link } from 'react-router-dom'
import './PaymentConfirmation.css'
import OrdersService from '../../../service/order.service'


class PaymentConfirmation extends Component {
        constructor(props) {
        super(props)
        this.state = {
            lastOrder: undefined
        }

        this.orderService = new OrdersService()
    }

    componentDidMount() { 
        this.props.updateCartNumber()
        this.getLastOrder()
    }

    getLastOrder() {
        this.orderService
            .getLastOrderId()
            .then(response => this.setState({lastOrder: response.data._id}))
            .catch(err => console.log(err))
    }

    render() {
        return( !this.state.lastOrder? <h1>Loading...</h1> :
        <Container className="confirmation-page">
            <img src={confirm}></img> <span>Payment Complete</span>
            <p>Thank your for your order! </p> 
            <p><b>Your order reference is: {this.state.lastOrder && this.state.lastOrder}</b></p>
            <Link to="/customer-area" className="btn btn-dark">Go to my user area</Link>
        </Container>
    )
    }
}

export default PaymentConfirmation