// Функция для генерации случайного набора данных
function generateItems(n, maxSize) {
    return Array.from({ length: n }, () => Math.floor(Math.random() * maxSize) + 1);
}

// Целевая функция — количество используемых контейнеров
function objectiveFunction(solution) {
    const usedBins = new Set(solution);
    return usedBins.size;
}

// Создание начального случайного решения
function createInitialSolution(items, binCapacity) {
    const solution = [];
    const bins = [];

    for (const item of items) {
        let placed = false;
        // console.log(item);
        // Пытаемся добавить элемент в один из существующих контейнеров
        for (let i = 0; i < bins.length; i++) {
            if (bins[i] + item <= binCapacity) {
                bins[i] += item;
                solution.push(i);
                placed = true;
                break;
            }
        }

        // Если не удалось, создаем новый контейнер
        if (!placed) {
            bins.push(item);
            solution.push(bins.length - 1);
        }
    }
    // console.log('BIN\n');
    // console.log(bins);
    // console.log("\n");
    
    // console.log('SOLUTION\n');
    // console.log(solution);
    // console.log("\n");
    return solution;
}

// Функция для генерации соседнего решения
function getNeighbor(solution, items, binCapacity) {
    const newSolution = solution.slice();
    const itemIndex = Math.floor(Math.random() * items.length);
    // console.log('itemIndex: ' + itemIndex);

    // Перемещаем случайный элемент в другой случайный контейнер
    const newBin = Math.floor(Math.random() * (Math.max(...newSolution)));
    // console.log('newBin: ' + newBin);
    newSolution[itemIndex] = newBin;

    // Проверяем, что новое решение допустимо
    if (isValidSolution(newSolution, items, binCapacity)) {
        return newSolution;
    }

    return solution; // Если недопустимо, возвращаем исходное решение
}

// Проверка допустимости решения
function isValidSolution(solution, items, binCapacity) {
    const binLoads = {};
    for (let i = 0; i < items.length; i++) {
        const bin = solution[i];
        if (!binLoads[bin]) binLoads[bin] = 0;
        binLoads[bin] += items[i];

        if (binLoads[bin] > binCapacity) {
            return false;
        }
    }
    return true;
}

// Hill Climbing алгоритм
function hillClimbing(items, binCapacity, maxIterations = 1000) {
    let currentSolution = createInitialSolution(items, binCapacity);
    let currentObjective = objectiveFunction(currentSolution);

    for (let i = 0; i < maxIterations; i++) {
        const neighbor = getNeighbor(currentSolution, items, binCapacity);
        const neighborObjective = objectiveFunction(neighbor);

        if (neighborObjective < currentObjective) {
            currentSolution = neighbor;
            currentObjective = neighborObjective;
        }
    }

    return { solution: currentSolution, binsUsed: currentObjective };
}

// Мультистартовая версия Hill Climbing
function multiStartHillClimbing(items, binCapacity, numStarts = 100) {
    const results = [];
    for (let i = 0; i < numStarts; i++) {
        const result = hillClimbing(items, binCapacity);
        results.push(result.binsUsed);
    }
    return results;
}

// Основная функция для запуска
function runExperiment() {
    const numItems = 10;       // Количество элементов
    const maxSize = 10;       // Максимальный размер элемента
    const binCapacity = 150;   // Вместимость одного контейнера
    const numStarts = 20;      // Количество запусков Hill Climbing

    // const items = [6,5,3,2,2,1.5].sort().reverse();
    const items = dataArray.sort().reverse();
    // const items = generateItems(numItems, maxSize);
    console.log("Items: " + items);
    console.log('Length: ' + items.length);

    const results = multiStartHillClimbing(items, binCapacity, numStarts);

    // Анализ результатов
    const bestSolution = Math.min(...results);
    const worstSolution = Math.max(...results);
    const difference = worstSolution - bestSolution;

    console.log("Результаты:", results);
    console.log("Лучшее решение:", bestSolution);
    console.log("Худшее решение:", worstSolution);
    console.log("Разница между лучшим и худшим:", difference);

    // Построение гистограммы и графика сходимости (с помощью внешних библиотек, таких как Chart.js)
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


// Запуск эксперимента
// runExperiment();


// Создание начального решения, где каждый элемент находится в отдельном контейнере
function createZeroInitialSolution(items) {
    const solution = items.map((_, index) => index); // Каждый элемент в своем отдельном контейнере
    return solution;
}


// Hill Climbing алгоритм с новым начальным решением
function hillClimbingWithZeroInitial(items, binCapacity, maxIterations = 10000) {
    let currentSolution = createZeroInitialSolution(items);
    let currentObjective = objectiveFunction(currentSolution);

    for (let i = 0; i < maxIterations; i++) {
        const neighbor = getNeighbor(currentSolution, items, binCapacity);
        const neighborObjective = objectiveFunction(neighbor);

        if (neighborObjective < currentObjective) {
            currentSolution = neighbor;
            currentObjective = neighborObjective;
        }
    }

    return { solution: currentSolution, binsUsed: currentObjective };
}

// Запуск эксперимента с начальным решением, заполненным нулями
function runExperimentWithZeroInitial() {
    const numItems = 250;        // Количество элементов
    const binCapacity = 150;    // Вместимость одного контейнера
    const numStarts = 200;      // Количество запусков Hill Climbing

    const items = dataArray.sort().reverse();
    // const items = [6, 5, 3, 2, 2, 1.5].sort().reverse(); // Задаем набор элементов
    console.log("Items: " + items);
    console.log('Length: ' + items.length);

    const results = [];
    for (let i = 0; i < numStarts; i++) {
        const result = hillClimbingWithZeroInitial(items, binCapacity);
        results.push(result.binsUsed);
    }

    // Анализ результатов
    const bestSolution = Math.min(...results);
    const worstSolution = Math.max(...results);
    const difference = worstSolution - bestSolution;

    console.log("Результаты:", results);
    console.log("Лучшее решение:", bestSolution);
    console.log("Худшее решение:", worstSolution);
    console.log("Разница между лучшим и худшим:", difference);
}

// Запуск эксперимента
runExperimentWithZeroInitial();
