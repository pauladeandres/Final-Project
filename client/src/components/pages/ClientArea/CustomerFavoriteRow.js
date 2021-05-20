import { Row, Col, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ProductsService from '../../../service/products.service'


const CustomerFavoriteRow = ( {_id, name, updateFavoriteProducts, handleAlert} ) => {

    const link = `/product/${_id}`

    const productService = new ProductsService()

    const removeFavorite = (e, product_id) => {
        e.preventDefault()
        productService
            .removeFavorite(product_id)
            .then( () => {
                updateFavoriteProducts()
                handleAlert(`${name} was removed from your favorites`)
            })
            .catch(err => console.log(err))
    }

    return(
        <Row>
            <Col md={9}>
                <Link to={link}><p><b>{name}</b></p></Link>
            </Col>
            <Col md={3}>
                <Form onSubmit={e => removeFavorite(e, _id)}>
                    <Button variant="dark" type="submit">Remove</Button>
                </Form>
            </Col>
        </Row>
    )
}

export default CustomerFavoriteRow