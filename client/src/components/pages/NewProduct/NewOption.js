import { Component } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import ProductsService from '../../../service/products.service'
import UploadsService from '../../../service/uploads.service'

class NewOption extends Component {

    constructor() {
        super()
        this.state = {
            option: {
                price: 0,
                color: '',
                stock: 0,
                image: ''
            },
            isUploading: false
        }
        this.productService = new ProductsService()
        this.uploadsService = new UploadsService()
    }

    handleInputChange(e) {
        const { name, value } = e.target
        this.setState({ option: { ...this.state.option, [name]: value } })
    }

    handleSubmit(e) {

        e.preventDefault()

        // this.productService
        //     .createProduct(this.state.product)
        //     .then(response => console.log(response))
        //     // this.props.closeModal()
        //     // this.props.refreshCoasters()
        //     .catch(err => console.log(err))
    }

    handleFileUpload(e) {

        this.setState({ isUploading: true })

        const uploadData = new FormData()
        uploadData.append('imageData', e.target.files[0])

        this.uploadsService
            .uploadimage(uploadData)
            .then(response => this.setState({ isUploading: false, option: { ...this.state.option, image: response.data.secure_url } }))
            .catch(err => console.log(err))
    }


    render() {

        return (

                <Container >
                    <Form onSubmit={e => this.handleSubmit(e)}>
                        <Form.Group controlId="price">
                            <Form.Label>Price:</Form.Label>
                            <Form.Control type="number" value={this.state.price} onChange={e => this.handleInputChange(e)} name="price" />
                        </Form.Group>

                        <Form.Group controlId="color">
                            <Form.Label>Color:</Form.Label>
                            <Form.Control type="text" value={this.state.color} onChange={e => this.handleInputChange(e)} name="color" />
                        </Form.Group>

                        <Form.Group controlId="stock">
                            <Form.Label>Stock:</Form.Label>
                            <Form.Control type="number" value={this.state.stock} onChange={e => this.handleInputChange(e)} name="stock" />
                        </Form.Group>

                        <Form.Group controlId="image">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" onChange={e => this.handleFileUpload(e)} />
                        </Form.Group>

                    <Button variant="dark" style={{ width: '100%' }} type="submit" disabled={this.state.isUploading}>
                        {this.state.isUploading ? 'One second, uploading...' : 'Create Option'}
                    </Button>
                    </Form>
                </Container>
        )
    }
}

export default NewOption