import { Component } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import AuthService from '../../../service/auth.service'

class SignupForm extends Component {

    constructor() {
        super()
        this.state = {
            firstName: '',
            secondName: '',
            company: '',
            vatNumber: '',
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
                console.log(response)
                this.props.history.push('/')
            })
            .catch(err => console.log(err))
        this.props.updateCurrentUser()
    }

    render() {
        return (

            <Form onSubmit={e => this.handleSubmit(e)}>
                <Row>
                    <Col>
                        <Form.Group controlId="firstName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={this.state.firstName} onChange={e => this.handleInputChange(e)} name="firstName" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="secondName">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control type="text" value={this.state.secondName} onChange={e => this.handleInputChange(e)} name="secondName" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="company">
                            <Form.Label>Company</Form.Label>
                            <Form.Control type="text" value={this.state.company} onChange={e => this.handleInputChange(e)} name="company" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="vatNumber">
                            <Form.Label>VAT number</Form.Label>
                            <Form.Control type="text" value={this.state.vatNumber} onChange={e => this.handleInputChange(e)} name="vatNumber" />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" value={this.state.address} onChange={e => this.handleInputChange(e)} name="address" />
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group controlId="zipcode">
                            <Form.Label>Zipcode</Form.Label>
                            <Form.Control type="number" value={this.state.zipcode} onChange={e => this.handleInputChange(e)} name="zipcode" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="city">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" value={this.state.city} onChange={e => this.handleInputChange(e)} name="city" />
                        </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId="country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control type="text" value={this.state.country} onChange={e => this.handleInputChange(e)} name="country" />
                    </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="number" value={this.state.phone} onChange={e => this.handleInputChange(e)} name="phone" />
                </Form.Group>

                <Button variant="dark" style={{ width: '100%', marginTop: '20px' }} type="submit">Registro</Button>
            </Form>
        )
    }
}

export default SignupForm