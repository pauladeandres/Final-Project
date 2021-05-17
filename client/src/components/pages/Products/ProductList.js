import { Component } from 'react'
import ProductsService from './../../../service/products.service'
import ProductCard from './ProductCard'

import { Row } from 'react-bootstrap'

class ProductList extends Component {

    constructor() {
        super()
        this.state = {
        }
    }

    render() {

        return (

            !this.props.products
                ?
                <h1>Loading...</h1>
                :
                <>
                    <Row>
                        {this.props.products.map(elm => <ProductCard key={elm._id} {...elm} />)}
                    </Row>
                </>

        )
    }
}

export default ProductList