import React from 'react';

const ViewToggle = ({ viewMode, setViewMode, isSorting }) => {
    return (
        <div className="view-toggle" style={{ marginBottom: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button
                className="btn-control"
                onClick={() => setViewMode('bars')}
                disabled={isSorting}
                style={{ 
                    background: viewMode === 'bars' ? '#3b82f6' : '#1e293b',
                    border: viewMode === 'bars' ? '1px solid #60a5fa' : '1px solid #334155',
                    color: 'white',
                    padding: '10px 20px',
                    cursor: 'pointer',
                    borderRadius: '8px'
                }}
            >
                <i className="fa-solid fa-chart-column"></i> Bars
            </button>

            <button
                className="btn-control"
                disabled={isSorting}
                style={{ 
                    background: viewMode === 'tree' ? '#3b82f6' : '#1e293b',
                    border: viewMode === 'tree' ? '1px solid #60a5fa' : '1px solid #334155',
                    color: 'white',
                    padding: '10px 20px',
                    cursor: 'pointer',
                    borderRadius: '8px'
                }}
                onClick={() => setViewMode('tree')}
            >
                <i className="fa-solid fa-sitemap"></i> Tree
            </button>
        </div>
    );
};

export default ViewToggle;