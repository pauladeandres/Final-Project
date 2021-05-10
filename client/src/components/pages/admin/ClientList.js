import { Component } from "react"
import { Container } from "react-bootstrap"


class ClientList extends Component {
    constructor() {
        super()
        this.state = {
        }
        this.adminService = new AdminService
    }

    componentDidMount() {
        this.loadClients()
    }

    loadClients() {
        this.AdminService
    }

    render() {
        return (
            <Container>
                <h1>Client List</h1>
            </Container>)
    }
}

export default ClientList