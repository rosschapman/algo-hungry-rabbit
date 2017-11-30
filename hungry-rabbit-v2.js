// HELPERS
function charsOk(str) {
  if (!str) { return true; }
  return /^[\d\[\],]+$/.test(str);
}
      
function isBalanced(str) {
  str = str.replace(/[^\(|\)|\{|\}|\[|\]]/g, '');
  if (!str) { return false; }
  
  const map = {
    '(': ')',
    '[': ']',
    '{': '}'
  }
  const keys = Object.keys(map);
  const values = Object.values(map);
  const chars = Array.from(str);
  const stack = [];
    
  chars.forEach((char) => {
    if (!keys.includes(char) && !values.includes(char)) {
      stack.push(false);
    } else if (keys.includes(char)) {
      stack.push(char);
    } else { 
      if (stack.length === 0) { stack.push(false) }
      if (map[stack.slice(-1)[0]] === char) { stack.pop(); }
    }
  });
  
  return stack.length === 0;
};

// HUNGRY RABBIT FUNCTIONS
function arrMidIndex(arr=[]) {
  if (arr.length % 2 === 0) {
    let a = Math.floor((arr.length / 2) - 1);
    let b = Math.floor((arr.length / 2));
    return arr[a] > arr[b] ? a : b;
  }
  return Math.floor(arr.length / 2);
}

function arrMidValue(arr=[]) {
  if (arr.length % 2 === 0) {
    let a = arr[Math.floor((arr.length / 2) - 1)];
    let b = arr[Math.floor((arr.length / 2))];
    return a > b ? a : b;
  }
  return arr[Math.floor(arr.length / 2)];
}

function findMatrixMiddle(matrix) {
  // matrix is one row
  if (matrix.length === 1) {
    return {
      rowIndex: 0, 
      index: arrMidIndex(matrix[0]), 
      value: matrix[0][arrMidIndex(matrix[0])]
    }
  }
  
  // matrix is even number of rows
  if (matrix.length % 2 === 0) {
    let rowAIndex = (matrix.length / 2) - 1;
    let rowBIndex = matrix.length / 2;
    
    const a = {
      rowIndex: rowAIndex, 
      index: arrMidIndex(matrix[rowAIndex]), 
      value: arrMidValue(matrix[rowAIndex])
    }
    const b = {
      rowIndex: rowBIndex, 
      index: arrMidIndex(matrix[rowBIndex]), 
      value: arrMidValue(matrix[rowBIndex])
    }

    return a.value > b.value ? a : b;

  // odd number of rows
  } else {
    let innerRowIndex = Math.floor(matrix.length / 2);
    let index = arrMidIndex(matrix[innerRowIndex]);

    return {
      rowIndex: innerRowIndex, 
      index: index, 
      value: matrix[innerRowIndex][index],
    }
  }
}

function maxValuePath(matrix=[], currPos={}, totalValue=0) {
  let nextPos = null;
  let adjacents = [];

  if (!totalValue) {
    currPos = findMatrixMiddle(matrix);
  }
  
  const currPosIndex = currPos.index;
  const currPosRowIndex = currPos.rowIndex;
  const currPosRow = matrix[currPosRowIndex];

  totalValue = totalValue || currPos.value;
  
  // top
  if (matrix[currPosRowIndex - 1] !== undefined) {
    adjacents.push({
      value: matrix[currPosRowIndex - 1][currPosIndex],
      rowIndex: currPosRowIndex - 1, 
      index: currPosIndex
    });
  }

  // right 
  if (currPosRow[currPosIndex + 1] !== undefined) {
    adjacents.push({
      value: currPosRow[currPosIndex + 1],
      rowIndex: currPosRowIndex,
      index: currPosIndex + 1
    });
  }

  // bottom
  if (matrix[currPosRowIndex + 1] !== undefined) {
    adjacents.push({
      value: matrix[currPosRowIndex + 1][currPosIndex],
      rowIndex: currPosRowIndex + 1, 
      index: currPosIndex
    });
  }

  // left 
  if (currPosRow[currPosIndex - 1] !== undefined) {
    adjacents.push({
      value: currPosRow[currPosIndex - 1],
      rowIndex: currPosRowIndex,
      index: currPosIndex - 1
    });
  }
  
  if (adjacents.length > 0) {
    let nextSquare = adjacents.reduce((acc, curr) => { return acc.value > curr.value ? acc : curr  });
  
    if (nextSquare.value > 0) {
      currPosRow[currPosIndex] = 0;
      currPos = {rowIndex: nextSquare.rowIndex, index: nextSquare.index};
      totalValue += nextSquare.value;
      return maxValuePath(matrix, currPos, totalValue);
    } else {
      // Go to sleep little bunny
      return totalValue;
    }
  } else {
    return totalValue;
  }
}

