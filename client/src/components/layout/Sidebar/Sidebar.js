import { Nav, NavItem, Navbar, NavDropdown } from 'react-bootstrap';
import './Sidebar.css'

const Sidebar = () => {
    return (
        <div>
            <Navbar >

                <Navbar.Brand>
                    <a href="/">User Name</a>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav.Link href="#"></Nav.Link>
                    <Nav.Link href="#"></Nav.Link>
                    <Nav>
                        <NavDropdown eventKey={1} title="Item 1">
                        </NavDropdown>
                        <NavItem eventKey={2}>Item 2</NavItem>
                        <NavItem eventKey={3}>Item 3</NavItem>
                    </Nav>
                </Navbar.Collapse>

            </Navbar>
        </div >)
};
export default Sidebar