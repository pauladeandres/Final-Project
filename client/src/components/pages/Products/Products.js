import { Component } from 'react'
import ProductsService from './../../../service/products.service'
import { Row, Container, Col, Form, Button, Dropdown, ButtonGroup, DropdownButton } from 'react-bootstrap'
import ProductList from './ProductList'
import SearchBar from './SearchBar'
import './Products.css'
import SpinnerRoll from '../../shared/Spinner/SpinnnerRoll'


class Products extends Component {

    constructor() {
        super()
        this.state = {
            fullList: undefined,
            products: undefined,
            minRangeValue: 0,
            maxRangeValue: 3000
        }
        this.productsService = new ProductsService()
    }

    componentDidMount() {
        this.loadProducts()
    }

    loadProducts() {
        this.productsService
            .getAllProducts()
            .then(response => {
                this.setState({ products: response.data, fullList: response.data })
            })
            .catch(err => console.log('Error', err))
    }

    filterList(query) {
        
        const productListCopy = [...this.state.fullList]
        const filteredProducts = productListCopy.filter(product => product.name.toLowerCase().includes(query.toLowerCase()))
        this.setState({ products: filteredProducts })
    }

    sortLowtoHigh() {
        const productsArrayCopy = [...this.state.fullList]
        const sortedArray = productsArrayCopy.sort((a, b) => a.options[0].price - (b.options[0].price))
        this.setState({ products: sortedArray })
    }

    sortHightoLow() {
        const productsArrayCopy = [...this.state.fullList]
        const sortedArray = productsArrayCopy.sort((a, b) => b.options[0].price - (a.options[0].price))
        this.setState({ products: sortedArray })
    }

    colorFilter(e) {
        const selectedColor = e.target.name
        
        const colorArray = []
        const productListCopy = [...this.state.fullList]
        productListCopy.forEach(product => {
            product.options.forEach(elm => {
                if (elm.color === selectedColor) {
                    colorArray.push(product)
                }
            })
        })
        this.setState({ products: colorArray })
    }

    removeFilters() {
        const productsArrayCopy = [...this.state.fullList]
        this.setState({ products: productsArrayCopy, minRangeValue: 0, maxRangeValue: 3000})
    }

    handleChangemin(e) {
        this.setState({ minRangeValue: e.target.value})
        this.rangeFilter()
        console.log(e.target.value)
    }
    handleChangemax(e) {
        this.setState({ maxRangeValue: e.target.value })
        this.rangeFilter()
        console.log(e.target.value)
    }

    rangeFilter() {
        const productsArrayCopy = [...this.state.fullList]
        const filteredArray = productsArrayCopy.filter(product => product.options[0].price > this.state.minRangeValue && product.options[0].price < this.state.maxRangeValue)
        this.setState({ products: filteredArray })
    }

    render() {

        return (
            !this.state.products
                ?
                <SpinnerRoll />
                :
                <Container>
                    <hr />
                    <div className="productPage-header">
                        <Row>
                            <Col lg="2">
                                <Form>
                                    <Form.Group controlId="minValue">
                                        <Form.Label>Min   |</Form.Label>
                                        <Form.Label>{this.state.minRangeValue}EUR</Form.Label>
                                        <Form.Control tooltip='on' type="range" className="rangeSlider" min="10" max="3000" value={this.state.minRangeValue} onChange={e => this.handleChangemin(e)}/>
                                    </Form.Group>
                                    <Form.Group controlId="maxValue">
                                        <Form.Label>Max  |</Form.Label>
                                        <Form.Label>{this.state.maxRangeValue}EUR</Form.Label>
                                        <Form.Control type="range" className="rangeSlider" min="10" max="3000" value={this.state.maxRangeValue} onChange={e => this.handleChangemax(e)}/>
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col className="filterButtons">
                                <DropdownButton variant="outline-dark" as={ButtonGroup} title="Sort by Price" id="bg-vertical-dropdown-1" >
                                    <Dropdown.Item onClick={() => this.sortLowtoHigh()} eventKey="1">Low to High</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.sortHightoLow()} eventKey="2">High to Low</Dropdown.Item>
                                </DropdownButton>

                                <DropdownButton variant="outline-dark" as={ButtonGroup} title="Color" id="bg-vertical-dropdown-1" >
                                    <Dropdown.Item onClick={(e) => this.colorFilter(e)} value="black" name="black">Black</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => this.colorFilter(e)} value="white" name="white">White</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => this.colorFilter(e)} value="red" name="red">Red</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => this.colorFilter(e)} value="blue" name="blue">Blue</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => this.colorFilter(e)} value="green" name="green">Green</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => this.colorFilter(e)} value="brown" name="brown">Brown</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => this.colorFilter(e)} value="beige" name="beige">Beige</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => this.colorFilter(e)} value="yellow" name="yellow">Yellow</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => this.colorFilter(e)} value="orange" name="orange">Orange</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => this.colorFilter(e)} value="grey" name="grey">Grey</Dropdown.Item>
                                </DropdownButton>

                                <Button onClick={() => this.removeFilters()} variant="outline-danger" className="sortby">Remove Filters</Button>

                            </Col>
                            <Col lg="3">
                                <SearchBar filterSearch={query => this.filterList(query)} />
                            </Col>

                        </Row>
                    </div>
                    <hr />
                    <Row>
                        <ProductList products={this.state.products} />
                    </Row>

                </Container>
        )
    }
}

export default Products