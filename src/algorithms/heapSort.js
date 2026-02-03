import { handleStepControl } from '../utils/common';

const setColor = (bars, index, color) => {
    if (!bars || !bars[index]) return;
    const element = bars[index];
    
    if (element.style.backgroundColor === color || element.style.fill === color) return;

    element.style.backgroundColor = color; 
    element.style.fill = color;            
    
    if (color !== '#3b82f6' && color !== '#1e293b' && color !== '#10b981') {
        element.style.filter = `drop-shadow(0 0 5px ${color})`;
    } else {
        element.style.filter = 'none';
    }
};


const setEdgeColor = (parentIndex, childIndex, color, width = "2") => {
    
    const edge = document.getElementById(`edge-${parentIndex}-${childIndex}`);
    
    if (!edge) return;

    edge.style.stroke = color;
    edge.style.strokeWidth = width;
    
   
    if(width !== "2") {
        edge.style.filter = `drop-shadow(0 0 5px ${color})`;
    } else {
        edge.style.filter = 'none';
    }
};

const getDelay = (speed) => (101 - speed) * 15;



export const performHeapSort = async (array, speedRef, isPausedRef, isStoppedRef, setStats, startTime, setNarrator) => {
    try {
        let arr = [...array];
        let bars = document.getElementsByClassName('array-bar'); 
        if (bars.length === 0) bars = document.querySelectorAll('circle');

        let n = arr.length;
        let statsRef = { comparisons: 0, swaps: 0 };

        console.log("Heap Sort Başladı. Eleman:", n, "Görsel:", bars.length);

        if (bars.length === 0) {
            console.error("Görsel elemanlar bulunamadı!"); 
            return;
        }

        for(let i=0; i<bars.length; i++) setColor(bars, i, '#3b82f6');

        if(setNarrator) setNarrator("Max Heap Oluşturuluyor...");
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            await heapify(arr, n, i, bars, speedRef, isPausedRef, isStoppedRef, setStats, startTime, statsRef);
        }

        if(setNarrator) setNarrator("Sıralama Başlıyor...");
        for (let i = n - 1; i > 0; i--) {
            setColor(bars, 0, '#f97316'); 
            setColor(bars, i, '#f97316'); 
            
            await handleStepControl(speedRef, isPausedRef, isStoppedRef);

            statsRef.swaps++;
            let temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;

            updateVisuals(bars, 0, i, arr);

            setColor(bars, i, '#10b981'); 
            
            await heapify(arr, i, 0, bars, speedRef, isPausedRef, isStoppedRef, setStats, startTime, statsRef);
        }
        
        setColor(bars, 0, '#10b981');
        if(setNarrator) setNarrator("Bitti! 🎉");

    } catch (error) {
        console.error("Heap Sort Hatası:", error);
    }
};

async function heapify(arr, n, i, bars, speedRef, isPausedRef, isStoppedRef, setStats, startTime, statsRef) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    setStats({ ...statsRef, time: ((Date.now() - startTime) / 1000).toFixed(2) });

    if(i < bars.length && !isLocked(bars[i])) {
        setColor(bars, i, '#a855f7'); 
    }

    if (left < n) {
        if (!isLocked(bars[left])) {
            setColor(bars, left, '#fbbf24');
            setEdgeColor(i, left, '#fbbf24', '5');
        }
        
        await handleStepControl(speedRef, isPausedRef, isStoppedRef); 
        
        statsRef.comparisons++;
        if (arr[left] > arr[largest]) {
            largest = left;
        } 
        
        if (largest !== left) {
             if (!isLocked(bars[left])) {
                 setColor(bars, left, '#3b82f6');
                 setEdgeColor(i, left, '#475569', '2'); 
             }
        }
    }

    if (right < n) {
        if (!isLocked(bars[right])) {
            setColor(bars, right, '#fbbf24');
            setEdgeColor(i, right, '#fbbf24', '5');
        }

        await handleStepControl(speedRef, isPausedRef, isStoppedRef);

        statsRef.comparisons++;
        if (arr[right] > arr[largest]) {
            if (largest === left) {
                if (!isLocked(bars[left])) {
                    setColor(bars, left, '#3b82f6');
                    setEdgeColor(i, left, '#475569', '2');
                }
            }
            largest = right;
        } else {
             if (!isLocked(bars[right])) {
                 setColor(bars, right, '#3b82f6');
                 setEdgeColor(i, right, '#475569', '2');
             }
        }
    }

    if (largest !== i) {
        statsRef.swaps++;
        
        setEdgeColor(i, largest, '#f97316', '6'); 
        
        await handleStepControl(speedRef, isPausedRef, isStoppedRef);

        let swap = arr[i];
        arr[i] = arr[largest];
        arr[largest] = swap;

        updateVisuals(bars, i, largest, arr);
      
        setEdgeColor(i, largest, '#475569', '2');

        if (!isLocked(bars[i])) setColor(bars, i, '#3b82f6');

        await heapify(arr, n, largest, bars, speedRef, isPausedRef, isStoppedRef, setStats, startTime, statsRef);
    } else {
     
        if (left < n) setEdgeColor(i, left, '#475569', '2');
        if (right < n) setEdgeColor(i, right, '#475569', '2');
        
        if (i < bars.length && !isLocked(bars[i])) setColor(bars, i, '#3b82f6');
    }
}

function updateVisuals(bars, idx1, idx2, arr) {
    if (!bars[idx1] || !bars[idx2]) return;

    bars[idx1].style.height = `${arr[idx1]}px`;
    bars[idx2].style.height = `${arr[idx2]}px`;

    if (bars[idx1].tagName === 'circle' && bars[idx1].nextSibling) {
        bars[idx1].nextSibling.textContent = arr[idx1];
        bars[idx2].nextSibling.textContent = arr[idx2];
    }

    else if (bars[idx1].innerText !== undefined) {
         if(!isNaN(bars[idx1].innerText)) {
            bars[idx1].innerText = arr[idx1];
            bars[idx2].innerText = arr[idx2];
         }
    }
}

function isLocked(bar) {
    if (!bar) return false;
    return bar.style.backgroundColor === 'rgb(16, 185, 129)' || 
           bar.style.fill === 'rgb(16, 185, 129)' || 
           bar.style.backgroundColor === '#10b981';
}