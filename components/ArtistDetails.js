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
    }

    componentDidMount() {
        console.log(this.props)
    }

    // handleSubmit(e) {
    //     e.preventDefault()

    //     this.setState({ currentLoading: true })
    //     this.fetchArtistQuery(this.state.input)
    // }

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
        return (
            <div>
                <p>Hello</p>
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