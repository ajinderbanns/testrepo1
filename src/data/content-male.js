/**
 * Male Theme Content - Euphoria-Inspired
 * 
 * Tech-focused, gaming analogies, competitive gamification,
 * direct communication style.
 * 
 * @module data/content-male
 */

import { completionExamples, promptVariations, sentenceBuilderExercises } from './module1Examples'
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
 * Male Theme Content Object
 * 
 * Contains all gender-specific content for the male theme including
 * module content, gamification elements, and UI copy.
 */
export const maleContent = {
  /**
   * Module-Specific Content
   */
  modules: {
    module1: {
      title: 'Introduction to LLMs',
      subtitle: 'Master the Fundamentals',
      
      intro: {
        title: 'Level Up Your AI Knowledge',
        description: 'Think of this as your training mode for understanding AI. You\'ll unlock new abilities as you progress through interactive challenges and real-world examples.',
        analogy: 'Learning LLMs is like mastering a new game mechanic—start with the basics, practice the fundamentals, and soon you\'ll be executing advanced strategies.',
      },
      
      sections: {
        intro: {
          title: 'Getting Started',
          description: 'Jump into the fundamentals and build your foundation.',
          objectives: [
            'Understand what LLMs are and how they work',
            'Learn the basic architecture and components',
            'Identify key capabilities and limitations',
          ],
        },
        
        textGeneration: {
          title: 'Text Generation Mechanics',
          description: 'See how LLMs generate text one token at a time.',
          analogy: 'Text generation is like auto-complete on steroids—the model predicts the next best move based on everything that came before.',
          examples: completionExamples.male,
        },
        
        examples: {
          title: 'Prompt Engineering Lab',
          description: 'Experiment with different prompts and observe the results.',
          analogy: 'Prompts are like console commands—the more precise your input, the better your output.',
          variations: promptVariations.male,
        },
        
        exercises: {
          title: 'Practice Arena',
          description: 'Test your skills with interactive challenges.',
          instructions: 'Complete the exercises to unlock the next section.',
          exercises: sentenceBuilderExercises.male,
        },
        
        summary: {
          title: 'Mission Complete',
          keyTakeaways: [
            'LLMs generate text by predicting the next token',
            'Better prompts lead to better outputs',
            'Understanding the basics sets you up for advanced techniques',
          ],
        },
      },
    },
    
    module2: {
      title: 'Core Mechanics',
      subtitle: 'Deep Dive into the Engine',
      
      intro: {
        title: 'Understanding the Algorithm',
        description: 'Time to explore what\'s under the hood. This module breaks down the core components that make LLMs work.',
        analogy: 'Think of this as reading the game\'s source code—you\'ll understand exactly how the magic happens.',
      },
      
      sections: {
        tokenization: {
          ...tokenizationContent.male,
          title: 'Breaking Down Input',
          description: 'Learn how text is processed into tokens.',
        },
        
        embeddings: {
          ...embeddingsContent.male,
          title: 'Mapping Meaning',
          description: 'Discover how words become numbers.',
        },
        
        attention: {
          ...attentionContent.male,
          title: 'Context Processing',
          description: 'See how models focus on relevant information.',
        },
        
        interactive: {
          title: 'Hands-On Lab',
          description: 'Experiment with tokenization, embeddings, and attention.',
          examples: module2Interactive,
        },
      },
      
      quiz: module2Quiz,
    },
    
    module3: {
      title: 'Comprehensive Overview',
      subtitle: 'Putting It All Together',
      
      intro: {
        title: 'Final Boss: Complete System',
        description: 'You\'ve learned the components—now see how they work together in a complete system.',
        analogy: 'This is like understanding the full game loop: input → processing → output → feedback.',
      },
      
      sections: {
        training: {
          ...trainingExamples.male,
          title: 'Training Phase',
          description: 'How models learn from data.',
          analogy: 'Training is like grinding XP—the model faces challenges, learns from mistakes, and levels up its capabilities.',
        },
        
        inference: {
          ...inferenceExamples.male,
          title: 'Inference Phase',
          description: 'How trained models generate responses.',
          analogy: 'Inference is executing in real-time—using all the learned skills to perform optimally.',
        },
        
        architecture: {
          ...architectureConfig,
          title: 'System Architecture',
          description: 'The complete transformer architecture.',
          analogy: 'The architecture is like the game engine—all the components working in harmony.',
        },
        
        synthesis: {
          ...synthesisContent,
          title: 'Final Challenge',
          description: 'Apply everything you\'ve learned.',
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
        name: 'System Initialized',
        icon: '⚡',
        description: 'Started your journey into LLMs',
      },
      moduleComplete: {
        name: 'Level Cleared',
        icon: '🎯',
        description: 'Completed a module',
      },
      allModules: {
        name: 'Master Achieved',
        icon: '👑',
        description: 'Completed all modules',
      },
      perfectScore: {
        name: 'Flawless Victory',
        icon: '💎',
        description: 'Aced all exercises in a module',
      },
      speedRun: {
        name: 'Speed Demon',
        icon: '⚡',
        description: 'Completed a module in record time',
      },
      explorer: {
        name: 'Code Explorer',
        icon: '🔍',
        description: 'Tried all interactive examples',
      },
    },
    
    celebrations: {
      sectionComplete: {
        title: 'Section Cleared!',
        message: 'Nice work! Keep the momentum going.',
        icon: '✓',
      },
      moduleComplete: {
        title: 'Module Complete!',
        message: 'Achievement unlocked! Ready for the next challenge?',
        icon: '🎯',
      },
      allComplete: {
        title: 'Game Complete!',
        message: 'You\'ve mastered LLMs. Time to build something amazing.',
        icon: '👑',
      },
    },
    
    progress: {
      streakText: '{count} day streak',
      completionText: '{percentage}% complete',
      nextMilestone: 'Next: {milestone}',
      encouragement: [
        'Keep pushing!',
        'You\'re crushing it!',
        'Level up in progress...',
        'Dominating the material!',
      ],
    },
  },
  
  /**
   * UI Content
   */
  ui: {
    navigation: {
      next: 'Next →',
      previous: '← Back',
      continue: 'Continue',
      startModule: 'Start Module',
      backToLearning: '← Back to Learning',
      finish: 'Finish',
    },
    
    buttons: {
      tryExample: 'Run Example',
      resetExercise: 'Reset',
      checkAnswer: 'Check',
      submit: 'Submit',
      skip: 'Skip',
      viewSolution: 'Show Solution',
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
      selectAnswer: 'Select your answer',
      completeExercise: 'Complete the exercise to continue',
      experimentFreely: 'Experiment with different inputs',
      readCarefully: 'Read the prompt carefully',
    },
    
    feedback: {
      correct: 'Correct! Well executed.',
      incorrect: 'Not quite. Try again.',
      almostThere: 'Close! Check your logic.',
      excellent: 'Excellent work!',
      tryAgain: 'Give it another shot.',
    },
  },
}

export default maleContent
