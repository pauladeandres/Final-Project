import { Component } from 'react'
import ProductsService from './../../../service/products.service'
import ClientService from './../../../service/client.service'
import AuthService from 'service/auth.service'

import { Row, Container, Button } from 'react-bootstrap'
import MyProductList from './MyProductsList'
import DeleteUser from './DeleteUser'
import SpinnerRoll from 'components/shared/Spinner/SpinnnerRoll'
import MyDetailsForm from './MyDetailsForm'

class SupplierProfile extends Component {

    constructor() {
        super()
        this.state = {
            openForm: false,
            currentUser: undefined
        }
        this.productsService = new ProductsService()
        this.clientService = new ClientService()
        this.authService = new AuthService()
    }

    componentDidMount() {
        this.loadUser()
    }

    loadUser() {

        this.clientService
            .getOneSupplier(this.props.match.params.id)
            .then(response => {
                this.setState({ currentUser: response.data })
            })
            .catch(err => console.log('Error loading User', err))
    }

    render() {
        return (

            !this.state.currentUser ? <SpinnerRoll /> :

                <Container>
                    <h1>My Area</h1>
                    <Row>
                        <MyDetailsForm handleAlert={this.props.handleAlert} client={this.state.currentUser.client} loggedUser={this.props.loggedUser} history={this.props.history} />
                    </Row>
                    <Row>
                        <h1>My products</h1>
                        <MyProductList handleAlert={this.props.handleAlert} client={this.state.currentUser.client} />
                    </Row>
                    <Row>
                        {console.log(this.props)}
                        <DeleteUser storeUser={this.props.storeUser} currentUser={this.state.currentUser} props={this.props}/>
                    </Row>
                </Container>

        )
    }
}

export default SupplierProfile