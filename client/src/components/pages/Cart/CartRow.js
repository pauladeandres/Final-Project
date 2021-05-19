import { Component } from 'react'
import './CartRow.css'
import { Col, Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import OrdersService from '../../../service/order.service'
import OptionsService from '../../../service/option.service'
import { Link } from 'react-router-dom'
import SpinnerRoll from 'components/shared/Spinner/SpinnnerRoll'


class CartRow extends Component {

    constructor(props) {
        super(props)
        this.state = {
            products: this.props,
            quantity: this.props.quantity
        }

        this.orderService = new OrdersService()
        this.optionService = new OptionsService()
    }

    handleDelete(e, id) {
        e.preventDefault()
        this.orderService
            .deleteProduct(id)
            .then(response => {
                console.log(response)
                this.props.fetchProducts()
            })
            .catch(err => console.log(err))
        this.updateStock()
        this.props.handleAlert(`${this.state.products.product.name} was removed from your Cart`)
    }

    handleInputChange(e) {
        this.setState({ quantity: e.target.value })
    }

    handleSubmit(e, id) {
        e.preventDefault()

        const quantity = this.state.quantity
        this.orderService
            .editQuantity(id, { quantity })
            .then(() => this.props.fetchProducts())
            .catch(err => console.log(err))
        this.props.handleAlert(`${this.state.products.product.name} quantity was update to ${this.state.quantity} items.`)
    }

    updateStock() {
        const currentStock = this.props.option.stock
        const newStock = currentStock + this.state.quantity
        const optionId = this.props.option._id
        this.optionService
            .updateStock(optionId, { stock: newStock })
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }

    render() {

            if (!this.state.products) { <SpinnerRoll /> } else {

                const product = this.state.products
                const totalPrice = this.state.quantity * product.option.price
                const link = `/product/${product.product._id}`

                return (
                    <div id={product._id} className="cart-items">
                        <Col md={3}>
                            <img src={product.option.image} alt={product.name}></img>
                        </Col>
                        <Col md={9}>
                            <Form className="delete-btn" onSubmit={e => this.handleDelete(e, product._id)}>
                                <Button className="btn-dark" type="submit"><FontAwesomeIcon icon={faTrashAlt} /></Button>
                            </Form>
                            <Link to={link} ><h5>{product.product.name}</h5></Link>
                            <p>Color: {product.option.color}</p>
                            <p>Unit price: <b>${product.option.price}</b></p>
                            <p>Total price: <b>${totalPrice}</b></p>
                            <Form className="edit-quantity-form" onSubmit={e => this.handleSubmit(e, product._id)}>
                                <Col xs={3}>
                                    <Form.Group controlId="quantity">
                                        <Form.Label>Quantity:</Form.Label>
                                        <Form.Control type="number" min="1" name="quantity" value={this.state.quantity} onChange={e => this.handleInputChange(e)} />
                                    </Form.Group>
                                </Col>
                                <Col xs={3}>
                                    <Button variant="dark" type="submit">Update</Button>
                                </Col>
                            </Form>
                        </Col>
                    </div>
            )
        }
    }
}

export default CartRow