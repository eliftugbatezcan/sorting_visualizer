import React from 'react';
import './Algorithms.css';
import bubbleImg from '../assets/bubble.png';
import selectionImg from '../assets/selection.png';
import insertionImg from '../assets/insertion.png';
import mergeImg from '../assets/merge.png';
import quickImg from '../assets/quick.png';
import heapImg from '../assets/heap.png';

const Algorithms = () => {
    const algoList = [
        {
            title: 'Bubble Sort',
            desc: 'A simple comparison-based algorithm.',
            image: bubbleImg,
        },
        {
            title: 'Selection Sort',
            desc: 'An in-place comparison sorting algorithm.',
            image: selectionImg,
        },
        {
            title: 'Merge Sort',
            desc: 'An efficient, comparison-based, divide and conquer sorting algorithm.',
            image: mergeImg,
        },
        {
            title: 'Quick Sort',
            desc: 'An efficient sorting algorithm, systematic method for placing elements.',
            image: quickImg,
        },
        {
            title: 'Heap Sort',
            desc: 'A comparison-based technique based on a Binary Heap data structure.',
            image: heapImg,
        },
        {
            title: 'Insertion Sort',
            desc: 'A simple algorithm that builds the final sorted array one item at a time.',
            image: insertionImg,
        },
    ];

    return (
        <div className='algo-section'>
            <h2 className='algo-title'>Explore Classic Algorithms</h2>

            <div className='algo-grid'>
                {algoList.map((algo, index) => (
                    <div className='algo-card' key={index}>
                        <img src={algo.image} alt={algo.title} className='algo-thumb' />

                        <div className='algo-info'>
                            <h3>{algo.title}</h3>
                            <p>{algo.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Algorithms;
