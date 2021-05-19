import { Component } from 'react'
import { Carousel } from 'react-bootstrap'
import ProductsService from './../../../service/products.service'
import CarouselCard from './CarouselCard'

import './ProductCarousel.css'
import SpinnerRoll from 'components/shared/Spinner/SpinnnerRoll'

class ProductCarousel extends Component {

    constructor() {
        super()
        this.state = {
            products: undefined
        }
        this.productsService = new ProductsService()
    }

    componentDidMount() {
        this.loadProducts()
        console.log(this.props)
    }

    loadProducts() {
        this.productsService
            .getProductPerCategory(this.props.category)
            .then(response => {
                console.log(response)
                this.setState({ products: response.data })
            })
            .catch(err => console.log('TENEMOS UN PROBLEMA', err))
    }
    
    render() {
        return (
            !this.state.products
                ?
                <SpinnerRoll />
                :
                <Carousel fade className="carousel" show={3}>
                    {this.state.products.map(elm => <Carousel.Item><CarouselCard key={elm._id} {...elm} /></Carousel.Item>)}
                </Carousel>
        )
    }
}

export default ProductCarousel
