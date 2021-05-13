import { Component } from 'react'
import './CartRow.css'
import { Col, Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import OrdersService from '../../../service/order.service'
import { Link } from 'react-router-dom'


class CartRow extends Component {

    constructor(props) {
        super(props)
        this.state = {
            products: this.props,
            quantity: this.props.quantity
        }

        this.orderService = new OrdersService()
    }

    handleDelete(e, id) {
        e.preventDefault()
        this.orderService 
            .deleteProduct(id)
            .then(response => console.log(response))
            .catch(err => console.log(err))
        this.props.fetchProducts()
    }

    handleInputChange(e) {
        this.setState({quantity: e.target.value})
    }

    handleSubmit(e, id) { 
        e.preventDefault()

        const quantity = this.state.quantity
        this.orderService
            .editQuantity(id, {quantity})
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }

    render() {
        {
            if(!this.state.products) { <h1>Loading...</h1> } else {
            
            const product = this.state.products
            const totalPrice = product.quantity * product.option.price 
            const link = `/product/${product.product._id}`

            return (
                <div id={product._id} className="cart-items">
                    <Col md={3}>
                        <img src={product.option.image}></img>
                    </Col>
                    <Col md={9}>
                        <Link to={link} ><h5>{product.product.name}</h5></Link>
                        <p>Color: {product.option.color}</p>
                        <p>Unit price: <b>${product.option.price}</b></p>
                        <p>Total price: <b>${totalPrice}</b></p>
                        <Form className="edit-quantity-form" onSubmit={e => this.handleSubmit(e, product._id)}>
                            <Col xs={3}>
                                <Form.Group controlId="quantity">
                                <Form.Label>Quantity:</Form.Label>
                                <Form.Control type="number" min="1" name="quantity" value={this.state.quantity} onChange={e => this.handleInputChange(e)}/>
                                </Form.Group>
                            </Col>
                            <Col xs={3}>
                                <Button variant="dark" type="submit">Update</Button>
                            </Col>
                        </Form>
                        <Form className="delete-btn" onSubmit={e => this.handleDelete(e, product._id)}>
                            <Button type="submit"><FontAwesomeIcon icon={faTrashAlt}/></Button>
                        </Form>    
                    </Col> 
                </div>
                    )
            }
        }
    }
}

export default CartRow