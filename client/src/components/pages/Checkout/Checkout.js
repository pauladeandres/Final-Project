import './Checkout.css'
import { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import OrdersService from '../../../service/order.service'
import CheckoutRow from './CheckoutRow'
import SignupForm from '../Auth/SignupForm'
import MyDetails from '../SupplierArea/MyDetails'

class Checkout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: undefined,
            total: undefined,
            customer: undefined
        }

        this.orderService = new OrdersService()

        console.log(this.props)
    }

    componentDidMount() {
        this.props.updateCurrentUser()
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
                            <h1 className="checkout-title">Checkout</h1>
                            <Col md={8} className="checkout-column">
                                <h3>Billing address</h3>
                                {this.props.loggedUser.client? <MyDetails handleAlert={this.props.handleAlert} loggedUser={this.props.loggedUser}/> : <SignupForm handleAlert={this.props.handleAlert} history={this.props.history} loggedUser={this.props.loggedUser} updateCurrentUser={this.props.updateCurrentUser}/>}
                            </Col>
                            <Col md={4} className="total-column">
                                <div className="checkout-column">
                                    <h3>Your cart</h3>
                                    {this.state.products.map(elm => <CheckoutRow key={elm._id} {...elm}/>)}
                                    <p className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0"><b>Total</b> <span><b>${this.state.total}</b></span></p>
                                    
                                </div>
                            </Col>
                        </Row>
                        
                    } 
                </Container>
            )
        }
    }

export default Checkout

