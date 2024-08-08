const keyboard = [
  ["A", "B", "C", "D", "E", "F"],
  ["G", "H", "I", "J", "K", "L"],
  ["M", "N", "O", "P", "Q", "R"],
  ["S", "T", "U", "V", "W", "X"],
  ["Y", "Z"],
];
/* {        let rowMoves = [row - prevRow, row - negPrevRow, negRow - prevRow];
console.log(generatePathWrapAround('afbabd'));

    A: {p: [0, 0], n:[-5, -6]}
    F: {p: [0, 5], n:[-4, -1]}
    B: {p: [0, 1], n: [-4, -4]}

    X: {p: [3, 5], n: [-2, -1]}
    Y: {p: [4, 0], n: [-1, -6]}
    } */

    // A -> F [5,0] or [-1, 0] 
    // B -> X  [3 - 0, 5 - 1] -> [3, 4], or [-2 - 0, -1 - 1]
function generatePathWrapAround(word) {
    // A: 0,0, B: 0, 1. G: 1,0
    // row: Math.floor(num / 6)
    // col: num % 6

    // make a hash of letter to coordinate
    let hash = {};
    for (let row = 0; row < keyboard.length; row++) {
        for (let col = 0; col < keyboard[row].length; col++) {
            let letter = keyboard[row][col]
            hash[letter] = [row, col]
        }
    }
    
    const result = [];
    let prev = [0, 0];
    const rowLen = keyboard.length;
    const colLen = keyboard[0].length;
    for (let letter of word.toUpperCase()) {
        let [row, col] = hash[letter];
        let [negRow, negCol] = [row - rowLen, col - colLen];
        let [prevRow, prevCol] = prev;
        let [negPrevRow, negPrevCol] = [prevRow - rowLen, prevCol - colLen];
        
        let rowMoves = [row - prevRow, row - negPrevRow, negRow - prevRow];
        let minRowDistance = rowMoves.toSorted((a, b) => Math.abs(a) - Math.abs(b))[0];            
        // compare col
        let colMoves = [col - prevCol, col - negPrevCol, negCol - prevCol];
        let minColDistance = colMoves.toSorted((a, b) => Math.abs(a) - Math.abs(b))[0];
        result.push({row: minRowDistance, col: minColDistance})
        console.log(letter, rowMoves, colMoves)
        prev = [row, col];
    }

    return result;
}


// assume start at A. Give path of world
// dog:
// [{row: 0, col: 3}, {row: 2, col: -1}, {row: -1, col: -2}]
function generatePath(word) {
    // A: 0,0, B: 0, 1. G: 1,0
    // row: Math.floor(num / 6)
    // col: num % 6

    // make a hash of letter to coordinate
    let hash = {};
    for (let row = 0; row < keyboard.length; row++) {
        for (let col = 0; col < keyboard[row].length; col++) {
            let letter = keyboard[row][col]
            hash[letter] = {positive: [row, col]}
        }
    }
    
    // console.log(hash)
    const result = [];
    let prev = [0, 0];
    for (let letter of word.toUpperCase()) {
        let [row, col] = hash[letter];
        
        let [prevRow, prevCol] = prev;
        result.push({row: row - prevRow, col: col - prevCol})
        prev = [row, col];
    }

    return result;
}


// now find optimal path given that you can move backwards or forwards and wrap around
// word: afx -> [0,0], [0, -1], [-1, 0]
// console.log(generatePath('afx'));
console.log(generatePathWrapAround('afbabd'));


