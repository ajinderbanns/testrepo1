/**
 * Walkthrough Content
 * 
 * Step-by-step content for the interactive walkthrough tutorial.
 * Each step explains different aspects of the application.
 * 
 * @module walkthroughContent
 */

/**
 * Walkthrough Steps
 * 
 * Array of step objects containing title, content, and visual elements.
 * Steps are shown sequentially to guide users through the app.
 */
export const walkthroughSteps = [
  {
    id: 'welcome',
    title: 'Welcome to LLM Education!',
    content: `Welcome to your personalized learning journey! This quick tutorial will help you understand how to navigate the platform and make the most of your learning experience.`,
    icon: '👋',
    animation: 'fade-in',
    highlights: [],
  },
  {
    id: 'structure',
    title: 'App Structure',
    content: `The app is organized into three progressive modules, each building on the previous one. You'll start with the basics and work your way up to advanced concepts about Large Language Models.`,
    icon: '📚',
    animation: 'slide-up',
    highlights: ['modules'],
    features: [
      '📖 Module 1: Introduction to LLMs',
      '🔍 Module 2: Core Mechanics',
      '🎓 Module 3: Comprehensive Overview',
    ],
  },
  {
    id: 'progress',
    title: 'Progress Tracking',
    content: `Your progress is automatically saved as you complete sections. The "Continue Learning" card always takes you back to where you left off, so you can pick up right where you stopped.`,
    icon: '📊',
    animation: 'slide-left',
    highlights: ['progress'],
    features: [
      '✅ Automatic progress saving',
      '🔄 Resume from any device',
      '🎯 Track module completion',
    ],
  },
  {
    id: 'navigation',
    title: 'Navigation Patterns',
    content: `Each module contains multiple sections. Use the navigation controls at the bottom of each page to move forward and backward. You can also jump directly to any section you've already unlocked.`,
    icon: '🧭',
    animation: 'slide-right',
    highlights: ['navigation'],
    features: [
      '⬅️ Previous / Next buttons',
      '📍 Section indicators',
      '🔓 Jump to completed sections',
    ],
  },
  {
    id: 'journey',
    title: 'Your Learning Journey',
    content: `Every module combines theory, visualizations, and interactive exercises. Take your time to explore animations, experiment with interactive components, and test your understanding.`,
    icon: '🚀',
    animation: 'zoom-in',
    highlights: ['learning'],
    features: [
      '📝 Clear explanations',
      '🎨 Beautiful visualizations',
      '🎮 Interactive exercises',
      '💡 Real-world examples',
    ],
  },
  {
    id: 'interactions',
    title: 'Interactive Elements',
    content: `Look for animations, hover effects, and clickable elements throughout the modules. Many concepts are brought to life with interactive visualizations that respond to your input.`,
    icon: '✨',
    animation: 'pulse',
    highlights: ['interactive'],
    features: [
      '🖱️ Hover for details',
      '👆 Click to interact',
      '🎭 Animated demonstrations',
      '🎯 Hands-on exercises',
    ],
  },
  {
    id: 'help',
    title: 'Need Help?',
    content: `You can access this tutorial anytime by clicking the help icon in the top corner. Feel free to explore at your own pace, and remember - learning is a journey, not a race!`,
    icon: '❓',
    animation: 'bounce',
    highlights: ['help'],
    features: [
      '🔄 Replay this tutorial anytime',
      '⚙️ Customize your experience',
      '📱 Fully mobile responsive',
    ],
  },
]

/**
 * Get Total Steps Count
 * 
 * @returns {number} Total number of walkthrough steps
 */
export const getTotalSteps = () => walkthroughSteps.length

/**
 * Get Step by ID
 * 
 * @param {string} stepId - ID of the step to retrieve
 * @returns {Object|null} Step object or null if not found
 */
export const getStepById = (stepId) => {
  return walkthroughSteps.find((step) => step.id === stepId) || null
}

/**
 * Get Step by Index
 * 
 * @param {number} index - Zero-based index of the step
 * @returns {Object|null} Step object or null if index is out of bounds
 */
export const getStepByIndex = (index) => {
  if (index < 0 || index >= walkthroughSteps.length) {
    return null
  }
  return walkthroughSteps[index]
}

/**
 * Check if Step is First
 * 
 * @param {number} index - Step index
 * @returns {boolean} True if this is the first step
 */
export const isFirstStep = (index) => index === 0

/**
 * Check if Step is Last
 * 
 * @param {number} index - Step index
 * @returns {boolean} True if this is the last step
 */
export const isLastStep = (index) => index === walkthroughSteps.length - 1

export default walkthroughSteps
