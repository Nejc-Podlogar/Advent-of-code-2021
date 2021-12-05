import * as fs from "fs";
fs.readFile("./input_4.txt", "utf8", (err, data) => {
    if (err) throw err;

    let arr = data.toString().replace(/\r/g, "").split("\n");

    let randomNum = arr[0].split(",");

    let arrayOfBoards = new Array();

    let boards = 1;
    while (boards < arr.length - 1) {
        if (arr[boards] === "") {
            let singleBoard = new Array();
            boards++;

            for (let i = 0; i < 5; i++) {
                let line = new Array();
                arr[boards] = arr[boards].trim();
                line = arr[boards++].split(/[  ]+/);
                let lineNum = line.map(Number);
                singleBoard.push(lineNum);
            }
            arrayOfBoards.push(singleBoard);
        }
    }

    let arrayOfBoardsCopy = new Array();
    for (let i = 0; i < arrayOfBoards.length; i++) {
        let singleBoard = new Array();
        for (let j = 0; j < arrayOfBoards[i].length; j++) {
            let line = new Array();
            for (let k = 0; k < arrayOfBoards[i][j].length; k++) {
                line.push(-1);
            }
            singleBoard.push(line);
        }
        arrayOfBoardsCopy.push(singleBoard);
    }

    for (let x = 0; x < randomNum.length; x++) {
        
        let numVal = Number(randomNum[x]);
        for (let i = 0; i < arrayOfBoards.length; i++) {
            let b =  arrayOfBoards[i];
            for(let j = 0; j < b.length; j++) {
                let l = b[j];
                for(let k = 0; k < l.length; k++) {
                    if(l[k] === numVal) {
                        arrayOfBoardsCopy[i][j][k] = numVal;
                    }
                }
            }
        }

        for (let i = 0; i < arrayOfBoardsCopy.length; i++) {
            let tmpBoard = arrayOfBoardsCopy[i];

            //Check rows if any row has -1 then return the board
            for (let j = 0; j < tmpBoard.length; j++) {
                let tmpLine = tmpBoard[j];
                let hasNegOne = false;
                for (let k = 0; k < tmpLine.length; k++) {
                    if (tmpLine[k] === -1) {
                        hasNegOne = true;
                    }
                }
                if (!hasNegOne) {
                    console.log('Final value: ' + calculateFinalScore(arrayOfBoards[i], tmpBoard, numVal));
                    console.log('Deleting current completed board.');
                    arrayOfBoardsCopy.splice(i, 1);
                    arrayOfBoards.splice(i, 1);
                    //return;
                }
            }

            for (let j = 0; j < tmpBoard[0].length; j++) {
                let hasNegOne = false;
                for (let k = 0; k < tmpBoard.length; k++) {
                    if (tmpBoard[k][j] === -1) {
                        hasNegOne = true;
                    }
                }
                if (!hasNegOne) {
                    console.log('Final value: ' + calculateFinalScore(arrayOfBoards[i], tmpBoard, numVal));
                    console.log('Deleting current completed board.');
                    arrayOfBoardsCopy.splice(i, 1);
                    arrayOfBoards.splice(i, 1);
                    // return;
                }
            }
        }
        

    }



});

function calculateFinalScore(board: number[][], copyBoard: number[][], lastValue: number) {

    let sum = 0;
    for (let i = 0; i < copyBoard.length; i++) {
        for (let j = 0; j < copyBoard[i].length; j++) {
            if (copyBoard[i][j] === -1) {
                sum += board[i][j];
            }
        }
        
    }
    let final = sum * lastValue;
    return final;
}
