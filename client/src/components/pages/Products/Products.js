import { Component } from 'react'
import ProductsService from './../../../service/products.service'
import { Row, Container, Col, Button, Dropdown, ButtonGroup, DropdownButton } from 'react-bootstrap'
import ProductList from './ProductList'
import SearchBar from './SearchBar'
import './Products.css'

class Products extends Component {

    constructor() {
        super()
        this.state = {
            fullList: undefined,
            products: undefined
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
                this.setState({ products: response.data })
                this.setState({fullList: response.data})
                console.log(this.state.fullList)
            })
            .catch(err => console.log('TENEMOS UN PROBLEMA', err))
    }

    filterList(query) {
        console.log(this.state.fullList)
        console.log(this.state.products)
        const productListCopy = [...this.state.fullList]
        const filteredProducts = productListCopy.filter(product => product.name.toLowerCase().includes(query.toLowerCase()))
        this.setState({ products: filteredProducts })
    }

    sortLowtoHigh() {
        const productsArrayCopy = [...this.state.fullList]
        const sortedArray = productsArrayCopy.sort((a, b) => a.options[0].price - (b.options[0].price))
        this.setState({products: sortedArray})
    }

    sortHightoLow() {
        const productsArrayCopy = [...this.state.fullList]
        const sortedArray = productsArrayCopy.sort((a, b) => b.options[0].price - (a.options[0].price))
        this.setState({ products: sortedArray })
    }

    colorFilter(e) {
        const selectedColor = e.target.name
        console.log(selectedColor)
        const colorArray=[]
        const productListCopy = [...this.state.fullList]
        productListCopy.map(product => {
            product.options.forEach(elm =>{
                if(elm.color === selectedColor){
                    colorArray.push(product)
                }
            })
        })
        // const filteredProducts = productListCopy.filter(product => product.options[0].color.toLowerCase().includes(selectedColor.toLowerCase()))
        console.log(colorArray)
        this.setState({products: colorArray})
    }

    removeFilters() {
        const productsArrayCopy = [...this.state.fullList]
        this.setState({ products: productsArrayCopy })
    }

    render() {

        return (
            !this.state.products
            ?
            <h1>Loading...</h1>
            :
            <Container>
                <hr/>
                <Row>
                    <Col lg="2">
                    <h2>Our Products</h2>
                    </Col>
                    <Col className="filterButtons">
                            <DropdownButton variant="outline-dark" as={ButtonGroup} title="Sort by Price" id="bg-vertical-dropdown-1" >
                                <Dropdown.Item onClick={()=> this.sortLowtoHigh()} eventKey="1">Low to High</Dropdown.Item>
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

                            {/* <DropdownButton variant="outline-dark" as={ButtonGroup} title="Brand" id="bg-vertical-dropdown-1">
                                <Dropdown.Item eventKey="1">SKLUM</Dropdown.Item>
                                <Dropdown.Item eventKey="2">PINCH</Dropdown.Item>
                                <Dropdown.Item eventKey="3">Frama Cph</Dropdown.Item>
                            </DropdownButton> */}
                           
                            <Button onClick={() => this.removeFilters()}variant="outline-danger" className="sortby">Remove Filters</Button>

                        </Col>
                        <Col lg="3">
                        <SearchBar filterSearch={query => this.filterList(query)}/>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <ProductList products={this.state.products}/>
                </Row>

            </Container>

        )
    }
}

export default Products