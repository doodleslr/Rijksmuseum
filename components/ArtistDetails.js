import React from 'react'
import Loading from './Loading'
import Puzzle from './Puzzle'

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
            imageSrc: null,
            once: false,
            url:    'https://www.rijksmuseum.nl/api/en/collection?key=y6SDEyFO&format=json&imgonly=True&q=',
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
            setTimeout(() => {
                console.log(imageRef)
                this.setState({
                    canvasHeight: imageRef.height,
                    canvasWidth: imageRef.width,
                    imageSrc: imageRef.src,
                    once: true
                })
            }, 1000)
        }
    }

    render() {
        const { error, items, initTileGame, itemLoaded, canvasHeight, canvasWidth, imageSrc } = this.state
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
                        <Puzzle 
                            height={canvasHeight}
                            width={canvasWidth}
                            src={imageSrc}
                        />
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