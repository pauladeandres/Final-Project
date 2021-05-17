import './Navigation.css'
import AuthService from '../../../service/auth.service'
import { Navbar, Nav, NavDropdown, Container, Form, Button, FormControl, FormGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Navigation = ({ loggedUser, storeUser, orderNumber }) => {

    const logout = () => {
        const authService = new AuthService()

        authService
            .logout()
            .then(() => storeUser(undefined))
            .catch(err => console.log(err))
    }

    return (
        <Navbar bg="light" expand="lg" className="fullNavBar">
            <Navbar.Brand as={Link} to="/">HOME</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <NavDropdown title="Products" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to="/product">See All</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="#action/3.4">Sofas</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="#action/3.4">Chairs</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="#action/3.4">Tables</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="#action/3.4">Decoration</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="#action/3.4">Kitchen</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="#action/3.4">Garden</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="#action/3.4">Bedroom</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="#action/3.4">Bathroom</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Our Brands" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to="#action/3.2">SKLUM</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="#action/3.4">Vitra</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="#action/3.4">AYTM</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="#action/3.4">MUJI</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="#action/3.4">Ferm Living</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="#action/3.4">Blu Dot</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="#action/3.4">Umbra</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="My Area" id="basic-nav-dropdown">
                        {<NavDropdown.Item as={Link} to='/admin'>Admin</NavDropdown.Item>}
                        {loggedUser ? <NavDropdown.Item as={Link} to={`/supplier/myarea/${loggedUser._id}`}>My Area</NavDropdown.Item> : null}
                        <NavDropdown.Item as={Link} to="/customer-area">My area</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/signup">Sign up</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={() => logout()}>Log out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <div className="searchBar">
                <Link to="/cart" ><FontAwesomeIcon icon={faShoppingCart} /></Link>
                        <span class="order-number">{orderNumber}</span>
                <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    </Form>
                    <Button type="submit" variant="outline-dark">Search</Button>
                </div>
            </Navbar.Collapse>
        </Navbar >
    )
}
export default Navigation