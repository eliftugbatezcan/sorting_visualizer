import Navbar from './components/navbar';
import SortingVisualizer from './components/SortingVisualizer';
import Features from './components/Features';
import Algorithms from './components/Algorithms';
import Footer from './components/Footer';

function App() {
    return (
        <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: 'white' }}>
            <Navbar />

            <div style={{ padding: '20px' }}>
                <h1 style={{ textAlign: 'center', margin: '20px 0' }}>
                    Explore Sorting, Instantly
                </h1>
                <h2 style={{ textAlign: 'center', margin: '20px 0', color: 'GrayText' }}>
                    Visualize algorithms in action
                </h2>

                <SortingVisualizer />
            </div>
            <Features />
            <Algorithms />
            <Footer />
        </div>
    );
}

export default App;
