import { Component } from 'react'

import { Form, Col, Button, Row } from 'react-bootstrap'

class MyDetails extends Component {

    constructor() {
        super()
        this.state = {
            disableForm: true
        }
    }

    render() {

        return (
            
            !this.props.loggedUser
            ?
            <h1>Loadin data...</h1>
            :
               <>
                    <h3>My info</h3>
                <Form>
                    <Form.Row as={Row}>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label sm={6}>Email</Form.Label>
                            <Form.Control type="email" value={this.props.loggedUser.email} disabled={this.state.disableForm}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row as={Row}>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label sm={6}>First Name</Form.Label>
                            <Form.Control type="text" value={this.props.loggedUser.client.firstName}  disabled={this.state.disableForm}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label sm={6}>Second Name</Form.Label>
                            <Form.Control type="text" value={this.props.loggedUser.client.secondName}  disabled={this.state.disableForm}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row as={Row}>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label sm={8}>Company Name</Form.Label>
                            <Form.Control type="text" value={this.props.loggedUser.client.company}  disabled={this.state.disableForm}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label sm={4}>VAT Number</Form.Label>
                                <Form.Control type="text" value={this.props.loggedUser.client.vatNumber}disabled={this.state.disableForm}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                            <Form.Control value={this.props.loggedUser.client.address}disabled={this.state.disableForm}/>
                    </Form.Group>

                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Phone Number</Form.Label>
                            <Form.Control value={this.props.loggedUser.client.phone} disabled={this.state.disableForm}/>
                    </Form.Group>

                    <Form.Row as={Row}>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                                <Form.Control value={this.props.loggedUser.client.city} disabled={this.state.disableForm}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Country</Form.Label>
                                <Form.Control value={this.props.loggedUser.client.country} disabled={this.state.disableForm} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Zip</Form.Label>
                                <Form.Control value={this.props.loggedUser.client.zipcode} disabled={this.state.disableForm}/>
                        </Form.Group>
                    </Form.Row>
                     {
                        this.state.disableForm === false
                         ?
                    <Form.Row>
                    <Button className="save-changes" variant="outline-dark" type="submit" onClick={() => this.setState({ disableForm: false })}>
                        Save Changes
                    </Button>
                    </Form.Row>
                    :
                    
                    <Button className="save-changes" variant="danger" onClick={() => this.setState({ disableForm: false })}>
                        Edit Profile
                    </Button>
                    
                    }

                </Form>

               
            </>

        )
    }
}

export default MyDetails