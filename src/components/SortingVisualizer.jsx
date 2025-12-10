import React, { useState, useEffect } from 'react';
import './SortingVisualizer.css';

const SortingVisualizer = () => {
    // --- STATE TANIMLARI ---
    const [array, setArray] = useState([]);
    const [selectedAlgo, setSelectedAlgo] = useState('bubble');

    // YENİ: Başlangıç ayarları (Boyut: 50, Hız: 10ms)
    const [arraySize, setArraySize] = useState(50);
    const [sortingSpeed, setSortingSpeed] = useState(10);
    const [isSorting, setIsSorting] = useState(false); // Sıralama sırasında butonları kilitlemek için

    useEffect(() => {
        resetArray();
    }, []);

    // --- YARDIMCI FONKSİYONLAR ---

    const randomIntFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    // Bekleme süresi artık dinamik (sortingSpeed state'inden geliyor)
    const sleep = (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };

    // Diziyi Yenile (Boyuta göre)
    const resetArray = () => {
        if (isSorting) return; // Sıralama yaparken resetlenemesin
        const newArray = [];
        for (let i = 0; i < arraySize; i++) {
            newArray.push(randomIntFromInterval(10, 300));
        }
        setArray(newArray);

        // Renkleri temizle
        const bars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < bars.length; i++) {
            if (bars[i]) bars[i].style.backgroundColor = '#3b82f6';
        }
    };

    // Slider değişince çalışacak özel fonksiyon
    const handleSizeChange = (e) => {
        const newSize = parseInt(e.target.value);
        setArraySize(newSize);
        // Slider oynadıkça anlık olarak diziyi yenile (Daha akıcı hissettirir)
        // Burada resetArray'i çağırmak yerine direkt state'i kullanarak yeni dizi üretiyoruz
        const newArray = [];
        for (let i = 0; i < newSize; i++) {
            newArray.push(randomIntFromInterval(10, 300));
        }
        setArray(newArray);
        // Renkleri düzelt
        const bars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < bars.length; i++) {
            if (bars[i]) bars[i].style.backgroundColor = '#3b82f6';
        }
    };

    // --- BAŞLATMA MANTIĞI ---
    const startSorting = async () => {
        if (isSorting) return; // Zaten çalışıyorsa tekrar basılmasın
        setIsSorting(true); // Kilidi aç

        switch (selectedAlgo) {
            case 'bubble':
                await bubbleSort();
                break;
            case 'selection':
                await selectionSort();
                break;
            case 'insertion':
                await insertionSort();
                break;
            case 'merge':
                alert('Merge Sort yakında!');
                break;
            case 'quick':
                alert('Quick Sort yakında!');
                break;
            default:
                await bubbleSort();
        }
        setIsSorting(false); // İşlem bitince kilidi kapat
    };

    // --- ALGORİTMALAR ---

    // Bubble Sort
    const bubbleSort = async () => {
        const arr = [...array];
        const bars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                bars[j].style.backgroundColor = 'red';
                bars[j + 1].style.backgroundColor = 'red';

                // Hız ayarını tersten hesapla (Slider yüksekse bekleme az olmalı)
                // 100 - sortingSpeed (Örn: Hız 90 ise bekleme 10ms olur)
                await sleep(100 - sortingSpeed);

                if (arr[j] > arr[j + 1]) {
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    bars[j].style.height = `${arr[j]}px`;
                    bars[j + 1].style.height = `${arr[j + 1]}px`;
                }
                bars[j].style.backgroundColor = '#3b82f6';
                bars[j + 1].style.backgroundColor = '#3b82f6';
            }
            bars[arr.length - i - 1].style.backgroundColor = '#10b981';
        }
        bars[0].style.backgroundColor = '#10b981';
    };

    // Selection Sort
    const selectionSort = async () => {
        const arr = [...array];
        const bars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < arr.length; i++) {
            let minIndex = i;
            bars[minIndex].style.backgroundColor = 'red';
            for (let j = i + 1; j < arr.length; j++) {
                bars[j].style.backgroundColor = 'red';
                await sleep(100 - sortingSpeed);
                if (arr[j] < arr[minIndex]) {
                    if (minIndex !== i) bars[minIndex].style.backgroundColor = '#3b82f6';
                    minIndex = j;
                } else {
                    bars[j].style.backgroundColor = '#3b82f6';
                }
            }
            if (minIndex !== i) {
                let temp = arr[i];
                arr[i] = arr[minIndex];
                arr[minIndex] = temp;
                bars[i].style.height = `${arr[i]}px`;
                bars[minIndex].style.height = `${arr[minIndex]}px`;
                bars[minIndex].style.backgroundColor = '#3b82f6';
            }
            bars[i].style.backgroundColor = '#10b981';
        }
    };

    // Insertion Sort
    const insertionSort = async () => {
        const arr = [...array];
        const bars = document.getElementsByClassName('array-bar');
        for (let i = 1; i < arr.length; i++) {
            let j = i;
            bars[i].style.backgroundColor = 'orange';
            while (j > 0 && arr[j] < arr[j - 1]) {
                bars[j].style.backgroundColor = 'red';
                bars[j - 1].style.backgroundColor = 'red';
                await sleep(100 - sortingSpeed);
                let temp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = temp;
                bars[j].style.height = `${arr[j]}px`;
                bars[j - 1].style.height = `${arr[j - 1]}px`;
                bars[j].style.backgroundColor = '#3b82f6';
                if (j - 1 !== i) bars[j - 1].style.backgroundColor = '#3b82f6';
                j--;
            }
            bars[i].style.backgroundColor = '#3b82f6';
        }
        for (let k = 0; k < bars.length; k++) bars[k].style.backgroundColor = '#10b981';
    };

    return (
        <div className='visualizer-container'>
            <div className='array-container'>
                {array.map((value, idx) => (
                    <div
                        className='array-bar'
                        key={idx}
                        style={{
                            height: `${value}px`,
                            // Dizi boyutu arttıkça çubuklar incelsin ki sığsın
                            width: `${600 / arraySize}px`,
                        }}></div>
                ))}
            </div>

            <div className='controls'>
                {/* 1. YENİ DİZİ BUTONU */}
                <button className='btn-control' onClick={resetArray} disabled={isSorting}>
                    <i className='fa-solid fa-shuffle'></i> Reset
                </button>

                {/* 2. AYARLAR KUTUSU (SLIDERLAR BURADA) */}
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
                            disabled={isSorting}
                        />
                    </div>
                </div>

                {/* 3. ALGORİTMA SEÇİMİ */}
                <select
                    className='algo-select'
                    value={selectedAlgo}
                    onChange={(e) => setSelectedAlgo(e.target.value)}
                    disabled={isSorting}>
                    <option value='bubble'>Bubble Sort</option>
                    <option value='selection'>Selection Sort</option>
                    <option value='insertion'>Insertion Sort</option>
                </select>

                {/* 4. BAŞLAT BUTONU */}
                <button className='btn-primary-play' onClick={startSorting} disabled={isSorting}>
                    {isSorting ? (
                        <i className='fa-solid fa-spinner fa-spin'></i>
                    ) : (
                        <i className='fa-solid fa-play'></i>
                    )}
                    {isSorting ? ' Sorting...' : ' Start'}
                </button>
            </div>
        </div>
    );
};

export default SortingVisualizer;
