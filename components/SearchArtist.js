import React from 'react'
import SearchBar from './SearchBar'

class SearchComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
        }
    }

    returnSearch() {
        const searchArtist = document.getElementById('search-artist').value
        console.log(searchArtist)
        return searchArtist
    }
    
    render() {
        const { error} = this.state
        if (error) {
            return <div>Please refresh. Error: {error.message}</div>
        } else {
            return (
                <div>
                    <SearchBar />
                </div>
            )
        }
    }
}


export default function SearchComp(props){
    return (
        <div>
            <SearchComponent />
        </div>
    )
}