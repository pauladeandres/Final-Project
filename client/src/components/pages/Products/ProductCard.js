import { Card, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './ProductCard.css'

const ProductCard = ({ name,  _id, options }) => {

    return (
        <Col md={3} className="product-card">
            <Card >
                <Container>
                    <Link to={`/product/${_id}`}  style={{ width: '100%' }}>
                    <Card.Img variant="top" src={options[0].image} />
                </Link>
                </Container>
                <Container className="product-caption">
                    <Card.Body>
                    <Card.Title style={{fontSize: '1em'}}>{name} |</Card.Title>
                        <Card.Text style={{ fontSize: '1em' }}>{options[0].price}EUR</Card.Text>
                </Card.Body>
                </Container>
            </Card>
        </Col>
    )
}

export default ProductCard