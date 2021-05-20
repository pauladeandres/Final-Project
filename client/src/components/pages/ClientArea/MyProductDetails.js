import './MyProductDetails.css'
import { Component } from 'react'
import ProductsService from '../../../service/products.service'
import { Container, Row, Col, Table, Button, Accordion, Card, Modal } from 'react-bootstrap'
import NewOption from '../NewProduct/NewOption'
import OptionCard from '../ClientArea/OptionCard'
import EditProductModal from '../ClientArea/EditProductModal'
import SpinnerRoll from '../../shared/Spinner/SpinnnerRoll'


class MyProductDetails extends Component {

    constructor() {
        super()
        this.state = {
            product: undefined,
            showModal: false
        }
        this.productService = new ProductsService()
    }

    componentDidMount() {
        this.fetchProduct()
    }

    findProduct() {
        const product_id = this.props.match.params.id
        this.productService
            .getMyProductDetails(product_id)
            .then(response => {
                this.setState({ product: response.data })
                console.log(response)
            })
            .catch(err => console.log(err))
    }

    fetchProduct() {
        this.findProduct()
    }


    render() {
        return (
            <Container>
                {
                    !this.state.product ? <SpinnerRoll /> :
                        <>
                            <Row>
                                <h1>{this.state.product.name}</h1>
                            </Row>

                            <Row>
                                <Col>
                                    <Container className="img-box">
                                        {
                                            this.state.product.options[0] === undefined
                                                ?
                                                <h1>No hay Imagen</h1>
                                                :
                                                <img src={this.state.product.options[0].image} alt={this.state.product.name}/>
                                        }
                                    </Container>
                                </Col>
                                <Col>
                                    <h2>Description:</h2>
                                    <p> {this.state.product.description}</p>
                                    <h2>Category:</h2>
                                    <p> {this.state.product.category.name}</p>
                                    <Button variant="outline-danger" onClick={() => this.setState({ showModal: true })}>Edit</Button>
                                    <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })} >
                                        <EditProductModal handleAlert={this.props.handleAlert} product={this.state.product} fetchProduct={() => this.fetchProduct()} closeModal={() => this.setState({ showModal: false })} />
                                    </Modal>
                                </Col>
                            </Row>

                            <Row>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th> Image</th>
                                            <th>Ref</th>
                                            <th>Price</th>
                                            <th>Color</th>
                                            <th>Stock</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.product.options.map(elm => <OptionCard key={elm._id} handleAlert={this.props.handleAlert} {...elm} fetchProduct={() => this.fetchProduct()} />)}
                                    </tbody>
                                </Table>
                            </Row>
                            <Row>
                                <Col>
                                    <Accordion >
                                        <Card>
                                            <Accordion.Toggle as={Card.Header} eventKey="1">
                                                <Button className="addoption" variant="dark" style={{ width: '100%' }}>+</Button>
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="1">
                                                <Card.Body><NewOption handleAlert={this.props.handleAlert} product_id={this.state.product._id} fetchProduct={() => this.fetchProduct()} /></Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                </Col>
                            </Row>
                        </>
                }
            </Container>
        )
    }
}

export default MyProductDetails
