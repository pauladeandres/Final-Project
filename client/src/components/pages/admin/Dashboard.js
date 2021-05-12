import { Component } from "react"
import { Container } from "react-bootstrap"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min"


class Dashboard extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        return (!this.props.loggedUser || this.props.loggedUser.role !== 'ADMIN') ? <Redirect to="/" /> :
            (
                <Container>
                    <h1>Dashboard</h1>
                </Container>)
    }
}

export default Dashboard