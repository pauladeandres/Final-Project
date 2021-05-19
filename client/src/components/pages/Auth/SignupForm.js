import { Component } from 'react'
import { Form, Button, Row, Col, Container, Alert } from 'react-bootstrap'
import ClientService from '../../../service/client.service'

class SignupForm extends Component {

    constructor() {
        super()
        this.state = {
            client: {
                firstName: '',
                secondName: '',
                company: '',
                vatNumber: '',
                address: '',
                zipcode: '',
                city: '',
                country: '',
                phone: ''
            },
            alert: {
                show: false,
                text: ' '
            }
        }
        this.clientService = new ClientService()
    }


    handleInputChange(e) {
        const { name, value } = e.target
        this.setState({ client: { ...this.state.client, [name]: value } })
    }


    handleSubmit(e) {
        e.preventDefault()
        this.clientService
            .createUser(this.state.client)
            .then( () => {
                this.props.updateCurrentUser()
                this.props.handleAlert(`Your datas have been saved ${this.state.client.firstName}`)
                this.props.loggedUser.role === 'SUPPLIER' ? this.props.history.push(`/`) : this.props.history.push(this.props.history.location.pathname)
            })
            .catch(err => {
                this.props.updateCurrentUser()
                this.setState({ alert: { show: true, text: err.response.data.message }})
            })
        
    }

    render() {
        return (
            <Container>
                <Alert show={this.state.alert.show} variant='danger'>{this.state.alert.text}</Alert>
                <Form onSubmit={e => this.handleSubmit(e)}>
                    <Row>
                        <Col>
                            <Form.Group controlId="firstName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" value={this.state.client.firstName} onChange={e => this.handleInputChange(e)} name="firstName" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="secondName">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control type="text" value={this.state.client.secondName} onChange={e => this.handleInputChange(e)} name="secondName" />
                            </Form.Group>
                        </Col>
                    </Row>
                    {this.props.loggedUser.role !== "CUSTOMER" && <Row>
                        <Col>
                            <Form.Group controlId="company">
                                <Form.Label>Company</Form.Label>
                                <Form.Control type="text" value={this.state.client.company} onChange={e => this.handleInputChange(e)} name="company" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="vatNumber">
                                <Form.Label>VAT number</Form.Label>
                                <Form.Control type="text" value={this.state.client.vatNumber} onChange={e => this.handleInputChange(e)} name="vatNumber" />
                            </Form.Group>
                        </Col>
                    </Row>}
                    <Form.Group controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" value={this.state.client.address} onChange={e => this.handleInputChange(e)} name="address" />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group controlId="zipcode">
                                <Form.Label>Zipcode</Form.Label>
                                <Form.Control type="number" value={this.state.client.zipcode} onChange={e => this.handleInputChange(e)} name="zipcode" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="city">
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" value={this.state.client.city} onChange={e => this.handleInputChange(e)} name="city" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="country">
                                <Form.Label>Country</Form.Label>
                                <Form.Control type="text" value={this.state.client.country} onChange={e => this.handleInputChange(e)} name="country" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId="phone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="number" value={this.state.client.phone} onChange={e => this.handleInputChange(e)} name="phone" />
                    </Form.Group>

                <Button variant="dark" style={{ width: '100%', marginTop: '20px' }} type="submit">{this.props.loggedUser.role === "CUSTOMER" && this.props.history === '/checkout'? 'Continue to payment' : 'Register'}</Button>
            </Form>
        </Container>
        )
    }
}

export default SignupForm