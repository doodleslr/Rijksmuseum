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
        }
    }
    //SEARCH COLLECTION AND MATCH ARTIST ITEM ID WITH OBJECT NUMBER TO GET SPECIFIC REQUEST

    // https://www.rijksmuseum.nl/api/nl/collection/[INSERT_artistID_HERE]/tiles?key=y6SDEyFO&format=json
    // http://rijksmuseum.github.io/demos/
    // http://rijksmuseum.github.io/

    componentDidMount() {
        console.log('DIFFERENT DOCUMENT ArtistDetails.js', this.props)
    }

    // async fetchArtistQuery(artist) {
    //     const URL = encodeURI(this.state.searchUrl + artist)
    //     return fetch(URL)
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 this.setState({
    //                     isLoaded: true,
    //                     items: result,
    //                     currentLoading: false
    //                 })
    //             },
    //             (error) => {
    //                 this.setState({
    //                     isLoaded: true,
    //                     error,
    //                     currentLoading: false
    //                 })
    //             }
    //         )
    // }

    render() {
        const { error, artist, artistID, isLoaded, items } = this.state
        return (
            <div>
                <p>hello {artist}, {artistID}</p>
            </div>
        )
        // if (error) {
        //     return <div>Please refresh. Error: {error.message}</div>
        // } else if (isLoaded) {
        //     return (
        //         <div className='artist-handler'>
        //             <SearchFunction 
        //                 value={ this.state.input }
        //                 onChange={ this.updateInput }
        //                 onSubmit={ this.handleSubmit }
        //             />
        //             <ReturnArtists list={ items } />
        //         </div>
        //     )
        // } else if (currentLoading) {
        //     return (
        //         <div className='artist-handler'>
        //             <SearchFunction 
        //                 value={ this.state.input }
        //                 onChange={ this.updateInput }
        //                 onSubmit={ this.handleSubmit }
        //             />
        //             <Loading />
        //         </div>
        //     )
        // } else {
        //     return (
        //         <div className='artist-handler'>
        //             <SearchFunction 
        //                 value={ this.state.input }
        //                 onChange={ this.updateInput }
        //                 onSubmit={ this.handleSubmit }
        //             />
        //         </div>
        //     )
        // }
    }
}

export default ArtistDetails