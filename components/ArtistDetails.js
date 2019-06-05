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
            let year
            year = item.longTitle.slice(-4)

            returnItem = (
                <div className='artist-details'>
                    {initTileGame ? (
                        <canvas 
                            id='canvas'
                            height={canvasHeight}
                            width={canvasWidth}>
                        </canvas>
                    ) : (
                        <div className="puzzle-prompt">
                            <img 
                                id='imgCanvasRef'
                                alt={item.longTitle} 
                                src={item.webImage.url}
                                ref={(imageRef) => this.handleCanvasSize(imageRef)}>
                            </img>
                            <div 
                                className='img-overlay'
                                onClick={() => 
                                    this.setState({ 
                                        initTileGame: true,
                                    })
                                }>
                                <h5>Click to play an image puzzle game</h5>
                            </div>
                        </div>
                    )}

                    <h2><i>{item.principalOrFirstMaker}</i></h2>
                    <h4>{item.title}</h4>
                    <h4>{year}</h4>
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