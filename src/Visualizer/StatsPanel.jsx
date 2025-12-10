import React from 'react';

const StatsPanel = ({ stats }) => {
    return (
        <div className='stats-container'>
            <div className='stat-box'>
                <span className='stat-label'>Comparisons</span>
                <span className='stat-value'>{stats.comparisons}</span>
            </div>
            <div className='stat-box'>
                <span className='stat-label'>Swaps</span>
                <span className='stat-value'>{stats.swaps}</span>
            </div>
            <div className='stat-box'>
                <span className='stat-label'>Time Elapsed</span>
                <span className='stat-value'>{stats.time}s</span>
            </div>
        </div>
    );
};

export default StatsPanel;
