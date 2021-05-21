import { Nav } from 'react-bootstrap';
import './Sidebar.css'
import { Link } from 'react-router-dom'
import AuthService from '../../../service/auth.service'

const Sidebar = ({ storeUser }) => {

    const logout = () => {
        const authService = new AuthService()

        authService
            .logout()
            .then(() => storeUser(undefined))
            .catch(err => console.log(err))
    }

    return (
        <>
            <Nav className="d-none d-md-block bg-light sidebar"
                activeKey="/home"
            >
                <div className="sidebar-sticky"></div>
                <Nav.Item>
                    <Nav.Link as={Link} to="/"><h4>Home</h4></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" as={Link} to="/admin" ><h4>Dashboard</h4></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2" as={Link} to="/admin/clients"><h4>Clients</h4></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-3" as={Link} to="/admin/suppliers"><h4>Suppliers</h4></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="disabled" onClick={() => logout()} style={{ color: 'grey' }}>
                        <h4>Log out</h4>
                    </Nav.Link>
                </Nav.Item>
            </Nav>

        </>)
};
export default Sidebar