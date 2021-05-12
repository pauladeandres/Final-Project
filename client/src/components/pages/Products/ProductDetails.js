import './ProductDetails.css'
import { Component } from 'react'
import ProductsService from '../../../service/products.service'
import OrdersService from '../../../service/order.service'
import { Container, Row, Modal, Col, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LoginForm from '../Login/LoginForm'

class ProductDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            product: undefined,
            option: undefined,
            color: undefined,
            quantity: 0,
            customer: undefined,
            showModal: false
        }
        this.productService = new ProductsService()

        this.orderService = new OrdersService()
        
    }

    handleInputChange(e) {
        this.updateCustomer()
        const {name, value} = e.target
        this.setState({ [name]: value })

        const product_id = this.props.match.params.id
        
        this.productService
            .getOneProduct(product_id)
            .then(response => this.setState({option: response.data.options.find(option => option.color === this.state.color)}))
            .catch(err => console.log(err))
    }

    handleSubmit(e) {
        this.updateCustomer()
        e.preventDefault()
        if (this.state.customer) {
            const customer = this.state.customer
            const product = this.state.product._id
            const quantity = this.state.quantity
            const option = this.state.option._id

            this.orderService
                .createOrder({product, quantity, option, customer})
                .then(response => {
                    console.log(response)
                    // this.props.handleAlert('Thank you for your order', true)
                })
                .catch(err => console.log(err))
        } else {this.setState({ showModal: true })}
        
    }

    componentDidMount() {

        this.updateOption()
        this.updateCustomer()
    }
    
    updateOption() {
        const product_id = this.props.match.params.id
        
        this.productService
            .getOneProduct(product_id)
            .then(response => {
                this.setState({ product: response.data, option: response.data.options[0], color: response.data.options[0].color})
            })
            .catch(err => console.log(err))
    }
    
    updateCustomer() {
        console.log('updating user:', this.props.loggedUser)
        this.props.loggedUser? this.setState({customer: this.props.loggedUser._id}) : console.log('User not logged')
    }

    render() {

        const { product } = this.state

        return (
            <Container>
                {
                    !this.state.product ? <h1>Loading...</h1> :
                        
                        <Row>
                            <Col md={6}>
                                <img src={this.state.option.image}></img>
                            </Col>
                            <Col md={6}>
                                <h1>{product.name}</h1>
                                <h3>Information</h3>
                                <p>{product.description}</p>
                                <p>Category: {product.category.name}</p>
                                <p className="price-detail">$ {this.state.option.price}</p>
                                <hr />
                                
                                <Form onSubmit={e => this.handleSubmit(e)}>
                                    <Form.Row className="add-cart-bar">
                                        <Col xs={6}>
                                            <Form.Group controlId="option">
                                            <Form.Label>Color</Form.Label>
                                            <Form.Control as="select" value={this.state.color} onChange={e => this.handleInputChange(e)} name="color">
                                                {product.options.map(elm =>
                                                <option key={elm._id}>{elm.color} </option>)}
                                            </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={3}>
                                            <Form.Group controlId="quantity">
                                            <Form.Label>Quantity</Form.Label>
                                            <Form.Control type="number" min="1" value={this.state.quantity} onChange={e => this.handleInputChange(e)} name="quantity" />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={3}>
                                            <Button variant="dark" type="submit">Add to Cart</Button>
                                        </Col>
                                    </Form.Row>
                                </Form>
                                
                                <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })}>
                                    <Modal.Header> <Modal.Title>Please Log In</Modal.Title> </Modal.Header>
                                    <Modal.Body>
                                        <LoginForm storeUser={this.props.storeUser} history={this.props.history} closeModal={() => this.setState({ showModal: false })}/>
                                    </Modal.Body>
                                    <Link to="/signup">No account yet? Sign up</Link>
                                </Modal>
                                
                            </Col>
                        </Row>
                }

            </Container>
        )
    }
}

export default ProductDetails