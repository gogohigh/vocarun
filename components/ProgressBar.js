import React from 'https://esm.sh/react@18.2.0';

const ProgressBar = ({ current, total }) => {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="w-full bg-[#1a1a1a] border-2 border-[#00ff41]/50 rounded-full h-6 p-1">
      <div
        className="bg-[#00ff41] h-full rounded-full transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      ></div>
      <span className="absolute w-full text-center top-1 left-0 text-sm font-bold text-black mix-blend-screen">{current} / {total}</span>
    </div>
  );
};

export default ProgressBar;