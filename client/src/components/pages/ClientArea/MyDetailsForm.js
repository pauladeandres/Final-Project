import { Component } from 'react'
import './MyDetails.css'
import ClientService from '../../../service/client.service'
import { Form, Col, Button, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import SpinnerRoll from 'components/shared/Spinner/SpinnnerRoll'

const MyDetailsForm = ({ disabled, loggedUser, handleInput, ...client }) => {

    console.log(client, disabled, loggedUser)

    return (
        !client.firstName ? <SpinnerRoll /> :

            <>

                <Form.Row as={Row}>
                    <Form.Group as={Col} controlId="firstName">
                        <Form.Label sm={6}>First Name</Form.Label>
                        <Form.Control type="text" value={client.firstName} disabled={disabled} onChange={e => handleInput(e)} name="firstName" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="secondName">
                        <Form.Label sm={6}>Second Name</Form.Label>
                        <Form.Control type="text" value={client.secondName} disabled={disabled} onChange={e => handleInput(e)} name="secondName" />
                    </Form.Group>
                </Form.Row>

                {loggedUser.role != "CUSTOMER" &&
                    <Form.Row as={Row}>
                        <Form.Group as={Col} controlId="company">
                            <Form.Label sm={8}>Company Name</Form.Label>
                            <Form.Control type="text" value={client.company} disabled={disabled} onChange={e => handleInput(e)} name="company" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="vatNumber">
                            <Form.Label sm={4}>VAT Number</Form.Label>
                            <Form.Control type="text" value={client.vatNumber} disabled={disabled} onChange={e => handleInput(e)} name="vatNumber" />
                        </Form.Group>
                    </Form.Row>
                }

                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control value={client.address} disabled={disabled} onChange={e => handleInput(e)} name="address" />
                </Form.Group>

                <Form.Group controlId="phone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control value={client.phone} disabled={disabled} onChange={e => handleInput(e)} name="phone" />
                </Form.Group>

                <Form.Row as={Row}>
                    <Form.Group as={Col} controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control value={client.city} disabled={disabled} onChange={e => handleInput(e)} name="city" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control value={client.country} disabled={disabled} onChange={e => handleInput(e)} name="country" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="zipcode">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control value={client.zipcode} disabled={disabled} onChange={e => handleInput(e)} name="zipcode" />
                    </Form.Group>
                </Form.Row>

            </>

    )
}

export default MyDetailsForm