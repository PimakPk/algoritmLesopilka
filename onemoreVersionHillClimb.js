// Функция для жадного заполнения контейнеров
function greedyBinPacking(items, binSize) {
    const bins = [];
    for (const item of items) {
        let placed = false;
        for (const bin of bins) {
            if (bin.reduce((sum, x) => sum + x, 0) + item <= binSize) {
                bin.push(item);
                placed = true;
                break;
            }
        }
        if (!placed) {
            bins.push([item]);
        }
    }
    // console.log(bins);
    return bins;
}

// Функция для генерации соседей
function generateNeighbors(bins, binSize) {
    bins = twoOpt(bins);
    // bins = sortBinsDescending(bins);
    const neighbors = [];
    for (let i = 0; i < bins.length; i++) {
        for (let j = 0; j < bins.length; j++) {
            if (i !== j) {
                // Пробуем переместить элемент из bins[i] в bins[j]
                for (let k = 0; k < bins[i].length; k++) {
                    const item = bins[i][k];
                    if (bins[j].reduce((sum, x) => sum + x, 0) + item <= binSize) {
                        const newBins = JSON.parse(JSON.stringify(bins));
                        newBins[j].push(item);
                        newBins[i].splice(k, 1);
                        newBins[i] = newBins[i].filter(x => x > 0); // Удаляем пустые контейнеры
                        neighbors.push(newBins);
                    }
                }
            }
        }
    }
    return neighbors;
}

// Оценочная функция (количество контейнеров)
function evaluate(bins) {
    return bins.length;
}

function twoOpt(bins) {
    let index1 = Math.floor(Math.random() * bins.length);
    let index2 = index1;

    // Убедимся, что индексы разные
    while (index2 === index1) {
        index2 = Math.floor(Math.random() * bins.length);
    }

    // Убедимся, что index1 < index2 для удобства
    if (index1 > index2) {
        [index1, index2] = [index2, index1];
    }

    // Переворачиваем подмассивы между index1 и index2
    const newBins = [...bins.slice(0, index1), ...bins.slice(index1, index2 + 1).reverse(), ...bins.slice(index2 + 1)];

    return newBins;
}


// Hill Climbing
function hillClimbing(initialSolution, binSize) {
    let currentSolution = initialSolution;
    let currentScore = evaluate(currentSolution);

    let improved = true;

    while (improved) {
        improved = false;

        // Генерируем соседей
        const neighbors = generateNeighbors(currentSolution, binSize);

        for (const neighbor of neighbors) {
            const neighborScore = evaluate(neighbor);

            if (neighborScore < currentScore) {
                // Если нашли лучшее решение, обновляем
                currentSolution = neighbor;
                currentScore = neighborScore;
                improved = true;
                break; // Прерываем цикл, чтобы двигаться к новому состоянию
            }
        }
    }

    return currentSolution;
}

// Функция для создания случайного начального решения
function randomBinPacking(items, binSize) {
    const shuffled = [...items].sort(() => Math.random() - 0.5); // Перемешиваем элементы
    return greedyBinPacking(shuffled, binSize);
}

