/**
 * Module 3 Content Data
 * 
 * Content definitions, examples, and gender-differentiated data for Module 3 sections.
 * 
 * @module data/module3Content
 */

/**
 * Training Examples - Gender Differentiated
 * 
 * Examples showing different use cases and contexts for training scenarios
 */
export const trainingExamples = {
  male: {
    title: 'Training a Coding Assistant',
    scenario: 'Building a model that helps developers write better code',
    dataExamples: [
      { input: 'How do I sort an array?', output: 'Use the .sort() method with a comparison function' },
      { input: 'Explain async/await', output: 'Async/await is syntactic sugar for promises...' },
      { input: 'Debug this code', output: 'The issue is in line 5 where the variable...' },
    ],
    improvementSteps: [
      'Model learns common coding patterns',
      'Recognizes programming language syntax',
      'Improves suggestions based on feedback',
      'Generates more accurate code completions',
    ],
  },
  female: {
    title: 'Training a Creative Writing Assistant',
    scenario: 'Building a model that helps authors craft compelling stories',
    dataExamples: [
      { input: 'Start a mystery story', output: 'The old manor stood silent under the moonlight...' },
      { input: 'Describe a character', output: 'Her eyes held secrets that words could never capture...' },
      { input: 'Continue this dialogue', output: '"I never meant to hurt you," she whispered...' },
    ],
    improvementSteps: [
      'Model learns narrative structures',
      'Recognizes literary devices and tone',
      'Improves character development suggestions',
      'Generates more engaging story continuations',
    ],
  },
}

/**
 * Inference Examples - Gender Differentiated
 * 
 * Step-by-step demonstrations of text generation
 */
export const inferenceExamples = {
  male: {
    prompt: 'Write a function to calculate factorial',
    steps: [
      { token: 'function', probability: 0.95, explanation: 'High confidence - starting function definition' },
      { token: ' factorial', probability: 0.89, explanation: 'Descriptive function name' },
      { token: '(', probability: 0.98, explanation: 'Opening parenthesis for parameters' },
      { token: 'n', probability: 0.92, explanation: 'Parameter name for input number' },
      { token: ')', probability: 0.99, explanation: 'Closing parenthesis' },
      { token: ' {', probability: 0.97, explanation: 'Opening function body' },
      { token: '\n  ', probability: 0.85, explanation: 'Indentation for function body' },
      { token: 'if', probability: 0.88, explanation: 'Starting base case condition' },
      { token: ' (', probability: 0.96, explanation: 'Opening condition' },
      { token: 'n', probability: 0.94, explanation: 'Checking parameter value' },
      { token: ' <=', probability: 0.81, explanation: 'Less than or equal comparison' },
      { token: ' 1', probability: 0.92, explanation: 'Base case value' },
      { token: ')', probability: 0.99, explanation: 'Closing condition' },
      { token: ' return', probability: 0.93, explanation: 'Return base case' },
      { token: ' 1', probability: 0.95, explanation: 'Return value' },
    ],
  },
  female: {
    prompt: 'Describe a sunset over the ocean',
    steps: [
      { token: 'The', probability: 0.92, explanation: 'Starting with definite article' },
      { token: ' sun', probability: 0.96, explanation: 'Subject of the scene' },
      { token: ' dipped', probability: 0.87, explanation: 'Vivid action verb' },
      { token: ' below', probability: 0.93, explanation: 'Direction of movement' },
      { token: ' the', probability: 0.95, explanation: 'Article for horizon' },
      { token: ' horizon', probability: 0.94, explanation: 'Natural completion' },
      { token: ',', probability: 0.88, explanation: 'Pause for description' },
      { token: ' painting', probability: 0.85, explanation: 'Metaphorical verb' },
      { token: ' the', probability: 0.96, explanation: 'Article for sky' },
      { token: ' sky', probability: 0.94, explanation: 'Canvas for colors' },
      { token: ' in', probability: 0.91, explanation: 'Preposition for colors' },
      { token: ' shades', probability: 0.84, explanation: 'Variety of colors' },
      { token: ' of', probability: 0.97, explanation: 'Connecting phrase' },
      { token: ' orange', probability: 0.79, explanation: 'Sunset color' },
      { token: ' and', probability: 0.92, explanation: 'Conjunction for additional color' },
    ],
  },
}

/**
 * Architecture Animation Data
 * 
 * Configuration for transformer architecture visualization
 */
