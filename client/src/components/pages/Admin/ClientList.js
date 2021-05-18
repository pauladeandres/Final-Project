import SpinnerRoll from "components/shared/Spinner/SpinnnerRoll"
import { Component } from "react"
import { Container, Row } from "react-bootstrap"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min"
import AdminServices from '../../../service/admin.service'
import ClientCard from "./ClientCard"


class ClientList extends Component {
    constructor() {
        super()
        this.state = {
            clients: undefined
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

    render() {
        console.log(this.props.loggedUser)
        const { clients } = this.state
        console.log(clients)
        return (!this.props.loggedUser || this.props.loggedUser.role !== 'ADMIN') ? <Redirect to="/" /> :
            (
                <Container>
                    <Row>
                        {clients
                            ?
                            clients.map(elm => <ClientCard key={elm.id} {...elm} />)
                            :
                            <SpinnerRoll />
                        }
                    </Row>
                </Container>)
    }
}

export default ClientList