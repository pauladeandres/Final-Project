import './EditProductModal.css'
import { Component } from 'react'

import { Row, Modal, Col, Form, Button } from 'react-bootstrap'

import CategoryService from '../../../service/category.service'

class EditProductModal extends Component {

    constructor() {
        super()
        this.state = {
            product: {
                name: '',
                description: '',
                category: undefined
            },
            categoryOptions: undefined
        }
        this.categoriesService = new CategoryService()
    }

    componentDidMount() {
        this.loadCategories()
    }

    loadCategories() {

        this.categoriesService
            .getAllCategories()
            .then(response => {
                console.log(response)
                this.setState({ categoryOptions: response.data })
            })
            .catch(err => console.log('TENEMOS UN PROBLEMA', err))
    }

    render() {

        return (

                !this.state.categoryOptions
                ?
                <h1>Cargando...</h1>
                :
                <>
                <Modal.Header> <Modal.Title>Edit Your Product</Modal.Title> </Modal.Header>
                <Modal.Body> 
                    <Form closeModal={() => this.setState({ showModal: false })} >
                        <Form.Row as={Row}>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text"/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row as={Row}>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="textarea" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Group controlId="category">
                            <Form.Label>Select Category</Form.Label>
                            <Form.Control as="select" defaultValue="Choose Category" name="category">
                                <option>Choose category</option>
                                {this.state.categoryOptions.map(elm => <option key={elm._id} value={elm._id} > {elm.name}</option>)}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                </>

        )
    }
}

export default EditProductModal