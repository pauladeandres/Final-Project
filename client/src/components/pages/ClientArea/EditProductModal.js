import './EditProductModal.css'
import { Component } from 'react'

import { Row, Modal, Col, Form, Button } from 'react-bootstrap'

import CategoryService from '../../../service/category.service'
import ProductsService from '../../../service/products.service'
import SpinnerRoll from 'components/shared/Spinner/SpinnnerRoll'

class EditProductModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            product: {
                name: props.product.name,
                description: props.product.description,
                category: props.product.category
            },
            categoryOptions: undefined
        }
        this.categoriesService = new CategoryService()
        this.productService = new ProductsService()
    }

    componentDidMount() {
        this.loadCategories()
    }

    loadCategories() {
        console.log(this.state.product)
        this.categoriesService
            .getAllCategories()
            .then(response => {
                console.log(response)
                this.setState({ categoryOptions: response.data })
            })
            .catch(err => console.log('TENEMOS UN PROBLEMA', err))
    }

    handleInputChange(e) {
        const { name, value } = e.target
        this.setState({ product: { ...this.state.product, [name]: value } })
    }

    handleSubmit(e) {
        e.preventDefault()

        this.productService
            .editProduct(this.props.product._id, this.state.product)
            .then(response => {
                console.log(response)
                this.props.closeModal()
                this.props.fetchProduct()
            })
            .catch(err => console.log(err))
    }

    render() {

        return (

            !this.state.categoryOptions
                ?
                <SpinnerRoll />
                :
                <>
                    <Modal.Header> <Modal.Title>Edit Your Product</Modal.Title> </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={e => this.handleSubmit(e)}>
                            <Form.Row as={Row}>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" value={this.state.product.name} onChange={e => this.handleInputChange(e)} name="name" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row as={Row}>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="textarea" value={this.state.product.description} onChange={e => this.handleInputChange(e)} name="description" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Group controlId="category">
                                <Form.Label>Select Category</Form.Label>
                                <Form.Control as="select" value={this.state.product.category} name="category" onChange={e => this.handleInputChange(e)}>
                                    <option>{this.state.product.category.name}</option>
                                    {this.state.categoryOptions.map(elm => <option key={elm._id} value={elm._id} > {elm.name}</option>)}
                                </Form.Control>
                            </Form.Group>
                            <Button type="submit" variant="dark">Save changes</Button>
                        </Form>
                    </Modal.Body>
                </>

        )
    }
}

export default EditProductModal