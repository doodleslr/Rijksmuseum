import React from 'react'
import Loading from './Loading'
import ArtistDetails from './ArtistDetails'

import {
    BrowserRouter,
    Route,
    Link
} from 'react-router-dom'

function ReturnArtists(props) {
    let returnItem
    let year
    
    if(props.browsingArtist) {
        returnItem = (
            <BrowserRouter>
                <h3 id="return"><Link to='/artist' onClick={() => props.toggleBrowsing()}>Return to search results</Link></h3>

                <Route 
                    path='/artist/:artistID' 
                    render={(prop) => (
                        <ArtistDetails 
                            artistID={props.artistID}
                            {...prop} />
                    )} 
                />
            </BrowserRouter>
        )          
    } else {
        returnItem = (
            <ul className="artist-list">
                {props.list.artObjects.map((item) => (
                    year = item.longTitle.slice(-4),
                    <li key={item.id}>
                        <BrowserRouter>
                            <Link to='/artist/:artistID' onClick={() => props.toggleBrowsing(item.principalOrFirstMaker, item.objectNumber)}>
                                <img alt={item.longTitle} src={item.headerImage.url}/>
                                <h2><i>{item.principalOrFirstMaker}</i></h2>
                                <h4>{item.title}</h4>
                                <h4>{year}</h4>
                            </Link>
                        </BrowserRouter>
                    </li>
                ))}
            </ul>
        )
    }

    return(returnItem)
}

function SearchFunction(props) {
    return(
        <form id='searchForm' onSubmit={ e => { props.onSubmit(e) }}>
            <input 
                id='search-artist' 
                type='text'
                placeholder='Eg: Rembrandt'
                value={ props.value }
                onChange={ props.onChange }
            />
            <input type='submit' value='Search'></input>
        </form>
    )
}

class SearchArtist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            input: '',
            isLoaded: false,
            currentLoading: false,
            browsingArtist: false,
            artistID: '',
            items: null,
            url: 'https://www.rijksmuseum.nl/api/en/collection?key=y6SDEyFO&format=json&imgonly=True&q=',
        }
        this.updateInput = this.updateInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.toggleBrowsing = this.toggleBrowsing.bind(this)
    }

    toggleBrowsing = (currentArtist, artistID) => {
        if(!this.state.browsingArtist) {
            this.setState({ 
                browsingArtist: currentArtist,
                artistID: artistID
            })
        } else {
            this.setState({ browsingArtist: false }) }
    }

    updateInput(e) {
        const value = e.target.value
        this.setState({ input: value })
    }

    handleSubmit(e) {
        e.preventDefault()
        this.setState({ currentLoading: true })
        this.fetchArtistQuery(this.state.input)
    }

    async fetchArtistQuery(artist) {
        const URL = encodeURI(this.state.url + artist)
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
        const { error, items, isLoaded, currentLoading, browsingArtist, artistID } = this.state
        let returnItem 
        if (error) {
            returnItem = ( <div>Please refresh. Error: {error.message}</div> )
        } else if (isLoaded) {
            returnItem = (
                <div className='artist-handler'>
                    <SearchFunction 
                        value={ this.state.input }
                        onChange={ this.updateInput }
                        onSubmit={ this.handleSubmit }
                    />
                    <ReturnArtists 
                        list={ items }
                        toggleBrowsing={ this.toggleBrowsing }
                        browsingArtist={ browsingArtist }
                        artistID={ artistID }
                    />
                </div>
            )
        } else if (currentLoading) {
            returnItem = (
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
            returnItem = (
                <div className='artist-handler'>
                    <SearchFunction 
                        value={ this.state.input }
                        onChange={ this.updateInput }
                        onSubmit={ this.handleSubmit }
                    />
                </div>
            )
        }

        return ( returnItem )
    }
}

export default SearchArtist