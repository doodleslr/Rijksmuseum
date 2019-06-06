import React from 'react'
import TouchBackend from 'react-dnd-touch-backend';
import { DragDropContext } from 'react-dnd';
import Cell from './Cell'

function shuffle(a) {
    const b = a.slice()

    for(let i = b.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        [b[i], b[j]] = [b[j], b[i]]
    }
    return b
}

class Puzzle extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            positions: null,
            canvasHeight: props.height,
            canvasWidth: props.width,
            imageSrc: props.src,
            tileSize: 300,
            size: 300,
            level: 10,
        }
    }

    componentDidMount() {
        const cellHeight = (this.state.canvasHeight / this.state.level) 
        const cellWidth = (this.state.canvasWidth / this.state.level)
        console.log(this.state.canvasHeight,'/',this.state.level,'=', Math.floor(cellHeight))
        console.log(this.state.canvasWidth,'/',this.state.level,'=', Math.floor(cellWidth))
        // might need to find lowest common denominator to have a good square cell size instead of 10 by 10 on a rectangle for example
        // this.setState({
        //     positions: Array(cells)
        // })
    }

    // onSwap(sourcePosition, dropPosition) {
    //     const oldPositions = this.state.positions.slice();
    //     const newPositions = [];
    //     let done = true;
    //     let p = 0;
    
    //     for (let i in oldPositions) {
    //         let value = oldPositions[i];
    //         let newValue = value;
        
    //         if (value === sourcePosition) {
    //             newValue = dropPosition;
    //         } else if (value === dropPosition) {
    //             newValue = sourcePosition;
    //         }
        
    //         newPositions.push(newValue);
        
    //         if (newValue !== p) {
    //             done = false;
    //         }
        
    //         p = p + 1;
    //     }
    
    //     this.setState({ positions: newPositions });
    
    //     if(done) {
    //         this.props.onDone();
    //     }
    // }

    // renderSquares() {
    //     const { imageSrc, size, level } = this.state;
    //     const { positions } = this.state;
    //     console.log(positions)
    //     const squares = positions.map((i) => {
    //         return (
    //             <Cell
    //                 key={i}
    //                 size={size}
    //                 image={imageSrc}
    //                 level={level}
    //                 position={i}
    //                 onSwap={this.onSwap.bind(this)}
    //             />
    //         );
    //     })
    
    //     return squares;
    // }


    render() {
        const { canvasWidth, canvasHeight, positions } = this.state
        console.log(positions)

        let returnItem = (
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    padding: 0,
                    width: `${canvasWidth}px`,
                    height: `${canvasHeight}px`
                }}>

            </div>
        )
        // {this.renderSquares()}
         return ( returnItem )
    }
}

export default DragDropContext(TouchBackend)(Puzzle);