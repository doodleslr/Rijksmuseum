import React from 'react'
import Loading from './Loading'
import Puzzle from './Puzzle'

class ArtistDetails extends React.Component {
    constructor(props) {
        super(props)
        this.imageRef = React.createRef()
        this.state ={
            error: null,
            artistID: this.props.artistID,
            itemLoaded: false,
            items: null,
            initTileGame: false,
            canvasHeight: null,
            canvasWidth: null,
            imageSrc: null,
            url: 'https://www.rijksmuseum.nl/api/en/collection?key=y6SDEyFO&format=json&imgonly=True&q=',
            level: 3,
        }

        this.handleLoad = this.handleLoad.bind(this)
        this.setDifficulty = this.setDifficulty.bind(this)
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

    handleLoad() {
        this.setState({
            canvasHeight: this.imageRef.current.height,
            canvasWidth: this.imageRef.current.width,
            imageSrc: this.imageRef.current.src
        })
    }

    setDifficulty(e) {
        e.preventDefault()
        switch(e.target.value) {
            case 'Easy':
                this.setState({ level: 3 })
                break;
            case 'Medium':
                this.setState({ level: 5 })
                break;
            case 'Hard':
                this.setState({ level: 7 })
                break;
            case 'Extreme':
                this.setState({ level: 10 })
                break;            
        }
    }

    render() {
        const { error, items, initTileGame, itemLoaded, canvasHeight, canvasWidth, imageSrc, level } = this.state
        let returnItem
        let item

        if (error) {
            returnItem = ( <div>Please refresh. Error: {error.message}</div> )
        } else if (itemLoaded) {
            items.artObjects.map((object) => { item = object })
            let year = item.longTitle.slice(-4)
            returnItem = (
                <div className='artist-details'>
                    {initTileGame ? (
                        //console.log('puzzle rendered with level: ', level),
                        //logs new puzzle with correct difficulty, but does not rerender puzzle with new difficulty
                        console.log(<Puzzle 
                            height={canvasHeight}
                            width={canvasWidth}
                            src={imageSrc}
                            level={level}
                        />),
                        <Puzzle 
                            height={canvasHeight}
                            width={canvasWidth}
                            src={imageSrc}
                            level={level}
                        />
                    ) : (
                        <div className="puzzle-prompt">
                            <img 
                                id='imgCanvasRef'
                                alt={item.longTitle} 
                                src={item.webImage.url}
                                ref={this.imageRef}
                                onLoad={() => this.handleLoad()}>
                            </img>
                            <div 
                                className='img-overlay'
                                onClick={ () => this.setState({ initTileGame: true }) }>

                                <h5>Click to play an image puzzle game</h5>
                            </div>
                        </div>
                    )}
                    
                    <input type='submit' value='Easy' onClick={ e => { this.setDifficulty(e) }}></input>
                    <input type='submit' value='Medium' onClick={ e => { this.setDifficulty(e) }}></input>
                    <input type='submit' value='Hard' onClick={ e => { this.setDifficulty(e) }}></input>
                    <input type='submit' value='Extreme' onClick={ e => { this.setDifficulty(e) }}></input>

                    <h2><i>{item.principalOrFirstMaker}</i></h2>
                    <h4>{item.title}</h4>
                    <h4>{year}</h4>
                </div>
            )
        } else {
            returnItem = ( <Loading /> )
        }
        return ( returnItem )
    }
}

export default ArtistDetails