import { Container, Row, Col } from 'react-bootstrap'
import CategoriesList from './CategoriesList'
import homeImage from './HomeCover.webp'
import './Home.css'

const Home = () => {

    return (
        <>
<<<<<<< HEAD
            <Container>
                <Row>
                    <Col className="hero">
                        <img src={homeImage} alt="interiorDesign" className="coverImage" />
                        <p>Creators of furniture and lighting where beautiful objects celebrate
                        form and material, inspire artistry in our workshops and deliver a warmth,
                            substance and elegance to our customers' spaces.</p>
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
>>>>>>> bf65b170d409766d70065ff04fcdebeca540eb0d
            </Container>
            <Row>
                <section className="searchByCategory">
                    <Container>
<<<<<<< HEAD
                        <CategoriesList />
=======
                         <CategoriesList />
>>>>>>> bf65b170d409766d70065ff04fcdebeca540eb0d
                    </Container>
                </section>
            </Row>
        </>
    )
}

export default Home