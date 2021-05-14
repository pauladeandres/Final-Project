import { Card, Col } from 'react-bootstrap'

const ClientCard = ({ email, _id }) => {

    return (
        <Col md={3}>
            <Card>
                <Card.Img variant="top" />
                <Card.Body>
                    <Card.Title>{email}</Card.Title>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ClientCard