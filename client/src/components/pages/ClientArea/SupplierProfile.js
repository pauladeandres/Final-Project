import { Component } from 'react'
import ProductsService from './../../../service/products.service'
import AuthService from 'service/auth.service'
import DeleteUser from './DeleteUser'
import { Row, Container } from 'react-bootstrap'
import MyProductList from './MyProductsList'
import MyDetails from './MyDetails'
import SpinnerRoll from 'components/shared/Spinner/SpinnnerRoll'
import ClientService from 'service/client.service'
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
                this.setState({ currentUser: response.data.client })
            })
            .catch(err => console.log('Error loading User', err))
    }

    eliminateAccount(e) {

        e.preventDefault()

        this.clientService
            .deleteClient(this.state.currentUser.client._id)
            .then(response => console.log(response))
            .catch(err => console.log('Error deleting client', err))

        this.authService
            .deleteUser(this.state.currentUser._id)
            .then(response => {
                this.props.handleAlert(`Account deleted correctly`)
            })
            .catch(err => console.log('Error deleting user', err))
    }

    render() {
        return (

            !this.state.currentUser ? <SpinnerRoll /> :

                <Container>
                    <h1>My Area</h1>

                    <Row>
                        <MyDetailsForm handleAlert={this.props.handleAlert} client={this.state.currentUser} loggedUser={this.props.loggedUser} history={this.props.history} />
                    </Row>

                    <Row>
                        <h1>My products</h1>
                        <MyProductList handleAlert={this.props.handleAlert} client={this.state.currentUser} />
                    </Row>

                    <Row>
                        <MyDetails handleAlert={this.props.handleAlert} loggedUser={this.props.loggedUser} history={this.props.history} />
                    </Row>

                    <Row>
                        <DeleteUser currentUser={this.state.currentUser} />
                    </Row>

                </Container>

        )
    }
}

export default SupplierProfile