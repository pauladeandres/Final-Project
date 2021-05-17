import './Payment.css'
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import InjectedCheckoutForm from './InjectedCheckoutForm'
import { Container, Row, Col } from 'react-bootstrap'
const stripePromise = loadStripe('pk_test_51Is8adJE4qSE89JMvcORBlSdU36pr3in0HPADEthZQqgtlzOdesvZ38ZuJPOcGhXlzJkIRp2px3zyKcKF5EdaYYP00lhOozlNu');


const Payment = () => (
    <Container>
        <Row>
            <Col md={6}>
                <h1>Payment</h1>
                <p>Product color quantity price</p>
                <p>Coupon</p>
                <p>Total </p>
            </Col>
            <Col className="justify-content-center" md={6}>
                <Elements stripe={stripePromise}>
                    <InjectedCheckoutForm />
                </Elements>
            </Col>
        </Row>
  </Container>
);
  

export default Payment