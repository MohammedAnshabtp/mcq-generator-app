// src/components/JobDescriptionForm.js
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { generateMCQs } from '../services/aiService';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  animation: ${fadeIn} 0.6s ease-out;
`;

const FormTitle = styled.h2`
  color: #333;
  margin-bottom: 30px;
  text-align: center;
  font-size: 2rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 20px;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  font-size: 16px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
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
  display: block;
  margin: 30px auto 0;
  min-width: 200px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const LoadingSpinner = styled.div`
  border: 3px solid #f3f3f3;
  border-top: 3px solid #667eea;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  background: #ffe6e6;
  color: #d63031;
  padding: 15px;
  border-radius: 10px;
  margin-top: 20px;
  text-align: center;
`;

const JobDescriptionForm = ({ onQuestionsGenerated }) => {
  const [jd, setJd] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!jd.trim()) {
      setError('Please enter a job description');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const questions = await generateMCQs(jd);
      onQuestionsGenerated({ questions, jobDescription: jd });
    } catch (err) {
      setError('Failed to generate questions. Please try again.');
      console.error('Error generating MCQs:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Enter Job Description</FormTitle>
      <form onSubmit={handleSubmit}>
        <TextArea
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          placeholder="Paste the job description here...&#10;&#10;Example:&#10;We are looking for a React.js developer with 3+ years of experience. The candidate should have strong knowledge of JavaScript, React hooks, state management, and component lifecycle. Experience with Redux, TypeScript, and testing frameworks is preferred."
        />
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <Button type="submit" disabled={loading}>
          {loading ? <LoadingSpinner /> : 'Generate MCQs'}
        </Button>
      </form>
    </FormContainer>
  );
};

export default JobDescriptionForm;