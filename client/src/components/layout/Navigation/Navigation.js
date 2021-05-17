import './Navigation.css'
import AuthService from '../../../service/auth.service'
import { Navbar, Nav, NavDropdown, Container, Form, Button, FormControl, FormGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import Sidebar from '../Sidebar/Sidebar'

const Navigation = ({ loggedUser, storeUser, orderNumber, categoryList }) => {

    const logout = () => {
        const authService = new AuthService()

        authService
            .logout()
            .then(() => storeUser(undefined))
            .catch(err => console.log(err))
    }


    return (
        // (
        // loggedUser && loggedUser.role === 'ADMIN') ? null
        // :
        < Navbar bg="light" expand="lg" className="fullNavBar" >
            <Navbar.Brand as={Link} to="/">HOME</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {
                        !categoryList
                            ?
                            <h1>Loading categories...</h1>
                            :
                            <NavDropdown title="Products" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/product">See All</NavDropdown.Item>
                                {categoryList.map(elm => <NavDropdown.Item key={elm._id} as={Link} to={`/category/${elm._id}`}>{elm.name}</NavDropdown.Item>)}
                            </NavDropdown>
                    }
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
                <div className="shopping-icons">
                    <Link to="/cart" ><FontAwesomeIcon icon={faShoppingCart} /></Link>
                    <span class="order-number">{orderNumber}</span>
                    <Form inline>

                    </Form>

                </div>
            </Navbar.Collapse>
        </Navbar >
    )
}
export default Navigation