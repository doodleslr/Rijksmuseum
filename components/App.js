import React from 'react'
import SearchArtist from './SearchArtist'
import ArtistDetails from './ArtistDetails'

import '../css/css/main.css'

import {
    BrowserRouter,
    Route,
    Link
} from 'react-router-dom'
import Loading from './Loading';

function ReturnSplash(props) {
    console.log(props)
    let returnItem
    let year

    if(props.browsingArtist) {
        returnItem = (
            <BrowserRouter>
                <h3 id="return"><Link to='/' onClick={() => props.toggleBrowsing()}>Return to Home</Link></h3>

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
        returnItem = (
            <ul className="home-list">
                {props.list.artObjects.map((item) => (
                    year = item.longTitle.slice(-4),
                    <li key={item.id}>
                        <BrowserRouter>
                            <Link to='/artist/:artistID' onClick={() => props.toggleBrowsing(item.principalOrFirstMaker, item.objectNumber)}>
                                <img alt={item.longTitle} src={item.headerImage.url}/>
                                <h2>{item.principalOrFirstMaker}</h2>
                                <h4>{item.title}</h4>
                                <h4>{year}</h4>
                            </Link>
                        </BrowserRouter>
                    </li>
                ))}
            </ul>
        )
    }

    return( returnItem )
}

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            items: null,
            browsingArtist: false,
            artistID: '',
            url: 'https://www.rijksmuseum.nl/api/en/collection?key=y6SDEyFO&format=json&imgonly=True&q=',
        }

        this.fetchQuery = this.fetchQuery.bind(this)
    }

    async fetchQuery(result) {
        const URL = encodeURI(this.state.url + result)

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

    componentDidMount() {
        var characters = 'abcdefghijklmnopqrstuvwxyz'
        var characterLength = characters.length
        var result = characters.charAt(Math.floor(Math.random() * characterLength))
        this.fetchQuery(result)
    }

    render() {
        const { error, items, isLoaded, browsingArtist, artistID } = this.state
        if (error) {
            return <div>Please refresh. Error: {error.message}</div>
        } else if (isLoaded) {
            return (
                <div className='home-handler'>
                    <ReturnSplash 
                        list={ items }
                        toggleBrowsing={ this.toggleBrowsing }
                        browsingArtist={ browsingArtist }
                        artistID={ artistID }
                    />
                </div>
            )
        } else {
            return (
                <Loading />
            )
        }
    }
}

function App() {
    return (
        <BrowserRouter>
            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/search-artist'>Search Artists</Link></li>
                </ul>
            </nav>
            

            <Route exact path='/' component={Home} />
            <Route path='/search-artist' component={SearchArtist} />
        </BrowserRouter>
    )
}

export default App;