/**
 * Text Generation Examples - Pre-scripted Sequences
 * 
 * Contains pre-determined generation sequences showing how LLMs
 * generate text token-by-token with timing and probability hints.
 * 
 * Each example includes:
 * - Gender-specific prompts
 * - Token sequence with timing delays
 * - Probability indicators for visual feedback
 * - Description of what's being demonstrated
 * 
 * @module visualizations/textGenerationExamples
 */

/**
 * Example 1: Simple Question-Answer
 * Demonstrates basic text generation with clear token progression
 */
export const simpleQAExample = {
  id: 'simple-qa',
  title: {
    male: 'Coding Assistant Query',
    female: 'Writing Helper Query',
  },
  description: {
    male: 'Watch how an LLM generates a response to a programming question, one token at a time.',
    female: 'See how an LLM crafts a thoughtful response to a writing question, word by word.',
  },
  prompt: {
    male: 'How do I iterate over an array in JavaScript?',
    female: 'How can I make my writing more engaging?',
  },
  tokens: {
    male: [
      { text: 'There', delay: 100, probability: 0.92 },
      { text: ' are', delay: 80, probability: 0.95 },
      { text: ' several', delay: 90, probability: 0.88 },
      { text: ' ways', delay: 85, probability: 0.91 },
      { text: ' to', delay: 75, probability: 0.94 },
      { text: ' iterate', delay: 120, probability: 0.87 },
      { text: ' over', delay: 80, probability: 0.93 },
      { text: ' an', delay: 70, probability: 0.96 },
      { text: ' array', delay: 90, probability: 0.89 },
      { text: ' in', delay: 75, probability: 0.95 },
      { text: ' JavaScript', delay: 110, probability: 0.90 },
      { text: '.', delay: 80, probability: 0.97 },
      { text: ' The', delay: 100, probability: 0.85 },
      { text: ' most', delay: 85, probability: 0.88 },
      { text: ' common', delay: 90, probability: 0.91 },
      { text: ' methods', delay: 95, probability: 0.86 },
      { text: ' are', delay: 80, probability: 0.94 },
      { text: ':', delay: 85, probability: 0.89 },
      { text: '\n\n', delay: 120, probability: 0.92 },
      { text: '1', delay: 90, probability: 0.87 },
      { text: '.', delay: 75, probability: 0.95 },
      { text: ' for', delay: 85, probability: 0.91 },
      { text: ' loop', delay: 90, probability: 0.88 },
      { text: ' -', delay: 80, probability: 0.93 },
      { text: ' Traditional', delay: 110, probability: 0.84 },
      { text: ' and', delay: 80, probability: 0.92 },
      { text: ' versatile', delay: 100, probability: 0.86 },
    ],
    female: [
      { text: 'To', delay: 95, probability: 0.91 },
      { text: ' make', delay: 85, probability: 0.93 },
      { text: ' your', delay: 80, probability: 0.95 },
      { text: ' writing', delay: 100, probability: 0.89 },
      { text: ' more', delay: 75, probability: 0.94 },
      { text: ' engaging', delay: 110, probability: 0.87 },
      { text: ',', delay: 80, probability: 0.96 },
      { text: ' try', delay: 90, probability: 0.88 },
      { text: ' these', delay: 85, probability: 0.92 },
      { text: ' techniques', delay: 105, probability: 0.86 },
      { text: ':', delay: 80, probability: 0.94 },
      { text: '\n\n', delay: 120, probability: 0.90 },
      { text: 'Start', delay: 95, probability: 0.87 },
      { text: ' with', delay: 80, probability: 0.93 },
      { text: ' a', delay: 70, probability: 0.95 },
      { text: ' compelling', delay: 110, probability: 0.84 },
      { text: ' hook', delay: 90, probability: 0.88 },
      { text: ' -', delay: 80, probability: 0.92 },
      { text: ' capture', delay: 100, probability: 0.86 },
      { text: ' attention', delay: 95, probability: 0.89 },
      { text: ' from', delay: 80, probability: 0.93 },
      { text: ' the', delay: 75, probability: 0.95 },
      { text: ' first', delay: 85, probability: 0.91 },
      { text: ' sentence', delay: 100, probability: 0.87 },
    ],
  },
}

/**
 * Example 2: Creative Completion
 * Shows more varied probabilities and creative token selection
 */
