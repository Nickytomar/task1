import React from 'react';
import { View } from 'react-native';
import Cell from './Cell';

const MazeGrid = ({ maze, path, visited, start, end }) => {
  return (
    <View>
      {maze.map((row, rIndex) => (
        <View key={rIndex} style={{ flexDirection: 'row' }}>
          {row.map((cell, cIndex) => (
            <Cell
              key={cIndex}
              type={cell}
              isStart={rIndex === start.row && cIndex === start.col}
              isEnd={rIndex === end.row && cIndex === end.col}
              isPath={path?.some(p => p.row === rIndex && p.col === cIndex)}
              isVisited={visited?.[rIndex]?.[cIndex]}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

export default MazeGrid;
