import React, { useState, useEffect } from 'react';
import './SortingVisualizer.css';

// 1. Componentleri çağırıyoruz
import ArrayBars from './ArrayBars';
import StatsPanel from './StatsPanel';
import Controls from './Controls';
import AlgoInfo from './AlgoInfo';

// 2. Yardımcıları çağırıyoruz (utils)
import { randomIntFromInterval } from '../utils/mathUtils'; // mathUtils'e taşıdık

// 3. Algoritmaları çağırıyoruz (algorithms)
import { performBubbleSort } from '../algorithms/bubbleSort';
import { performMergeSort } from '../algorithms/mergeSort';
import { performQuickSort } from '../algorithms/quickSort';
import { performSelectionSort, performInsertionSort } from '../algorithms/sortingHelpers';

const SortingVisualizer = () => {
    // --- STATE TANIMLARI ---
    const [array, setArray] = useState([]);
    const [selectedAlgo, setSelectedAlgo] = useState('bubble');
    const [arraySize, setArraySize] = useState(50);
    const [sortingSpeed, setSortingSpeed] = useState(10);
    const [isSorting, setIsSorting] = useState(false);
    const [stats, setStats] = useState({ comparisons: 0, swaps: 0, time: 0 });

    useEffect(() => {
        resetArray();
    }, []);

    // --- RESETLEME VE BOYUT AYARI ---
    const resetArray = () => {
        if (isSorting) return;
        const newArray = [];
        for (let i = 0; i < arraySize; i++) {
            newArray.push(randomIntFromInterval(10, 300));
        }
        setArray(newArray);

        const bars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < bars.length; i++) {
            if (bars[i]) bars[i].style.backgroundColor = '#3b82f6';
        }
        setStats({ comparisons: 0, swaps: 0, time: 0 });
    };

    const handleSizeChange = (e) => {
        const newSize = parseInt(e.target.value);
        setArraySize(newSize);
        const newArray = [];
        for (let i = 0; i < newSize; i++) {
            newArray.push(randomIntFromInterval(10, 300));
        }
        setArray(newArray);
        const bars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < bars.length; i++) {
            if (bars[i]) bars[i].style.backgroundColor = '#3b82f6';
        }
        setStats({ comparisons: 0, swaps: 0, time: 0 });
    };

    // --- BAŞLATMA ---
    const startSorting = async () => {
        if (isSorting) return;
        setIsSorting(true);
        const startTime = Date.now();
        setStats({ comparisons: 0, swaps: 0, time: 0 });

        switch (selectedAlgo) {
            case 'bubble':
                await performBubbleSort(array, sortingSpeed, setStats, startTime);
                break;
            case 'selection':
                await performSelectionSort(array, sortingSpeed, setStats, startTime);
                break;
            case 'insertion':
                await performInsertionSort(array, sortingSpeed, setStats, startTime);
                break;
            case 'merge':
                await performMergeSort(array, sortingSpeed, setStats, startTime);
                break;
            case 'quick':
                await performQuickSort(array, sortingSpeed, setStats, startTime);
                break;
            default:
                await performBubbleSort(array, sortingSpeed, setStats, startTime);
        }
        setIsSorting(false);
    };

    return (
        <div className='visualizer-container'>
            <ArrayBars array={array} arraySize={arraySize} />
            <StatsPanel stats={stats} />
            <Controls
                resetArray={resetArray}
                arraySize={arraySize}
                handleSizeChange={handleSizeChange}
                sortingSpeed={sortingSpeed}
                setSortingSpeed={setSortingSpeed}
                selectedAlgo={selectedAlgo}
                setSelectedAlgo={setSelectedAlgo}
                startSorting={startSorting}
                isSorting={isSorting}
            />
            <AlgoInfo selectedAlgo={selectedAlgo} />
        </div>
    );
};

export default SortingVisualizer;
