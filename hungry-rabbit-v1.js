// Todo(Ross): there are some tougher algo parts still left to implement. Not my specialty, 
// so will be seeking help from another team member. 
const PathSum = {
  total: 0,
  startCoordinates: null,
  calculate(board, startCoordinates) {
    let next;

    startCoordinates = this.startCoordinates || this._findMiddleCoordinates(board);;
    next = this._findNext(board, startCoordinates);

    if (next === 0) {
      return this.total;
    } else {
      this.startCoordinates = next;
      this.total += next.value;
      calculate(board, startCoordinates)
    }    
  },
  
  /**
   * Finds middle coordinates of 2d array
   * @param {array} board The array to search in
   * @returns {object}
   */
  _findMiddleCoordinates(board) {
    // Todo(Ross): oof, how do you find the middle of a game board
    // but also return it as coordinates. For example, finding the 
    // center value is not all that hard once we flatten the board: 
    // flattenedBoard[Math.floor((flatttenedBoard.length - 1) / 2)];
    return {row: row, index: index, value: value};
  },  
  
  /**
   * Finds coordinates of next destination in path
   * @param {array} board The array to search in
   * @param {object} coordinates coordinates in f
   * @returns {object}
   */
  _findNext(board, coordinates) {
    let left;
    let top;
    let right;
    let bottom;

    // Todo(Ross): calculate adjacent squares and return coordinates as 
    // object foundMapping, so an array of coordinates in form of {row: row, index: index, value: value}
    let max = Math.max.apply(Math, foundMapping.map(function(o) { return o.value; }))
    return map.find(pos => pos.value === max);
  },
}

// Run program
const exampleBoard = [
 [5, 7, 8, 6, 3],
 [0, 0, 7, 0, 4],
 [4, 6, 3, 4, 9],
 [3, 1, 0, 5, 8]
]

const pathSum = Object.create(pathSum);
console.log(pathSum.calculate(exampleBoard))