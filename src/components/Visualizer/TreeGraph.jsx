import React from 'react';

const TreeGraph = ({ array }) => {
    const levels = Math.floor(Math.log2(array.length)) + 1;
    const canvasWidth = 1000; 
    const canvasHeight = 500; 
    const nodeRadius = 18;    
    const verticalGap = 80;   

    const getPosition = (index) => {
        const level = Math.floor(Math.log2(index + 1)); 
        const maxNodesInLevel = Math.pow(2, level);     
        const positionInLevel = index - maxNodesInLevel + 1; 
        
        const sectionWidth = canvasWidth / maxNodesInLevel;
        const x = (positionInLevel * sectionWidth) + (sectionWidth / 2);
        
        const y = (level * verticalGap) + 50;

        return { x, y };
    };

    return (
        <div className="tree-container" style={{ display: 'flex', justifyContent: 'center', overflow: 'auto' }}>
            <svg width={canvasWidth} height={canvasHeight} style={{ overflow: 'visible' }}>
                {array.map((value, i) => {
                    const leftChildIdx = 2 * i + 1;
                    const rightChildIdx = 2 * i + 2;
                    const { x, y } = getPosition(i);

                    const lines = [];
if (leftChildIdx < array.length) {
    const childPos = getPosition(leftChildIdx);
    lines.push(
        <line 
            key={`line-left-${i}`} 
            id={`edge-${i}-${leftChildIdx}`} 
            x1={x} y1={y} x2={childPos.x} y2={childPos.y} 
            stroke="#475569" strokeWidth="2" 
        />
    );
}
if (rightChildIdx < array.length) {
    const childPos = getPosition(rightChildIdx);
    lines.push(
        <line 
            key={`line-right-${i}`} 
            id={`edge-${i}-${rightChildIdx}`}
            x1={x} y1={y} x2={childPos.x} y2={childPos.y} 
            stroke="#475569" strokeWidth="2" 
        />
    );
}
                    return lines;
                })}

                {array.map((value, i) => {
                    const { x, y } = getPosition(i);
                    return (
                        <g key={`node-${i}`}>
                            <circle 
                                cx={x} 
                                cy={y} 
                                r={nodeRadius} 
                                className="array-bar tree-node" 
                                fill="#3b82f6"
                                stroke="#1e293b"
                                strokeWidth="2"
                            />
                            <text x={x} y={y + 5} textAnchor="middle" fill="white" fontSize="12px" fontWeight="bold">
                                {value}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
};

export default TreeGraph;