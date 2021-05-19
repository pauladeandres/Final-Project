import { Component } from 'react'
import './MyDetails.css'
import ClientService from '../../../service/client.service'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import SpinnerRoll from 'components/shared/Spinner/SpinnnerRoll'
import MyDetailsForm from './MyDetailsForm'

class MyDetails extends Component {

    constructor(props) {
        //REVIEW refactorizar o no? client: {this.props.loggedUser.clients}
        super(props)
        this.state = {
            client: {
                firstName: this.props.loggedUser.client.firstName,
                secondName: this.props.loggedUser.client.secondName,
                company: this.props.loggedUser.client.company,
                vatNumber: this.props.loggedUser.client.vatNumber,
                address: this.props.loggedUser.client.address,
                zipcode: this.props.loggedUser.client.zipcode,
                city: this.props.loggedUser.client.city,
                country: this.props.loggedUser.client.country,
                phone: this.props.loggedUser.client.phone
            },
            disableForm: true
        }
        this.clientService = new ClientService()
    }

    componentDidMount() {
        this.loadClient()
    }

    loadClient() {
        this.clientService
            .getAssignedClient(this.props.loggedUser.client)
            .then(response => {
                this.setState({ client: response.data })
                this.props.handleAlert(`Your datas have been saved ${this.state.client.firstName}`)
            })
            .catch(err => console.log(err))
    }

    render() {

        return (

            !this.props.loggedUser
                ?
                <SpinnerRoll />
                :
                <>

                    {this.state.client ? <MyDetailsForm loggedUser={this.props.loggedUser} client={this.state.client} disabled={this.state.disableForm}
                        loadClient={() => this.loadClient()} history={this.props.history} /> : <SpinnerRoll />}

                </>

        )
    }
}

export default MyDetails