$(document).ready(function() {

    var life = document.getElementById('life');
    var twoD = life.getContext('2d');

    var columns = 50;
    var rows = 50;
    var rectWidth = 10;
    var rectHeight = 10;

    // initialize array
    var board = new Array(rows)
    for (i = 0; i < columns; i++) {
        board[i] = new Array(columns);
    }

    // create row and columns of random 0's and 1's
    function insertRandomValuesInBoard() {
        for (x = 0; x < rows; x++) {
            for (y = 0; y < columns; y++) {
                    board[x][y] = Math.floor(Math.random() * 2);
            }
            console.log(board);
        }
    }

    // create grid 1's black and 0's blue
    function createGrid() {
        twoD.clearRect(0,0, rectHeight, rectWidth);
        twoD.beginPath();
        for (x = 0; x < rows; x++) {
            for (y = 0; y < columns; y++) {

                twoD.beginPath();
                twoD.rect((10*x) + 50, (10*y)+50, rectHeight, rectWidth);

                if (board[x][y] == 1) {
                    twoD.fillStyle = "black";
                    twoD.stroke();
                    twoD.fill();
                } else {
                    twoD.fillStyle = "blue";
                    twoD.strokeStyle = "red";
                    twoD.stroke();
                    twoD.fill();
                }
            }
        }
    }


    // start life
    function startLife() {

        // create nextBoard
        var nextBoard = new Array(rows);
        for (i = 0; i < rows; i++) {
            nextBoard[i] = new Array(columns);
        }

        // loop over each coordinate
        for (x = 1; x < rows-1; x++) {
            for (y = 1; y < columns-1; y++) {

                // count neigbors
                var n = 0;
                for (i = -1; i <= 1; i++) {
                    for (j = -1; j <= 1; j++) {
                        n += board[x + i][y + j]
                    }
                }
                // subtract current square value
                n -= board[x][y]

                // underpopulation or overpopulation
                if (n < 2 || n > 3) {
                    nextBoard[x][y] = 0;
                // birth
                } else if (n == 3) {
                    nextBoard[x][y] = 1;
                // stasis
                } else {
                    nextBoard[x][y] = board[x][y];
                }
            }
        }
        board = nextBoard;
    }



    insertRandomValuesInBoard();

    setInterval(function() {
        startLife();
        createGrid();
    }, 1000);

})
