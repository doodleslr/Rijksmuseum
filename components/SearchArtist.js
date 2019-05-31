import React from 'react'
import Loading from './Loading'
import ArtistDetails from './ArtistDetails'

import {
    BrowserRouter,
    Route,
    Link
} from 'react-router-dom'

function ReturnArtists(props) {
    console.log(props)
    if(props.browsingArtist) {
        return(
            <BrowserRouter>
                <h3><Link to='/artist' onClick={() => props.toggleBrowsing()}>Return to search results</Link></h3>

                <Route 
                    path='/artist/:artistID' 
                    render={(prop) => (
                        <ArtistDetails 
                            artist={props.browsingArtist}
                            artistID={props.artistID}
                            {...prop} />
                    )} 
                />
            </BrowserRouter>
        )
    } else {
        return(
            <ul className="artist-list">
                {props.list.artObjects.map((item) => (
                    <li key={item.id}>
                        <BrowserRouter>
                            <h3><Link to='/artist/:artistID' onClick={() => props.toggleBrowsing(item.principalOrFirstMaker, item.objectNumber)}>{item.longTitle}</Link></h3>
                            <h4><i>{item.principalOrFirstMaker}</i></h4>
                            <img alt={item.longTitle} src={item.headerImage.url}/>
    
                            <Route 
                                path='/artist' 
                                render={(props) => (
                                    <ArtistDetails 
                                        artist={item.principalOrFirstMaker}
                                        artistID={item.objectNumber}
                                        {...props} />
                                )} 
                            />
                        </BrowserRouter>
                    </li>
                ))}
            </ul>
        )
    }
}

function SearchFunction(props) {
    return(
        <form onSubmit={ e => { props.onSubmit(e) }}>
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
            searchUrl: 'https://www.rijksmuseum.nl/api/en/collection?key=y6SDEyFO&format=json&imgonly=True&q=',
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
            this.setState({ 
                browsingArtist: false })
        }
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
        const { error, items, isLoaded, currentLoading, browsingArtist, artistID } = this.state
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
                    <ReturnArtists 
                        list={ items }
                        toggleBrowsing={ this.toggleBrowsing }
                        browsingArtist={ browsingArtist }
                        artistID={ artistID }
                    />
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

export default SearchArtist