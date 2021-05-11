import './Navigation.css'
<<<<<<< HEAD
import AuthService from '../../../service/auth.service'
=======
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
>>>>>>> 91ab989445b5bae4492a9cf26f32e72c25643354

const Navigation = ({ loggedUser, storeUser }) => {

    const logout = () => {

        const authService = new AuthService()

        authService
            .logout()
            .then(() => storeUser(undefined))
            .catch(err => console.log(err))
    }

    return (

<<<<<<< HEAD
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">HOME</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/product">Products</Nav.Link>
=======
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">HOME</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
>>>>>>> 91ab989445b5bae4492a9cf26f32e72c25643354
                    <NavDropdown title="Products" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/">See All</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">Sofas</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">Chairs</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">Tables</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">Decoration</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">Kitchen</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">Garden</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">Bedroom</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">Bathroom</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Our Brands" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.2">SKLUM</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">Vitra</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">AYTM</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">MUJI</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">Ferm Living</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">Blu Dot</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">Umbra</NavDropdown.Item>
                    </NavDropdown>
<<<<<<< HEAD
                    <NavDropdown title="My Area" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                        <NavDropdown.Item href="/signup">Sign up</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/logout">Log out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                {/* <Form inline>
=======
                        <NavDropdown title="My Area" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/">Login</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Sign up</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Want to sell with us?</NavDropdown.Item>
                        </NavDropdown>
                        <Link to="/cart"><FontAwesomeIcon className="shopping-cart-icon" icon={faShoppingCart} size="lg"/></Link>
                    </Nav>
                    {/* <Form inline>
>>>>>>> 91ab989445b5bae4492a9cf26f32e72c25643354
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form> */}
            </Navbar.Collapse>
        </Navbar>
    )
}
export default Navigation