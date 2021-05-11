import { Component } from 'react'
import ProductsService from '../../../service/products.service'
import { Container, Row, Col } from 'react-bootstrap'

class ProductDetails extends Component {

    constructor() {
        super()
        this.state = {
            product: undefined
        }
        this.productService = new ProductsService()
    }

    componentDidMount() {
        const product_id = this.props.match.params.id

        this.productService
            .getOneProduct(product_id)
            .then(response => this.setState({ product: response.data }))
            .catch(err => console.log(err))
    }

    render() {

        const { product } = this.state
        console.log(product)

        return (
            <Container>
                {
                    !this.state.product ? <h1>Loading...</h1> :

                        <Row>
                            <Col md={6}>
                            </Col>
                            <Col md={6}>
                                <h1>{product.name}</h1>
                                <h3>Information</h3>
                                <p>{product.description}</p>
                                <p>{product.category.name}</p>
                                {console.log('product options', product.options)}
                                {/* {product.options.forEach(elm => console.log(elm))} */}
                                <hr />
                                
                            </Col>
                        </Row>
                }

            </Container>
        )
    }
}

export default ProductDetails