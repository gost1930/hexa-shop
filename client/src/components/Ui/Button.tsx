import React from 'react'

const Button = ({ className, title, onClick }: { className?: string, title: string | any, onClick?: any }) => {
    return (
        <button onClick={onClick} className={`py-2 px-4 w-fit border  cursor-pointer ${className ?? "hover:border-white hover:bg-white hover:text-black text-white"}`}
        >
            {title}
        </button>
    )
}

export default Button;
