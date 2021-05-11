import './Cart.css'
import { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

class Cart extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <Container>
                <Row>
                    <h5 className="mb-4">Cart (<span>2</span> items)</h5>
                    <Col md={8} className="cart-items">   
                        <Col md={3} >
                            <img class="img-fluid w-100"
                  src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12a.jpg" alt="Sample"></img>
                        </Col>
                        <Col md={7}>
                            <h5>Blue denim shirt</h5>
                            <p class="mb-2 text-muted text-uppercase small">Color: blue</p>
                            <p class="mb-3 text-muted text-uppercase small">Brand: Ikea</p>
                            <a href="#!" type="button" class="card-link-secondary small text-uppercase mr-3"><i
                                class="fas fa-trash-alt mr-1"></i> Remove item </a>
                            <a href="#!" type="button" class="card-link-secondary small text-uppercase"><i
                                class="fas fa-heart mr-1"></i> Move to wish list </a>
                            <p class="mb-0"><span><strong>$17.99</strong></span></p>
                        </Col>
                        <Col md={2}>
                            <input class="quantity" min="0" name="quantity" type="number"></input>
                        </Col>
                    </Col>
                    <Col md={4}>
                        <h1>Hello</h1>
                    </Col>
                </Row>
            </Container>
        )
    }
    
}

export default Cart