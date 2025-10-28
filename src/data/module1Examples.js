/**
 * Module 1 Interactive Examples - Gender-Specific Content
 * 
 * Contains prompts, completions, and interactive exercise data
 * differentiated by gender preference for personalized learning.
 * 
 * @module data/module1Examples
 */

/**
 * Text Completion Playground Examples
 * Pre-defined example prompts users can try
 */
export const completionExamples = {
  male: [
    {
      id: 'code-debug',
      prompt: 'Write a function that finds the maximum value in an array',
      completion: 'Here\'s an efficient solution using a simple loop:\n\n```javascript\nfunction findMax(arr) {\n  if (arr.length === 0) return null;\n  \n  let max = arr[0];\n  for (let i = 1; i < arr.length; i++) {\n    if (arr[i] > max) {\n      max = arr[i];\n    }\n  }\n  return max;\n}\n```\n\nThis function handles edge cases and runs in O(n) time complexity.',
      tokens: [
        { text: "Here's", delay: 100, probability: 0.92 },
        { text: ' an', delay: 80, probability: 0.95 },
        { text: ' efficient', delay: 95, probability: 0.88 },
        { text: ' solution', delay: 90, probability: 0.91 },
        { text: ' using', delay: 85, probability: 0.93 },
        { text: ' a', delay: 75, probability: 0.96 },
        { text: ' simple', delay: 90, probability: 0.89 },
        { text: ' loop', delay: 85, probability: 0.90 },
        { text: ':', delay: 80, probability: 0.94 },
      ],
    },
    {
      id: 'game-strategy',
      prompt: 'Explain the best strategy for winning at chess openings',
      completion: 'Mastering chess openings involves several key principles:\n\n1. Control the center (e4, d4, e5, d5) early\n2. Develop your knights and bishops before moving the same piece twice\n3. Castle early for king safety\n4. Don\'t bring your queen out too soon\n5. Connect your rooks by clearing the back rank\n\nPopular openings like the Italian Game or Queen\'s Gambit follow these principles naturally.',
      tokens: [
        { text: 'Mastering', delay: 105, probability: 0.87 },
        { text: ' chess', delay: 90, probability: 0.93 },
        { text: ' openings', delay: 95, probability: 0.89 },
        { text: ' involves', delay: 90, probability: 0.91 },
        { text: ' several', delay: 85, probability: 0.88 },
        { text: ' key', delay: 80, probability: 0.94 },
        { text: ' principles', delay: 100, probability: 0.86 },
        { text: ':', delay: 80, probability: 0.95 },
      ],
    },
    {
      id: 'tech-explain',
      prompt: 'How does a CPU cache improve performance?',
      completion: 'CPU cache dramatically speeds up computation by storing frequently accessed data closer to the processor cores. Instead of fetching data from slow RAM (100+ cycles), the CPU can grab it from L1 cache (4 cycles) or L2 cache (12 cycles). This locality principle means programs spend less time waiting for data and more time actually executing instructions.',
      tokens: [
        { text: 'CPU', delay: 95, probability: 0.94 },
        { text: ' cache', delay: 85, probability: 0.96 },
        { text: ' dramatically', delay: 105, probability: 0.82 },
        { text: ' speeds', delay: 90, probability: 0.89 },
        { text: ' up', delay: 75, probability: 0.95 },
        { text: ' computation', delay: 110, probability: 0.87 },
        { text: ' by', delay: 80, probability: 0.93 },
        { text: ' storing', delay: 95, probability: 0.88 },
      ],
    },
  ],
  female: [
    {
      id: 'story-opening',
      prompt: 'Write the opening paragraph of a mystery novel',
      completion: 'The café was unusually quiet that Tuesday morning, the kind of silence that makes you notice small things—the drip of the espresso machine, the soft rustle of newspaper pages, the way sunlight caught the dust motes dancing above table three. That\'s where she sat, the woman in the red coat, stirring her coffee with the same spoon for the fifth minute straight. I didn\'t know it then, but that repetitive motion would haunt my dreams for months.',
      tokens: [
        { text: 'The', delay: 95, probability: 0.91 },
        { text: ' café', delay: 100, probability: 0.87 },
        { text: ' was', delay: 80, probability: 0.94 },
        { text: ' unusually', delay: 105, probability: 0.83 },
        { text: ' quiet', delay: 95, probability: 0.89 },
        { text: ' that', delay: 85, probability: 0.92 },
        { text: ' Tuesday', delay: 100, probability: 0.86 },
        { text: ' morning', delay: 90, probability: 0.90 },
        { text: ',', delay: 80, probability: 0.95 },
      ],
    },
    {
      id: 'communication-tips',
      prompt: 'Give me tips for having a difficult conversation with a friend',
      completion: 'Approaching a difficult conversation requires both courage and compassion. Start by choosing a private, comfortable setting where you both feel safe. Use "I" statements to express your feelings without accusation—"I felt hurt when..." rather than "You always..."\n\nListen actively to their perspective without planning your response. Sometimes people need to be heard before they can hear you. And remember, the goal isn\'t to win an argument, but to strengthen your connection by addressing what\'s come between you.',
      tokens: [
        { text: 'Approaching', delay: 105, probability: 0.88 },
        { text: ' a', delay: 75, probability: 0.96 },
        { text: ' difficult', delay: 100, probability: 0.90 },
        { text: ' conversation', delay: 110, probability: 0.87 },
        { text: ' requires', delay: 95, probability: 0.89 },
        { text: ' both', delay: 85, probability: 0.91 },
        { text: ' courage', delay: 100, probability: 0.84 },
        { text: ' and', delay: 80, probability: 0.94 },
        { text: ' compassion', delay: 105, probability: 0.82 },
        { text: '.', delay: 80, probability: 0.95 },
      ],
    },
    {
      id: 'creative-project',
      prompt: 'Help me plan a creative journaling practice',
      completion: 'A meaningful journaling practice blends structure with spontaneity. Try dedicating 15 minutes each morning to free-writing—let your thoughts flow without judgment or editing. \n\nIncorporate visual elements: pressed flowers, ticket stubs, quick sketches, or color swatches that capture a mood. Some days you might write pages; other days, a single quote that resonates. The key is consistency over perfection. Your journal becomes a conversation with yourself, a safe space to process emotions and celebrate small moments.',
      tokens: [
        { text: 'A', delay: 90, probability: 0.92 },
        { text: ' meaningful', delay: 105, probability: 0.85 },
        { text: ' journaling', delay: 100, probability: 0.88 },
        { text: ' practice', delay: 95, probability: 0.91 },
        { text: ' blends', delay: 100, probability: 0.81 },
        { text: ' structure', delay: 105, probability: 0.86 },
        { text: ' with', delay: 85, probability: 0.93 },
        { text: ' spontaneity', delay: 110, probability: 0.79 },
        { text: '.', delay: 80, probability: 0.94 },
      ],
    },
  ],
}

