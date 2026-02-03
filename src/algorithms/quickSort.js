import { handleStepControl } from '../utils/common';

export const performQuickSort = async (array, speedRef, isPausedRef, isStoppedRef, setStats, startTime) => {
    let arr = [...array];
    let bars = document.getElementsByClassName('array-bar');
    let statsRef = { comparisons: 0, swaps: 0 };

    await quickSortHelper(arr, 0, arr.length - 1, bars, statsRef, startTime, speedRef, isPausedRef, isStoppedRef, setStats);

    for (let k = 0; k < bars.length; k++) bars[k].style.backgroundColor = '#10b981';
};

const quickSortHelper = async (arr, low, high, bars, statsRef, startTime, speedRef, isPausedRef, isStoppedRef, setStats) => {
    if (low < high) {
        let pi = await partition(arr, low, high, bars, statsRef, startTime, speedRef, isPausedRef, isStoppedRef, setStats);

        await quickSortHelper(arr, low, pi - 1, bars, statsRef, startTime, speedRef, isPausedRef, isStoppedRef, setStats);

        await quickSortHelper(arr, pi + 1, high, bars, statsRef, startTime, speedRef, isPausedRef, isStoppedRef, setStats);
    }
};

const partition = async (arr, low, high, bars, statsRef, startTime, speedRef, isPausedRef, isStoppedRef, setStats) => {
    let pivot = arr[high];
    
    bars[high].style.backgroundColor = 'purple';
    
    let i = low - 1;

    for (let j = low; j < high; j++) {
        bars[j].style.backgroundColor = 'red';
        
        await handleStepControl(speedRef, isPausedRef, isStoppedRef);

        statsRef.comparisons++;
        setStats({ ...statsRef, time: ((Date.now() - startTime) / 1000).toFixed(2) });

        if (arr[j] < pivot) {
            i++;
            statsRef.swaps++;
            
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;

            bars[i].style.height = `${arr[i]}px`;
            bars[j].style.height = `${arr[j]}px`;

            bars[i].style.backgroundColor = 'orange';
            if (i !== j) bars[j].style.backgroundColor = 'orange';

            await handleStepControl(speedRef, isPausedRef, isStoppedRef);
            
            bars[i].style.backgroundColor = '#3b82f6';
        }
        
        bars[j].style.backgroundColor = '#3b82f6';
    }

    statsRef.swaps++;
    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    bars[i + 1].style.height = `${arr[i + 1]}px`;
    bars[high].style.height = `${arr[high]}px`;
    
    bars[high].style.backgroundColor = '#3b82f6';
    
    bars[i + 1].style.backgroundColor = '#3b82f6';

    return i + 1;
};