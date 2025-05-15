import React from 'react';

const Button = ({text, onClick, type = "Button", className="", icon: Icon}) => {
  return (
    <button
        type={type}
        onClick={onClick}
        className={` ${className} w-full text-base-md bg-[#3A5B22] px-[10px] py-[5px] rounded-[8px] flex items-center gap-[5px]`}>
            {Icon && <Icon size={20} />}
            {text}
    </button>
  )
}

export default Button;