/**
 * Prompt Variation Demo Examples
 * Shows how different prompts produce different outputs
 */
export const promptVariations = {
  male: [
    {
      id: 'code-style-comparison',
      title: 'Prompt Precision Matters',
      description: 'Notice how adding specific requirements changes the output',
      variations: [
        {
          label: 'Vague Prompt',
          prompt: 'Sort an array',
          output: 'You can use the built-in sort() method:\n\narr.sort()\n\nThis will sort the array in place.',
          quality: 'basic',
        },
        {
          label: 'Specific Prompt',
          prompt: 'Sort an array of numbers in ascending order, handling edge cases',
          output: 'Here\'s a robust solution:\n\n```javascript\nfunction sortNumbers(arr) {\n  if (!Array.isArray(arr)) return [];\n  return [...arr].sort((a, b) => a - b);\n}\n```\n\nThis handles non-arrays and creates a copy to avoid mutation.',
          quality: 'detailed',
        },
        {
          label: 'Context-Rich Prompt',
          prompt: 'Write a TypeScript function to sort an array of numbers ascending, with proper types and JSDoc',
          output: '```typescript\n/**\n * Sorts an array of numbers in ascending order\n * @param arr - Array of numbers to sort\n * @returns New sorted array (original unchanged)\n */\nfunction sortNumbers(arr: number[]): number[] {\n  return [...arr].sort((a, b) => a - b);\n}\n```\n\nProperly typed with clear documentation.',
          quality: 'excellent',
        },
      ],
    },
    {
      id: 'debugging-approach',
      title: 'Specificity Gets Better Results',
      description: 'Compare generic vs. detailed problem descriptions',
      variations: [
        {
          label: 'Generic Request',
          prompt: 'My code doesn\'t work',
          output: 'To help debug, I\'d need:\n- The error message\n- What you expected\n- What actually happened\n- Relevant code snippet',
          quality: 'basic',
        },
        {
          label: 'Detailed Request',
          prompt: 'My React component throws "Cannot read property \'map\' of undefined" when rendering a list',
          output: 'This error means your array is undefined when map() is called. Common causes:\n\n1. Data hasn\'t loaded yet\n2. API returned null/undefined\n3. Conditional rendering issue\n\nSolution: Add a conditional check:\n```jsx\n{items?.map(...) || <p>Loading...</p>}\n```',
          quality: 'excellent',
        },
      ],
    },
  ],
  female: [
    {
      id: 'writing-style-comparison',
      title: 'How Prompts Shape Tone',
      description: 'See how prompt framing affects the emotional tone of responses',
      variations: [
        {
          label: 'Basic Prompt',
          prompt: 'Describe a sunset',
          output: 'The sun sets below the horizon, creating orange and pink colors in the sky. The temperature drops as evening approaches.',
          quality: 'basic',
        },
        {
          label: 'Detailed Prompt',
          prompt: 'Describe a sunset from the perspective of someone watching it after a difficult day',
          output: 'The sky bleeds into soft coral and lavender as the sun dips low, and for the first time all day, I feel my shoulders relax. There\'s something about watching the day officially end—a gentle reminder that even the hardest hours eventually surrender to rest.',
          quality: 'detailed',
        },
        {
          label: 'Context-Rich Prompt',
          prompt: 'Write a reflective description of a sunset that captures the bittersweet feeling of endings and new beginnings, using sensory details',
          output: 'The horizon drinks the sun slowly, the way you\'d savor the last sip of something precious. Warmth still clings to my skin, but the breeze carries a whisper of coolness—the day\'s final exhale. I watch the light transform from gold to rose to indigo, each shade a small goodbye, each goodbye making space for stars. Endings, I remind myself, are just pauses before the world turns toward another beginning.',
          quality: 'excellent',
        },
      ],
    },
    {
      id: 'advice-depth',
      title: 'Specificity Brings Deeper Insights',
      description: 'Notice how context creates more personalized guidance',
      variations: [
        {
          label: 'General Question',
          prompt: 'How do I be more confident?',
          output: 'Building confidence takes practice. Try setting small goals, celebrating wins, and being kind to yourself.',
          quality: 'basic',
        },
        {
          label: 'Contextualized Question',
          prompt: 'I struggle with confidence when presenting ideas in meetings. How can I speak up more?',
          output: 'Meeting anxiety is common. Try these steps:\n\n1. Prepare 1-2 points beforehand\n2. Speak early (even just to agree)\n3. Practice with "I noticed..." or "What if..."\n4. Remember: your perspective adds value\n\nStart small—even asking questions builds presence.',
          quality: 'excellent',
        },
      ],
    },
  ],
}

