import './MyProductDetails.css'
import { Component } from 'react'
import ProductsService from '../../../service/products.service'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import NewOption from '../NewProduct/NewOption'


class MyProductDetails extends Component {

    constructor() {
        super()
        this.state = {
            product: undefined,
        }
        this.productService = new ProductsService()

    }

    componentDidMount() {
        this.findProduct()
    }

    findProduct() {

        const  product_id  = this.props.match.params.id
        console.log(product_id)
        this.productService
            .getMyProductDetails(product_id)
            .then(response => {
                this.setState({ product: response.data })
                console.log(response)
            })
            .catch(err => console.log(err))
    }
    

    render() {

        const { product } = this.state

        return (
            <Container>
            {
                !this.state.product ? <h1>Cargando...</h1> :
                <>
                <Row>
                <h1>{this.state.product.name}</h1>
                </Row>
                <Row>
                    <Col>
                        <Container className="img-box">
                        {
                            !this.state.product.options === undefined
                            ?
                            <img src="" />
                            :
                            <img src=""/>
                        }
                        </Container>
                    </Col>
                    <Col>
                    <h2>Description:</h2>
                    <p> {this.state.product.description}</p>
                    <h2>Category:</h2>
                    <p> {this.state.product.category.name}</p>
                    </Col>
                    <Row>
                        <h1>Options</h1>
                    <Row>
                        <Col>
                            <img src=""/>
                        </Col>
                         <Col>
                             Price:
                         </Col>
                        <Col>
                            Stock:
                         </Col>
                        <Col>
                            Color:
                         </Col>
                    </Row>
                    </Row>
                    <Row>
                    <Col>
                        <NewOption />
                    </Col>
                    </Row>                
                </Row>
                </>
            }
            </Container>
        )
    }
}

export default MyProductDetails