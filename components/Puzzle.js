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

        const cellH = Math.floor(props.height / props.level)
        const cellW = Math.floor(props.width / props.level)

        const cells = props.level * props.level
        let positionArr = [...Array(cells).keys()]

        this.state = {
            positions: positionArr,
            canvasHeight: props.height,
            canvasWidth: props.width,
            cellHeight: cellH,
            cellWidth: cellW,
            imageSrc: props.src,
            tileSize: 300,
            size: 300,
            level: props.level,
        }
    }

    componentDidMount(props) {
        // const cellH = Math.floor(this.state.cellHeight / this.state.level)
        // const cellW = Math.floor(this.state.cellWidth / this.state.level)
        // console.log(this.state.canvasHeight,'/',this.state.level,'=', (cellH))
        // console.log(this.state.canvasWidth,'/',this.state.level,'=', (cellW))
        // might need to find lowest common denominator to have a good square cell size instead of 10 by 10 on a rectangle for example

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

    renderSquares() {
        const { imageSrc, cellHeight, cellWidth, level, canvasWidth, canvasHeight } = this.state;
        const { positions } = this.state;
        const squares = positions.map((i) => {
            return (
                <Cell
                    key={i}
                    height={cellHeight}
                    width={cellWidth}
                    pieceHeight={canvasHeight}
                    pieceWidth={canvasWidth}
                    image={imageSrc}
                    level={level}
                    position={i}
                    // onSwap={this.onSwap.bind(this)}
                />
            );
        })
    
        return squares;
    }


    render() {
        const { canvasWidth, canvasHeight } = this.state

        return (
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    padding: 0,
                    width: `${canvasWidth}px`,
                    height: `${canvasHeight}px`
                }}>
                {this.renderSquares()}
            </div>
        ) 
    }
}

export default DragDropContext(TouchBackend)(Puzzle);