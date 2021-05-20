import { Component } from 'react'
import ProductsService from './../../../service/products.service'
import MyProductCard from './MyProductsCard'
import NewProduct from '../NewProduct/NewProduct'
import { Row, Container, Accordion, Card, Button } from 'react-bootstrap'
import SpinnerRoll from 'components/shared/Spinner/SpinnnerRoll'

class MyProductList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            products: undefined,
            currentClient: props.client
        }
        this.productsService = new ProductsService()
    }


    componentDidMount() {
        this.loadProducts()
    }

    loadProducts() {
        console.log(this.props)
        this.productsService
            .getProductBySupplier(this.props.client._id)
            .then(response => {
                this.setState({ products: response.data })
                console.log(this.state.products)
            })
            .catch(err => console.log('Error', err))
    }

    fetchProducts() {
        this.loadProducts()
    }

    render() {

        const { products } = this.state

        return (

            !products
                ?
                <SpinnerRoll />
                :
                <Container>
                    <Row>
                        {products.map(elm => <MyProductCard key={elm._id} handleAlert={this.props.handleAlert} {...elm} fetchProducts={() => this.fetchProducts()} />)}
                    </Row>
                    <Row>
                        <Container>
                            <Accordion >
                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="0">
                                        <Button variant="dark" style={{ width: '100%' }}>Create Product</Button>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body><NewProduct handleAlert={this.props.handleAlert} client={this.state.currentClient} fetchProducts={() => this.fetchProducts()} /></Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </Container>
                    </Row>
                </Container>
        )
    }
}

export default MyProductList