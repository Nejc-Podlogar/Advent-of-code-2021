import * as fs from "fs"

fs.readFile("./Day 6/test.txt", "utf8", (err, data) => {
    if (err) throw err;

    let arr = data.toString().replace(/\r/g, "").split("\n")[0].split(",").map(Number);

    // Create a 2d array.
    let arr2d = new Array();
    for(let i  in arr){
        let tmpArr = [arr[i]]
        arr2d.push(tmpArr);
    }    

    for(let j in arr2d){
        let oneArray = arr2d[j];
        for(let i = 0; i < 256; i++){
            for(let index in oneArray){
                if(oneArray[index] > 0){
                    oneArray[index] = oneArray[index] - 1;
                }else if(oneArray[index] == 0){
                    oneArray[index] = 6;
                    oneArray.push(8);
                }
            }
        }
        arr2d[j] = oneArray;
        console.log(arr2d[j].length);
    }

    let days = 0;
    for(let i  in arr2d){
        days += arr2d[i].length;
    }
    console.log(days);
})