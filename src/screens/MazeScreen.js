import React, { useEffect, useState } from "react";
import { View, Button, TouchableOpacity, Text } from "react-native";
import MazeGrid from "../components/MazeGrid";
import { bfs } from "../algorithm/bfs";
import { dfs } from "../algorithm/dfs";
import { dfs } from "../algorithm/dfs";
import { buildPath, maze, START, END } from "../constants/cellTypes";
import { aStar } from "../algorithm/aStar";

const algorithms = ["BFS", "DFS", "ASTAR"];

const MazeScreen = () => {
  const [path, setPath] = useState([]);
  const [visited, setVisited] = useState([]);
  const [algorithm, setAlgorithm] = useState("BFS");

  const solveMaze = (type) => {
    let result;

    switch (type) {
      case "BFS":
        result = bfs(maze, START, END);
        break;

      case "DFS":
        result = dfs(maze, START, END);
        break;

      case "ASTAR":
        result = aStar(maze, START, END);
        break;

      default:
        return;
    }

    setVisited(result.visited);

    if (result.parent) {
      setPath(buildPath(result.parent, START, END));
    } else {
      setPath([]);
    }
  };

  return (
    <View>
      <View style={{ flexDirection: "row", marginVertical: 10 }}>
        {algorithms.map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => setAlgorithm(item)}
            style={{
              padding: 10,
              marginHorizontal: 5,
              backgroundColor: algorithm === item ? "#4CAF50" : "#ccc",
              borderRadius: 6,
            }}
          >
            <Text style={{ color: "#fff" }}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <MazeGrid
        maze={maze}
        path={path}
        visited={visited}
        start={START}
        end={END}
      />
      <Button title="Solve Maze" onPress={() => solveMaze(algorithm)} />
    </View>
  );
};

export default MazeScreen;
