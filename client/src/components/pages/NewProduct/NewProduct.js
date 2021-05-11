import { Component } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import ProductsService from '../../../service/products.service'
import CategoryService from '../../../service/category.service'

class NewProduct extends Component {

    constructor(props) {
        super(props)
        this.state = {
            product: {
                // supplier: this.props.loggedUser._id,
                name: '',
                description: 0,
                category: undefined
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
            .then(response => this.setState({ categorieOptions: response.data }))
            .catch(err => console.log('TENEMOS UN PROBLEMA', err))
    }

    handleInputChange(e) {
        const { name, value } = e.target
        this.setState({ product: { ...this.state.product, [name]: value }})
    }

    handleSubmit(e) {

        e.preventDefault()

        this.productService
            .createProduct(this.state.product)
            .then(response => console.log(response))
                // this.props.closeModal()
                // this.props.refreshCoasters()
            .catch(err => console.log(err))
    }


    render() {

        const { categorieOptions } = this.state

        return (

            !categorieOptions
                ?
                <h1>Cargando...</h1>
                :
        <Container >
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
                            <Form.Control as="select" name="category">
                        {categorieOptions.map(elm => <option key={elm._id} value={elm._id}> {elm.name}</option>)}
                    </Form.Control>
                </Form.Group>

                <Button variant="dark" style={{ width: '100%' }} type="submit">Create Product</Button>
            </Form>
        </Container>
        )
    }
}

export default NewProduct