// src/components/MCQDashboard.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
`;

const Timer = styled.div`
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  font-weight: bold;
  font-size: 1.2rem;
`;

const QuestionCounter = styled.div`
  color: #666;
  font-size: 1.1rem;
`;

const QuestionCard = styled.div`
  background: #f8f9fa;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 20px;
`;

const QuestionText = styled.h3`
  color: #333;
  margin-bottom: 25px;
  font-size: 1.3rem;
  line-height: 1.5;
`;

const OptionsList = styled.div`
  display: grid;
  gap: 15px;
`;

const OptionButton = styled.button`
  background: ${props => props.selected ? '#667eea' : 'white'};
  color: ${props => props.selected ? 'white' : '#333'};
  border: 2px solid ${props => props.selected ? '#667eea' : '#e1e5e9'};
  padding: 15px 20px;
  border-radius: 12px;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;

  &:hover {
    border-color: #667eea;
    transform: translateY(-1px);
  }
`;

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const NavButton = styled.button`
  background: ${props => props.primary ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#6c757d'};
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const MCQDashboard = ({ questions, candidate, onTestComplete, onReset }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return time - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (optionIndex) => {
    setAnswers({
      ...answers,
      [currentQuestion]: optionIndex
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score++;
      }
    });
    onTestComplete({
      score,
      total: questions.length,
      percentage: (score / questions.length) * 100
    });
  };

  const question = questions[currentQuestion];

  return (
    <DashboardContainer>
      <Header>
        <div>
          <h2>Welcome, {candidate.name}</h2>
          <p>Position: {candidate.position}</p>
        </div>
        <Timer>Time Left: {formatTime(timeLeft)}</Timer>
        <QuestionCounter>
          Question {currentQuestion + 1} of {questions.length}
        </QuestionCounter>
      </Header>

      <QuestionCard>
        <QuestionText>{question.question}</QuestionText>
        <OptionsList>
          {question.options.map((option, index) => (
            <OptionButton
              key={index}
              selected={answers[currentQuestion] === index}
              onClick={() => handleAnswerSelect(index)}
            >
              {option}
            </OptionButton>
          ))}
        </OptionsList>
      </QuestionCard>

      <Navigation>
        <NavButton 
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          Previous
        </NavButton>
        
        {currentQuestion === questions.length - 1 ? (
          <NavButton primary onClick={handleSubmit}>
            Submit Test
          </NavButton>
        ) : (
          <NavButton primary onClick={handleNext}>
            Next Question
          </NavButton>
        )}
      </Navigation>
    </DashboardContainer>
  );
};

export default MCQDashboard;