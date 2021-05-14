import { Container, Row, Col } from 'react-bootstrap'
import LoginForm from './LoginForm'

const Login = ({ storeUser, history, updateCartNumber, handleAlert }) => {

    return (

        <Container>

            <Row className="justify-content-center">

                <Col md={6}>

                    <h1>Log in form</h1>

                    <hr />

                    <LoginForm storeUser={storeUser} history={history} updateCartNumber={updateCartNumber} handleAlert={handleAlert}/>


                </Col>

            </Row>

        </Container>

    )
}

export default Login