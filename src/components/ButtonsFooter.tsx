import React from "react"
import Button from "./Button";

const ButtonsFooter: React.FC = () => {
    const handleClick = () => {
        alert('hey this is a preview not the real minecraft...');
    };
    return (
    <div className="flex flex-col items-center w-full">
    <div className="flex flex-col gap-2 w-full max-w-2xl p-2">
        <div className="flex flex-row gap-3 w-full">
        <Button text="Join Server" disabled={true} onClick={handleClick} />
        <Button text="Direct Connection" disabled={false} onClick={handleClick} />
        <Button text="Add Server" disabled={false} onClick={handleClick} />
        </div>

        <div className="flex flex-row gap-4 w-full">
        <Button text="Save" disabled={true} onClick={handleClick} />
        <Button text="Delete" disabled={true} onClick={handleClick} />
        <Button text="Refresh" disabled={false} onClick={handleClick} />
        <Button text="Back" disabled={false} onClick={handleClick} />
        </div>
    </div>
    </div>
    )
}

export default ButtonsFooter;