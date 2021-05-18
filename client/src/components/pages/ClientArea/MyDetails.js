import { Component } from 'react'
import './MyDetails.css'
import ClientService from '../../../service/client.service'
import { Form, Col, Button, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import SpinnerRoll from 'components/shared/Spinner/SpinnnerRoll'
import MyDetailsForm from './MyDetailsForm'

class MyDetails extends Component {

    constructor(props) {
        //REVIEW refactorizar o no? client: {this.props.loggedUser.clients}
        super(props)
        this.state = {
            client: {
                firstName: this.props.loggedUser.client.firstName,
                secondName: this.props.loggedUser.client.secondName,
                company: this.props.loggedUser.client.company,
                vatNumber: this.props.loggedUser.client.vatNumber,
                address: this.props.loggedUser.client.address,
                zipcode: this.props.loggedUser.client.zipcode,
                city: this.props.loggedUser.client.city,
                country: this.props.loggedUser.client.country,
                phone: this.props.loggedUser.client.phone
            },
            disableForm: true
        }
        this.clientService = new ClientService()
    }

    componentDidMount() {
        this.loadClient()
    }

    loadClient() {
        this.clientService
            .getAssignedClient(this.props.loggedUser.client)
            .then(response => {
                this.setState({ client: response.data })
                this.props.handleAlert(`Your datas have been saved ${this.state.client.firstName}`)
            })
            .catch(err => console.log(err))
    }

    handleSubmitForm(e) {
        e.preventDefault()
        this.clientService
            .editClient(this.props.loggedUser.client, this.state.client)
            .then(response => {
                this.loadClient()
                this.setState({ disableForm: true })
            })
            .catch(err => console.log(err))
    }

    handleInputChange(e) {
        const { name, value } = e.target
        this.setState({ client: { ...this.state.client, [name]: value } })
    }

    render() {

        return (

            !this.props.loggedUser
                ?
                <SpinnerRoll />
                :
                <>
                    <Form onSubmit={e => this.handleSubmitForm(e)}>

                        {this.state.client.firstName ? <MyDetailsForm {...this.state.client} disabled={this.state.disableForm} loggedUser={this.props.loggedUser} handleInput={(e) => this.handleInputChange(e)} /> : <SpinnerRoll />}
                        {
                            this.state.disableForm === false
                                ?
                                <Form.Row>

                                    <Button className="edit-save-btn" variant="dark" type="submit" onClick={() => this.setState({ disableForm: false })}>
                                        Save Changes
                    </Button>
                                </Form.Row>
                                :

                                <Button className="edit-save-btn" variant="dark" onClick={() => this.setState({ disableForm: false })}>
                                    {this.props.loggedUser.role === "CUSTOMER" ? 'Edit address' : 'Edit Profile'}
                                </Button>

                        }
                    </Form>

                    {this.props.history.location.pathname === "/checkout" && <Link to="/payment" className="btn btn-primary btn-lg btn-block payment-btn btn-dark">Continue to payment</Link>}

                </>

        )
    }
}

export default MyDetails