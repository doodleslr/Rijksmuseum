import React from 'react'
import Loading from './Loading'

class ArtistDetails extends React.Component {
    constructor(props) {
        super(props)
        this.canvasRef = React.createRef()
        this.state ={
            error: null,
            artistID: this.props.artistID,
            itemLoaded: false,
            items: null,
            initTileGame: false,
            canvasHeight: null,
            canvasWidth: null,
            once: false,
            url:    'https://www.rijksmuseum.nl/api/en/collection?key=y6SDEyFO&format=json&imgonly=True&q=',
            tileUrl:'https://www.rijksmuseum.nl/api/en/collection/Q/tiles?key=y6SDEyFO&format=json',
        }

        this.handleCanvasSize = this.handleCanvasSize.bind(this)
    }

    async fetchQuery(result) {
        const URL = encodeURI(result)
        return fetch(URL)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        itemLoaded: true,
                        items: result,
                    })
                },
                (error) => {
                    this.setState({
                        itemLoaded: true,
                        error,
                    })
                }
            )
    }

    componentDidMount() {
        var result = this.state.url + this.state.artistID
        this.fetchQuery(result)
    }

    handleCanvasSize(imageRef) {
        if(!this.state.once) {
            let height
            let width
            setTimeout(() => {
                console.log(imageRef)
                height = imageRef.height
                width = imageRef.width
                this.setState({
                    canvasHeight: height,
                    canvasWidth: width,
                    once: true
                })
            }, 2000)
        }
    }

    render() {
        const { error, items, initTileGame, itemLoaded, canvasHeight, canvasWidth } = this.state
        console.log(items)
        let returnItem

        if (error) {
            returnItem = ( 
                <div>Please refresh. Error: {error.message}</div>
            )
        } else if (itemLoaded) {
            let item
            items.artObjects.map((object) => {
                item = object
            })

            returnItem = (
                <div className='artist-details'>
                    <h3>{item.longTitle}</h3>
                    <h4><i>{item.principalOrFirstMaker}</i></h4>
                    {initTileGame ? (
                        <canvas 
                            id='canvas'
                            height={canvasHeight}
                            width={canvasWidth}>
                        </canvas>
                    ) : (
                        <div>
                            <img 
                                id='imgCanvasRef'
                                alt={item.longTitle} 
                                src={item.webImage.url}
                                ref={(imageRef) => this.handleCanvasSize(imageRef)}
                                onClick={() => 
                                    this.setState({ 
                                        initTileGame: true,
                                    })
                                }>
                            </img>
                            <div className='img-overlay'>
                                <p>Click to play an image puzzle game</p>
                            </div>
                        </div>
                    )}                    
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