// Unit tests
describe("#arrMidIndex", function() {
  it("works for odd length array", function() {
    expect(arrMidIndex([5, 7, 8, 6, 3])).toEqual(2);
  });
  
  it("works for even length array", function() {
    expect(arrMidIndex([5, 7, 8, 2, 6, 3])).toEqual(2);
  });
});

describe("#arrMidValue", function() {
  it("works for odd length array", function() {
    expect(arrMidValue([5, 7, 8, 6, 3])).toEqual(8);
  });
  
  it("works for even length array", function() {
    expect(arrMidValue([5, 7, 8, 2, 6, 3])).toEqual(8);
  });
});

describe("#findMatrixMiddle", function() {
  it("works for EVENxODD", function() {
    const matrix = [
      [5, 7, 8, 6, 3],
      [0, 0, 7, 0, 4],
      [4, 6, 3, 4, 9],
      [3, 1, 0, 5, 8]
    ];
    
    actual = {rowIndex: 1, index: 2, value: 7};
    expect(findMatrixMiddle(matrix)).toEqual(actual);
  });
  
  it("works for EVENxEVEN", function() {
    const matrix = [
      [5, 7, 8, 6],
      [0, 0, 7, 0],
      [4, 6, 3, 4],
      [3, 1, 0, 5]
    ];
    actual = {rowIndex: 1, index: 2, value: 7};
    expect(findMatrixMiddle(matrix)).toEqual(actual);
  });
  
  it("works for EVENxEVEN", function() {
    const matrix = [
      [5, 7, 8],
      [0, 0, 7]
    ];
    actual = {rowIndex: 0, index: 1, value: 7};
    expect(findMatrixMiddle(matrix)).toEqual(actual);
  });
  
  it("works for 1x1", function() {
    const matrix = [
      [7]
    ];
    actual = {rowIndex: 0, index: 0, value: 7};
    expect(findMatrixMiddle(matrix)).toEqual(actual);
  });
  
  it("works for 1xN", function() {
    const matrix = [
      [5, 7, 8, 6, 3]
    ];
    actual = {rowIndex: 0, index: 2, value: 8};
    expect(findMatrixMiddle(matrix)).toEqual(actual);
  });
});

describe("#maxValuePath", function() {
  it("works for 4x5", function() {
    const matrix = [
      [5, 7, 8, 6, 3],
      [0, 0, 7, 0, 4],
      [4, 6, 3, 4, 9],
      [3, 1, 0, 5, 8]
    ];
    expect(maxValuePath(matrix)).toEqual(27);
  });
  
  it("works for 4x4", function() {
    const matrix = [
      [5, 7, 8, 6],
      [0, 0, 7, 0],
      [4, 6, 3, 4],
      [3, 1, 0, 5]
    ];
    expect(maxValuePath(matrix)).toEqual(27);
  });
  
  it("works for 2 rows", function() {
    const matrix = [
      [5, 7, 8],
      [0, 0, 7]
    ];
    expect(maxValuePath(matrix)).toEqual(22);
  });
  
  it("works for 1x1", function() {
    const matrix = [
      [7]
    ];
    expect(maxValuePath(matrix)).toEqual(7);
  });
  
  it("works for 1xN", function() {
    const matrix = [
      [5, 7, 8, 6, 3]
    ];
    expect(maxValuePath(matrix)).toEqual(20);
  });
});

// User interaction
let timeout;
const textAreaNode = document.getElementsByTagName('textarea')[0];
const answerNode = document.getElementById('answer');
const spanNode1 = document.getElementById('span1');
const spanNode2 = document.getElementById('span2');

textAreaNode.addEventListener('keydown', function(event) {
  // remove line breaks and spaces from text input
  const value = event.target.value.replace(/[\r?\n|\r ]/g, '');

  if (!charsOk(value)) {
    spanNode2.textContent = 'Whoops it looks like you might have some non integers in there';
  } else {
    spanNode2.textContent = '';
  }
});

textAreaNode.addEventListener('input', function(event) {
  if (timeout) { 
    clearTimeout(timeout);
    timeout = null;
  }
  timeout = setTimeout(function() {
    const value = event.target.value.replace(' ', '');
    
    if (isBalanced(value)) {
      spanNode1.textContent = '';
      let array;
      try {
        array = JSON.parse(`[${value}]`);
        answerNode.textContent = maxValuePath(array);
        answerNode.style.width = 'auto';
      } 
      catch(e) {
        spanNode2.textContent = 'Whoops it looks like you might have some weird formatting in there'; 
      }
    } else {
      spanNode1.textContent = 'Working...waiting for array';
    }
  }, 250);
});