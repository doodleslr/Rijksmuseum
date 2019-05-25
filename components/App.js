import React from 'react'
import Fetch from './Fetch'

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
                <li><Link to='/fetch'>Fetch</Link></li>
            </ul>

            <hr/>

            {/* <Route exact path='/' component={Home} /> */}
            <Route path='/fetch' component={Fetch} />

        </div>
    </BrowserRouter>
  )
}

export default App;