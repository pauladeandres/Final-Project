import { Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './CategoryCard.css'

const CategoryCard = ({image, name,  _id}) =>  {
        return (
                <>
                <Link to={`/category/${_id}`}>
                    <img
                        className="d-block"
                        src={image}
                        alt={name}
                    />
            
                        <Carousel.Caption >
                        <div >
                            <h1 className="categoryTitle" >{name}</h1>
                        </div>
                    </Carousel.Caption>
                </Link>
                </>
        )
    }


export default CategoryCard
