import { Component } from "react"
import { Col, Container, Row } from "react-bootstrap"
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle
} from "reactstrap"
import LineChart from "./LineChart"
import BarChart from './BarChart'
import AdminService from "../../../service/admin.service"
import TreeChart from "./TreeChart"
import FunnelChart from './FunnelChart'
import SpinnerRoll from '../../layout/Spinner/SpinnnerRoll'
import ordersImage from './ordersbw.png'
import productsImage from './products.png'
import globeImage from './earth_globe.png'
import clientImage from './client.png'


class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            data: {
                orders: undefined,
                products: undefined,
                categories: undefined,
                orderPyramid: undefined
            },
            clients: {
                customers: undefined,
                suppliers: undefined
            }
        }
        this.adminService = new AdminService()
    }

    componentDidMount() {
        this.getData()
        this.getDataClients()
    }

    getData() {
        this.adminService
            .getData()
            .then(response => {
                console.log("the response from server:", response.data)
                this.setState({ ...this.state.data = response.data })
            })
            .catch(err => console.log(err))
    }

    getDataClients() {
        this.getCustomers()
        this.getSuppliers()
    }

    getCustomers() {
        this.adminService
            .getAllClients()
            .then(response => {
                this.setState({ clients: { ...this.state.clients, customers: response.data } })
            })
            .catch(err => console.log(err))
    }

    getSuppliers() {
        this.adminService
            .getAllSuppliers()
            .then(response => {
                this.setState({ clients: { ...this.state.clients, suppliers: response.data } })
            })
            .catch(err => console.log(err))
    }


    render() {
        console.log(this.state.clients)
        return !this.state.orders ? <SpinnerRoll /> :
            (
                <Container >
                    <h1>Dashboard</h1>
                    <Row>
                        <Col lg="3" md="6" sm="6">
                            <Card className="card-stats">
                                <CardBody>
                                    <Row>
                                        <Col md="4" xs="5">
                                            <div className="icon-big text-center icon-warning">
                                                <img src={productsImage} alt="orders image" style={{ width: '100%' }} />
                                            </div>
                                        </Col>
                                        <Col md="8" xs="7">
                                            <div className="numbers">
                                                <p className="card-category">Products</p>
                                                <CardTitle tag="p">{this.state.products.length}</CardTitle>
                                                <p />
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="3" md="6" sm="6">
                            <Card className="card-stats">
                                <CardBody>
                                    <Row>
                                        <Col md="4" xs="5">
                                            <div className="icon-big text-center icon-warning">
                                                <img src={ordersImage} alt="orders image" style={{ width: '100%' }} />
                                            </div>
                                        </Col>
                                        <Col md="8" xs="7">
                                            <div className="numbers">
                                                <p className="card-category">Clients</p>
                                                <CardTitle tag="p">{this.state.clients.customers ? this.state.clients.customers.length : <SpinnerRoll />}</CardTitle>
                                                <p />
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col md={3}>
                            <h2>Suppliers: {this.state.clients.customers ? this.state.clients.suppliers.length : <SpinnerRoll />}</h2>
                        </Col>
                        <Col md={3}>
                            <h2>Orders: {this.state.orders.length}</h2>
                        </Col>

                    </Row>
                    <Row style={{ height: "300px" }}>
                        <Col md={8}></Col>
                        {!this.state.data.products ? <SpinnerRoll /> : <BarChart data={this.state.data.products} />}
                        <Col md={8}></Col>
                    </Row>
                    <Row style={{ height: "300px" }}>
                        <Col md={8}></Col>
                        {!this.state.data.orders ? <SpinnerRoll /> : <LineChart data={this.state.data.orders} />}
                        <Col md={8}></Col>
                    </Row>
                    <Row style={{ height: "300px" }}>
                        <Col md={8}></Col>
                        {!this.state.data.categories ? <SpinnerRoll /> : <TreeChart data={this.state.data.categories} />}
                        <Col md={8}></Col>
                    </Row>
                    <Row style={{ height: "300px" }}>
                        <Col md={8}></Col>
                        {!this.state.data.categories ? <SpinnerRoll /> : <FunnelChart data={this.state.data.orderPyramid} />}
                        <Col md={8}></Col>
                    </Row>
                </Container >
            )
    }
}

export default Dashboard