import React, { useState, useEffect, useRef } from 'react';
import './SortingVisualizer.css';

import ArrayBars from './ArrayBars';
import StatsPanel from './StatsPanel';
import Controls from './Controls';
import AlgoInfo from './AlgoInfo';
import TreeGraph from './TreeGraph'; 

import { randomIntFromInterval } from '../../utils/mathUtils.js';
import { wrapSortingAlgorithm } from '../../utils/common'; // Yeni sarmalayıcı
import { performBubbleSort } from '../../algorithms/bubbleSort';
import { performMergeSort } from '../../algorithms/mergeSort';
import { performQuickSort } from '../../algorithms/quickSort';
import { performSelectionSort, performInsertionSort } from '../../algorithms/sortingHelpers';
import { performHeapSort } from '../../algorithms/heapSort'; 

const SortingVisualizer = () => {
    const [array, setArray] = useState([]);
    const [selectedAlgo, setSelectedAlgo] = useState('bubble');
    const [arraySize, setArraySize] = useState(50);
    const [sortingSpeed, setSortingSpeed] = useState(10);
    const [isSorting, setIsSorting] = useState(false);
    const [stats, setStats] = useState({ comparisons: 0, swaps: 0, time: 0 });
    const [viewMode, setViewMode] = useState('bars');

    const [isPaused, setIsPaused] = useState(false);
    const isPausedRef = useRef(false); 
    const speedRef = useRef(10); 
    const isStoppedRef = useRef(false); 

    useEffect(() => {
        speedRef.current = sortingSpeed;
    }, [sortingSpeed]);

    useEffect(() => {
        resetArray();
    }, []);

    useEffect(() => {
        if (viewMode === 'tree') {
            setSelectedAlgo('heap');
            if (arraySize > 31) {
                setArraySize(15);
                resetArray();
            }
        }
    }, [viewMode]);

    const resetArray = () => {
        isStoppedRef.current = true;
        isPausedRef.current = false;
        setIsSorting(false);
        setIsPaused(false);
        

        setStats({ 
            comparisons: 0, 
            swaps: 0, 
            time: 0 
        });

        const newArray = [];
        const currentSize = (viewMode === 'tree' && arraySize > 31) ? 31 : arraySize;
        for (let i = 0; i < currentSize; i++) {
            newArray.push(randomIntFromInterval(10, 300));
        }
        setArray(newArray);
       

        const bars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < bars.length; i++) {
            if (bars[i]) bars[i].style.backgroundColor = '#3b82f6';
        }

        setTimeout(() => {
            isStoppedRef.current = false;
        }, 100);
    };

    const handleSizeChange = (e) => {
        if (isSorting) return;
        const newSize = parseInt(e.target.value);
        setArraySize(newSize);
        resetArray();
    };

    const togglePause = () => {
        if (!isSorting) return;
        isPausedRef.current = !isPausedRef.current;
        setIsPaused(isPausedRef.current);
    };

    const startSorting = async () => {
        if (isSorting && !isPausedRef.current) return;
        
        if (isSorting && isPausedRef.current) {
            togglePause();
            return;
        }

        setIsSorting(true);
        setIsPaused(false);
        isPausedRef.current = false;
        isStoppedRef.current = false;
        
        const startTime = Date.now();
        setStats({ comparisons: 0, swaps: 0, time: 0 });

        const params = [array, speedRef, isPausedRef, isStoppedRef, setStats, startTime];

        switch (selectedAlgo) {
            case 'bubble': 
                await wrapSortingAlgorithm(performBubbleSort, ...params); 
                break;
            case 'selection': 
                await wrapSortingAlgorithm(performSelectionSort, ...params); 
                break;
            case 'insertion': 
                await wrapSortingAlgorithm(performInsertionSort, ...params); 
                break;
            case 'merge': 
                await wrapSortingAlgorithm(performMergeSort, ...params); 
                break;
            case 'quick': 
                await wrapSortingAlgorithm(performQuickSort, ...params); 
                break;
            case 'heap': 
                await wrapSortingAlgorithm(performHeapSort, ...params, null); 
                break;
            default: 
                await wrapSortingAlgorithm(performBubbleSort, ...params); 
                break;
        }

        setIsSorting(false);
    };

    return (
        <div className='visualizer-container'>
            <div className='visualizer-display' style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                {viewMode === 'bars' ? (
                    <ArrayBars array={array} arraySize={arraySize} />
                ) : (
                    <TreeGraph array={array} />
                )}
            </div>

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
                viewMode={viewMode}
                isPaused={isPaused}
                togglePause={togglePause}
            />

            <AlgoInfo selectedAlgo={selectedAlgo} />
        </div>
    );
};

export default SortingVisualizer;