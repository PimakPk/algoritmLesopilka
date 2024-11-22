// Улучшенная версия алгоритма Hill Climbing
function improvedHillClimbing(items, binCapacity, maxIterations = 1000) {
    let currentSolution = createInitialSolution(items, binCapacity);
    let currentObjective = objectiveFunction(currentSolution);

    for (let i = 0; i < maxIterations; i++) {
        const neighbors = [];
        
        // Генерируем несколько соседних решений
        for (let j = 0; j < 5; j++) {
            const neighbor = getNeighbor(currentSolution, items, binCapacity);
            neighbors.push(neighbor);
        }

        // Находим наилучшее среди соседей
        let bestNeighbor = currentSolution;
        let bestNeighborObjective = currentObjective;

        for (const neighbor of neighbors) {
            const neighborObjective = objectiveFunction(neighbor);
            if (neighborObjective < bestNeighborObjective) {
                bestNeighbor = neighbor;
                bestNeighborObjective = neighborObjective;
            }
        }

        // Если лучшее соседнее решение лучше текущего, переходим к нему
        if (bestNeighborObjective < currentObjective) {
            currentSolution = bestNeighbor;
            currentObjective = bestNeighborObjective;
        } else {
            // Если улучшений нет, заканчиваем поиск
            break;
        }
    }

    return { solution: currentSolution, binsUsed: currentObjective };
}

// Запуск эксперимента с улучшенным Hill Climbing
function runImprovedExperiment() {
    const numItems = 10;       // Количество элементов
    const maxSize = 10;       // Максимальный размер элемента
    const binCapacity = 10;   // Вместимость одного контейнера
    const numStarts = 20;      // Количество запусков Hill Climbing

    const items = [6, 5, 3, 2, 2, 1.5].sort().reverse();
    console.log("Items: " + items);
    console.log('Length: ' + items.length);

    const results = [];
    for (let i = 0; i < numStarts; i++) {
        const result = improvedHillClimbing(items, binCapacity);
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

// Запуск улучшенного эксперимента
runImprovedExperiment();
