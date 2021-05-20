import { Component } from 'react'
import { Form, Button, Container, Alert } from 'react-bootstrap'
import OptionService from '../../../service/option.service'
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
            alert: {
                show: false,
                text: ' '
            },
            isUploading: false
        }
        this.optionService = new OptionService()
        this.uploadsService = new UploadsService()
    }

    handleInputChange(e) {
        const { name, value } = e.target
        this.setState({ option: { ...this.state.option, [name]: value } })
    }

    handleSubmit(e) {
        e.preventDefault()
        this.optionService
            .createOption(this.props.product_id, this.state.option)
            .then(response => {
                this.props.fetchProduct()
                this.props.handleAlert(`A new option has been created`)
            })
            .catch(err => this.setState({ alert: { show: true, text: err.response.data.message } }))
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
                <Alert show={this.state.alert.show} variant='danger'>{this.state.alert.text}</Alert>
                    <Form onSubmit={e => this.handleSubmit(e)}>
                        <Form.Group controlId="price">
                            <Form.Label>Price:</Form.Label>
                            <Form.Control type="number" value={this.state.price} onChange={e => this.handleInputChange(e)} name="price" />
                        </Form.Group>

                        <Form.Group controlId="color">
                            <Form.Label>Color:</Form.Label>
                            <Form.Control type="text" value={this.state.color} onChange={e => this.handleInputChange(e)} name="color" />
                        <Form.Text className="text-muted">
                            Choose between: black, white, red, blue, green, brown, beige, yellow, orange, grey
                        </Form.Text>
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