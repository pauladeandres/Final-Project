import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ProductCard = ({ name,  _id, options }) => {

    console.log(options)

    return (
        <Col md={3}>
            <Card className="product-card">
                    <Card.Img variant="top" src={options[0].image} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Link to={`/product/${_id}`} className="btn btn-dark btn-sm" style={{ width: '100%' }}>Details</Link>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ProductCard