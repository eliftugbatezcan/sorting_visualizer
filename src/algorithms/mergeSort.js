import { sleep } from '../utils/common';

export const performMergeSort = async (array, sortingSpeed, setStats, startTime) => {
    let arr = [...array];
    let bars = document.getElementsByClassName('array-bar');
    let statsRef = { comparisons: 0, swaps: 0 };

    await mergeSortHelper(
        arr,
        0,
        arr.length - 1,
        bars,
        statsRef,
        startTime,
        sortingSpeed,
        setStats
    );

    for (let k = 0; k < bars.length; k++) bars[k].style.backgroundColor = '#10b981';
};

const mergeSortHelper = async (
    arr,
    left,
    right,
    bars,
    statsRef,
    startTime,
    sortingSpeed,
    setStats
) => {
    if (left >= right) return;
    const middle = Math.floor((left + right) / 2);
    await mergeSortHelper(arr, left, middle, bars, statsRef, startTime, sortingSpeed, setStats);
    await mergeSortHelper(
        arr,
        middle + 1,
        right,
        bars,
        statsRef,
        startTime,
        sortingSpeed,
        setStats
    );
    await merge(arr, left, middle, right, bars, statsRef, startTime, sortingSpeed, setStats);
};

const merge = async (arr, low, mid, high, bars, statsRef, startTime, sortingSpeed, setStats) => {
    const leftArr = arr.slice(low, mid + 1);
    const rightArr = arr.slice(mid + 1, high + 1);
    let i = 0,
        j = 0,
        k = low;

    while (i < leftArr.length && j < rightArr.length) {
        bars[low + i].style.backgroundColor = 'red';
        bars[mid + 1 + j].style.backgroundColor = 'red';
        await sleep(100 - sortingSpeed);

        statsRef.comparisons++;
        setStats({ ...statsRef, time: ((Date.now() - startTime) / 1000).toFixed(2) });

        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            bars[k].style.height = `${arr[k]}px`;
            i++;
        } else {
            arr[k] = rightArr[j];
            bars[k].style.height = `${arr[k]}px`;
            j++;
        }
        bars[k].style.backgroundColor = 'orange';
        k++;
    }
    while (i < leftArr.length) {
        await sleep(100 - sortingSpeed);
        bars[low + i].style.backgroundColor = 'red';
        arr[k] = leftArr[i];
        bars[k].style.height = `${arr[k]}px`;
        bars[k].style.backgroundColor = 'orange';
        i++;
        k++;
    }
    while (j < rightArr.length) {
        await sleep(100 - sortingSpeed);
        bars[mid + 1 + j].style.backgroundColor = 'red';
        arr[k] = rightArr[j];
        bars[k].style.height = `${arr[k]}px`;
        bars[k].style.backgroundColor = 'orange';
        j++;
        k++;
    }
    for (let x = low; x <= high; x++) {
        bars[x].style.backgroundColor = '#3b82f6';
    }
};
