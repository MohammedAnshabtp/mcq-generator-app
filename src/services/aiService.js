// src/services/aiService.js
import axios from 'axios';

// Using Hugging Face Inference API (Free tier available)
const HF_API_KEY = 'your_huggingface_api_key_here'; // Get free API key from huggingface.co
const HF_API_URL = 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium';

// Fallback mock questions in case API fails
const mockQuestions = [
  {
    id: 1,
    question: "What is the main purpose of React's virtual DOM?",
    options: [
      "To directly manipulate the browser DOM",
      "To improve performance by minimizing DOM operations",
      "To replace the actual DOM completely",
      "To handle CSS styling more efficiently"
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Which hook is used to perform side effects in functional components?",
    options: [
      "useState",
      "useEffect",
      "useContext",
      "useReducer"
    ],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "What is the default port for a React development server?",
    options: [
      "3000",
      "8080",
      "5000",
      "4200"
    ],
    correctAnswer: 0
  }
];

export const generateMCQs = async (jobDescription) => {
  try {
    // Try to use Hugging Face API first
    const response = await axios.post(
      HF_API_URL,
      {
        inputs: `Generate 5 multiple choice questions based on this job description: ${jobDescription}. Format as JSON with questions array containing id, question, options array, and correctAnswer index.`
      },
      {
        headers: {
          'Authorization': `Bearer ${HF_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Parse the response (this would need proper parsing based on actual API response)
    console.log('AI Response:', response.data);
    
    // For demo purposes, return mock questions
    // In production, you would parse the AI response properly
    return mockQuestions;

  } catch (error) {
    console.warn('AI API failed, using mock questions:', error);
    // Return mock questions as fallback
    return mockQuestions;
  }
};