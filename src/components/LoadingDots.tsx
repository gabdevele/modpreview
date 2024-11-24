import React, { useState, useEffect } from "react";

const LoadingDots: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
    const dotsArray = ['O', 'o', 'o'];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % dotsArray.length);
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col w-full items-center justify-center">
            <span className="text-white font-minecraft text-base">
                {isLoading ? "Searching around the web" :"Scanning for games on your local network"}
            </span>
            <div className="flex space-x-2 mt-1">
                {dotsArray.map((_, index) => (
                    <span key={index} className="text-gray-400   font-minecraft text-base">
                        {index === currentIndex ? 'O' : 'o'}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default LoadingDots;