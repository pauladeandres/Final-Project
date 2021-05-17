import { Component } from 'react'
import { Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import sofas from './Sofas.webp'
import bedroom from './Bedroom.webp'
import chairs from './Chairs.webp'
import tables from './tables.webp'
import garden from './Garden.jpg'
import decoration from './Decoration.webp'
import kitchen from './Kitchen.jpg'
import bathroom from './Bathroom.jpg'
import CategoryService from '../../../service/category.service'

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
                console.log(response)
                this.setState({ categorieOptions: response.data })
            })
            .catch(err => console.log('TENEMOS UN PROBLEMA', err))
    }



    render() {

        return (
            <Carousel fade className="carousel">
                <Carousel.Item>
                    <Link to="/">
                        <img
                            className="d-block"
                            src={bedroom}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h1>BEDROOM</h1>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>

                <Carousel.Item>
                    <Link to="/">
                        <Carousel.Caption>
                            <h1>SOFAS</h1>
                        </Carousel.Caption>
                        <img
                            className="d-block"
                            src={sofas}
                            alt="Second slide"
                        />
                    </Link>
                </Carousel.Item>

                <Carousel.Item>
                    <Link to="/">
                        <img
                            className="d-block"
                            src={chairs}
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h1>CHAIRS</h1>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>

                <Carousel.Item>
                    <Link to="/">
                        <img
                            className="d-block"
                            src={tables}
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h1>TABLES</h1>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>

                <Carousel.Item>
                    <Link to="/">
                        <img
                            className="d-block"
                            src={decoration}
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h1>DECORATION</h1>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>

                <Carousel.Item>
                    <Link to="/">
                        <img
                            className="d-block"
                            src={kitchen}
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h1>KITCHEN</h1>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>

                <Carousel.Item>
                    <Link to="/">
                        <img
                            className="d-block"
                            src={garden}
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h1>GARDEN</h1>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>

                <Carousel.Item>
                    <Link to="/">
                        <img
                            className="d-block"
                            src={bathroom}
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h1>BATHROOM</h1>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>

            </Carousel>
        )
    }
}

export default CategoriesList
