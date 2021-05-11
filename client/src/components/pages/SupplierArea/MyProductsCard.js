import { Card, Col, Row, Container } from 'react-bootstrap'

const MyProductCard = ({ name, description, category, options }) => {

    return (
        <Container className="supplier-list">
                <Row>
                  <Card.Header>Product id...</Card.Header>
                  <Card.Body>
                    <Col md={6}>
                    <Card.Title>Name...</Card.Title>
                    <Card.Text>
                        Description....
                    </Card.Text>
                    </Col>
                    <Col md={6}>
                        <Card.Title>Name...</Card.Title>
                        <Card.Text>
                            Description....
                        </Card.Text>
                        </Col>
                  </Card.Body>
                  </Row>
        </Container>
    )
}

export default MyProductCard