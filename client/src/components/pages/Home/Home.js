import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Home = () => {

    return (
        <Container>
            <h1>Welcome HOME</h1>
            <Link to="/product" className="btn btn-dark">See all products</Link>
        </Container>
    )
}

export default Home