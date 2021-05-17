import './CustomerOrderRow.css'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const CustomerOrderRow = (product) => {
    const link = `/product/${product.product._id}`
    const totalPrice = product.option.price*product.quantity

    return(
        <Row className="product-order-row">
            <Col md={3}>
                <img src={product.option.image} alt={product.product.name}></img>
            </Col>
            <Col md={9}>
                <Link to={link}><h5>{product.product.name}</h5></Link>
                <Row>
                    <Col>
                        <p>Color: {product.option.color}</p>
                        <p>Quantity: {product.quantity}</p>
                    </Col>
                    <Col>
                        <p>Unit price: ${product.option.price}</p>
                        <p>Total price: ${totalPrice}</p>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default CustomerOrderRow