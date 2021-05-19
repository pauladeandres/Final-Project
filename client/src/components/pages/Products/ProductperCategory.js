import { Component } from 'react'
import ProductsService from './../../../service/products.service'
import ProductCard from './ProductCard'
import { Row, Container } from 'react-bootstrap'
import SpinnerRoll from 'components/shared/Spinner/SpinnnerRoll'

class ProductPerCategory extends Component {

    constructor() {
        super()
        this.state = {
            products: undefined
        }
        this.productsService = new ProductsService()
    }

    componentDidMount() {
        this.loadProducts()
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.loadProducts()
        }
    }

    loadProducts() {
        this.productsService
            .getProductPerCategory(this.props.match.params.id)
            .then(response => {
                console.log(response)
                this.setState({ products: response.data })
            })
<<<<<<< HEAD
            .catch(err => console.log('Error', err))
=======
            .catch(err => console.log('Err:', err))
>>>>>>> 3dc077355d44f0edaaa1b89ff3a93960886e2947
    }

    render() {
        const { products } = this.state
        return (
            !products
                ?
                <SpinnerRoll />
                :
                <Container>
                    <hr />
                    <Row>
                        {
                            !products.length
                            ?
                            <h1>No products in this category</h1>
                            :
                            <h1>{this.state.products[0].category.name} selection:</h1>
                        }
                    </Row>
                    <hr />
                    <Row>
                        {products.map(elm => <ProductCard key={elm._id} {...elm} />)}
                    </Row>
                </Container>
        )
    }
}

export default ProductPerCategory