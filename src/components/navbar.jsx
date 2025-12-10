// src/components/Navbar.jsx
import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className='navbar'>
            <div className='logo'>
                <i className='fa-solid fa-chart-column'></i>
                <span style={{ color: 'white' }}>Sorting Visualizer</span>
            </div>
            <button className='btn-primary' onClick={() => window.location.reload()}>
                Launch Visualizer
            </button>
        </nav>
    );
};

export default Navbar;
