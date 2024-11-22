class AlgoritmLesopilka {
    constructor(startlist, maxLength = 10) {
        this.maxLength = maxLength;
        this.startlist = startlist || [6, 5, 3, 2, 2, 1.5];
        this.startlist.sort().reverse();
        this.startlist.map(parseFloat);
        this.oneWayList = [];
        this.resultList = [];
    }

    itterarion(list = this.startlist, index = 0, sum = 0) {
        for (let j = index; j < list.length; j++) {
            if (list[j] + sum  <= this.maxLength){
                if (sum + list[j] == this.maxLength) {
                    this.oneWayList.push(list[j]);
                    return true;
                }
                if (this.itterarion(list, j + 1, sum + list[j])) {
                    this.oneWayList.push(list[j]);
                    if (j == list.length - 1) {
                        return true;
                    }
                    return true;
                }
                else {
                    if (j == list.length - 1) {
                        this.oneWayList.push(list[j]);
                        return true;
                    }
                    continue;
                }
            }
            else {
                continue;
            }
        }
    }

    removeElements(arr1, arr2) {
        return arr2.reduce((acc, el) => {
            const index = acc.indexOf(el);
            if (index !== -1) acc.splice(index, 1);
            return acc;
        }, [...arr1]);
    }

    fullAlg (templist = this.startlist, index = 0, sum = 0) {
        while (templist.length != 0) {
            this.itterarion(templist, 0, 0);
            this.resultList.push(this.oneWayList);
            templist = this.removeElements(templist, this.oneWayList);
            this.oneWayList = [];
        }
    }
}


const dataArray = [ // u250_00 150 250 99
    42, 69, 67, 57, 93, 90, 38, 36, 45, 42, 33, 79, 27, 57, 44, 84, 86, 92, 46, 
    38, 85, 33, 82, 73, 49, 70, 59, 23, 57, 72, 74, 69, 33, 42, 28, 46, 30, 64, 
    29, 74, 41, 49, 55, 98, 80, 32, 25, 38, 82, 30, 35, 39, 57, 84, 62, 50, 55, 
    27, 30, 36, 20, 78, 47, 26, 45, 41, 58, 98, 91, 96, 73, 84, 37, 93, 91, 43, 
    73, 85, 81, 79, 71, 80, 76, 83, 41, 78, 70, 23, 42, 87, 43, 84, 60, 55, 49, 
    78, 73, 62, 36, 44, 94, 69, 32, 96, 70, 84, 58, 78, 25, 80, 58, 66, 83, 24, 
    98, 60, 42, 43, 43, 39, 97, 57, 81, 62, 75, 81, 23, 43, 50, 38, 60, 58, 70, 
    88, 36, 90, 37, 45, 45, 39, 44, 53, 70, 24, 82, 81, 47, 97, 35, 65, 74, 68, 
    49, 55, 52, 94, 95, 29, 99, 20, 22, 25, 49, 46, 98, 59, 98, 60, 23, 72, 33, 
    98, 80, 95, 78, 57, 67, 53, 47, 53, 36, 38, 92, 30, 80, 32, 97, 39, 80, 72, 
    55, 41, 60, 67, 53, 65, 95, 20, 66, 78, 98, 47, 100, 85, 53, 53, 67, 27, 22, 
    61, 43, 52, 76, 64, 61, 29, 30, 46, 79, 66, 27, 79, 98, 90, 22, 75, 57, 67, 
    36, 70, 99, 48, 43, 45, 71, 100, 88, 48, 27, 39, 38, 100, 60, 42, 20, 69, 24, 
    23, 92, 32
  ];

  const dataArray2 = [ // u250_01 150 250 100
    84, 36, 65, 84, 34, 68, 64, 33, 69, 27, 47, 21, 85, 88, 59, 61, 50, 53, 37, 75,
    64, 84, 74, 57, 83, 28, 31, 97, 61, 36, 46, 37, 96, 80, 53, 51, 68, 90, 64, 81,
    66, 67, 80, 37, 92, 67, 64, 31, 94, 45, 80, 28, 76, 29, 64, 38, 48, 40, 29, 44,
    81, 35, 51, 48, 67, 24, 46, 38, 76, 22, 30, 67, 45, 41, 29, 41, 79, 21, 25, 90,
    62, 34, 73, 50, 79, 66, 59, 42, 90, 79, 70, 66, 80, 35, 62, 98, 97, 37, 32, 75,
    91, 91, 48, 26, 23, 32, 100, 46, 29, 26, 29, 26, 83, 82, 92, 95, 87, 63, 57, 100,
    63, 65, 81, 46, 42, 95, 90, 80, 53, 27, 84, 40, 22, 97, 20, 73, 63, 95, 46, 42,
    47, 40, 26, 88, 49, 24, 92, 87, 68, 95, 34, 82, 84, 43, 54, 73, 66, 32, 62, 48,
    99, 90, 86, 28, 25, 25, 89, 67, 96, 35, 33, 70, 40, 59, 32, 94, 34, 86, 35, 45,
    25, 76, 80, 42, 91, 44, 91, 97, 60, 29, 45, 37, 61, 54, 78, 56, 74, 74, 45, 21,
    96, 37, 75, 100, 58, 84, 85, 56, 54, 71, 52, 79, 43, 35, 27, 70, 31, 47, 35, 26,
    30, 97, 90, 80, 58, 60, 73, 46, 71, 39, 42, 98, 27, 21, 71, 71, 78, 76, 57, 24,
    91, 84, 35, 25, 77, 96, 97, 89, 30, 86
  ];
  
  
const main = () => {
    // const algLes = new AlgoritmLesopilka([ 6, 3, 5, 2, 2, 1.5, 7, 2, 4, 5, 6, 2, 0.5, 0.5, 1.5, 1, 0.5, 1], 10);
    // const algLes = new AlgoritmLesopilka([ 6, 3, 1, 6, 5], 10);
    // const algLes = new AlgoritmLesopilka([ 6, 3, 5, 2, 2, 1.5], 10);
    const algLes = new AlgoritmLesopilka(dataArray2, 150);
    algLes.fullAlg();
    console.log("count of bins " + algLes.resultList.length);
    for (let i  = 0; i < algLes.resultList.length; i++) {
        console.log(i + ": " + algLes.resultList[i]);
    }
    console.log(algLes.resultList);
    let arr = [];
    for (let i = 0; i < algLes.resultList.length; i++) {
        // console.log(algLes.resultList[i]);
        for (let j = 0; j < algLes.resultList[i].length; j++) {
            arr.push(algLes.resultList[i][j]);
            // console.log(algLes.resultList[i][j]);
        }
    }
    console.log(arr);
}

main();