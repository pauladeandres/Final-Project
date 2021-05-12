import { Component } from 'react'

import { Container, Form, Col, Button, Row } from 'react-bootstrap'

class MyDetails extends Component {

    constructor() {
        super()
        this.state = {
            products: undefined
            // showModal: false
        }
    }

    render() {

        return (
               <>
                    <h3>My info</h3>
                <Form>
                    <Form.Row as={Row}>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label sm={6}>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label sm={6}>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row as={Row}>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label sm={6}>First Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label sm={6}>Second Name</Form.Label>
                            <Form.Control type="text" placeholder="Password" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row as={Row}>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label sm={8}>Company Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label sm={4}>VAT Number</Form.Label>
                            <Form.Control type="text" placeholder="Password" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control placeholder="1234 Main St" />
                    </Form.Group>

                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control placeholder="" />
                    </Form.Group>

                    <Form.Row as={Row}>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>State</Form.Label>
                            <Form.Control as="select" defaultValue="Choose...">
                                <option>Choose...</option>
                                <option>...</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Zip</Form.Label>
                            <Form.Control />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                </>

        )
    }
}

export default MyDetails