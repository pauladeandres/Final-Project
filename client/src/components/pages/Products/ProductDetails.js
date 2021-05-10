import { Component } from 'react'
import ProductsService from '../../../service/database.service'
import { Container } from 'react-bootstrap'

class ProductDetails extends Component {

    constructor() {
        super()
        this.state = {
            product: undefined
        }
        this.productService = new ProductsService()
        console.log(this.productService)
    }

    componentDidMount() {

        // const { product_id } = this.props.match.params.id
        console.log(this.props.match.params.id)

        this.productService
            .getAllProducts()
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }

    render() {

        // const { product } = this.state

        return (
            <Container>
                <h1>Hello</h1>
                {/* {
                    !this.state.product ? <h1>Loading...</h1> :

                        <Row>
                            <Col md={6}>
                            </Col>
                            <Col md={6}>
                                <h1>{product.name}</h1>
                                <h3>Information</h3>
                                <p>{product.description}</p>
                                <hr />
                                
                            </Col>
                        </Row>
                } */}

            </Container>
        )
    }
}

export default ProductDetails