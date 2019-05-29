import React from 'react'
import Loading from './Loading'

function ReturnArtists(props) {
    console.log(props.list.artObjects)
    return(
        <ul className="artist-list">
            {props.list.artObjects.map((item) => (
                <li key={item.id}>
                    <a href={item.links.web} rel="noopener noreferrer" target='_blank'>
                        <h3>{item.longTitle}</h3>
                    </a>
                    <h4><i>{item.principalOrFirstMaker}</i></h4>
                    <img alt={item.Title} src={item.headerImage.url}/>
                </li>
            ))}
        </ul>
    )
}

function SearchFunction(props) {
    return(
        <form onSubmit={ e => { props.onSubmit(e) }}>
            <input 
                id='search-artist' 
                type='text'
                placeholder='Eg: Rembrandt'
                value={ props.input }
                onChange={ props.updateInput }
            />
            <input type='submit' value='Search'></input>
        </form>
    )
}

class SearchArtistQuery extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            input: '',
            isLoaded: false,
            currentLoading: false,
            items: null,
            url: 'https://www.rijksmuseum.nl/api/en/collection?key=y6SDEyFO&format=json&q=',
            searchUrl: 'https://www.rijksmuseum.nl/api/en/collection?key=y6SDEyFO&format=json&q=',
        }

        this.updateInput = this.updateInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    updateInput(e) {
        const value = e.target.value
        this.setState({
            input: value
        })
    }

    handleSubmit(e) {
        e.preventDefault()

        this.setState({ currentLoading: true })
        this.fetchArtistQuery(this.state.input)
    }

    async fetchArtistQuery(artist) {
        const URL = encodeURI(this.state.searchUrl + artist)
        return fetch(URL)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result,
                        currentLoading: false
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                        currentLoading: false
                    })
                }
            )
    }

    render() {
        const { error, items, isLoaded, currentLoading } = this.state

        if (error) {
            return <div>Please refresh. Error: {error.message}</div>
        } else if (isLoaded) {
            return (
                <div className='artist-handler'>
                    <SearchFunction 
                        value={ this.state.input }
                        onChange={ this.updateInput }
                        onSubmit={ this.handleSubmit }
                    />
                    <ReturnArtists list={ items } />
                </div>
            )
        } else if (currentLoading) {
            return (
                <div className='artist-handler'>
                    <SearchFunction 
                        value={ this.state.input }
                        onChange={ this.updateInput }
                        onSubmit={ this.handleSubmit }
                    />
                    <Loading />
                </div>
            )
        } else {
            return (
                <div className='artist-handler'>
                    <SearchFunction 
                        value={ this.state.input }
                        onChange={ this.updateInput }
                        onSubmit={ this.handleSubmit }
                    />
                </div>
            )
        }
    }
}

export default function SearchBar(props){
    return (
        <SearchArtistQuery />
    )
}