import SpinnerRoll from "components/shared/Spinner/SpinnnerRoll"
import { Component } from "react"
import { Container, Modal, Row } from "react-bootstrap"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min"
import AdminServices from '../../../service/admin.service'
import MyDetailsForm from "../ClientArea/MyDetailsForm"
import ClientCard from "./ClientCard"


class ClientList extends Component {
    constructor() {
        super()
        this.state = {
            clients: undefined,
            showModal: false,
            selectedClient: undefined
        }
        this.adminService = new AdminServices()
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
        console.log('click', e, user)
        this.setState({ showModal: true, selectedClient: user })
    }

    render() {
        console.log(this.props.loggedUser)
        const { clients } = this.state
        console.log(clients)
        return (
            <Container>
                <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })}>
                    <Modal.Header> <Modal.Title>Edit user</Modal.Title> </Modal.Header>
                    <Modal.Body>
                        {console.log('this is the state', this.state.selectedClient)}
                        <MyDetailsForm client={this.state.selectedClient} loggedUser={this.props.loggedUser}
                            closeModal={() => this.setState({ showModal: false })} refreshClients={() => this.loadClients()} />
                    </Modal.Body>
                </Modal>
                <Row>
                    <table class="table">
                        <thead class="thead-light">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Email</th>
                                <th scope="col">Test</th>
                                <th scope="col"># Favorites</th>
                                <th scope="col">Edit user</th>
                                <th scope="col">Delete user</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients
                                ?
                                clients.map((elm, index) => {
                                    return <ClientCard key={elm.id} number={index + 1} edit={(e, user) => this.onClickEdit(e, user)} {...elm} />
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