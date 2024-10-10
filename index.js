class AlgoritmLesopilka {
    constructor(startlist) {
        this.startlist = startlist || [6, 5, 3, 2, 2, 1.5];
        this.startlist.sort().reverse();
        this.startlist.map(parseFloat);
        this.resList = [];
        this.res = [];
    }

    algoritm(maxLength = 10, list = this.startlist, index = 0, sum = 0) {
        // if (!list[index]){
        //     return;
        // }
        // console.log(list[index]);
        // console.log("sum: " + sum);
        // if (sum + list[index] < maxLength) {
        //     sum += list[index];
        //     let res = this.algoritm(maxLength, list, index + 1, sum);
        //     if (res = 'success') {
        //         this.resList.push(list[index]);
        //         return;
        //     }
        //     else {
        //         console.log('here ' + sum);
        //         this.algoritm(maxLength, list, index + 1, sum);
        //     }
        // }
        // else if (sum + list[index] > maxLength){
        //     let res = this.algoritm(maxLength, list, index + 1, sum);
        // }
        // else {
        //     this.resList.push(list[index]);
        //     return 'success';
        // }
        for (let j = index; j < list.length; j++) {
            // console.log('sum ' + sum);
            // console.log('index ' + list[index]);
            // console.log('j ' + list[j]);
            console.log("list____________________________ " + list);
            if (list[j] + sum  <= maxLength){
                if (sum + list[j] == maxLength) {
                    // console.log('here ==');
                    this.resList.push(list[j]);
                    return true;
                }
                if (this.algoritm(maxLength, list, j + 1, sum + list[j])) {
                    this.resList.push(list[j]);
                    if (j == list.length - 1) {
                        return true;
                    }
                    return true;
                }
                else {
                    if (j == list.length - 1) {
                        this.resList.push(list[j]);
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

    fullAlg (maxLength = 10, templist = this.startlist, index = 0, sum = 0) {
        while (templist.length != 0) {
            // console.log("---------------------------------");
            this.algoritm(maxLength, templist, 0, 0);
            this.res.push(this.resList);
            // console.log(templist);
            // templist = templist.filter(e => !this.resList.includes(e));
            templist = this.removeElements(templist, this.resList);
            // console.log(templist);
            // console.log("resList " + this.resList);
            this.resList = [];
        }
    }
}


const main = () => {
    const algLes = new AlgoritmLesopilka([ 6, 3, 5, 2, 2, 1.5, 7, 2, 4, 5, 6, 2, 0.5, 0.5, 1.5, 1, 0.5, 1]);
    // const algLes = new AlgoritmLesopilka([ 6, 3, 1, 6, 5]);
    // const algLes = new AlgoritmLesopilka([ 6, 3, 5, 2, 2, 1.5]);
    console.log(algLes.startlist);
    algLes.fullAlg(10);
    console.log(algLes.resList);
    console.log(algLes.res);
}

main();