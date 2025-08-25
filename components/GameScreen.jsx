import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar.jsx';
import SpeakerIcon from './SpeakerIcon.jsx';

const GameScreen = ({
    question,
    options,
    onAnswer,
    currentIndex,
    totalWords,
    feedback,
    selectedAnswer,
    completionPercentage,
    onNextQuestion
}) => {
    const [inputValue, setInputValue] = useState('');
    const { word, type } = question;

    useEffect(() => {
        setInputValue('');
    }, [question]);

    const handleSpeak = () => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(word.spelling);
            utterance.lang = 'en-US';
            window.speechSynthesis.speak(utterance);
        } else {
            alert("죄송합니다, 사용하시는 브라우저는 음성 출력을 지원하지 않습니다.");
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e?.preventDefault();
        if (inputValue.trim()) {
            onAnswer(inputValue);
        }
    };
    
    const getButtonClass = (option) => {
        if (feedback === 'idle') {
            return 'bg-[#1a1a1a] hover:bg-[#2a2a2a] border-[#00ff41]';
        }

        const correctMeaning = type === 'E_TO_K_MCQ' ? word.koreanMeaning : word.spelling;
        
        if (option !== selectedAnswer && option !== correctMeaning) {
            return 'bg-[#1a1a1a] border-[#00ff41] opacity-50';
        }

        if (option === correctMeaning) {
            return 'bg-green-500/50 border-green-400 animate-pulse';
        }

        if (option === selectedAnswer && feedback === 'incorrect') {
            return 'bg-red-500/50 border-red-400';
        }

        return 'bg-[#1a1a1a] border-[#00ff41]';
    };

    const getInputClass = () => {
        if (feedback === 'idle') return 'border-[#00ff41]';
        if (feedback === 'correct') return 'border-green-400 bg-green-500/20';
        if (feedback === 'incorrect') return 'border-red-400 bg-red-500/20';
        return 'border-[#00ff41]';
    };
    
    const renderFeedbackArea = () => {
        if (feedback === 'idle') {
             return <div className="h-32 mt-6"></div>;
        }
        
        if (feedback === 'incorrect' && (type === 'K_TO_E_MCQ' || type === 'E_TO_K_MCQ')) {
             const correctAnswer = type === 'K_TO_E_MCQ' ? word.spelling : word.koreanMeaning;
             return (
                <div className="h-32 mt-6 flex flex-col items-center justify-center w-full animate-fadeIn">
                     <p className="text-xl text-red-400 mb-4">정답: {correctAnswer}</p>
                </div>
             );
        }
        
        return <div className="h-32 mt-6"></div>;
    }


    return (
        <div className="flex flex-col h-[600px] text-2xl">
            {/* Header */}
            <div className="text-center mb-6 p-4 border-b-2 border-[#00ff41]/50">
                <div className="font-press-start text-xl whitespace-nowrap">
                    학습 완성도: {Math.round(completionPercentage)}%
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
                <ProgressBar current={currentIndex + 1} total={totalWords} />
            </div>

            {/* Question Content */}
            <div className="text-center my-8 flex-grow flex flex-col justify-center items-center">
                {type === 'E_TO_K_MCQ' && (
                    <>
                        <p className="text-3xl text-gray-400 mb-2">다음 단어의 뜻은 무엇일까요?</p>
                        <div className="flex items-center justify-center gap-4">
                            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-press-start text-white filter drop-shadow-[0_0_8px_#00ff41] break-words">{word.spelling}</h2>
                            <button onClick={handleSpeak} className="p-2 rounded-full hover:bg-[#00ff41]/20 transition-colors" aria-label="단어 발음 듣기">
                                <SpeakerIcon className="w-8 h-8 sm:w-10 sm:h-10 text-[#00ff41]" />
                            </button>
                        </div>
                    </>
                )}
                {type === 'K_TO_E_MCQ' && (
                    <>
                        <p className="text-3xl text-gray-400 mb-2">다음 뜻을 가진 영단어는 무엇일까요?</p>
                        <h2 className="text-4xl sm:text-5xl font-press-start text-white filter drop-shadow-[0_0_8px_#00ff41] break-keep">{word.koreanMeaning}</h2>
                    </>
                )}
                {type === 'K_TO_E_INPUT' && (
                     <>
                        <p className="text-3xl text-gray-400 mb-2">다음 뜻을 가진 영단어를 입력하세요.</p>
                        <h2 className="text-4xl sm:text-5xl font-press-start text-white filter drop-shadow-[0_0_8px_#00ff41] break-keep mb-6">{word.koreanMeaning}</h2>
                        {feedback === 'incorrect' && (
                            <p className="text-xl text-red-400 mb-4 animate-fadeIn">정답: {word.spelling}</p>
                        )}
                    </>
                )}

                {renderFeedbackArea()}
            </div>
            
            {/* Answer Area */}
            <div className="pb-4 min-h-[180px] flex flex-col justify-center items-center">
                <div className="w-full">
                    {type === 'K_TO_E_INPUT' ? (
                        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={handleInputChange}
                                disabled={feedback !== 'idle'}
                                className={`bg-[#1a1a1a] text-[#00ff41] w-full max-w-md text-2xl text-center font-press-start p-4 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00ff41] disabled:opacity-50 transition-colors duration-300 ${getInputClass()}`}
                                autoCapitalize="none"
                                autoCorrect="off"
                                spellCheck="false"
                                autoFocus
                            />
                        </form>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            {options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => onAnswer(option)}
                                    disabled={feedback !== 'idle'}
                                    className={`p-4 border-2 rounded-md text-left text-2xl transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed break-keep ${getButtonClass(option)}`}
                                >
                                    <span className="font-press-start text-xl mr-4">{String.fromCharCode(65 + index)}.</span>
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                
                <div className="h-20 mt-4 flex items-center justify-center">
                    {feedback === 'idle' ? (
                        (type === 'K_TO_E_INPUT' && (
                            <button
                                onClick={() => handleSubmit()}
                                disabled={!inputValue.trim()}
                                className="font-press-start text-xl bg-transparent border-2 border-[#00ff41] text-[#00ff41] px-6 py-3 hover:bg-[#00ff41] hover:text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#00ff41]">
                                제출
                            </button>
                        ))
                    ) : (
                        <button
                            onClick={onNextQuestion}
                            className="font-press-start text-xl bg-transparent border-2 border-[#00ff41] text-[#00ff41] px-6 py-3 hover:bg-[#00ff41] hover:text-black transition-colors duration-300 animate-fadeIn"
                            autoFocus
                        >
                            다음 →
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GameScreen;