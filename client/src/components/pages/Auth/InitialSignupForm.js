import { Component } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import AuthService from '../../../service/auth.service'

class InitialSignupForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            alert: {
                show: false,
                text: ' '
            }
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
            .signup(this.state)
            .then(response => {
                this.props.history.push('/login')
                this.props.handleAlert(`Welcome ${this.state.email}`)
            })
            .catch(err => {
                this.setState({ alert: { show: true, text: err.response.data.message }})
            })
    }

    render() {
        return (
            <>
            <Alert show={this.state.alert.show} variant='danger'>{this.state.alert.text}</Alert>
            <Form onSubmit={e => this.handleSubmit(e)}>
                
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" value={this.state.email} onChange={e => this.handleInputChange(e)} name="email" />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={this.state.password} onChange={e => this.handleInputChange(e)} name="password" />
                </Form.Group>

                <Button variant="dark" style={{ width: '100%', marginTop: '20px' }} type="submit">Sign-up</Button>
            </Form>
        </>
        )
    }
}

export default InitialSignupForm