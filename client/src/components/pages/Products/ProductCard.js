import { Card, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './ProductCard.css'

const ProductCard = ({ name,  _id, options }) => {

    return (
        <Col md={3} className="product-card">
            <Card >
                <Container >
                    <Card.Img variant="top" src={options[0].image} />
                </Container>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Link to={`/product/${_id}`} className="btn btn-dark btn-sm" style={{ width: '100%' }}>Details</Link>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ProductCard