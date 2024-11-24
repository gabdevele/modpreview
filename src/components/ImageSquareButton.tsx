import React from 'react';


interface ImageSquareButtonProps {
    image: string;
    onClick: () => void;
}

const ImageSquareButton: React.FC<ImageSquareButtonProps> = ({ image, onClick }) => {
    return (
        <button onClick={onClick} className="border-x-2 px-1 border-black btn-enabled bg-no-repeat bg-center bg-cover">
        <img src={image} alt="image" className="w-9 aspect-square" />
        </button>
    );
};

export default ImageSquareButton;