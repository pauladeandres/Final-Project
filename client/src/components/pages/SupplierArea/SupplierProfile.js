import { Component } from 'react'

import ProductsService from './../../../service/products.service'

import NewProduct from '../NewProduct/NewProduct'

import { Row, Container, Card, Accordion, Button } from 'react-bootstrap'
import MyProductList from './MyProductsList'
import MyDetails from './MyDetails'

class SupplierProfile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            products: undefined,
            openForm: false
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
            <Container>
                <h1>My Area</h1>
                
                <Row>
                    <MyDetails />
                </Row>
        
                <Row>
                    <h1>My products</h1>
                  {/* <MyProductList loggedUser={loggedUser}/> */}
                </Row>

                <Row>
                    <Container>
                    <Accordion >
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                <Button variant="dark" style={{ width: '100%' }}>Create Product</Button>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                    <Card.Body><NewProduct loggedUser={this.props.loggedUser}/></Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                    </Container>
                </Row>
        
            </Container>

        )
    }
}

export default SupplierProfile