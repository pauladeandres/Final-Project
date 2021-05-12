import { Component } from 'react'

import ProductsService from './../../../service/products.service'
import UserService from './../../../service/user.service'
import NewProduct from '../NewProduct/NewProduct'

import { Row, Container, Card, Accordion, Button } from 'react-bootstrap'
import MyProductList from './MyProductsList'
import MyDetails from './MyDetails'

class SupplierProfile extends Component {

    constructor() {
        super()
        this.state = {
            products: undefined,
            openForm: false,
        }
        this.productsService = new ProductsService()
        this.userService = new UserService()
    }

    componentDidMount() {
        this.loadProducts()
        this.loadUser()
    }

    loadProducts() {
        this.productsService
            .getAllProducts()
            .then(response => {
                this.setState({ products: response.data })
                console.log(this.props.loggedUser)
            })
            .catch(err => console.log('TENEMOS UN PROBLEMA', err))
    }

    loadUser() {

        this.userService
            .getOneSupplier(this.props.loggedUser._id)
            .then(response => {
                console.log(response)
                this.props.storeUser( response.data )
            })
            .catch(err => console.log('TENEMOS UN PROBLEMA', err))
    }

    render() {

        return  (

            <Container>
                <h1>My Area</h1>
                
                <Row>
                    <MyDetails loggedUser={this.props.loggedUser}/>
                </Row>
        
                <Row>
                    <h1>My products</h1>
                  <MyProductList loggedUser={this.props.loggedUser}/>
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