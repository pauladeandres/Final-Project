import { Component } from 'react'
import './MyDetails.css'
import ClientService from '../../../service/client.service'
import { Form, Col, Button, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class MyDetails extends Component {

    constructor(props) {
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
                this.setState({client: response.data})
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
            <h1>Loadin data...</h1>
            :
               <>
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

                    {this.props.loggedUser.role != "CUSTOMER" && 
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
                        {this.props.loggedUser.role === "CUSTOMER"? 'Edit address' : 'Edit Profile'}
                    </Button>
                    
                    }
                </Form>
               
            </>

        )
    }
}

export default MyDetails