import React from 'react'
import SearchArtist from './SearchArtist'

import '../css/main.css'

import {
    BrowserRouter,
    Route,
    Link
} from 'react-router-dom'

function App() {
    return (
        <BrowserRouter>
            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/search-artist'>Search Artists</Link></li>
                </ul>
            </nav>
            <hr/>

            {/* <Route exact path='/' component={Home} /> */}
            <Route path='/search-artist' component={SearchArtist} />
        </BrowserRouter>
    )
}

export default App;