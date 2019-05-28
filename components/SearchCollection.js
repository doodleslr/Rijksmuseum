import React from 'react'
import Loading from './Loading'

class FetchCollection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            url: 'https://www.rijksmuseum.nl/api/en/collection/?key=y6SDEyFO&format=json',
            collection: ''
        }
    }

    componentDidMount(){
        const URL = encodeURI(this.state.url)
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


export default function searchCollection(props){
    return (
        <FetchCollection />
    )
}