import React from 'react';
import { View } from 'react-native';

const Cell = ({ type, isStart, isEnd, isPath, isVisited }) => {
  let backgroundColor = '#fff';

  if (type === 1) backgroundColor = '#000';       // wall
  if (isVisited) backgroundColor = '#ADD8E6';     // explored
  if (isPath) backgroundColor = '#FFD700';        // path
  if (isStart) backgroundColor = 'green';
  if (isEnd) backgroundColor = 'red';

  return (
    <View
      style={{
        width: 30,
        height: 30,
        borderWidth: 1,
        backgroundColor,
      }}
    />
  );
};

export default Cell;
