import React from "react"

enum ButtonTypes {
    "button",
    "submit",
    "reset",
    undefined
}

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
    bType: ButtonTypes
}

const Button: React.FC<ButtonProps> = ({ children, bType, type, ...others }) => {
    return (
        <button 
            className=""
            {...others}
            type={bType === ButtonTypes.button ? "button" : bType === ButtonTypes.submit ? "submit" : bType === ButtonTypes.reset ? "reset" : undefined}
        >
            {children}
        </button>
    )
}

export default Button