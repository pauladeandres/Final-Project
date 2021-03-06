import { Container } from 'react-bootstrap'
import { Component } from 'react'
import confirm from './confirm.gif'
import { Link } from 'react-router-dom'
import './PaymentConfirmation.css'
import OrdersService from '../../../service/order.service'
import ClientService from '../../../service/client.service'
import SpinnerRoll from 'components/shared/Spinner/SpinnnerRoll'


class PaymentConfirmation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lastOrder: undefined
        }

        this.orderService = new OrdersService()
        this.clientService = new ClientService()
    }

    componentDidMount() {
        this.props.updateCartNumber()
        this.getLastOrder()
    }

    getLastOrder() {
        this.orderService
            .getLastOrderId()
            .then(response => {
                this.setState({lastOrder: response.data._id})
                this.addOrderCustomer(response.data._id)
                this.props.updateCartNumber()
            })
            .catch(err => console.log(err))
    }

    addOrderCustomer(orderId) {
        this.clientService
            .addOrder(orderId, this.props.loggedUser.client)
            .then(() => {this.props.updateCartNumber()})
            .catch(err => console.log(err))
    }

    render() {
        return (
            !this.state.lastOrder ? <SpinnerRoll /> :
                <Container className="confirmation-page">
                    <img src={confirm} alt="confirmation"></img> <span>Payment Complete</span>
                    <p>Thank your for your order! </p>
                    <p><b>Your order reference is: {this.state.lastOrder && this.state.lastOrder}</b></p>
                    {this.props.loggedUser.role === 'CUSTOMER' ? <Link to="/customer-area" className="btn btn-dark">Go to my user area</Link>
                        :
                        <Link to="/" className="btn btn-dark">Go to Home</Link>
                    }

                </Container>

        )
    }
}

export default PaymentConfirmation