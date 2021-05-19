import './CustomerArea.css'
import { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import OrdersService from '../../../service/order.service'
import MyDetailsForm from './MyDetailsForm'
import CustomerOrderCard from './CustomerOrderCard'
import CustomerFavoriteRow from './CustomerFavoriteRow'
import ProductsService from '../../../service/products.service'
import SpinnerRoll from 'components/shared/Spinner/SpinnnerRoll'
import SignupForm from '../Auth/SignupForm'
import DeleteUser from './DeleteUser'
 

class CustomerArea extends Component {
    constructor() {
        super()
        this.state = {
            orders: undefined,
            favorites: undefined
        }
        this.orderService = new OrdersService()
        this.productService = new ProductsService()
    }

    componentDidMount() {
        this.updateOrders()
        this.getFavoriteProducts()
        this.props.updateCartNumber()
    }

    updateOrders() {
        this.orderService
            .getUserPaidOrder()
            .then(response => {
                this.setState({ orders: response.data })
            })
            .catch(err => console.log(err))
    }

    getFavoriteProducts() {
        this.productService
            .getFavorites()
            .then(response => this.setState({ favorites: response.data.favoriteProducts }))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Container>
                {!this.state.orders || !this.state.favorites ? <SpinnerRoll /> :
                    <Row>
                        <h1>My account</h1>
                        <Col md={6}>
                            <div className="customer-box">
                                <h3>My last orders</h3>
                                {this.state.orders.map(elm => <CustomerOrderCard key={elm._id} {...elm} />)}
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="customer-box">
                                <h3>My billing details</h3>
                                {this.props.loggedUser.client ? <MyDetailsForm history={this.props.history} handleAlert={this.props.handleAlert} loggedUser={this.props.loggedUser} client={this.props.loggedUser.client}/>: <SignupForm handleAlert={this.props.handleAlert} history={this.props.history} loggedUser={this.props.loggedUser} updateCurrentUser={this.props.updateCurrentUser}/>} 
                            </div>
                            <div className="customer-box">
                                <h3>My favorites</h3>
                                {this.state.favorites.map(elm => <CustomerFavoriteRow key={elm._id} handleAlert={this.props.handleAlert} updateFavoriteProducts={() => this.getFavoriteProducts()} {...elm} />)}
                            </div>
                        </Col>
                    </Row>
                }
                <Row>
                    <DeleteUser currentUser={this.props.loggedUser} props={this.props}/>
                </Row>
            </Container>
        )
    }
}

export default CustomerArea