export const creativeExample = {
  id: 'creative',
  title: {
    male: 'Code Function Naming',
    female: 'Story Opening',
  },
  description: {
    male: 'See how the model considers multiple options when generating creative function names.',
    female: 'Watch the model craft an engaging story opening with varied word choices.',
  },
  prompt: {
    male: 'Suggest a function name for calculating user engagement metrics',
    female: 'Write the opening line of a story about discovering something unexpected',
  },
  tokens: {
    male: [
      { text: 'A', delay: 100, probability: 0.89 },
      { text: ' good', delay: 90, probability: 0.85 },
      { text: ' function', delay: 95, probability: 0.92 },
      { text: ' name', delay: 85, probability: 0.94 },
      { text: ' would', delay: 80, probability: 0.87 },
      { text: ' be', delay: 75, probability: 0.93 },
      { text: ' `', delay: 90, probability: 0.88 },
      { text: 'calculate', delay: 110, probability: 0.78 },
      { text: 'User', delay: 95, probability: 0.82 },
      { text: 'Engagement', delay: 105, probability: 0.80 },
      { text: 'Metrics', delay: 100, probability: 0.76 },
      { text: '`.', delay: 85, probability: 0.91 },
      { text: ' This', delay: 90, probability: 0.84 },
      { text: ' name', delay: 85, probability: 0.88 },
      { text: ' is', delay: 75, probability: 0.93 },
      { text: ' descriptive', delay: 110, probability: 0.79 },
      { text: ',', delay: 80, probability: 0.95 },
      { text: ' follows', delay: 95, probability: 0.81 },
      { text: ' camel', delay: 90, probability: 0.77 },
      { text: 'Case', delay: 85, probability: 0.83 },
      { text: ' convention', delay: 105, probability: 0.80 },
    ],
    female: [
      { text: 'She', delay: 105, probability: 0.72 },
      { text: ' found', delay: 95, probability: 0.81 },
      { text: ' the', delay: 80, probability: 0.90 },
      { text: ' letter', delay: 110, probability: 0.68 },
      { text: ' tucked', delay: 100, probability: 0.65 },
      { text: ' between', delay: 95, probability: 0.78 },
      { text: ' the', delay: 80, probability: 0.92 },
      { text: ' pages', delay: 90, probability: 0.75 },
      { text: ' of', delay: 75, probability: 0.94 },
      { text: ' her', delay: 85, probability: 0.83 },
      { text: ' grandmother', delay: 115, probability: 0.69 },
      { text: "'s", delay: 75, probability: 0.91 },
      { text: ' journal', delay: 100, probability: 0.74 },
      { text: ',', delay: 80, probability: 0.88 },
      { text: ' yellowed', delay: 105, probability: 0.62 },
      { text: ' with', delay: 85, probability: 0.87 },
      { text: ' age', delay: 90, probability: 0.79 },
      { text: ' and', delay: 75, probability: 0.92 },
      { text: ' secrets', delay: 100, probability: 0.66 },
    ],
  },
}

/**
 * Example 3: Step-by-Step Explanation
 * Demonstrates logical progression and structured thinking
 */
export const explanationExample = {
  id: 'explanation',
  title: {
    male: 'Debug Strategy',
    female: 'Communication Approach',
  },
  description: {
    male: 'Observe how the model structures a systematic debugging approach step by step.',
    female: 'See how the model builds a thoughtful communication strategy piece by piece.',
  },
  prompt: {
    male: 'What steps should I take to debug a memory leak?',
    female: 'How should I approach a difficult conversation?',
  },
  tokens: {
    male: [
      { text: 'To', delay: 90, probability: 0.93 },
      { text: ' debug', delay: 100, probability: 0.89 },
      { text: ' a', delay: 75, probability: 0.96 },
      { text: ' memory', delay: 95, probability: 0.87 },
      { text: ' leak', delay: 90, probability: 0.91 },
      { text: ',', delay: 80, probability: 0.95 },
      { text: ' follow', delay: 95, probability: 0.86 },
      { text: ' these', delay: 85, probability: 0.92 },
      { text: ' systematic', delay: 110, probability: 0.81 },
      { text: ' steps', delay: 90, probability: 0.88 },
      { text: ':', delay: 80, probability: 0.94 },
      { text: '\n\n', delay: 120, probability: 0.91 },
      { text: '1', delay: 85, probability: 0.89 },
      { text: '.', delay: 75, probability: 0.96 },
      { text: ' Reproduce', delay: 105, probability: 0.82 },
      { text: ' the', delay: 80, probability: 0.94 },
      { text: ' issue', delay: 90, probability: 0.87 },
      { text: ' consistently', delay: 110, probability: 0.79 },
      { text: '\n', delay: 100, probability: 0.92 },
      { text: '2', delay: 85, probability: 0.88 },
      { text: '.', delay: 75, probability: 0.95 },
      { text: ' Use', delay: 90, probability: 0.85 },
      { text: ' profiling', delay: 105, probability: 0.80 },
      { text: ' tools', delay: 95, probability: 0.86 },
    ],
    female: [
      { text: 'Approaching', delay: 105, probability: 0.84 },
      { text: ' a', delay: 75, probability: 0.95 },
      { text: ' difficult', delay: 100, probability: 0.88 },
      { text: ' conversation', delay: 110, probability: 0.86 },
      { text: ' requires', delay: 95, probability: 0.82 },
      { text: ' thoughtful', delay: 105, probability: 0.79 },
      { text: ' preparation', delay: 110, probability: 0.81 },
      { text: ':', delay: 80, probability: 0.93 },
      { text: '\n\n', delay: 120, probability: 0.90 },
      { text: 'First', delay: 95, probability: 0.87 },
      { text: ',', delay: 75, probability: 0.94 },
      { text: ' clarify', delay: 100, probability: 0.80 },
      { text: ' your', delay: 85, probability: 0.92 },
      { text: ' intention', delay: 105, probability: 0.78 },
      { text: ' -', delay: 80, probability: 0.91 },
      { text: ' what', delay: 85, probability: 0.89 },
      { text: ' outcome', delay: 100, probability: 0.83 },
      { text: ' do', delay: 80, probability: 0.92 },
      { text: ' you', delay: 75, probability: 0.95 },
      { text: ' hope', delay: 95, probability: 0.81 },
      { text: ' to', delay: 75, probability: 0.94 },
      { text: ' achieve', delay: 100, probability: 0.85 },
      { text: '?', delay: 85, probability: 0.90 },
    ],
  },
}

/**
 * All examples exported as array for easy iteration
 */
export const textGenerationExamples = [
  simpleQAExample,
  creativeExample,
  explanationExample,
]

export default textGenerationExamples
