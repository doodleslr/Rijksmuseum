import React from 'react';
import { DragSource } from 'react-dnd';

const Piece = (props) => {
  const { image, height, width, x, y, connectDragSource, isOver, pieceHeight, pieceWidth } = props;

  return connectDragSource(
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        margin: '0 -1px -1px',
        border: '1px solid black',
        backgroundImage: `url(${image})`,
        backgroundSize: `${pieceWidth}px ${pieceHeight}px`,
        backgroundPosition: `-${x}px -${y}px`,
        opacity: `${isOver ? '0.2' : '1'}`,
        cursor: 'move',
      }}
    />
  );
};

const pieceSource = {
  beginDrag(props) {
    const { position } = props;

    return { position };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
  }
}

export default DragSource('piece', pieceSource, collect)(Piece);