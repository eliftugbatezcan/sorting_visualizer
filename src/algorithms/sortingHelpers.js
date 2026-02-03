import { handleStepControl } from '../utils/common';

export const performSelectionSort = async (array, speedRef, isPausedRef, isStoppedRef, setStats, startTime) => {
    const arr = [...array];
    const bars = document.getElementsByClassName('array-bar');
    let compCount = 0;
    let swapCount = 0;

    for (let i = 0; i < arr.length; i++) {
        let minIndex = i;
        bars[minIndex].style.backgroundColor = 'red';
        for (let j = i + 1; j < arr.length; j++) {
            bars[j].style.backgroundColor = 'red';
            await handleStepControl(speedRef, isPausedRef, isStoppedRef);
            compCount++;
            setStats({
                comparisons: compCount,
                swaps: swapCount,
                time: ((Date.now() - startTime) / 1000).toFixed(2),
            });

            if (arr[j] < arr[minIndex]) {
                if (minIndex !== i) bars[minIndex].style.backgroundColor = '#3b82f6';
                minIndex = j;
            } else {
                bars[j].style.backgroundColor = '#3b82f6';
            }
        }
        if (minIndex !== i) {
            swapCount++;
            let temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
            bars[i].style.height = `${arr[i]}px`;
            bars[minIndex].style.height = `${arr[minIndex]}px`;
            bars[minIndex].style.backgroundColor = '#3b82f6';
        }
        bars[i].style.backgroundColor = '#10b981';
    }
};

export const performInsertionSort = async (array, speedRef, isPausedRef, isStoppedRef, setStats, startTime) => {
    const arr = [...array];
    const bars = document.getElementsByClassName('array-bar');
    let compCount = 0;
    let swapCount = 0;

    for (let i = 1; i < arr.length; i++) {
        let j = i;
        bars[i].style.backgroundColor = 'orange';
        while (j > 0 && arr[j] < arr[j - 1]) {
            compCount++;
            swapCount++;
            bars[j].style.backgroundColor = 'red';
            bars[j - 1].style.backgroundColor = 'red';
            await handleStepControl(speedRef, isPausedRef, isStoppedRef);

            let temp = arr[j];
            arr[j] = arr[j - 1];
            arr[j - 1] = temp;
            bars[j].style.height = `${arr[j]}px`;
            bars[j - 1].style.height = `${arr[j - 1]}px`;

            setStats({
                comparisons: compCount,
                swaps: swapCount,
                time: ((Date.now() - startTime) / 1000).toFixed(2),
            });

            bars[j].style.backgroundColor = '#3b82f6';
            if (j - 1 !== i) bars[j - 1].style.backgroundColor = '#3b82f6';
            j--;
        }
        compCount++;
        bars[i].style.backgroundColor = '#3b82f6';
    }
    for (let k = 0; k < bars.length; k++) bars[k].style.backgroundColor = '#10b981';
};
