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
    viewMode,
    isPaused,
    togglePause 
}) => {
    return (
        <div className='controls'>
         <button 
    className='btn-control' 
    onClick={resetArray} 
    disabled={false} 
>
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
                        disabled={isSorting && !isPaused} 
                    />
                </div>
            </div>

            <div className="control-group">
                <select
                    className='algo-select'
                    value={selectedAlgo}
                    onChange={(e) => setSelectedAlgo(e.target.value)}
                    disabled={isSorting}
                >
                    {viewMode === 'bars' ? (
                        <>
                            <option value='bubble'>Bubble Sort</option>
                            <option value='selection'>Selection Sort</option>
                            <option value='insertion'>Insertion Sort</option>
                            <option value='merge'>Merge Sort</option>
                            <option value='quick'>Quick Sort</option>
                        </>
                    ) : (
                        <option value='heap'>Heap Sort</option>
                    )}
                </select>
            </div>

            <button 
                className='btn-primary-play' 
                onClick={isSorting ? togglePause : startSorting}
            >
                {isSorting ? (
                    isPaused ? (
                        <><i className='fa-solid fa-play'></i> Resume</>
                    ) : (
                        <><i className='fa-solid fa-pause'></i> Pause</>
                    )
                ) : (
                    <><i className='fa-solid fa-play'></i> Start</>
                )}
            </button>

            <button 
                className='btn-control' 
                onClick={() => window.location.reload()} 
                disabled={!isSorting}
            >
                <i className='fa-solid fa-refresh'></i> 
            </button>
        </div>
    );
};

export default Controls;