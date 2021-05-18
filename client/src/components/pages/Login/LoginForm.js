import { Component } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import AuthService from './../../../service/auth.service'
import { Link } from 'react-router-dom'

class LoginForm extends Component {

    constructor() {
        super()
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
            .login(this.state)
            .then(response => {

                this.props.storeUser(response.data)

                this.props.handleAlert(`Welcome back ${response.data.email}`)
                
                if ((response.data.role === 'SUPPLIER') && !response.data.client) {
                    this.props.history.push('/suppliers/signup')
                } else if (this.props.history.location.pathname !== '/login'){
                    this.props.closeModal()
                    this.props.history.push(this.props.history.location.pathname)
                } else if ((response.data.role === 'ADMIN') && !response.data.client) {
                    this.props.history.push('/admin')
                } else {
                    this.props.history.push('/')
                }
            })
            .catch(err => {
                this.setState({ alert: { show: true, text: err.response.data.message } })
                console.log(err.response)
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

                    <Button variant="dark" style={{ width: '100%', marginTop: '20px' }} type="submit">Iniciar sesión</Button>
                </Form>

                <hr />

                <Link to="/signup">Not an account yet? Sign up</Link>
            </>
        )
    }
}

export default LoginForm