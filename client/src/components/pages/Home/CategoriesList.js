import { Component } from 'react'
import { Carousel } from 'react-bootstrap'
import CategoryService from '../../../service/category.service'
import CategoryCard from './CategoryCard'

import './CategoriesList.css'
import SpinnerRoll from 'components/shared/Spinner/SpinnnerRoll'

class CategoriesList extends Component {

    constructor() {
        super()
        this.state = {
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
                console.log(response.data)
                this.setState({ categoryOptions: response.data })
            })
            .catch(err => console.log('Error', err))
    }

    render() {

        return (
            !this.state.categoryOptions
                ?
                <SpinnerRoll />
                :
                <Carousel fade className="carousel">
                    {this.state.categoryOptions.map(elm => <Carousel.Item><CategoryCard key={elm._id} {...elm} /></Carousel.Item>)}
                </Carousel>
        )
    }
}

export default CategoriesList
