import React from 'react'

interface ButtonProps {
    className?: string
     title: string | any
     icon?: any
    onClick?: any
    type?: "submit" | "reset" | "button"
};
    const Button: React.FC<ButtonProps> = ({ className, title, icon, onClick , type ="submit" }) => {
  return (
    <button onClick={onClick}  className={`p-2 rounded flex items-center gap-x-2 text-base cursor-pointer ${className} `} type={type}> {icon}{title}</button>
  )
}

export default Button;
