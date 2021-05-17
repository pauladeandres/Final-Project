import { Component } from 'react'

import ProductsService from './../../../service/products.service'
import UserService from './../../../service/user.service'


import { Row, Container, Card, Accordion, Button } from 'react-bootstrap'
import MyProductList from './MyProductsList'
import MyDetails from './MyDetails'

class SupplierProfile extends Component {

    constructor() {
        super()
        this.state = {
            openForm: false
        }
        this.productsService = new ProductsService()
        this.userService = new UserService()
    }

    componentDidMount() {
        this.loadUser()
    }

    loadUser() {

        this.userService
            .getOneSupplier(this.props.loggedUser._id)
            .then(response => {
                this.props.storeUser( response.data )
            })
            .catch(err => console.log('TENEMOS UN PROBLEMA', err))
    }

    render() {

        return  (

            <Container>
                <h1>My Area</h1>
                
                <Row>
                    <MyDetails handleAlert={this.props.handleAlert} loggedUser={this.props.loggedUser} history={this.props.history}/>
                </Row>
        
                <Row>
                    <h1>My products</h1>
                    <MyProductList handleAlert={this.props.handleAlert} loggedUser={this.props.loggedUser}/>
                </Row>
                
            </Container>

        )
    }
}

export default SupplierProfile