// Multi-Start Hill Climbing
function multiStartHillClimbing(items, binSize, iterations) {
    let bestSolution = null;
    let worstSolution = null;
    let bestScore = Infinity;
    let scoreArr = [];
    for (let i = 0; i < iterations; i++) {
        // Создаем случайное начальное решение
        let initialSolution = randomBinPacking(items, binSize);
        let solution = hillClimbing(initialSolution, binSize);
        let score = evaluate(solution);
        scoreArr.push(score);
        // Вывод результатов текущего запуска
        console.log(`Запуск ${i + 1}: Количество контейнеров = ${score}`);

        // Сравниваем с глобальным лучшим решением
        // if (score < bestScore) {
        //     bestSolution = solution;
        //     bestScore = score;
        // }

    }

    // return bestSolution;
    return scoreArr;
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
    //u500_00 
    //150 500 198
  const dataArray2 = [
    42, 69, 67, 57, 93, 90, 38, 36, 45, 42, 33, 79, 27, 57, 44, 84, 86, 92, 46, 38,
    85, 33, 82, 73, 49, 70, 59, 23, 57, 72, 74, 69, 33, 42, 28, 46, 30, 64, 29, 74,
    41, 49, 55, 98, 80, 32, 25, 38, 82, 30, 35, 39, 57, 84, 62, 50, 55, 27, 30, 36,
    20, 78, 47, 26, 45, 41, 58, 98, 91, 96, 73, 84, 37, 93, 91, 43, 73, 85, 81, 79,
    71, 80, 76, 83, 41, 78, 70, 23, 42, 87, 43, 84, 60, 55, 49, 78, 73, 62, 36, 44,
    94, 69, 32, 96, 70, 84, 58, 78, 25, 80, 58, 66, 83, 24, 98, 60, 42, 43, 43, 39,
    97, 57, 81, 62, 75, 81, 23, 43, 50, 38, 60, 58, 70, 88, 36, 90, 37, 45, 45, 39,
    44, 53, 70, 24, 82, 81, 47, 97, 35, 65, 74, 68, 49, 55, 52, 94, 95, 29, 99, 20,
    22, 25, 49, 46, 98, 59, 98, 60, 23, 72, 33, 98, 80, 95, 78, 57, 67, 53, 47, 53,
    36, 38, 92, 30, 80, 32, 97, 39, 80, 72, 55, 41, 60, 67, 53, 65, 95, 20, 66, 78,
    98, 47, 100, 85, 53, 53, 67, 27, 22, 61, 43, 52, 76, 64, 61, 29, 30, 46, 79, 66,
    27, 79, 98, 90, 22, 75, 57, 67, 36, 70, 99, 48, 43, 45, 71, 100, 88, 48, 27, 39,
    38, 100, 60, 42, 20, 69, 24, 23, 92, 32, 84, 36, 65, 84, 34, 68, 64, 33, 69, 27,
    47, 21, 85, 88, 59, 61, 50, 53, 37, 75, 64, 84, 74, 57, 83, 28, 31, 97, 61, 36,
    46, 37, 96, 80, 53, 51, 68, 90, 64, 81, 66, 67, 80, 37, 92, 67, 64, 31, 94, 45,
    80, 28, 76, 29, 64, 38, 48, 40, 29, 44, 81, 35, 51, 48, 67, 24, 46, 38, 76, 22,
    30, 67, 45, 41, 29, 41, 79, 21, 25, 90, 62, 34, 73, 50, 79, 66, 59, 42, 90, 79,
    70, 66, 80, 35, 62, 98, 97, 37, 32, 75, 91, 91, 48, 26, 23, 32, 100, 46, 29, 26,
    29, 26, 83, 82, 92, 95, 87, 63, 57, 100, 63, 65, 81, 46, 42, 95, 90, 80, 53, 27,
    84, 40, 22, 97, 20, 73, 63, 95, 46, 42, 47, 40, 26, 88, 49, 24, 92, 87, 68, 95,
    34, 82, 84, 43, 54, 73, 66, 32, 62, 48, 99, 90, 86, 28, 25, 25, 89, 67, 96, 35,
    33, 70, 40, 59, 32, 94, 34, 86, 35, 45, 25, 76, 80, 42, 91, 44, 91, 97, 60, 29,
    45, 37, 61, 54, 78, 56, 74, 74, 45, 21, 96, 37, 75, 100, 58, 84, 85, 56, 54, 71,
    52, 79, 43, 35, 27, 70, 31, 47, 35, 26, 30, 97, 90, 80, 58, 60, 73, 46, 71, 39,
    42, 98, 27, 21, 71, 71, 78, 76, 57, 24, 91, 84, 35, 25, 77, 96, 97, 89, 30, 86
  ];
  


    const fs = require('fs');


    function saveJSONToFile(data, filename = 'data.json') {
        const directory = 'attempts/';
        const jsonString = JSON.stringify(data, null, 2); // Преобразуем объект в строку JSON с форматированием

        fs.writeFile(directory + filename, jsonString, (err) => {
            if (err) {
                console.error('Ошибка при сохранении файла:', err);
            } else {
                console.log(`Файл успешно сохранен: ${filename}`);
            }
        });
    }



// Пример использования
// const items = [9, 9, 8, 5, 5, 5, 4, 2, 2, 1];
const items = dataArray;
const binSize = 150;
const iterations = 1000; // Количество запусков Hill Climbing

const result = multiStartHillClimbing(items, binSize, iterations);
console.log("Лучшее решение:", Math.min.apply(null, result));
console.log("Худшее решение:", Math.max.apply(null, result));
console.log("Количество контейнеров в лучшем решении:", result.length);


saveJSONToFile(result);
