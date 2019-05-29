import React from 'react'
import Loading from './Loading'

function ReturnArtists(props) {
    console.log(props.list.artObjects)
    return(
        <ul className="artist-list">
            {props.list.artObjects.map((item) => (
                <li key={item.id}>
                    <a href={item.links.web} target='_blank'><h3>{item.longTitle}</h3></a>
                    <h4><i>{item.principalOrFirstMaker}</i></h4>
                    <img src={item.headerImage.url}/>
                </li>
            ))}
        </ul>
    )
}

class SearchArtistQuery extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            input: '',
            isLoaded: false,
            items: null,
            url: 'https://www.rijksmuseum.nl/api/en/collection?key=y6SDEyFO&format=json&q=',
            searchUrl: 'https://www.rijksmuseum.nl/api/en/collection?key=y6SDEyFO&format=json&q=',
        }

        this.updateInput = this.updateInput.bind(this)
    }

    updateInput(e) {
        const value = e.target.value
        this.setState({
            input: value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        this.fetchArtistQuery(this.state.input)
    }

    fetchArtistQuery(artist) {
        const URL = encodeURI(this.state.searchUrl + artist)
        return fetch(URL)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }
    
    render() {
        const { error, input, items, isLoaded, loadingNow } = this.state
        console.log(items)

        if (error) {
            return <div>Please refresh. Error: {error.message}</div>
        } else if (isLoaded) {
            return (
                <ReturnArtists list={ items } />
            )
        } else {
            return (
                <div>
                    <form onSubmit={ e => { this.handleSubmit(e) }}>
                        <input 
                            id='search-artist' 
                            type='text'
                            placeholder='Eg: Rembrandt'
                            value={ this.state.input }
                            onChange={ this.updateInput }
                        />
                        <input type='submit' value='Search'></input>
                    </form>
                </div>
            )
        }
    }
}

export default function SearchBar(props){
    return (
        <div>
            <SearchArtistQuery />
        </div>
    )
}