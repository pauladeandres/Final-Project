import { Component } from "react";
import ClientService from "service/client.service";

const { InputGroup, FormControl, Form, Container, Row, Col, Button } = require("react-bootstrap");

class ContactForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            subject: '',
            text: '',
            alert: {
                show: false,
                text: ' '
            },
        }

        this.clientService = new ClientService()
    }

    handleSubmit(e) {
        e.preventDefault()
        console.log(e)

        this.clientService
            .sendMail(this.state)
            .then(() => this.emptyForm())
            .catch(err =>
                this.setState({ alert: { show: true, text: err.response.data.message } })
            )
    }

    handleInputChange(e) {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    emptyForm() {
        console.log('hola')
        this.props.handleAlert('Thank you for your feedback!')
        this.setState({ email: '', subject: '', text: '' })
    }

    render() {

        return (
            <Container>
                <Row className={'justify-content-center'}>
                    <Col md={6}>

                        <Form onSubmit={e => this.handleSubmit(e)}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={e => this.handleInputChange(e)} name="email" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                            </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="subject">
                                <Form.Label>Subject</Form.Label>
                                <Form.Control type="text" onChange={e => this.handleInputChange(e)} value={this.state.subject} name="subject" />
                            </Form.Group>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Text</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl as="textarea" aria-label="With textarea" type="text" value={this.state.text} placeholder="Insert question" onChange={e => this.handleInputChange(e)} name="text" />
                            </InputGroup>
                            <Button variant="dark" style={{ width: '100%', marginTop: '20px' }} type="submit">Send email</Button>
                        </Form >
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ContactForm