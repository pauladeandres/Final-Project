import { Component } from 'react'
import { Form, Button, Container, Alert } from 'react-bootstrap'
import ProductsService from '../../../service/products.service'
import CategoryService from '../../../service/category.service'
import SpinnerRoll from 'components/shared/Spinner/SpinnnerRoll'

class NewProduct extends Component {

    constructor(props) {
        super(props)
        this.state = {
            product: {
                supplier: props.client._id,
                name: '',
                description: '',
                category: undefined
            },
            alert: {
                show: false,
                text: ' '
            },
            categorieOptions: undefined
        }

        this.productService = new ProductsService()
        this.categoriesService = new CategoryService()
    }

    componentDidMount() {
        this.loadCategories()
    }

    loadCategories() {
        this.categoriesService
            .getAllCategories()
            .then(response => {
                this.setState({ categorieOptions: response.data })
            })
<<<<<<< HEAD
            .catch(err => console.log('Error', err))
=======
            .catch(err => console.log('Err:', err))
>>>>>>> 3dc077355d44f0edaaa1b89ff3a93960886e2947
    }

    handleInputChange(e) {
        const { name, value } = e.target
        this.setState({ product: { ...this.state.product, [name]: value } })
    }

    handleSubmit(e) {
        e.preventDefault()
        this.productService
            .createProduct(this.state.product, this.props.client._id)
            .then(response => {
                this.props.fetchProducts()
            })
            .catch(err => {
                this.setState({ alert: { show: true, text: err.response.data.message } })
                console.log(err.response.data.message)
            })

        this.emptyForm()
    }

    emptyForm() {
        this.setState({ supplier: ' ', name: ' ', description: ' ', category: undefined })
    }

    render() {
        return (
            !this.state.categorieOptions
                ?
                <SpinnerRoll />
                :
                <Container >
                    <Alert show={this.state.alert.show} variant='danger'>{this.state.alert.text}</Alert>
                    <Form onSubmit={e => this.handleSubmit(e)}>

                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={this.state.name} onChange={e => this.handleInputChange(e)} name="name" />
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control type="text" value={this.state.description} onChange={e => this.handleInputChange(e)} name="description" />
                        </Form.Group>

                        <Form.Group controlId="category">
                            <Form.Label>Select Category</Form.Label>
                            <Form.Control as="select" defaultValue="Choose Category" onChange={e => this.handleInputChange(e)} name="category">
                                <option>Choose category</option>
                                {this.state.categorieOptions.map(elm => <option key={elm._id} value={elm._id} > {elm.name}</option>)}
                            </Form.Control>
                        </Form.Group>

                        <Button variant="dark" style={{ width: '100%' }} type="submit">Create Product</Button>
                    </Form>
                </Container>
        )
    }
}

export default NewProduct