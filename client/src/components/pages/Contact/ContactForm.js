import { Component } from "react";

const { InputGroup, FormControl, Form, Container, Row, Col, Button } = require("react-bootstrap");

class ContactForm extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            text: '',

        }
    }

    handleSubmit() {

    }

    handleInputChange(e) {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    render() {

        return (
            <Container>
                <Row className={'justify-content-center'}>
                    <Col md={6}>

                        <Form onSubmit={e => this.handleSubmit(e)}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={e => this.handleInputChange(e)} name="email" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                            </Form.Text>
                            </Form.Group>

                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Text</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl as="textarea" aria-label="With textarea" type="text" placeholder="Insert question" onChange={e => this.handleInputChange(e)} name="text" />
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