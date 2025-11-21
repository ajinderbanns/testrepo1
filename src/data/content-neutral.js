/**
 * Neutral Theme Content
 * 
 * Universal content that works for all users regardless of gender preference.
 * Professional, clear, and accessible communication style.
 * 
 * @module data/content-neutral
 */

import { 
  tokenizationContent, 
  embeddingsContent, 
  attentionContent,
  interactiveExamples as module2Interactive,
  quizQuestions as module2Quiz
} from './module2Content'
import {
  trainingExamples,
  inferenceExamples,
  architectureConfig,
  synthesisContent,
  quizQuestions as module3Quiz
} from './module3Content'

/**
 * Neutral Theme Content Object
 * 
 * Contains universal content for the neutral theme including
 * module content, gamification elements, and UI copy.
 */
export const neutralContent = {
  /**
   * Module-Specific Content
   */
  modules: {
    module1: {
      title: 'Introduction to LLMs',
      subtitle: 'Understanding the Fundamentals',
      
      intro: {
        title: 'Welcome to LLM Learning',
        description: 'This module provides a comprehensive introduction to Large Language Models through interactive examples and practical exercises.',
        analogy: 'Learning about LLMs is like learning any new technology—start with core concepts, practice with examples, and build understanding progressively.',
      },
      
      sections: {
        intro: {
          title: 'Getting Started',
          description: 'Learn the fundamental concepts of Large Language Models.',
          objectives: [
            'Define what Large Language Models are',
            'Understand the basic architecture',
            'Identify key capabilities and use cases',
          ],
        },
        
        textGeneration: {
          title: 'Text Generation',
          description: 'Explore how LLMs generate text token by token.',
          analogy: 'Text generation works like predictive text—the model predicts the most likely next word based on context.',
          examples: [],
        },
        
        examples: {
          title: 'Interactive Examples',
          description: 'Experiment with prompts and observe outputs.',
          analogy: 'Prompts are instructions to the model—clearer prompts typically produce better results.',
          variations: [],
        },
        
        exercises: {
          title: 'Practice Exercises',
          description: 'Apply your knowledge through interactive exercises.',
          instructions: 'Complete the exercises to reinforce your learning.',
          exercises: [],
        },
        
        summary: {
          title: 'Module Summary',
          keyTakeaways: [
            'LLMs generate text by predicting tokens sequentially',
            'Prompt engineering affects output quality',
            'Understanding fundamentals enables advanced usage',
          ],
        },
      },
    },
    
    module2: {
      title: 'Core Mechanics',
      subtitle: 'Technical Deep Dive',
      
      intro: {
        title: 'Understanding Core Components',
        description: 'This module explores the technical components that power Large Language Models.',
        analogy: 'Understanding these components is like understanding how an engine works—each part has a specific function.',
      },
      
      sections: {
        tokenization: {
          intro: {
            title: 'Tokenization Process',
            description: 'Tokenization breaks text into processable units that models can understand.',
            analogy: 'Tokenization is like parsing input—breaking complex data into manageable pieces.',
          },
          process: {
            title: 'The Tokenization Process',
            steps: [
              'Text Input: Raw text string',
              'Word Splitting: Breaking into words and punctuation',
              'Subword Processing: Further breaking into subword units',
              'Token Assignment: Mapping to vocabulary indices',
            ],
            techNote: 'Modern LLMs use algorithms like Byte-Pair Encoding (BPE) for efficient tokenization.',
          },
          examples: [
            { 
              text: 'Hello, world!',
              context: 'Simple text demonstrating basic tokenization'
            },
            {
              text: 'The model processes language efficiently',
              context: 'Standard sentence showing word-level tokens'
            },
          ],
        },
        
        embeddings: {
          intro: {
            title: 'Word Embeddings',
            description: 'Embeddings represent words as numerical vectors in high-dimensional space.',
            analogy: 'Embeddings are coordinate systems where similar words have similar coordinates.',
          },
          vectors: {
            title: 'Vector Representations',
            concept: 'Each word is represented as a vector of numbers capturing its meaning and relationships.',
            example: 'word = [0.1, 0.5, 0.2, ...] (hundreds of dimensions)',
          },
          similarity: {
            title: 'Semantic Similarity',
            explanation: 'Vector distance measures semantic similarity between words.',
            examples: [
              'Similar words have close vectors',
              'Antonyms have distant vectors',
              'Related concepts cluster together',
            ],
          },
        },
        
        attention: {
          intro: {
            title: 'Attention Mechanism',
            description: 'Attention allows models to focus on relevant parts of the input when generating each output.',
            analogy: 'Attention is like focusing on relevant information while filtering out noise.',
          },
          mechanism: {
            title: 'How Attention Works',
            concept: 'Each token attends to other tokens, weighting their importance for the current prediction.',
            formula: 'Attention(Q, K, V) = softmax(Q·K^T / √d) · V',
            interpretation: 'This computes weighted averages based on token relevance.',
          },
          patterns: {
            title: 'Attention Patterns',
            examples: [
              {
                sentence: 'The model processes the input text.',
                focus: 'When processing "input", attention focuses on "processes" and "text"',
              },
            ],
          },
        },
        
        interactive: {
          title: 'Interactive Demonstrations',
          description: 'Hands-on examples of tokenization, embeddings, and attention.',
          examples: module2Interactive,
        },
      },
      
      quiz: module2Quiz,
    },
    
    module3: {
      title: 'Comprehensive Overview',
      subtitle: 'Complete System Understanding',
      
      intro: {
        title: 'The Complete System',
        description: 'This module integrates all concepts into a comprehensive understanding of LLMs.',
        analogy: 'This is the complete system view—how all components work together.',
      },
      
      sections: {
        training: {
          title: 'Model Training',
          scenario: 'Understanding how models learn from data',
          description: 'Training involves exposing models to data and adjusting parameters to improve predictions.',
          analogy: 'Training is an iterative process of learning from feedback and improving performance.',
          dataExamples: [],
          improvementSteps: [
            'Model processes training data',
            'Predictions are compared to targets',
            'Parameters adjust to reduce errors',
            'Performance improves over iterations',
          ],
        },
        
        inference: {
          title: 'Model Inference',
          description: 'How trained models generate responses to new inputs.',
          analogy: 'Inference applies learned patterns to generate new outputs.',
          prompt: 'Example prompt',
          steps: [],
        },
        
        architecture: {
          ...architectureConfig,
          title: 'Transformer Architecture',
          description: 'The complete architecture that powers modern LLMs.',
          analogy: 'The architecture is the blueprint showing how all components interconnect.',
        },
        
        synthesis: {
          ...synthesisContent,
          title: 'Synthesis',
          description: 'Integrating all learned concepts.',
        },
      },
      
      quiz: module3Quiz,
    },
  },
  
  /**
   * Gamification Content
   */
  gamification: {
    badges: {
      firstStep: {
        name: 'Getting Started',
        icon: '🎯',
        description: 'Began learning about LLMs',
      },
      moduleComplete: {
        name: 'Module Complete',
        icon: '✓',
        description: 'Completed a module',
      },
      allModules: {
        name: 'Course Complete',
        icon: '🎓',
        description: 'Completed all modules',
      },
      perfectScore: {
        name: 'Perfect Score',
        icon: '⭐',
        description: 'Completed all exercises correctly',
      },
      speedRun: {
        name: 'Efficient Learner',
        icon: '⚡',
        description: 'Completed a module quickly',
      },
      explorer: {
        name: 'Explorer',
        icon: '🔍',
        description: 'Tried all interactive examples',
      },
    },
    
    celebrations: {
      sectionComplete: {
        title: 'Section Complete',
        message: 'You\'ve completed this section.',
        icon: '✓',
      },
      moduleComplete: {
        title: 'Module Complete',
        message: 'You\'ve successfully completed this module.',
        icon: '✓',
      },
      allComplete: {
        title: 'Course Complete',
        message: 'You\'ve completed all modules. Congratulations!',
        icon: '🎓',
      },
    },
    
    progress: {
      streakText: '{count} day streak',
      completionText: '{percentage}% complete',
      nextMilestone: 'Next: {milestone}',
      encouragement: [
        'Keep going!',
        'You\'re making progress!',
        'Well done!',
        'Good work!',
      ],
    },
  },
  
  /**
   * UI Content
   */
  ui: {
    navigation: {
      next: 'Next',
      previous: 'Previous',
      continue: 'Continue',
      startModule: 'Start Module',
      backToLearning: 'Back to Learning',
      finish: 'Finish',
    },
    
    buttons: {
      tryExample: 'Try Example',
      resetExercise: 'Reset',
      checkAnswer: 'Check Answer',
      submit: 'Submit',
      skip: 'Skip',
      viewSolution: 'View Solution',
    },
    
    labels: {
      loading: 'Loading...',
      processing: 'Processing...',
      completed: 'Completed',
      inProgress: 'In Progress',
      locked: 'Locked',
      optional: 'Optional',
      required: 'Required',
    },
    
    instructions: {
      selectAnswer: 'Select an answer',
      completeExercise: 'Complete the exercise to continue',
      experimentFreely: 'Experiment with different inputs',
      readCarefully: 'Read the instructions carefully',
    },
    
    feedback: {
      correct: 'Correct',
      incorrect: 'Incorrect. Try again.',
      almostThere: 'Almost. Review your answer.',
      excellent: 'Excellent',
      tryAgain: 'Please try again.',
    },
  },
}

export default neutralContent
