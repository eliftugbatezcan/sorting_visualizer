import React from 'react';

const AlgoInfo = ({ selectedAlgo }) => {
    const algoInfo = {
        bubble: {
            title: 'Bubble Sort',
            complexity: 'O(n²)',
            desc: 'A simple comparison-based algorithm. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. It is inefficient on large datasets.',
        },
        selection: {
            title: 'Selection Sort',
            complexity: 'O(n²)',
            desc: 'It works by repeatedly finding the minimum element from the unsorted part and putting it at the beginning. It maintains two subarrays: one that is already sorted and one that is remaining to be sorted.',
        },
        insertion: {
            title: 'Insertion Sort',
            complexity: 'O(n²)',
            desc: 'Builds the final sorted array one item at a time. It works similarly to the way you sort playing cards in your hands: taking an element and inserting it into its correct position among the already sorted cards.',
        },
        merge: {
            title: 'Merge Sort',
            complexity: 'O(n log n)',
            desc: "A 'Divide and Conquer' algorithm. It divides the input array into two halves, recursively sorts them, and then merges the two sorted halves. It is highly efficient and stable for large datasets.",
        },
        quick: {
            title: 'Quick Sort',
            complexity: 'O(n log n)',
            desc: "An efficient algorithm that selects a 'pivot' element and partitions the array around it (smaller elements to the left, larger to the right). It is one of the fastest sorting algorithms in practice.",
        },
        heap: {
            title: 'Heap Sort',
            complexity: 'O(n log n)',
            desc: 'A comparison-based sorting technique based on a binary heap data structure. It builds a max heap from the input data and repeatedly extracts the maximum element to build the sorted array. It is efficient and has a good worst-case performance.',
        },
    };

    const info = algoInfo[selectedAlgo] || algoInfo['bubble'];

    return (
        <div className='algo-info-panel'>
            <div className='algo-info-header'>
                <h3>{info.title}</h3>
                <span className='complexity-badge'>Time: {info.complexity}</span>
            </div>
            <p className='algo-desc'>{info.desc}</p>
        </div>
    );
};

export default AlgoInfo;
