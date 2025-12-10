import React from 'react';

const Controls = ({
    resetArray,
    arraySize,
    handleSizeChange,
    sortingSpeed,
    setSortingSpeed,
    selectedAlgo,
    setSelectedAlgo,
    startSorting,
    isSorting,
}) => {
    return (
        <div className='controls'>
            <button className='btn-control' onClick={resetArray} disabled={isSorting}>
                <i className='fa-solid fa-shuffle'></i> Reset
            </button>

            <div className='slider-group'>
                <div className='slider-item'>
                    <label>Size: {arraySize}</label>
                    <input
                        type='range'
                        min='5'
                        max='100'
                        value={arraySize}
                        onChange={handleSizeChange}
                        disabled={isSorting}
                    />
                </div>
                <div className='slider-item'>
                    <label>Speed</label>
                    <input
                        type='range'
                        min='1'
                        max='99'
                        value={sortingSpeed}
                        onChange={(e) => setSortingSpeed(e.target.value)}
                        disabled={isSorting}
                    />
                </div>
            </div>

            <select
                className='algo-select'
                value={selectedAlgo}
                onChange={(e) => setSelectedAlgo(e.target.value)}
                disabled={isSorting}>
                <option value='bubble'>Bubble Sort</option>
                <option value='selection'>Selection Sort</option>
                <option value='insertion'>Insertion Sort</option>
                <option value='merge'>Merge Sort</option>
                <option value='quick'>Quick Sort</option>
            </select>

            <button className='btn-primary-play' onClick={startSorting} disabled={isSorting}>
                {isSorting ? (
                    <i className='fa-solid fa-spinner fa-spin'></i>
                ) : (
                    <i className='fa-solid fa-play'></i>
                )}
                {isSorting ? ' Working...' : ' Start'}
            </button>
        </div>
    );
};

export default Controls;
