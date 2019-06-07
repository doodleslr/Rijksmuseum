import React from 'react'
import TouchBackend from 'react-dnd-touch-backend';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Cell from './Cell'

function shuffle(a) {
    for(let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}


class Puzzle extends React.Component {
    constructor(props) {
        super(props)

        const cells = props.level * props.level
        // creating array with initial difficulty, but not updating it on changing difficulty
        // also not passing new difficulty down, so this component really only gets rendered once
        // code in here may be right
        // console.log('init level at ', props.level)
        this.state = {
            positions: [...Array(cells).keys()],
            canvasHeight: props.height,
            canvasWidth: props.width,
            cellHeight: Math.floor(props.height / props.level),
            cellWidth: Math.floor(props.width / props.level),
            imageSrc: props.src,
            level: props.level,
            oldDifficulty: props.level,
        }
    }

    // might need to find lowest common denominator to have a good square cell size instead of 10 by 10 on a rectangle for example

    componentDidMount() {
        const { positions } = this.state;
        this.setState({ positions: shuffle(positions) });
    }

    // componentDidUpdate() {
    //     if(this.state.level !== this.state.oldDifficulty) {
    //         console.log(this.state.level, 'is a different difficulty to ', this.state.oldDifficulty)
    //     } else {
    //         console.log(this.state.level, 'is the same difficulty as ', this.state.oldDifficulty)
    //     }
    // }

    onSwap(sourcePosition, dropPosition) {
        const oldPositions = this.state.positions.slice();
        const newPositions = [];
        let done = true;
        let p = 0;
    
        for (let i in oldPositions) {
            let value = oldPositions[i];
            let newValue = value;
        
            if (value === sourcePosition) {
                newValue = dropPosition;
            } else if (value === dropPosition) {
                newValue = sourcePosition;
            }
        
            newPositions.push(newValue);
        
            if (newValue !== p) {
                done = false;
            }
        
            p = p + 1;
        }
    
        this.setState({ positions: newPositions });
    
        if(done) {
            this.props.onDone();//WIN CONDITION HERE
        }
    }

    renderCells() {
        const { imageSrc, cellHeight, cellWidth, level, canvasWidth, canvasHeight, positions } = this.state;

        const cells = positions.map((i) => {
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
                    onSwap={this.onSwap.bind(this)}
                />
            );
        })
        return cells;
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
                {this.renderCells()}
            </div>
        ) 
    }
}

function isClientMobile() {
    let mql = window.matchMedia('(max-width: 750px)');
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && mql.matches ) {
        console.log('ismobile')
        return true;
    }
    console.log('notmobile')
    return false;
}

const context = isClientMobile() ? DragDropContext(TouchBackend)(Puzzle) : DragDropContext(HTML5Backend)(Puzzle);

export default context;