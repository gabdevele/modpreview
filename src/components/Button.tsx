import React from 'react';
import { useSelectedServer } from '../context/SelectedServerContext';

interface ButtonProps {
    text: string;
    disabled?: boolean;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, disabled, onClick }) => {
    const { selectedServer } = useSelectedServer();
    return (
        <button
        disabled={disabled}
        onClick={onClick}
        className={`px-6 md:px-8 py-2 min-h-6 bg-cover border-x-2 border-black text-white font-minecraft text-center bg-no-repeat bg-center grow text-base md:text-lg truncate ${
            disabled && !selectedServer ? 'btn-disabled' : 'btn-enabled'
        }`}
        >
        {text}
        </button>
    );
};

export default Button;
