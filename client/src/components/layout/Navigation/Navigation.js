import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import './Navigation.css'

const Navigation = ({ loggedUser, storeUser }) => {

    return (

            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">HOME</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/product">Products</Nav.Link>
                    <NavDropdown title="Products" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/">Our brands</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">SKLUM</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">Vitra</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">AYTM</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">MUJI</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">Ferm Living</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">Blu Dot</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">Umbra</NavDropdown.Item>
                    </NavDropdown>
                        <NavDropdown title="My Area" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/">Login</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Sign up</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    {/* <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form> */}
                </Navbar.Collapse>
            </Navbar>
    )
}
export default Navigation