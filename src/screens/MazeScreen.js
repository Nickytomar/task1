import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  TouchableOpacity,
  Text,
  SafeAreaView,
  TextInput,
} from "react-native";
import MazeGrid from "../components/MazeGrid";
import { bfs } from "../algorithm/bfs";
import { dfs } from "../algorithm/dfs";
import { buildPath, maze } from "../constants/cellTypes";
import { aStar } from "../algorithm/aStar";
import { generateRandomMaze } from "../utils/helper";

const algorithms = ["BFS", "DFS", "ASTAR"];

const MazeScreen = () => {
  const [path, setPath] = useState([]);
  const [visited, setVisited] = useState([]);
  const [algorithm, setAlgorithm] = useState("BFS");
  const [mazeData, setMazeData] = useState(maze);
  const [rows, setRows] = useState("6");
  const [cols, setCols] = useState("6");
  const [message, setMessage] = useState("");


 const solveMaze = (type) => {
  const start = { row: 0, col: 0 };
  const end = {
    row: mazeData.length - 1,
    col: mazeData[0].length - 1,
  };

  let result;

  switch (type) {
    case "BFS":
      result = bfs(mazeData, start, end);
      break;
    case "DFS":
      result = dfs(mazeData, start, end);
      break;
    case "ASTAR":
      result = aStar(mazeData, start, end);
      break;
    default:
      return;
  }

  setVisited(result.visited);

  if (result.parent) {
    const finalPath = buildPath(result.parent, start, end);

    if (finalPath.length === 0) {
      setPath([]);
      setMessage(`No path found using ${type}`);
    } else {
      setPath(finalPath);
      setMessage("");
    }
  } else {
    setPath([]);
    setMessage(`No path found using ${type}`);
  }
};


  const resetMaze = () => {
    setPath([]);
    setVisited([]);
    setMessage("");
  };

  const generateMaze = () => {
    const r = parseInt(rows, 10);
    const c = parseInt(cols, 10);

    if (r < 3 || c < 3) return;

    const newMaze = generateRandomMaze(r, c);
    setMazeData(newMaze);
    setPath([]);
    setVisited([]);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View style={{ flexDirection: "row", marginBottom: 12 }}>
          <TextInput
            value={rows}
            onChangeText={setRows}
            placeholder="Rows"
            keyboardType="number-pad"
            style={{
              borderWidth: 1,
              padding: 8,
              width: 80,
              marginRight: 10,
              borderRadius: 6,
            }}
          />

          <TextInput
            value={cols}
            onChangeText={setCols}
            placeholder="Cols"
            keyboardType="number-pad"
            style={{
              borderWidth: 1,
              padding: 8,
              width: 80,
              borderRadius: 6,
            }}
          />
        </View>
        <Button title="Generate Maze" onPress={generateMaze} />

        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          {algorithms.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => {
                resetMaze();
                setAlgorithm(item);
              }}
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
          maze={mazeData}
          path={path}
          visited={visited}
          start={{ row: 0, col: 0 }}
          end={{
            row: mazeData.length - 1,
            col: mazeData[0].length - 1,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Button title="Solve Maze" onPress={() => solveMaze(algorithm)} />
          <Button title="Reset" color="#f44336" onPress={resetMaze} />
        </View>
        {message ? (
  <Text
    style={{
      marginTop: 12,
      color: "red",
      textAlign: "center",
      fontWeight: "600",
    }}
  >
    {message}
  </Text>
) : null}
      </View>
    </SafeAreaView>
  );
};

export default MazeScreen;
