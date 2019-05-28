import React from 'react'
import searchArtist from './SearchArtist'
import searchCollection from './SearchCollection'

import '../css/main.css'

import {
    BrowserRouter,
    Route,
    Link
} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
        <div>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/search-artist'>Search Artists</Link></li>
                <li><Link to='/search-collection'>Search Collections</Link></li>
            </ul>

            <hr/>

            {/* <Route exact path='/' component={Home} /> */}
            <Route path='/search-artist' component={searchArtist} />
            <Route path='/search-collection' component={searchCollection} />

        </div>
    </BrowserRouter>
  )
}

export default App;