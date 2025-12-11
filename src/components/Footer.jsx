import React from 'react';
import './Footer.css';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

        document.documentElement.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

        document.body.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className='footer-container'>
            <div className='cta-box'>
                <h2>Ready to Dive In?</h2>
                <p>
                    Start exploring the fascinating world of algorithms today. It's free and
                    requires no sign-up.
                </p>

                <button className='btn-primary' onClick={scrollToTop}>
                    Launch the Visualizer
                </button>
            </div>

            <footer className='copyright-text'>
                <p>&copy; 2025 Sorting Visualizer. All rights reserved. Built by tugba.</p>
            </footer>
        </div>
    );
};

export default Footer;
