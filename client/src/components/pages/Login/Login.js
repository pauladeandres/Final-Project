import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LoginForm from './LoginForm'

const Login = ({ storeUser, history, updateCartNumber }) => {

    return (

        <Container>

            <Row className="justify-content-center">

                <Col md={6}>

                    <h1>Log in form</h1>

                    <hr />

                    <LoginForm storeUser={storeUser} history={history} updateCartNumber={updateCartNumber}/>

                    <hr />

                    <Link to="/signup">Signup if you don't have an account ;)</Link>

                </Col>

            </Row>

        </Container>

    )
}

export default Login