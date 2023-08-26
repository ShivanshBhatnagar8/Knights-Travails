"use strict";

class NODE {
  constructor([x, y], predecessor = null) {
    this.position = [x, y];
    this.predecessor = predecessor;
  }
}

function isValid(x, y) {
  if (x >= 0 && y >= 0 && x <= 7 && y <= 7) {
    return true;
  }
  return false;
}
const getLegalMoves = ([x, y]) => {
  let board = [
    [x + 2, y + 1],
    [x + 1, y - 2],
    [x - 1, y - 2],
    [x - 2, y - 1],
    [x - 2, y + 1],
    [x - 1, y + 2],
    [x + 1, y + 2],
    [x + 2, y - 1],
  ];
  return board;
};

//Checking if 2  arrays are equal;
function areEqual(arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[0] === arr2[0] && arr1[1] === arr2[1]) {
      return true;
    }
  }
  return false;
}

const queue = [];
let visited = [];

function getNode(value) {
  let node = new NODE(value);
  return node;
}

const bfs = (node, end) => {
  visited.push(queue.shift());
  let moves = getLegalMoves(node.position);
  moves.forEach((move) => {
    move = { position: move, predecessor: node };
    if (isValid(...move.position) === true) {
      if (visited.includes(move.position) === false) {
        queue.push(move);
      }
    }
  });
  if (areEqual(node.position, getNode(end).position) === true) {
    return node;
  } else {
    return bfs(queue[0], end);
  }
};

function knightMoves(start, end) {
  if (end[0] > 7 || end[0] < 0 || end[1] > 7 || end[1] < 0) {
    console.log(
      "Out of range, please enter start and end points between [0, 0] and [7, 7]"
    );
  }
  queue.push(getNode(start));
  const knightMoves = [];
  let path = bfs(queue[0], end);
  knightMoves.push(path.position);
  while (path.predecessor !== null) {
    knightMoves.unshift(path.predecessor.position);
    path = path.predecessor;
  }
  console.log("Here is your path from " + start + " to " + end);
  knightMoves.forEach((move) => console.log(move));
}

knightMoves([3, 3], [4, 3]);