/**
 * Sentence Builder Exercise Data
 * Interactive word selection challenges
 */
export const sentenceBuilderExercises = {
  male: [
    {
      id: 'code-completion',
      title: 'Complete the Function',
      description: 'Select the most likely next tokens to complete this code snippet',
      context: 'function calculateTotal(items) {\n  return items',
      steps: [
        {
          position: 1,
          prompt: 'What comes after "items"?',
          correctOption: '.reduce(',
          options: [
            { text: '.map(', probability: 0.65, feedback: 'Map transforms items but doesn\'t sum them' },
            { text: '.reduce(', probability: 0.92, feedback: 'Correct! Reduce is perfect for calculating totals' },
            { text: '.filter(', probability: 0.45, feedback: 'Filter removes items but doesn\'t calculate' },
            { text: '.forEach(', probability: 0.38, feedback: 'forEach doesn\'t return a value' },
          ],
        },
        {
          position: 2,
          prompt: 'How to structure the reduce function?',
          correctOption: '(sum, item)',
          options: [
            { text: '(sum, item)', probability: 0.94, feedback: 'Correct! Accumulator and current item' },
            { text: '(item, sum)', probability: 0.68, feedback: 'Close, but convention is (accumulator, current)' },
            { text: '(total)', probability: 0.42, feedback: 'Reduce needs both accumulator and current value' },
          ],
        },
        {
          position: 3,
          prompt: 'Complete the calculation',
          correctOption: ' => sum + item.price',
          options: [
            { text: ' => sum + item', probability: 0.71, feedback: 'Need to specify item.price property' },
            { text: ' => sum + item.price', probability: 0.89, feedback: 'Perfect! Accessing the price property' },
            { text: ' => item.price', probability: 0.54, feedback: 'Missing accumulation with sum' },
          ],
        },
      ],
      completedCode: 'function calculateTotal(items) {\n  return items.reduce((sum, item) => sum + item.price, 0);\n}',
    },
    {
      id: 'algorithm-explanation',
      title: 'Explain Binary Search',
      description: 'Build a clear explanation step by step',
      context: 'Binary search is',
      steps: [
        {
          position: 1,
          prompt: 'How to start the explanation?',
          correctOption: ' an efficient algorithm',
          options: [
            { text: ' an efficient algorithm', probability: 0.91, feedback: 'Great! Sets up what it is' },
            { text: ' a searching method', probability: 0.78, feedback: 'True but less specific' },
            { text: ' faster than linear', probability: 0.64, feedback: 'True but compare after defining' },
          ],
        },
        {
          position: 2,
          prompt: 'What\'s the key mechanism?',
          correctOption: ' that divides the search space in half',
          options: [
            { text: ' that checks every element', probability: 0.35, feedback: 'That\'s linear search, not binary' },
            { text: ' that divides the search space in half', probability: 0.93, feedback: 'Excellent! The core concept' },
            { text: ' that uses recursion', probability: 0.71, feedback: 'It can, but that\'s implementation detail' },
          ],
        },
      ],
      completedText: 'Binary search is an efficient algorithm that divides the search space in half with each step, achieving O(log n) time complexity.',
    },
  ],
  female: [
    {
      id: 'story-building',
      title: 'Craft an Opening Line',
      description: 'Choose words that create atmosphere and intrigue',
      context: 'She found the letter',
      steps: [
        {
          position: 1,
          prompt: 'Where was the letter?',
          correctOption: ' tucked between',
          options: [
            { text: ' on the table', probability: 0.68, feedback: 'Too ordinary—less mystery' },
            { text: ' tucked between', probability: 0.89, feedback: 'Perfect! Suggests something hidden' },
            { text: ' lying near', probability: 0.72, feedback: 'Good but less deliberate feeling' },
            { text: ' hidden in', probability: 0.81, feedback: 'Strong, but "tucked" is more subtle' },
          ],
        },
        {
          position: 2,
          prompt: 'Between what?',
          correctOption: ' the pages of her grandmother\'s',
          options: [
            { text: ' some old books', probability: 0.64, feedback: 'Generic—needs emotional connection' },
            { text: ' the pages of her grandmother\'s', probability: 0.91, feedback: 'Excellent! Personal and evocative' },
            { text: ' two heavy volumes', probability: 0.58, feedback: 'Descriptive but lacks emotion' },
          ],
        },
        {
          position: 3,
          prompt: 'Her grandmother\'s what?',
          correctOption: ' journal, yellowed with age',
          options: [
            { text: ' book collection', probability: 0.71, feedback: 'Less intimate than journal' },
            { text: ' journal, yellowed with age', probability: 0.88, feedback: 'Beautiful! Sensory and personal' },
            { text: ' diary from the war', probability: 0.79, feedback: 'Specific but commits to plot too early' },
          ],
        },
      ],
      completedText: 'She found the letter tucked between the pages of her grandmother\'s journal, yellowed with age and secrets.',
    },
    {
      id: 'empathetic-response',
      title: 'Respond with Empathy',
      description: 'Build a supportive response to a friend',
      context: 'I hear that you\'re feeling overwhelmed.',
      steps: [
        {
          position: 1,
          prompt: 'Validate their feelings',
          correctOption: ' That sounds really difficult,',
          options: [
            { text: ' You should try to relax,', probability: 0.52, feedback: 'Too directive—validate first' },
            { text: ' That sounds really difficult,', probability: 0.92, feedback: 'Perfect! Acknowledges their experience' },
            { text: ' I understand completely,', probability: 0.74, feedback: 'Assumes too much—their experience is unique' },
          ],
        },
        {
          position: 2,
          prompt: 'Show support',
          correctOption: ' and it makes sense',
          options: [
            { text: ' but you\'ll be fine', probability: 0.61, feedback: 'Dismissive of current struggle' },
            { text: ' and it makes sense', probability: 0.89, feedback: 'Great! Normalizes their feelings' },
            { text: ' so here\'s what to do', probability: 0.58, feedback: 'Too quick to problem-solve' },
          ],
        },
        {
          position: 3,
          prompt: 'Offer presence',
          correctOption: ' that you\'d feel this way. I\'m here',
          options: [
            { text: ' that you\'re stressed. Good luck', probability: 0.48, feedback: 'Ends support too abruptly' },
            { text: ' that you\'d feel this way. I\'m here', probability: 0.93, feedback: 'Perfect! Offers continued support' },
            { text: ' given everything. You should', probability: 0.67, feedback: 'Shifts to advice too soon' },
          ],
        },
      ],
      completedText: 'I hear that you\'re feeling overwhelmed. That sounds really difficult, and it makes sense that you\'d feel this way. I\'m here for you.',
    },
  ],
}

/**
 * Helper function to get content by gender
 */
export const getExamplesByGender = (gender, type = 'completion') => {
  const normalizedGender = gender === 'female' ? 'female' : 'male'
  
  switch (type) {
    case 'completion':
      return completionExamples[normalizedGender]
    case 'variations':
      return promptVariations[normalizedGender]
    case 'builder':
      return sentenceBuilderExercises[normalizedGender]
    default:
      return []
  }
}

export default {
  completionExamples,
  promptVariations,
  sentenceBuilderExercises,
  getExamplesByGender,
}
