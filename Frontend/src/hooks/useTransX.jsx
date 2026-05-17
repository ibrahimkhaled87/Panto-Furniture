import { useState, useEffect } from "react";
export default function useTransX() {
    // set transX
    const [transX, setTransX] = useState(0);
    function right() {
        setTransX((prev) => prev - 10);
    }
    function left() {
        setTransX((prev) => prev + 10);
    }

    // use transX (show/hide arrows)
    useEffect (() => {
        const root = document.documentElement;
        root.style.setProperty('--transX', transX);
        const rightArr = document.querySelector("img.right");
        const leftArr = document.querySelector("img.left");
        console.log(transX);

        if (!rightArr || !leftArr) return;
        
        if (transX === 0) {
            rightArr.style.visibility = 'visible';
            leftArr.style.visibility = 'hidden';
        } 
        else if (transX === -30) {
            rightArr.style.visibility = 'hidden';
            leftArr.style.visibility = 'visible';
        } 
        else {
            rightArr.style.visibility = 'visible';
            leftArr.style.visibility = 'visible';
        }
    }, [transX])

    return {right, left};
}