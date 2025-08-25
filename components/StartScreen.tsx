import React from 'react';
import Button from './Button';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center animate-fadeIn flex flex-col items-center justify-center h-[500px]">
      <h1 className="text-5xl font-press-start mb-4 text-shadow-glow">뉴트로 영단어 퀴즈</h1>
      <p className="text-2xl mb-8 text-[#00ff41]/80">당신의 영단어 실력을 시험해보세요!</p>
      <Button onClick={onStart}>
        게임 시작
      </Button>
    </div>
  );
};

export default StartScreen;