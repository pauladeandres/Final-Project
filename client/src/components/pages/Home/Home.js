import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CategoriesList from './CategoriesList'
import homeImage from './HomeCover.webp'
import './Home.css'

const Home = () => {

    return (
        <>
        <Container>
            <Row>
                <Col>
                <img src={homeImage} alt="interiorDesign" className="coverImage" />
                </Col>
            </Row>
            </Container>
            <Row>
                <section className="searchByCategory">
                    <Container>
                        {/* <CategoriesList /> */}
                    </Container>
                </section>
            </Row>
        </>
    )
}

export default Home