export const architectureConfig = {
  layers: [
    {
      name: 'Input Embeddings',
      type: 'embedding',
      description: 'Tokens converted to numerical vectors',
      color: 'primary',
    },
    {
      name: 'Positional Encoding',
      type: 'positional',
      description: 'Adding position information to embeddings',
      color: 'accent',
    },
    {
      name: 'Multi-Head Attention',
      type: 'attention',
      description: 'Tokens attend to relevant context',
      color: 'success',
      heads: 8,
    },
    {
      name: 'Feed-Forward Network',
      type: 'feedforward',
      description: 'Processing and transformation',
      color: 'warning',
    },
    {
      name: 'Output Layer',
      type: 'output',
      description: 'Generating probability distribution',
      color: 'primary',
    },
  ],
  flowAnimation: {
    duration: 2000,
    stagger: 300,
  },
}

/**
 * Synthesis Content
 * 
 * Content for bringing all concepts together
 */
export const synthesisContent = {
  conceptConnections: [
    {
      modules: [1, 2, 3],
      connection: 'Text generation uses tokenization and attention during both training and inference',
      example: 'When you prompt a model, it tokenizes your input, applies attention to understand context, and generates tokens one by one.',
    },
    {
      modules: [2, 3],
      connection: 'Embeddings capture meaning, attention determines relevance',
      example: 'Word embeddings place similar words close together, and attention helps the model focus on the most relevant words for each prediction.',
    },
    {
      modules: [1, 2, 3],
      connection: 'The complete pipeline: prompt → tokens → embeddings → attention → generation',
      example: 'Every interaction with an LLM follows this flow, combining all the concepts you\'ve learned.',
    },
  ],
  keyTakeaways: [
    'LLMs learn patterns from vast amounts of text data through training',
    'During inference, models use learned patterns to generate new text token by token',
    'The transformer architecture with attention enables understanding of context',
    'All components work together: tokenization, embeddings, attention, and generation',
  ],
  interactiveChallenge: {
    title: 'Put Your Knowledge to the Test',
    description: 'Try to predict what happens at each stage of this text generation',
    prompt: 'Explain how a neural network learns',
    stages: [
      { stage: 'tokenization', question: 'How is this prompt broken down?' },
      { stage: 'embedding', question: 'What happens to the tokens?' },
      { stage: 'attention', question: 'Which words might the model focus on?' },
      { stage: 'generation', question: 'How does it start generating a response?' },
    ],
  },
}

/**
 * Quiz Questions for Module 3
 */
export const quizQuestions = {
  training: [
    {
      id: 'training_q1',
      question: 'What is the main goal of training an LLM?',
      options: [
        'To make it run faster',
        'To teach it patterns in language data',
        'To reduce its size',
        'To make it use less memory',
      ],
      correctIndex: 1,
      explanation: 'Training teaches the model patterns in language by exposing it to vast amounts of text data and adjusting its parameters.',
    },
    {
      id: 'training_q2',
      question: 'How does a model improve during training?',
      options: [
        'By getting faster at processing',
        'By using less memory',
        'By receiving feedback and adjusting predictions',
        'By downloading more data',
      ],
      correctIndex: 2,
      explanation: 'Models improve through feedback loops: they make predictions, receive correction signals, and adjust their internal parameters to make better predictions.',
    },
  ],
  inference: [
    {
      id: 'inference_q1',
      question: 'What happens during inference?',
      options: [
        'The model continues training',
        'The model generates new text based on learned patterns',
        'The model updates its parameters',
        'The model learns from user input',
      ],
      correctIndex: 1,
      explanation: 'During inference, the model uses its learned patterns to generate new text without updating its parameters.',
    },
    {
      id: 'inference_q2',
      question: 'How does token generation work?',
      options: [
        'All tokens are generated simultaneously',
        'Tokens are selected randomly',
        'Tokens are generated one at a time, each influencing the next',
        'Tokens are copied from the training data',
      ],
      correctIndex: 2,
      explanation: 'Text generation is sequential: each token is generated based on all previous tokens, creating coherent sequences.',
    },
  ],
  architecture: [
    {
      id: 'architecture_q1',
      question: 'What is the key innovation of the transformer architecture?',
      options: [
        'It uses less memory',
        'It has the attention mechanism',
        'It trains faster than other models',
        'It requires less data',
      ],
      correctIndex: 1,
      explanation: 'The attention mechanism is the key innovation, allowing models to dynamically focus on relevant parts of the input.',
    },
    {
      id: 'architecture_q2',
      question: 'How does information flow through a transformer?',
      options: [
        'Randomly between layers',
        'Only in one direction',
        'Through sequential layers, with attention connecting tokens',
        'Information stays in separate layers',
      ],
      correctIndex: 2,
      explanation: 'Information flows through sequential layers, with attention mechanisms allowing tokens to communicate and share context.',
    },
  ],
}
