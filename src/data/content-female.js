/**
 * Female Theme Content - Summer/Sex Education-Inspired
 * 
 * Relatable storytelling, social/communication analogies,
 * collaborative gamification, warm communication style.
 * 
 * @module data/content-female
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
 * Female Theme Content Object
 * 
 * Contains all gender-specific content for the female theme including
 * module content, gamification elements, and UI copy.
 */
export const femaleContent = {
  /**
   * Module-Specific Content
   */
  modules: {
    module1: {
      title: 'Introduction to LLMs',
      subtitle: 'Begin Your Journey',
      
      intro: {
        title: 'Welcome to Your Learning Journey',
        description: 'Let\'s explore AI together through stories, examples, and hands-on practice. You\'ll build confidence as you discover how these fascinating systems work.',
        analogy: 'Learning about LLMs is like learning a new language—start with simple phrases, practice regularly, and soon you\'ll be having full conversations.',
      },
      
      sections: {
        intro: {
          title: 'Getting Started',
          description: 'Let\'s begin at the beginning and build understanding together.',
          objectives: [
            'Understand what LLMs are and why they matter',
            'Explore the basic structure and how it works',
            'Discover what these systems can (and can\'t) do',
          ],
        },
        
        textGeneration: {
          title: 'How Text Comes to Life',
          description: 'See how AI crafts responses one piece at a time.',
          analogy: 'Text generation is like storytelling—each word builds on what came before, creating a natural flow of ideas.',
          examples: completionExamples.female,
        },
        
        examples: {
          title: 'Creative Exploration',
          description: 'Play with different prompts and discover the possibilities.',
          analogy: 'Prompts are like conversation starters—the more thought you put in, the richer the conversation becomes.',
          variations: promptVariations.female,
        },
        
        exercises: {
          title: 'Practice Space',
          description: 'Try your hand at interactive exercises.',
          instructions: 'Take your time and explore each exercise.',
          exercises: sentenceBuilderExercises.female,
        },
        
        summary: {
          title: 'Celebrating Progress',
          keyTakeaways: [
            'LLMs create text by thoughtfully predicting what comes next',
            'The way we ask questions shapes the answers we receive',
            'Building this foundation prepares us for deeper exploration',
          ],
        },
      },
    },
    
    module2: {
      title: 'Core Mechanics',
      subtitle: 'Understanding the Heart of AI',
      
      intro: {
        title: 'Exploring the Inner Workings',
        description: 'Now that we\'ve seen what LLMs can do, let\'s understand how they do it. We\'ll break down complex ideas into relatable concepts.',
        analogy: 'Think of this as understanding how a story unfolds—each element plays a role in creating the whole experience.',
      },
      
      sections: {
        tokenization: {
          ...tokenizationContent.female,
          title: 'Making Sense of Language',
          description: 'How AI breaks down and understands text.',
        },
        
        embeddings: {
          ...embeddingsContent.female,
          title: 'Capturing Meaning',
          description: 'How words carry and connect meaning.',
        },
        
        attention: {
          ...attentionContent.female,
          title: 'Understanding Context',
          description: 'How AI knows what matters most.',
        },
        
        interactive: {
          title: 'Interactive Exploration',
          description: 'Experience tokenization, embeddings, and attention firsthand.',
          examples: module2Interactive,
        },
      },
      
      quiz: module2Quiz,
    },
    
    module3: {
      title: 'Comprehensive Overview',
      subtitle: 'Bringing It All Together',
      
      intro: {
        title: 'The Complete Picture',
        description: 'You\'ve learned the pieces—now let\'s see how they create something beautiful together.',
        analogy: 'This is like understanding a complete narrative: setup → development → resolution → meaning.',
      },
      
      sections: {
        training: {
          ...trainingExamples.female,
          title: 'The Learning Journey',
          description: 'How models develop understanding from experience.',
          analogy: 'Training is like learning from life experiences—the model encounters situations, receives feedback, and grows wiser over time.',
        },
        
        inference: {
          ...inferenceExamples.female,
          title: 'Putting Knowledge to Use',
          description: 'How trained models create responses.',
          analogy: 'Inference is applying everything learned—using wisdom gained to respond thoughtfully.',
        },
        
        architecture: {
          ...architectureConfig,
          title: 'The Complete System',
          description: 'Understanding the full architecture.',
          analogy: 'The architecture is like a well-orchestrated story—every element working together to create meaning.',
        },
        
        synthesis: {
          ...synthesisContent,
          title: 'Your Journey Synthesis',
          description: 'Reflect on everything you\'ve discovered.',
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
        name: 'First Steps',
        icon: '🌱',
        description: 'Began your learning journey',
      },
      moduleComplete: {
        name: 'Milestone Reached',
        icon: '✨',
        description: 'Completed a module',
      },
      allModules: {
        name: 'Journey Complete',
        icon: '🌟',
        description: 'Completed all modules',
      },
      perfectScore: {
        name: 'Brilliant Work',
        icon: '💫',
        description: 'Excelled in all exercises',
      },
      speedRun: {
        name: 'Quick Learner',
        icon: '⚡',
        description: 'Completed a module efficiently',
      },
      explorer: {
        name: 'Curious Mind',
        icon: '🔍',
        description: 'Explored all interactive examples',
      },
    },
    
    celebrations: {
      sectionComplete: {
        title: 'Section Complete!',
        message: 'You\'re making wonderful progress. Keep going!',
        icon: '✓',
      },
      moduleComplete: {
        title: 'Module Complete!',
        message: 'What an accomplishment! You should be proud of this milestone.',
        icon: '✨',
      },
      allComplete: {
        title: 'Journey Complete!',
        message: 'You\'ve learned so much! You\'re ready to create amazing things.',
        icon: '🌟',
      },
    },
    
    progress: {
      streakText: '{count} day learning streak',
      completionText: '{percentage}% of your journey',
      nextMilestone: 'Coming up: {milestone}',
      encouragement: [
        'You\'re doing great!',
        'Keep up the wonderful work!',
        'Your progress is inspiring!',
        'Learning beautifully!',
      ],
    },
  },
  
  /**
   * UI Content
   */
  ui: {
    navigation: {
      next: 'Continue →',
      previous: '← Previous',
      continue: 'Continue',
      startModule: 'Begin Module',
      backToLearning: '← Back to Learning',
      finish: 'Complete',
    },
    
    buttons: {
      tryExample: 'Try This Example',
      resetExercise: 'Start Over',
      checkAnswer: 'Check My Answer',
      submit: 'Submit',
      skip: 'Skip for Now',
      viewSolution: 'See Solution',
    },
    
    labels: {
      loading: 'Loading...',
      processing: 'Processing...',
      completed: 'Completed',
      inProgress: 'In Progress',
      locked: 'Not Yet Available',
      optional: 'Optional',
      required: 'Required',
    },
    
    instructions: {
      selectAnswer: 'Choose the answer that feels right',
      completeExercise: 'Complete this exercise to move forward',
      experimentFreely: 'Feel free to explore and experiment',
      readCarefully: 'Take a moment to read this carefully',
    },
    
    feedback: {
      correct: 'That\'s right! Nicely done.',
      incorrect: 'Not quite there. Let\'s try again.',
      almostThere: 'You\'re so close! Think about it a bit more.',
      excellent: 'Excellent! You really understand this.',
      tryAgain: 'Give it another try—you\'ve got this.',
    },
  },
}

export default femaleContent
