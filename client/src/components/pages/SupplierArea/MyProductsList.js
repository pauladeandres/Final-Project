import { Component } from 'react'
import ProductsService from './../../../service/products.service'
// import MyProductCard from './MyProductCard'

import { Row } from 'react-bootstrap'

class MyProductList extends Component {

    constructor() {
        super()
        this.state = {
            products: undefined
            // showModal: false
        }
        this.productsService = new ProductsService()
    }


    componentDidMount() {
        this.loadProducts()
    }

    loadProducts() {

        this.productsService
            .getAllProducts()
            .then(response => this.setState({ products: response.data }))
            .catch(err => console.log('TENEMOS UN PROBLEMA', err))
    }

    render() {

        const { products } = this.state

        return (

            // !products
            //     ?
            //     <h1>CARGANDO</h1>
            //     :
                <>
                    <Row>
                        <h1>Lista de productos</h1>
                        {/* {products.map(elm => <MyProductCard key={elm._id} {...elm} />)} */}
                    </Row>
                </>

        )
    }
}

export default MyProductList