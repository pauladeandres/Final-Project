import { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import AuthService from '../../../service/auth.service'

class SignupForm extends Component {

    constructor() {
        super()
        this.state = {
            firstName: '',
            secondName: '',
            company: '',
            address: '',
            zipcode: '',
            city: '',
            country: '',
            phone: ''
        }
        this.authService = new AuthService()
    }


    handleInputChange(e) {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }


    handleSubmit(e) {
        e.preventDefault()
        this.authService
            .createUser(this.state)
            .then(response => {
                this.props.history.push('/')
            })
            .catch(err => console.log(err))
    }

    render() {
        return (

            <Form onSubmit={e => this.handleSubmit(e)}>

                <Form.Group controlId="firstName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={this.state.firstName} onChange={e => this.handleInputChange(e)} name="firstName" />
                </Form.Group>

                <Form.Group controlId="secondName">
                    <Form.Label>Second name</Form.Label>
                    <Form.Control type="text" value={this.state.secondName} onChange={e => this.handleInputChange(e)} name="secondName" />
                </Form.Group>

                <Form.Group controlId="company">
                    <Form.Label>Company</Form.Label>
                    <Form.Control type="text" value={this.state.company} onChange={e => this.handleInputChange(e)} name="company" />
                </Form.Group>

                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" value={this.state.address} onChange={e => this.handleInputChange(e)} name="address" />
                </Form.Group>

                <Form.Group controlId="zipcode">
                    <Form.Label>Zipcode</Form.Label>
                    <Form.Control type="number" value={this.state.zipcode} onChange={e => this.handleInputChange(e)} name="zipcode" />
                </Form.Group>

                <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="text" value={this.state.country} onChange={e => this.handleInputChange(e)} name="country" />
                </Form.Group>

                <Form.Group controlId="phone">
                    <Form.Label>Zipcode</Form.Label>
                    <Form.Control type="number" value={this.state.phone} onChange={e => this.handleInputChange(e)} name="phone" />
                </Form.Group>

                <Button variant="dark" style={{ width: '100%', marginTop: '20px' }} type="submit">Registro</Button>
            </Form>
        )
    }
}

export default SignupForm