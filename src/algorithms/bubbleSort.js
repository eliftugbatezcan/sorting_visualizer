import { sleep } from '../utils/common';

export const performBubbleSort = async (array, sortingSpeed, setStats, startTime) => {
    const arr = [...array];
    const bars = document.getElementsByClassName('array-bar');
    let compCount = 0;
    let swapCount = 0;

    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            bars[j].style.backgroundColor = 'red';
            bars[j + 1].style.backgroundColor = 'red';

            await sleep(100 - sortingSpeed);
            compCount++;

            if (arr[j] > arr[j + 1]) {
                swapCount++;
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                bars[j].style.height = `${arr[j]}px`;
                bars[j + 1].style.height = `${arr[j + 1]}px`;
            }

            setStats({
                comparisons: compCount,
                swaps: swapCount,
                time: ((Date.now() - startTime) / 1000).toFixed(2),
            });

            bars[j].style.backgroundColor = '#3b82f6';
            bars[j + 1].style.backgroundColor = '#3b82f6';
        }
        bars[arr.length - i - 1].style.backgroundColor = '#10b981';
    }
    bars[0].style.backgroundColor = '#10b981';
};
