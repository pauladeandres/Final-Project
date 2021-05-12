import { Component } from 'react'
import ProductsService from './../../../service/products.service'
import MyProductCard from './MyProductsCard'

import { Row } from 'react-bootstrap'

class MyProductList extends Component {

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

    loadProducts() {

        this.productsService
            .getProductBySupplier(this.props.loggedUser._id)
            .then(response => { 
                this.setState({ products: response.data })
                console.log(this.state.products)
            })
            .catch(err => console.log('TENEMOS UN PROBLEMA', err))
    }

    render() {

        const { products } = this.state

        return (

            !products
                ?
                <h1>CARGANDO</h1>
                :
                <>
                    <Row>
                         {products.map(elm => <MyProductCard key={elm._id} {...elm} />)}
                    </Row>
                </>

        )
    }
}

export default MyProductList