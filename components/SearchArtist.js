import React from 'react'
import Loading from './Loading'

class FetchArtist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: true,
            items: null,
            url: 'https://www.rijksmuseum.nl/api/en/collection?key=y6SDEyFO&format=json&q=',
            searchUrl: 'https://www.rijksmuseum.nl/api/en/collection?key=y6SDEyFO&format=json&q='
        }

        this.queryArtist = this.queryArtist.bind(this)
    }
    componentDidUpdate(){
        const URL = encodeURI(this.state.searchUrl)
        console.log(URL)
        fetch(URL)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: false,
                    items: result
                })
            },
            (error) => {
                this.setState({
                    isLoaded: false,
                    error
                })
            }
        )
    }

    queryArtist() {
        let artist = document.getElementById('search-artist').value

        this.setState(({ searchUrl: this.state.url + artist }))

        console.log(this.state.searchUrl)
    }
    
    render() {
        const { error, isLoaded, items } = this.state
        if (error) {
            return <div>Please refresh. Error: {error.message}</div>
        } else if (!isLoaded) {
            return <Loading />
        } else {
            console.log(items)
            return (
                <div>
                    <form>
                        <input id='search-artist' type='text' placeholder='eg: "Rembrandt"'></input>
                        <input type='submit' value='submit' onClick={() => this.queryArtist()}></input>
                    </form>
                </div>
            )
        }
    }
}


export default function searchArtist(props){
    return (
        <FetchArtist />
    )
}