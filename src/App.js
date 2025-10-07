import React, { useState } from 'react';
import styled from 'styled-components';
import JobDescriptionForm from './components/JobDescriptionForm';
import MCQDashboard from './components/MCQDashboard';
import CandidateForm from './components/CandidateForm';
import ScoreBoard from './components/ScoreBoard';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  color: white;
  font-size: 2.5rem;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
`;

const Subtitle = styled.p`
  color: rgba(255,255,255,0.8);
  font-size: 1.2rem;
`;

function App() {
  const [currentView, setCurrentView] = useState('jd-form');
  const [mcqData, setMcqData] = useState(null);
  const [candidateData, setCandidateData] = useState(null);
  const [score, setScore] = useState(null);

  const handleQuestionsGenerated = (data) => {
    setMcqData(data);
    setCurrentView('candidate-form');
  };

  const handleCandidateSubmit = (data) => {
    setCandidateData(data);
    setCurrentView('mcq-dashboard');
  };

  const handleTestComplete = (finalScore) => {
    setScore(finalScore);
    setCurrentView('scoreboard');
  };

  const resetApp = () => {
    setCurrentView('jd-form');
    setMcqData(null);
    setCandidateData(null);
    setScore(null);
  };

  return (
    <Container>
      <Header>
        <Title>AI-Powered MCQ Generator</Title>
        <Subtitle>Streamline your hiring process with intelligent assessments</Subtitle>
      </Header>

      {currentView === 'jd-form' && (
        <JobDescriptionForm onQuestionsGenerated={handleQuestionsGenerated} />
      )}

      {currentView === 'candidate-form' && (
        <CandidateForm onSubmit={handleCandidateSubmit} />
      )}

      {currentView === 'mcq-dashboard' && mcqData && (
        <MCQDashboard 
          questions={mcqData.questions}
          candidate={candidateData}
          onTestComplete={handleTestComplete}
          onReset={resetApp}
        />
      )}

      {currentView === 'scoreboard' && score && candidateData && (
        <ScoreBoard 
          score={score}
          candidate={candidateData}
          totalQuestions={mcqData?.questions?.length || 0}
          onRestart={resetApp}
        />
      )}
    </Container>
  );
}

export default App;