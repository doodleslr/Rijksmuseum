import React from 'react'
import Loading from './Loading'

class FetchComp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            key: 'y6SDEyFO',
            url: 'https://www.rijksmuseum.nl/api/en/collection?key='
        }
    }

    componentDidMount(){
        const URL = encodeURI(this.state.url + this.state.key + '&format=json')//append &type=
        console.log(URL)
        fetch(URL)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result
                })
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
            }
        )
    }
    
    render() {
        const { error, isLoaded, items } = this.state
        if(error) {
            return <div>Please refresh. Error: {error.message}</div>
        } else if (!isLoaded) {
            return <Loading />
        } else {
            console.log(items)
            return (
                <div>

                </div>
            )
        }
    }
}


export default function Fetch(props){
    return (
        <FetchComp />
    )
}