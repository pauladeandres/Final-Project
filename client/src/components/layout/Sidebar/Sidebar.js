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
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" as={Link} to="/admin" >Dashboard</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2" as={Link} to="/admin/clients">Clients</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-3" as={Link} to="/admin/suppliers">Suppliers</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="disabled" onClick={() => logout()} style={{ color: 'grey' }}>
                        Log out
                </Nav.Link>
                </Nav.Item>
            </Nav>

        </>)
};
export default Sidebar