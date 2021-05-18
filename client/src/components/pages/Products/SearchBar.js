import { Component } from 'react'

import { Button, FormControl } from 'react-bootstrap'

import './SearchBar.css'

class SearchBar extends Component {

    constructor() {
        super()
        this.state = {
            keyword: ''
        }
    }

    async handleInputChange(e) {
        const value = e.target.value
        await this.setState({ keyword: value })
        
        this.sendKeyword(this.state.keyword)
    }

    sendKeyword(searchWord) {
        this.props.filterSearch(searchWord)
    }

    render() {
        return (
            <div className="searchBar">
                 {console.log(this.props)}
                <FormControl type="text" onChange={(e) => this.handleInputChange(e)} value={this.state.keyword} placeholder="Search" className="mr-sm-2" />
                <Button type="submit" variant="outline-dark">Search</Button>
            </div>
        )
    }
}

export default SearchBar






