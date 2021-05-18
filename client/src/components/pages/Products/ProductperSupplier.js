import { Component } from 'react'
import ProductsService from '../../../service/products.service'
import ProductCard from './ProductCard'
import SpinnerRoll from '../../shared/Spinner/SpinnnerRoll'
import { Row } from 'react-bootstrap'

class ProductPerSupplier extends Component {

    constructor() {
        super()
        this.state = {
            products: undefined
        }
        this.productsService = new ProductsService()
    }


    componentDidMount() {
        this.loadProducts()
        console.log(this.props)
    }

    loadProducts() {
        this.productsService
            .getProductBySupplier()
            .then(response => this.setState({ products: response.data }))
            .catch(err => console.log('TENEMOS UN PROBLEMA', err))
    }

    render() {

        const { products } = this.state

        return (

            !products
                ?
                <SpinnerRoll />
                :
                <>
                    <Row>
                        {products.map(elm => <ProductCard key={elm._id} {...elm} />)}
                    </Row>
                </>

        )
    }
}

export default ProductPerSupplier