
import React from 'react';
import Button from './Button';

interface EndScreenProps {
  totalWords: number;
  onRestart: () => void;
  completionPercentage: number;
}

const EndScreen: React.FC<EndScreenProps> = ({ totalWords, onRestart, completionPercentage }) => {
  return (
    <div className="text-center animate-fadeIn flex flex-col items-center justify-center h-[500px]">
      <h2 className="text-6xl font-press-start mb-6 text-shadow-glow">게임 종료</h2>
      <p className="text-4xl mb-4">학습 완성도</p>
      <p className="text-8xl font-press-start text-white filter drop-shadow-[0_0_10px_#00ff41] mb-10">
        {Math.round(completionPercentage)}%
      </p>
      <Button onClick={onRestart}>
        다시하기
      </Button>
    </div>
  );
};

export default EndScreen;
