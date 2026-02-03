
export const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};


export const handleStepControl = async (speedRef, isPausedRef, isStoppedRef) => {
    
    if (isStoppedRef.current) {
        throw new Error("Sorting Stopped"); 
    }

    while (isPausedRef.current) {
        if (isStoppedRef.current) throw new Error("Sorting Stopped");
        await new Promise(resolve => setTimeout(resolve, 50));
    }

  
   if (isStoppedRef.current) throw new Error("Sorting Stopped");
    const delay = 100 - speedRef.current;
    await new Promise(resolve => setTimeout(resolve, delay));
};

export const wrapSortingAlgorithm = async (algoFunction, ...params) => {
    try {
        await algoFunction(...params);
    } catch (e) {
        if (e.message === "Sorting Stopped") {
            console.log("Algoritma Reset Sinyali ile Durduruldu.");
        } else {
            console.error("Beklenmedik bir hata oluştu:", e);
        }
    }
};