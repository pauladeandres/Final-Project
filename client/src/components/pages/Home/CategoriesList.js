import { Component } from 'react'
import { Carousel } from 'react-bootstrap'

import CategoryService from '../../../service/category.service'
import CategoryCard from './CategoryCard'

import './CategoriesList.css'

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
            .catch(err => console.log('TENEMOS UN PROBLEMA', err))
    }

    render() {

    return(
        !this.state.categoryOptions
        ?
        <h1>Loading....</h1>
        :
        <Carousel fade className="carousel">
                {this.state.categoryOptions.map(elm => <Carousel.Item><CategoryCard key={elm._id} {...elm}/></Carousel.Item>)}
        </Carousel>
        ) 
    }
}
                
export default CategoriesList
