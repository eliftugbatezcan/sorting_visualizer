import React from 'react';

const ArrayBars = ({ array, arraySize }) => {
    return (
        <div className='array-container'>
            {array.map((value, idx) => (
                <div
                    className='array-bar'
                    key={idx}
                    style={{
                        height: `${value}px`,
                        width: `${600 / arraySize}px`,
                    }}></div>
            ))}
        </div>
    );
};

export default ArrayBars;
