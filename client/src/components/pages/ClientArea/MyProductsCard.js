import './MyProductsCard.css'

import OptionService from '../../../service/option.service'

import ProductsService from '../../../service/products.service'
import nophoto from './nophoto.png'
import { Card, Col, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const MyProductCard = ({ _id, name, category, options, fetchProducts, handleAlert }) => {

    function deleteProduct(e) {
        const productService = new ProductsService()
        const optionService = new OptionService()

        e.preventDefault()
        options.forEach(option => {
        optionService
            .deleteOption(option._id)
            .then(() => {
                fetchProducts()
            })
            .catch(err => console.log(err))
        })

        productService
            .deleteProduct(_id)
            .then(() => {
                handleAlert(`${name} has been removed`)
                fetchProducts()
            })
            .catch(err => console.log(err))
    }

    return (
        <Card border="dark" className="supplier-list" style={{ width: '16rem' }}>
            <Row as={Row} style={{ height: '450px' }}>
                <Card.Header>{name}</Card.Header>
                <Col className="img-container">
                    {
                        options[0] === undefined
                            ?
                            <img src={nophoto} alt="Not provided"></img>
                            :
                            <img src={options[0].image} alt={name}></img>
                    }
                </Col>
                <Card.Body>

                    <Col md={6}>
                        <Card.Text>
                            Category: {category === undefined ? <p>Other</p> : category.name}
                        </Card.Text>
                    </Col>
                    <Col md={6}>
                        <Card.Text>
                            Options: {options.length}
                        </Card.Text>
                    </Col>
                </Card.Body>
            </Row>
            <Row>
                <Link to={`/supplier/myarea/myproductdetails/${_id}`} className="btn btn-outline-dark btn-sm" style={{ width: '100%' }}>See and Edit</Link>
            </Row>
            <Row>
                <Button onClick={(e) => deleteProduct(e)} variant="danger">Delete</Button>
            </Row>
        </Card>
    )
}

export default MyProductCard