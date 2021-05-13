import { Component } from 'react'
import ProductsService from './../../../service/products.service'
import MyProductCard from './MyProductsCard'
import NewProduct from '../NewProduct/NewProduct'

import { Row, Container, Accordion, Card, Button } from 'react-bootstrap'

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

    fetchProducts() {
        this.loadProducts()
    }

    render() {

        const { products } = this.state

        return (

            !products
                ?
                <h1>CARGANDO</h1>
                :
                <Container>
                    <Row>
                        {products.map(elm => <MyProductCard key={elm._id} {...elm} fetchProducts={() => this.fetchProducts()}/>)}
                    </Row>
                    <Row>
                        <Container>
                            <Accordion >
                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="0">
                                        <Button variant="dark" style={{ width: '100%' }}>Create Product</Button>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body><NewProduct loggedUser={this.props.loggedUser} fetchProducts={() => this.fetchProducts()}/></Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </Container>
                    </Row>
                </Container>

        )
    }
}

export default MyProductList