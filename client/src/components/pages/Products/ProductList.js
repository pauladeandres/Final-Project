import { Component } from 'react'
import ProductCard from './ProductCard'
import SpinnerRoll from '../../shared/Spinner/SpinnnerRoll'
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
                <SpinnerRoll />
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