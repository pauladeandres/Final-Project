import './ProductDetails.css'
import { Component } from 'react'
import ProductsService from '../../../service/products.service'
import OrdersService from '../../../service/order.service'
import OptionsService from '../../../service/option.service'
import { Container, Row, Modal, Col, Form, Button, Alert } from 'react-bootstrap'
import LoginForm from '../Login/LoginForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import SpinnerRoll from 'components/shared/Spinner/SpinnnerRoll'
import ProductCarousel from './ProductCarousel'

class ProductDetails extends Component {

    constructor() {
        super()
        this.state = {
            order: {
                product: undefined,
                color: undefined,
                quantity: 0,
            },
            alert: {
                show: false,
                text: ' '
            },
            showModal: false,
            options: undefined,
            favorite: false,
        }
        this.productService = new ProductsService()
        this.orderService = new OrdersService()
        this.optionService = new OptionsService()
    }

    handleInputChange(e) {
        const { name, value } = e.target
        this.setState({ order: { ...this.state.order, [name]: value } })
    }

    handleSubmit(e) {
        e.preventDefault()
        const selectedOption = this.state.options.find(elm => elm.color === this.state.order.color)

        if (this.props.loggedUser && this.state.order.quantity <= selectedOption.stock) {

            const customer = this.props.loggedUser._id
            const product = this.state.order.product._id
            const quantity = this.state.order.quantity
            const option = selectedOption._id

            this.orderService
                .createOrder({ product, quantity, option, customer })
                .then(() => {
                    this.props.updateCartNumber()
                    this.props.handleAlert(`You added ${this.state.order.product.name} to your Cart`)
                })
                .catch(err => this.setState({ alert: { show: true, text: err.response.data.message } }))
            this.updateStock(selectedOption)
        } else if (this.props.loggedUser && this.state.order.quantity > selectedOption.stock) {
            this.props.handleAlert('Not enough items available.')
        } else { this.setState({ showModal: true }) }
    }

    handleFavorite(e, product_id) {
        e.preventDefault()
        if (this.props.loggedUser) {
            this.productService
                .addFavorite({ product_id })
                .then(() => this.setState({ favorite: true }))
                .catch(err => console.log(err))
            this.props.handleAlert(`You added ${this.state.order.product.name} to your favorites`)
        } else { this.setState({ showModal: true }) }
    }

    componentDidMount() {
        this.importOptions()
        this.props.updateCartNumber()
    }

    importOptions() {
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
        this.props.loggedUser.favoriteProducts.includes(this.state.order.product._id) ? this.setState({ favorite: true }) : this.setState({ favorite: false })
    }

    updateStock(selectedOption) {
        const previousStock = selectedOption.stock
        const stock = previousStock - this.state.order.quantity
        const optionId = selectedOption._id
        this.optionService
            .updateStock(optionId, { stock: stock })
            .then(response => console.log(response))
            .catch(err => console.log(err))
        this.importOptions()
    }


    render() {
        const product = this.state.order
        console.log(product)
        const img = this.state.options?.find(elm => elm.color === this.state.order.color).image || product.image
        const price = this.state.options?.find(elm => elm.color === this.state.order.color).price || product.price
        const stock = this.state.options?.find(elm => elm.color === this.state.order.color).stock || product.stock

        return (
            <Container>
                {
                    !this.state.options ? <SpinnerRoll /> :
                    <>
                        <Row className="product-img">
                            <Col md={6}>
                                <img src={img} alt="spinner"></img>
                            </Col>
                            <Col md={6} className="product-details">

                                {this.state.favorite ? <span className="favorite-btn btn btn-light">Added to favorites <FontAwesomeIcon icon={faHeart} /></span> : <Form onSubmit={e => this.handleFavorite(e, this.state.order.product._id)}><Button className="favorite-btn" variant="dark" type="submit">Add to favorites <FontAwesomeIcon icon={faHeart} /></Button></Form>}
                                <h1>{product.product.name}</h1>
                                <h3>Information</h3>
                                <p>{product.product.description}</p>
                                <p><b>Category:</b> {product.product.category.name}</p>
                                <p><b>Available items:</b> {stock} {stock === undefined && <span className="red-text">OUT OF STOCK</span>}</p>
                                <p className="price-detail">$ {price}</p>
                                <hr />

                                <Alert show={this.state.alert.show} variant='danger'>{this.state.alert.text}</Alert>
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
                                        <LoginForm handleAlert={this.props.handleAlert} storeUser={this.props.storeUser} history={this.props.history} closeModal={() => this.setState({ showModal: false })} />
                                    </Modal.Body>
                                </Modal>
                            </Col>
                        </Row>
                         <hr/>
                        <Row className="relatedproducts">
                            <h3>OTHER PRODUCTS YOU MIGHT LIKE</h3>
                            <ProductCarousel category={product.product.category._id}/>
                        </Row>
                    </>
                        
                }
               
                
            </Container>
        )
    }
}

export default ProductDetails