import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import InitialSignupForm from './InitialSignupForm'

const InitialSignup = ({ history, handleAlert }) => {

    return (

        <Container>

            <Row className="justify-content-center">

                <Col md={6}>

                    <h1>Sign up form</h1>

                    <hr />

                    <InitialSignupForm history={history} handleAlert={handleAlert}/>

                    <hr />

                    <Link to="/login" className="btn btn-dark">Iniciar sesión</Link>

                </Col>

            </Row>

        </Container>

    )
}

export default InitialSignup