import SpinnerRoll from "components/shared/Spinner/SpinnnerRoll"
import { Component } from "react"
import { Container, Modal, Row } from "react-bootstrap"
import AdminServices from '../../../service/admin.service'
import ClientCard from "./ClientCard"
import MyDetailsForm from './../ClientArea/MyDetailsForm'
import AuthService from "service/auth.service"


class ClientList extends Component {
    constructor() {
        super()
        this.state = {
            clients: undefined,
            showModal: false,
            selectedClient: undefined
        }
        this.adminService = new AdminServices()
        this.authService = new AuthService()
    }

    componentDidMount() {
        this.loadClients()
    }

    loadClients() {
        this.adminService
            .getAllClients()
            .then(response => this.setState({ clients: response.data }))
            .catch(err => console.log('error no lo coge'))
    }

    onClickEdit(e, user) {

        this.setState({ showModal: true, selectedClient: user })
    }

    editRole(e, id) {
        const userDetails = { role: e, id }

        this.authService
            .updateRole(userDetails)
            .then(response => this.loadClients())
            .catch(err => console.log('error no lo coge'))
    }

    render() {
        const { clients } = this.state
        return (
            <Container style={{ marginLeft: '20px' }}>
                <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })}>
                    <Modal.Header> <Modal.Title>Edit user</Modal.Title> </Modal.Header>
                    <Modal.Body>
                        <MyDetailsForm client={this.state.selectedClient} loggedUser={this.props.loggedUser}
                            closeModal={() => this.setState({ showModal: false })} refreshClients={() => this.loadClients()} role={'CUSTOMER'} />
                    </Modal.Body>
                </Modal>
                <Row>
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Email</th>
                                <th scope="col">Orders</th>
                                <th scope="col"># Favorites</th>
                                <th scope="col">Edit user</th>
                                <th scope="col">Delete user</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients
                                ?
                                clients.map((elm, index) => {
                                    return <ClientCard key={elm.id} number={index} edit={(e, user) => this.onClickEdit(e, user)} editRole={(e, id) => this.editRole(e, id)} {...elm} loadClients={() => this.loadClients()} loggedUser={this.props.loggedUser} />
                                })
                                :
                                <SpinnerRoll />
                            }

                        </tbody>
                    </table>
                </Row>
            </Container>
        )
    }
}

export default ClientList