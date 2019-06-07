import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import Piece from './Piece';

const Cell = (props) => {
    const { image, height, width, level, position, connectDropTarget, isOver, pieceHeight, pieceWidth } = props;
    
    const x = (position % level) * width;
    const y = Math.floor(position / level) * height;

    return connectDropTarget(
        <div className='piece'>
        <Piece
            position={position}
            image={image}
            height={height}
            width={width}
            pieceHeight={pieceHeight}
            pieceWidth={pieceWidth}
            x={x}
            y={y}
            isOver={isOver}
        />

        <style>{`
            .piece:hover {
            opacity: 0.8;
            }
        `}</style>
        </div>
    );
};

const squareTarget = {
    drop(props, monitor) {
        const item = monitor.getItem();
        const sourcePosition = item.position;
        const dropPosition = props.position;

        props.onSwap(sourcePosition, dropPosition);
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

export default DropTarget('piece', squareTarget, collect)(Cell);