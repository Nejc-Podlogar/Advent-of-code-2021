import * as fs from "fs";

fs.readFile("./Day 5/input_5.txt", "utf8", (err, data) => {
    if (err) throw err;

    let arr = data.toString().replace(/\r/g, "").split("\n");

    let maxX = 0;
    let maxY = 0;

    var arrayOfCords = Array();

    for (let row in arr) {
        let split = arr[row].split(" -> ");
        let pair_coords1 = split[0].split(",").map(Number);
        let pair_coords2 = split[1].split(",").map(Number);

        let completeCords = [pair_coords1, pair_coords2];

        if (completeCords[0][0] > maxX) {
            maxX = completeCords[0][0];
        } else if (completeCords[0][1] > maxY) {
            maxY = completeCords[0][1];
        } else if (completeCords[1][0] > maxX) {
            maxX = completeCords[1][0];
        } else if (completeCords[1][1] > maxY) {
            maxY = completeCords[1][1];
        }

        arrayOfCords.push(completeCords);
    }


    //generate grid of 0s of size maxX and maxY
    let grid = new Array(maxX + 1);
    for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(maxY + 1);
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j] = 0;
        }2
    }

    for (let i in arrayOfCords) {
        let cords = arrayOfCords[i];
        // console.log("Current cords:");
        // console.log(cords);
        
        /// Horizontal lines and vertical lines
        if(cords[0][0] == cords[1][0]) {
             let x = cords[0][0];
             
            if(cords[0][1] < cords[1][1]) {
                for(let j = cords[0][1]; j <= cords[1][1]; j++) {
                    grid[x][j] += 1;
                }
            } else
            {
                for(let j = cords[1][1]; j <= cords[0][1]; j++) {
                    grid[x][j] += 1;
                }
            }

        }else if(cords[0][1] == cords[1][1]) {
            let y = cords[0][1];
            if(cords[0][0] < cords[1][0]) {
                for(let j = cords[0][0]; j <= cords[1][0]; j++) {
                    grid[j][y] += 1;
                }
            } else
            {
                for(let j = cords[1][0]; j <= cords[0][0]; j++) {
                    grid[j][y] += 1;
                }
            }
        }else{
            //Diagonal lines
            // Right and down
            if(cords[0][0] < cords[1][0] && cords[0][1] < cords[1][1]){
                let x = cords[0][0];
                let y = cords[0][1];
                while(x <= cords[1][0] && y <= cords[1][1]){
                    grid[x][y] += 1;
                    x++;
                    y++;
                }
            // Right and up
            } else if(cords[0][0] < cords[1][0] && cords[0][1] > cords[1][1]){
                let x = cords[0][0];
                let y = cords[0][1];
                while(x <= cords[1][0] && y >= cords[1][1]){
                    grid[x][y] += 1;
                    x++;
                    y--;
                }
            // Left and up
            } else if (cords[0][0] > cords[1][0] && cords[0][1] >  cords[1][1]){
                let x = cords[0][0];
                let y = cords[0][1];
                while(x >= cords[1][0] && y >= cords[1][1] - 1){
                    grid[x][y] += 1;
                    x--;
                    y--;
                }
            // Left and down
            } else if(cords[0][0] > cords[1][0] && cords[0][1] < cords[1][1]){
                let x = cords[0][0];
                let y = cords[0][1];
                while(x >= cords[1][0] && y <= cords[1][1]){
                    grid[x][y] += 1;
                    x--;
                    y++;
                }
            }


        }

        
        
    }
    
    let gridString = "";
    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[i].length; j++) {
            gridString += grid[i][j] + " ";
        }
        gridString += "\n";
    }
    console.log(gridString);

    var sum = 0;
    grid.forEach(row => {
        row.forEach((cell : any) => {
            if(cell > 1) {
                sum += 1;
            }
        })
    });
    console.log(sum);


});