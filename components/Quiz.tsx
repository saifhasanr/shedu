import React, { useState } from 'react';
import { QuizQuestion } from '../types';

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: () => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (option: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: option,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
      onComplete();
    }
  };

  const calculateScore = () => {
    return questions.reduce((score, question, index) => {
      return selectedAnswers[index] === question.correctAnswer ? score + 1 : score;
    }, 0);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="bg-secondary p-8 rounded-lg text-center">
        <h2 className="text-3xl font-bold text-brand mb-4">Quiz Completed!</h2>
        <p className="text-xl text-text-primary mb-6">
          You scored {score} out of {questions.length}
        </p>
        <div className="space-y-4 mb-8 text-left">
          {questions.map((q, index) => (
            <div key={index} className="p-4 bg-accent rounded-md">
              <p className="font-semibold">{q.questionText}</p>
              <p className={selectedAnswers[index] === q.correctAnswer ? 'text-green-400' : 'text-red-400'}>
                Your answer: {selectedAnswers[index] || 'Not answered'}
              </p>
              {selectedAnswers[index] !== q.correctAnswer && (
                <p className="text-green-400">Correct answer: {q.correctAnswer}</p>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={resetQuiz}
          className="bg-brand hover:bg-sky-400 text-primary font-bold py-2 px-6 rounded-md transition-colors"
        >
          Retry Quiz
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="bg-secondary p-6 sm:p-8 rounded-lg shadow-xl">
      <div className="mb-6">
        <p className="text-highlight">Question {currentQuestionIndex + 1} of {questions.length}</p>
        <h3 className="text-2xl font-semibold mt-2">{currentQuestion.questionText}</h3>
      </div>
      <div className="space-y-4">
        {currentQuestion.options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswerSelect(option)}
            className={`w-full text-left p-4 rounded-md transition-colors duration-200 border-2 ${
              selectedAnswers[currentQuestionIndex] === option
                ? 'bg-brand text-primary border-brand'
                : 'bg-accent hover:bg-highlight/50 border-transparent'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="mt-8 text-right">
        <button
          onClick={handleNext}
          disabled={!selectedAnswers[currentQuestionIndex]}
          className="bg-brand hover:bg-sky-400 text-primary font-bold py-2 px-6 rounded-md transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
