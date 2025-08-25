
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="font-press-start text-2xl bg-transparent border-4 border-[#00ff41] text-[#00ff41] px-8 py-4
                 hover:bg-[#00ff41] hover:text-black transition-colors duration-300
                 shadow-[4px_4px_0px_#00ff41] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
    >
      {children}
    </button>
  );
};

export default Button;
