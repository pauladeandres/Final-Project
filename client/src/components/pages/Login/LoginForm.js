import { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import AuthService from './../../../service/auth.service'

class LoginForm extends Component {

    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
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

                if ((response.data.role === 'SUPPLIER') && !response.data.client) {
                    this.props.history.push('/suppliers/signup')
                } else if (this.props.history.location.pathname !== '/login'){
                    console.log('pop up')
                    this.props.closeModal()
                    this.props.history.push(this.props.history.location.pathname)
                } else {
                    this.props.history.push('/')
                }
            })
            .catch(err => console.log('error de autenticacion:', err))
    }

    render() {
        return (

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
        )
    }
}

export default LoginForm