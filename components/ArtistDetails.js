import React from 'react'
import Loading from './Loading'

import {
    BrowserRouter,
    Route,
    Link
} from 'react-router-dom'

class ArtistDetails extends React.Component {
    constructor(props) {
        super(props)

        this.state ={
            error: null,
            artist: this.props.artist,
            artistID: this.props.artistID,
            isLoaded: false,
            items: null,
            tiles: null,
            url:    'https://www.rijksmuseum.nl/api/en/collection?key=y6SDEyFO&format=json&imgonly=True&q=',
            tileUrl:'https://www.rijksmuseum.nl/api/en/collection/Q/tiles?key=y6SDEyFO&format=json',
        }
    }
    //SEARCH COLLECTION AND MATCH ARTIST ITEM ID WITH OBJECT NUMBER TO GET SPECIFIC REQUEST

    // https://www.rijksmuseum.nl/api/nl/collection/[INSERT_artistID_HERE]/tiles?key=y6SDEyFO&format=json
    // http://rijksmuseum.github.io/demos/
    // http://rijksmuseum.github.io/

    async fetchQuery(result) {
        const URL = encodeURI(result)
        return fetch(URL)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result,
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    })
                }
            )
    }
    async fetchTiles(result) {
        const URL = encodeURI(result)
        return fetch(URL)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        tiles: result,
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    })
                }
            )
    }

    componentDidMount() {
        var result = this.state.url + this.state.artistID
        var tiles = this.state.tileUrl.replace('Q', this.state.artistID)
        this.fetchQuery(result)
        this.fetchTiles(tiles)
    }

    render() {
        const { error, isLoaded, items, tiles } = this.state
        console.log(items, tiles)
        let returnItem
        if (error) {
            returnItem = ( 
                <div>Please refresh. Error: {error.message}</div>
            )
        } else if (isLoaded) {
            let item
            items.artObjects.map((object) => {
                item = object
            })
            returnItem = (
                <div className='artist-details'>
                    <h3>{item.longTitle}</h3>
                    <h4><i>{item.principalOrFirstMaker}</i></h4>
                    <img alt={item.longTitle} src={item.headerImage.url}/>
                </div>
            )
        } else {
            returnItem = (
                <Loading />
            )
        }
        return ( returnItem )
    }
}

export default ArtistDetails