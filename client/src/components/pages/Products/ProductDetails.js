import './ProductDetails.css'
import { Component } from 'react'
import ProductsService from '../../../service/products.service'
import OrdersService from '../../../service/order.service'
import { Container, Row, Modal, Col, Form, Button } from 'react-bootstrap'
import LoginForm from '../Login/LoginForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

class ProductDetails extends Component {

    constructor() {
        super()
        this.state = {
            order: {
                product: undefined,
                color: undefined,
                quantity: 0,
            },
            showModal: false,
            options: undefined,
            favorite: false
        }
        this.productService = new ProductsService()
        this.orderService = new OrdersService()
    }

    handleInputChange(e) {
        const {name, value} = e.target
        this.setState({ order: { ...this.state.order, [name]: value }})
    }

    handleSubmit(e) {
        e.preventDefault()
        if (this.props.loggedUser) {
            
            const customer = this.props.loggedUser._id
            const product = this.state.order.product._id
            const quantity = this.state.order.quantity
            const option = this.state.options.find(elm => elm.color === this.state.order.color)._id 

            this.orderService
                .createOrder({product, quantity, option, customer})
                .then(response => {
                    this.props.updateCartNumber() 
                    this.props.handleAlert(`You added ${this.state.order.product.name} to your Cart`)
                })
                .catch(err => console.log(err))  
        } else {this.setState({ showModal: true })} 
    }

    componentDidMount() {
        this.importProduct()
        this.props.updateCartNumber() 
    }
    
    importProduct() {
        const product_id = this.props.match.params.id
        
        this.productService
            .getOneProduct(product_id)
            .then(response => {
                this.setState({ options: response.data.options, order: { ...this.state.order, product: response.data, option: response.data.options[0], color: response.data.options[0].color } })
                this.checkFavorite()    
            })
            .catch(err => console.log(err))
    }

    checkFavorite() {
        this.props.loggedUser.favoriteProducts.includes(this.state.order.product._id)? this.setState({favorite: true}) : this.setState({favorite: false})
    }

    handleFavorite(e, product_id) {
        e.preventDefault()
        if (this.props.loggedUser) {
            this.productService
                .addFavorite({product_id})
                .then(()=> this.setState({favorite: true}) )
                .catch(err => console.log(err))  
        this.props.handleAlert(`You added ${this.state.order.product.name} to your favorites`)
        } else {this.setState({ showModal: true })} 
    }

    render() {
        console.log("rerendering")
        const product = this.state.order
        const img = this.state.options?.find(elm => elm.color === this.state.order.color).image || product.image
        const price = this.state.options?.find(elm => elm.color === this.state.order.color).price || product.price
        const stock = this.state.options?.find(elm => elm.color === this.state.order.color).stock || product.stock

        return (
            <Container>
                {
                    !this.state.options ? <h1>Loading...</h1> :

                        <Row className="product-img">
                            <Col md={6}>
                                <img src={img}></img>
                            </Col>
                            <Col md={6} className="product-details">
                            
                                {this.state.favorite? <span className="favorite-btn btn btn-light">Added to favorites <FontAwesomeIcon icon={faHeart} /></span> : <Form onSubmit={e => this.handleFavorite(e, this.state.order.product._id)}><Button className="favorite-btn" variant="dark" type="submit">Add to favorites <FontAwesomeIcon icon={faHeart} /></Button></Form>}  
                                <h1>{product.product.name}</h1>
                                <h3>Information</h3>
                                <p>{product.product.description}</p>
                                <p><b>Category:</b> {product.product.category.name}</p>
                                <p><b>Available items:</b> {stock}</p>
                                <p className="price-detail">$ {price}</p>
                                <hr />
                                
                                <Form onSubmit={e => this.handleSubmit(e)}>
                                   <Form.Row className="add-cart-bar">
                                        <Col xs={6}>
                                            <Form.Group controlId="option">
                                            <Form.Label>Color</Form.Label>
                                            <Form.Control as="select" value={product.color} onChange={e => this.handleInputChange(e)} name="color">
                                                {this.state.options.map(elm =>
                                                <option key={elm._id}>{elm.color} </option>)}
                                            </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={3}>
                                            <Form.Group controlId="quantity">
                                            <Form.Label>Quantity</Form.Label>
                                            <Form.Control type="number" min="1" value={product.quantity} onChange={e => this.handleInputChange(e)} name="quantity" />
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
                                        <LoginForm handleAlert={this.props.handleAlert} storeUser={this.props.storeUser} history={this.props.history} closeModal={() => this.setState({ showModal: false })}/>
                                    </Modal.Body>
                                </Modal> 
                            </Col>
                        </Row>
                }
            </Container>
        )
    }
}

export default ProductDetails