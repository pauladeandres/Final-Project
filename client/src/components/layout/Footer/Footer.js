import { Container, Col, Row } from 'react-bootstrap';
import './Footer.css'
import instagram from './instagram.png'

const Footer = () => {
    return (
        <footer>
            <Container className="footer-container">
                <Row>
                    <Col>
                        <h4>Email Us</h4>
                    </Col>

                    <Col>
                        <h1>HOME</h1>
                    </Col>

                    <Col>
                        <h4>Chat</h4>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col>
                        <h6>Social</h6>
                        <div className="socialIcons">
                            <img src={instagram} alt="Instagram"/>
                        </div>
                    </Col>
                    <Col className="ourBrands">
                        <h6>Our brands</h6>
                        <p>FRAMA</p>
                        <p>PINCH</p>
                        <p>SKLUM</p>
                        <p>Vitra</p>
                        <p>AYTM</p>
                        <p>Blu Dot</p>
                        <p>Umbra</p>
                    </Col>
                    <Col>
                        <h6>From Monday to Friday</h6>
                        <h6>8:30h to 20:00h</h6>
                    </Col>

                </Row>
            </Container>
        </footer>
    )
};
export default Footer