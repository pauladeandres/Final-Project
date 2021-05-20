import { Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './CarouselCard.css'

const CategoryCard = ({name,  _id, options}) =>  {
        return (
                <>
                <Link to={`/product/${_id}`}>
                    <img
                        className="d-block"
                        src={options[0].image}
                        alt={name}
                    />
            
                    <Carousel.Caption className="categoryTitle">
                        <h3>{name}</h3>
                    </Carousel.Caption>
                </Link>
                </>
        )
    }

export default CategoryCard
