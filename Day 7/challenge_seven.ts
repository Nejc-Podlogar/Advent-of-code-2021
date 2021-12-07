import * as fs from "fs"

fs.readFile("./Day 7/input_7.txt", "utf8", (err, data) => {
    if (err) throw err;

    let arr = data.toString().replace(/\r/g, "").split("\n")[0].split(",").map(Number);

    let maxPosition = Math.max.apply(Math, arr);
    let minPosition = Math.min.apply(Math, arr);


    let optimalFuel = Infinity;
    let optimalPosition = 0;
    for(let i = minPosition; i <= maxPosition; i++){
        let fuel = 0;
        arr.forEach((element) => {
            let diff = Math.abs(element - i);
            let tmpFuel = 0;
            for(let j = 0; j <= diff; j++){
                tmpFuel += j;
            }
            fuel += tmpFuel;
        });
        
        if(fuel < optimalFuel){
            optimalFuel = fuel;
            optimalPosition = i;
        }

    }

    console.log(`Optimal position: ${optimalPosition} with fuel consuption: ${optimalFuel}`);
})