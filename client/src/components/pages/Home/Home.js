import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CategoriesList from './CategoriesList'
import homeImage from './HomeCover.webp'
import './Home.css'

const Home = () => {

    return (
        <>
<<<<<<< HEAD
            <Container>
                <Row>
                    <Col>
                        <img src={homeImage} alt="interiorDesign" className="coverImage" />
                    </Col>
                </Row>
=======
        <Container>
            <Row>
                <Col className="hero">
                <img src={homeImage} alt="interiorDesign" className="coverImage" />
                        <p>Creators of furniture and lighting where beautiful objects celebrate 
                            form and material, inspire artistry in our workshops and deliver a warmth, 
                            substance and elegance to our customers' spaces.</p>
                </Col>
            </Row>
>>>>>>> 3906d532b52ec184ae6922beee9f4d2859d666f8
            </Container>
            <Row>
                <section className="searchByCategory">
                    <Container>
<<<<<<< HEAD
                        {/* <CategoriesList /> */}
=======
                         <CategoriesList />
>>>>>>> 3906d532b52ec184ae6922beee9f4d2859d666f8
                    </Container>
                </section>
            </Row>
        </>
    )
}

export default Home