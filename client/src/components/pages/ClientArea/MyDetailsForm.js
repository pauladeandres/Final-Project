import { Component } from 'react'
import './MyDetails.css'
import { Form, Col, Row, Button, Alert } from 'react-bootstrap'
import SpinnerRoll from 'components/shared/Spinner/SpinnnerRoll'
import ClientService from 'service/client.service'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

class MyDetailsForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            client: props.client,
            role: undefined,
            disableForm: true,
            alert: {
                show: false,
                text: ' '
            }
        }
        this.clientService = new ClientService()
    }

    handleSubmitForm(e) {
        e.preventDefault()
        const clientId = this.props.loggedUser.role === 'ADMIN' ? this.state.client._id : this.props.loggedUser.client
        this.clientService
            .editClient(clientId, this.state.client)
            .then(response => {
                (this.props.loggedUser.role === 'ADMIN' && this.props.role === 'CUSTOMER') ? this.refresh() : this.loadClient()

                this.setState({ disableForm: true })
            })
            .then(() => this.props.handleAlert ? this.props.handleAlert(`Your datas have been saved ${this.state.client.firstName}`) : null)
            .catch(err => {
                this.setState({ alert: { show: true, text: err.response.data.message } })
            })
    }

    refresh() {
        this.props.closeModal()
        this.props.refreshClients()
    }

    setClient() {
        this.setState({ client: this.props.client })
    }

    loadClient() {
        this.clientService
            .getAssignedClient(this.props.client)
            .then(response => {
                this.setState({ client: response.data })
            })
            .catch(err => console.log(err))
    }

    handleInputChange(e) {
        const { name, value } = e.target
        this.setState({ client: { ...this.state.client, [name]: value } })
    }

    componentDidMount() {
        this.loadClient()
    }

    render() {
        return (
            !this.state.client
                ?
                <SpinnerRoll />
                :
                <>
                    <Alert show={this.state.alert.show} variant='danger'>{this.state.alert.text}</Alert>
                    <Form onSubmit={e => this.handleSubmitForm(e)}>
                        <Form.Row as={Row}>
                            <Form.Group as={Col} controlId="firstName">
                                <Form.Label sm={6}>First Name</Form.Label>
                                <Form.Control type="text" value={this.state.client.firstName} disabled={this.state.disableForm} onChange={e => this.handleInputChange(e)} name="firstName" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="secondName">
                                <Form.Label sm={6}>Second Name</Form.Label>
                                <Form.Control type="text" value={this.state.client.secondName} disabled={this.state.disableForm} onChange={e => this.handleInputChange(e)} name="secondName" />
                            </Form.Group>
                        </Form.Row>

                        {this.props.loggedUser.role !== "CUSTOMER" &&
                            <Form.Row as={Row}>
                                <Form.Group as={Col} controlId="company">
                                    <Form.Label sm={8}>Company Name</Form.Label>
                                    <Form.Control type="text" value={this.state.client.company} disabled={this.state.disableForm} onChange={e => this.handleInputChange(e)} name="company" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="vatNumber">
                                    <Form.Label sm={4}>VAT Number</Form.Label>
                                    <Form.Control type="text" value={this.state.client.vatNumber} disabled={this.state.disableForm} onChange={e => this.handleInputChange(e)} name="vatNumber" />
                                </Form.Group>
                            </Form.Row>
                        }

                        <Form.Group controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control value={this.state.client.address} disabled={this.state.disableForm} onChange={e => this.handleInputChange(e)} name="address" />
                        </Form.Group>

                        <Form.Group controlId="phone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control value={this.state.client.phone} disabled={this.state.disableForm} onChange={e => this.handleInputChange(e)} name="phone" />
                        </Form.Group>

                        <Form.Row as={Row}>
                            <Form.Group as={Col} controlId="city">
                                <Form.Label>City</Form.Label>
                                <Form.Control value={this.state.client.city} disabled={this.state.disableForm} onChange={e => this.handleInputChange(e)} name="city" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="country">
                                <Form.Label>Country</Form.Label>
                                <Form.Control value={this.state.client.country} disabled={this.state.disableForm} onChange={e => this.handleInputChange(e)} name="country" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="zipcode">
                                <Form.Label>Zip</Form.Label>
                                <Form.Control value={this.state.client.zipcode} disabled={this.state.disableForm} onChange={e => this.handleInputChange(e)} name="zipcode" />
                            </Form.Group>
                        </Form.Row>
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
                    {this.props.loggedUser === 'CUSTOMER' && this.props.history.location.pathname === "/checkout" && <Link to="/payment" className="btn btn-primary btn-lg btn-block payment-btn btn-dark">Continue to payment</Link>}
                </>
        )
    }
}

export default MyDetailsForm