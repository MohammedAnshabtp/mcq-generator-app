// src/components/ScoreBoard.js
import React from 'react';
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
  40% {transform: translateY(-30px);}
  60% {transform: translateY(-15px);}
`;

const ScoreContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  text-align: center;
`;

const ScoreTitle = styled.h2`
  color: #333;
  margin-bottom: 30px;
`;

const ScoreCircle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: ${props => {
    const percentage = props.percentage;
    if (percentage >= 80) return 'linear-gradient(135deg, #51cf66 0%, #40c057 100%)';
    if (percentage >= 60) return 'linear-gradient(135deg, #ffd43b 0%, #fcc419 100%)';
    return 'linear-gradient(135deg, #ff6b6b 0%, #fa5252 100%)';
  }};
  margin: 0 auto 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  animation: ${bounce} 2s infinite;
`;

const ScorePercentage = styled.div`
  font-size: 3rem;
  font-weight: bold;
`;

const ScoreText = styled.div`
  font-size: 1.2rem;
`;

const ResultDetails = styled.div`
  background: #f8f9fa;
  border-radius: 15px;
  padding: 25px;
  margin: 25px 0;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #e9ecef;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

const Feedback = styled.div`
  background: ${props => {
    const percentage = props.percentage;
    if (percentage >= 80) return '#d3f9d8';
    if (percentage >= 60) return '#fff3bf';
    return '#ffe3e3';
  }};
  color: ${props => {
    const percentage = props.percentage;
    if (percentage >= 80) return '#2b8a3e';
    if (percentage >= 60) return '#e67700';
    return '#c92a2a';
  }};
  padding: 20px;
  border-radius: 12px;
  margin: 20px 0;
  font-weight: 500;
`;

const Button = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 10px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  }
`;

const ScoreBoard = ({ score, candidate, totalQuestions, onRestart }) => {
  const percentage = Math.round(score.percentage);

  const getFeedback = () => {
    if (percentage >= 80) return "Excellent! You have strong knowledge in this area.";
    if (percentage >= 60) return "Good job! You have a solid understanding.";
    if (percentage >= 40) return "Fair. Consider reviewing the topics.";
    return "Needs improvement. Please study the material and try again.";
  };

  return (
    <ScoreContainer>
      <ScoreTitle>Assessment Complete!</ScoreTitle>
      
      <ScoreCircle percentage={percentage}>
        <ScorePercentage>{percentage}%</ScorePercentage>
        <ScoreText>Score</ScoreText>
      </ScoreCircle>

      <ResultDetails>
        <DetailRow>
          <strong>Candidate:</strong>
          <span>{candidate.name}</span>
        </DetailRow>
        <DetailRow>
          <strong>Position:</strong>
          <span>{candidate.position}</span>
        </DetailRow>
        <DetailRow>
          <strong>Correct Answers:</strong>
          <span>{score.score} out of {totalQuestions}</span>
        </DetailRow>
        <DetailRow>
          <strong>Percentage:</strong>
          <span>{percentage}%</span>
        </DetailRow>
      </ResultDetails>

      <Feedback percentage={percentage}>
        {getFeedback()}
      </Feedback>

      <div>
        <Button onClick={onRestart}>Create New Assessment</Button>
        <Button onClick={() => window.print()}>Print Results</Button>
      </div>
    </ScoreContainer>
  );
};

export default ScoreBoard;