import { Component } from 'react'
import ProductsService from './../../../service/products.service'
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
    }

    componentDidMount() {
        this.loadUser()
    }

    loadUser() {

        this.clientService
            .getOneSupplier(this.props.match.params.id)
            .then(response => {
                console.log('el response data', response.data.client)
                this.setState({ currentUser: response.data.client })
            })
            .catch(err => console.log('TENEMOS UN PROBLEMA', err))
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

                </Container>

        )
    }
}

export default SupplierProfile