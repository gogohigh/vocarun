import React, { useState, useEffect, useCallback } from 'react';
import StartScreen from './components/StartScreen.jsx';
import GameScreen from './components/GameScreen.jsx';
import EndScreen from './components/EndScreen.jsx';
import { vocabularyList } from './data/vocabulary.js';
import { shuffleArray } from './utils/quizHelper.js';

const App = () => {
    const [gameState, setGameState] = useState('start');
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [options, setOptions] = useState([]);
    const [feedback, setFeedback] = useState('idle');
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [correctlyAnsweredWords, setCorrectlyAnsweredWords] = useState(new Set());

    const generateOptions = useCallback((currentQuestion) => {
        const { word: correctWord, type } = currentQuestion;
        const incorrectWords = vocabularyList.filter(w => w.id !== correctWord.id);
        const shuffledIncorrect = shuffleArray(incorrectWords);

        if (type === 'E_TO_K_MCQ') {
            const incorrectOptions = shuffledIncorrect.slice(0, 3).map(w => w.koreanMeaning);
            const allOptions = shuffleArray([...incorrectOptions, correctWord.koreanMeaning]);
            setOptions(allOptions);
        } else if (type === 'K_TO_E_MCQ') {
            const incorrectOptions = shuffledIncorrect.slice(0, 3).map(w => w.spelling);
            const allOptions = shuffleArray([...incorrectOptions, correctWord.spelling]);
            setOptions(allOptions);
        } else {
            setOptions([]); // No options for input type
        }
    }, []);

    const startGame = useCallback(() => {
        const shuffledWords = shuffleArray(vocabularyList);
        const questionTypes = ['E_TO_K_MCQ', 'K_TO_E_MCQ', 'K_TO_E_INPUT'];
        const newQuestions = shuffledWords.map((word, index) => ({
            word,
            type: questionTypes[index % questionTypes.length]
        }));
        
        setQuestions(newQuestions);
        setCurrentQuestionIndex(0);
        setFeedback('idle');
        setSelectedAnswer(null);
        setCorrectlyAnsweredWords(new Set());
        setGameState('playing');
    }, []);
    
    useEffect(() => {
        if (gameState === 'playing' && questions.length > 0) {
            if(currentQuestionIndex >= questions.length) {
                setGameState('finished');
            } else {
                generateOptions(questions[currentQuestionIndex]);
            }
        }
    }, [currentQuestionIndex, questions, gameState, generateOptions]);

    const handleAnswer = (answer) => {
        if (feedback !== 'idle') return;

        const currentQuestion = questions[currentQuestionIndex];
        const { word, type } = currentQuestion;

        setSelectedAnswer(answer);
        
        let isCorrect = false;
        if (type === 'E_TO_K_MCQ') {
            isCorrect = answer === word.koreanMeaning;
        } else { // K_TO_E_MCQ or K_TO_E_INPUT
            isCorrect = answer.trim().toLowerCase() === word.spelling.toLowerCase();
        }

        if (isCorrect) {
            setFeedback('correct');
            setCorrectlyAnsweredWords(prev => new Set(prev).add(word.id));
        } else {
            setFeedback('incorrect');
        }
    };

    const goToNextQuestion = () => {
        setFeedback('idle');
        setSelectedAnswer(null);
        setCurrentQuestionIndex(prev => prev + 1);
    };

    const completionPercentage = (correctlyAnsweredWords.size / vocabularyList.length) * 100;

    const renderContent = () => {
        switch (gameState) {
            case 'start':
                return <StartScreen onStart={startGame} />;
            case 'playing':
                 if (!questions[currentQuestionIndex]) {
                    return <EndScreen totalWords={questions.length} onRestart={startGame} completionPercentage={completionPercentage} />;
                }
                return (
                    <GameScreen
                        question={questions[currentQuestionIndex]}
                        options={options}
                        onAnswer={handleAnswer}
                        currentIndex={currentQuestionIndex}
                        totalWords={questions.length}
                        feedback={feedback}
                        selectedAnswer={selectedAnswer}
                        completionPercentage={completionPercentage}
                        onNextQuestion={goToNextQuestion}
                    />
                );
            case 'finished':
                return <EndScreen totalWords={questions.length} onRestart={startGame} completionPercentage={completionPercentage} />;
            default:
                return <StartScreen onStart={startGame} />;
        }
    };

    return (
        <div className="bg-black text-[#00ff41] min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-4xl mx-auto bg-[#0a0a0a] border-2 border-[#00ff41] shadow-[0_0_20px_#00ff41] rounded-lg p-6 crt-effect">
                {renderContent()}
            </div>
        </div>
    );
};

export default App;