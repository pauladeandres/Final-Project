import './Dashboard.css'
import { Component } from "react"
import { Col, Container, Row } from "react-bootstrap"
import {
    Card,
    CardBody
} from "reactstrap"
import LineChart from "./../DashboardCharts/LineChart"
import BarChart from './../DashboardCharts/BarChart'
import AdminService from "../../../service/admin.service"
import TreeChart from "./../DashboardCharts/TreeChart"
import FunnelChart from './../DashboardCharts/FunnelChart'
import SpinnerRoll from '../../shared/Spinner/SpinnnerRoll'
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
        return (
            !this.state.orders ? <SpinnerRoll /> :
                <div className="main-dashboard" >
                    < Container>
                        <h1>Dashboard</h1>
                        <Row>
                            <Col lg="3" md="6" sm="6" style={{ marginBottom: "10px" }}>
                                <Card className="card-stats dashboard-card">
                                    <CardBody>
                                        <Row className="adjusted-height">
                                            <Col xs="4" className="adjusted-height">
                                                <div className="text-center icon-warning adjusted-height">
                                                    <img src={productsImage} alt="products" className="adjusted-height" />
                                                </div>
                                            </Col>
                                            <Col md="8" xs="7">
                                                <div className="numbers text-right">
                                                    <p className="card-category board-item">Products</p>
                                                    <p className="board-number">{this.state.products.length}</p>
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="3" md="6" sm="6" style={{ marginBottom: "10px" }}>
                                <Card className="card-stats dashboard-card">
                                    <CardBody>
                                        <Row className="adjusted-height">
                                            <Col xs="4" className="adjusted-height">
                                                <div className="text-center icon-warning adjusted-height">
                                                    <img src={clientImage} alt="clients" className="adjusted-height" />
                                                </div>
                                            </Col>
                                            <Col md="8" xs="7">
                                                <div className="numbers text-right">
                                                    <p className="card-category board-item" >Clients</p>
                                                    <p className="board-number">{this.state.clients.customers ? this.state.clients.customers.length : <SpinnerRoll />}</p>
                                                    <p />
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="3" md="6" sm="6" style={{ marginBottom: "10px" }}>
                                <Card className="card-stats dashboard-card">
                                    <CardBody>
                                        <Row className="adjusted-height">
                                            <Col xs="4" className="adjusted-height">
                                                <div className="text-center icon-warning adjusted-height">
                                                    <img src={globeImage} alt="globe" className="adjusted-height" />
                                                </div>
                                            </Col>
                                            <Col md="8" xs="7">
                                                <div className="numbers text-right">
                                                    <p className="card-category  board-item">Suppliers</p>
                                                    <p className="board-number">{this.state.clients.customers ? this.state.clients.suppliers.length : <SpinnerRoll />}</p>
                                                    <p />
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="3" md="6" sm="6" style={{ marginBottom: "10px" }}>
                                <Card className="card-stats dashboard-card">
                                    <CardBody>
                                        <Row className="adjusted-height">
                                            <Col xs="4" className="adjusted-height">
                                                <div className="text-center icon-warning adjusted-height">
                                                    <img src={ordersImage} alt="orders" className="adjusted-height" />
                                                </div>
                                            </Col>
                                            <Col md="8" xs="7">
                                                <div className="numbers text-right">
                                                    <p className="card-category board-item">Orders</p>
                                                    <p className="board-number">{this.state.orders ? this.state.orders.length : <SpinnerRoll />}</p>
                                                    <p />
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>

                        </Row>

                        <Row className="justify-content-md-center">
                            <Col md={10}>
                                <Card className="dashboard-card dashboard-chart">
                                    {!this.state.data.products ? <SpinnerRoll /> : <BarChart data={this.state.data.products} />}
                                </Card>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col md={10}>
                                <Card className="dashboard-card dashboard-chart">
                                    {!this.state.data.orders ? <SpinnerRoll /> : <LineChart data={this.state.data.orders} />}
                                </Card>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col md={10}>
                                <Card className="dashboard-card dashboard-chart">
                                    {!this.state.data.categories ? <SpinnerRoll /> : <TreeChart data={this.state.data.categories} />}
                                </Card>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col md={10}>
                                <Card className="dashboard-card dashboard-chart">
                                    {!this.state.data.categories ? <SpinnerRoll /> : <FunnelChart data={this.state.data.orderPyramid} />}
                                </Card>
                            </Col>
                        </Row>
                    </Container >
                </div>
        )
    }
}

export default Dashboard