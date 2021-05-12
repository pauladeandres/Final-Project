import { Card, Col, Row, Button } from 'react-bootstrap'

import { Link } from 'react-router-dom'

const MyProductCard = ({ _id, name, description, category, options }) => {

    return (
        <Card border="dark" className="supplier-list" style={{ width: '16rem' }}>
            <Row as={Row}>
                <Card.Header>{name}</Card.Header>
                <Col>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7k1rUf1Ikg726e8yeA-_qehH5ZdUKNCGOmhnUAz_zfVgj3F3OARR6NRH2y45HWVv8T90J9rU&usqp=CAc"></img>
                </Col>
                    <Card.Body>

                 <Col md={6}>
                     <Card.Text>
                         Category: {category}
                     </Card.Text>
                </Col>

                <Col md={6}>
                    <Card.Text>
                        Options: 7
                    </Card.Text>
                </Col>
                </Card.Body>
            </Row>
            <Row>
                <Link to={`/supplier/myarea/myproductdetails/${_id}`} className="btn btn-outline-dark btn-sm" style={{ width: '100%' }}>See and Edit</Link>
            </Row>
        </Card>
    )
}

export default MyProductCard