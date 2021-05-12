
import { Component } from 'react'
import ProductsService from '../../../service/products.service'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

class MyProductDetails extends Component {

    constructor() {
        super()
        this.state = {
            product: undefined,
        }
        this.productService = new ProductsService()

    }

    // componentDidMount() {
    //     this.findProduct()
    // }

    // findProduct() {

    //     const {product_id} = this.props.match.params

    //     this.productService
    //         .getMyProductDetails(product_id)
    //         .then(response => this.setState({ product: response.data }))
    //         .catch(err => console.log(err))
    // }
    

    render() {

        const { product } = this.state

        return (
            <Container>
                <h1>product details</h1>
            </Container>
        )
    }
}

export default MyProductDetails