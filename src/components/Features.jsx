// src/components/Features.jsx
import React from 'react';
import './Features.css';

const Features = () => {
    return (
        <div className='features-container'>
            <h2 className='section-title'>Simple, Fast, and Intuitive</h2>

            <div className='features-grid'>
                {/* KART 1 */}
                <div className='feature-card'>
                    <div className='icon-box'>
                        <i className='fa-solid fa-list'></i>
                    </div>
                    <h3>Choose an Algorithm</h3>
                    <p>Select from a variety of classic sorting algorithms.</p>
                </div>

                {/* KART 2 */}
                <div className='feature-card'>
                    <div className='icon-box'>
                        <i className='fa-solid fa-shuffle'></i>
                    </div>
                    <h3>Adjust Your Data</h3>
                    <p>Generate a random dataset or input your own.</p>
                </div>

                {/* KART 3 */}
                <div className='feature-card'>
                    <div className='icon-box'>
                        <i className='fa-solid fa-play'></i>
                    </div>
                    <h3>Press Play & Learn</h3>
                    <p>Watch the sorting process unfold with detailed, step-by-step animations.</p>
                </div>
            </div>
        </div>
    );
};

export default Features;
