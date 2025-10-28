/**
 * Module 1: Introduction to LLMs - Learning Content
 * 
 * Contains all learning content for Module 1 with gender-differentiated variants.
 * Covers three main sections: What are LLMs, How they generate text, and Real-world applications.
 * 
 * @module data/modules/module1
 */

import { MODULE_IDS } from '../../constants/modules.js'

/**
 * Section 1: What are LLMs?
 * 
 * Introduces the fundamental concept of Large Language Models with gender-specific
 * examples and analogies that resonate with different cultural contexts.
 */
const whatAreLLMs = {
  id: 'intro_what_are_llms',
  title: 'What are LLMs?',
  introduction: {
    male: "Imagine you're building the ultimate AI teammate - one that can understand your questions, write code with you, and even debug problems. That's essentially what a Large Language Model (LLM) is: a sophisticated AI system trained on massive amounts of text to understand and generate human-like responses.",
    female: "Think of an LLM as your most intuitive conversation partner - someone who really gets what you're trying to say, helps you articulate your thoughts better, and can even anticipate what you might need. A Large Language Model is an AI system trained on countless conversations and texts to understand context, nuance, and meaning in human communication.",
  },
  contentBlocks: [
    {
      type: 'paragraph',
      content: {
        male: "Large Language Models are neural networks - think of them like incredibly complex pattern recognition systems. They've been trained on vast datasets (billions of words from books, websites, articles) to understand the statistical patterns and relationships in language. When you give an LLM a prompt, it processes that input through millions of parameters (adjustable settings) to predict the most likely and contextually appropriate response.",
        female: "Large Language Models are neural networks - essentially sophisticated systems that learn to recognize patterns in how we communicate. They learn from enormous collections of human writing - books, conversations, articles, social media - to understand how language flows, how ideas connect, and how context shapes meaning. When you ask an LLM something, it draws on these learned patterns to craft a response that feels natural and relevant.",
      },
    },
    {
      type: 'callout',
      emphasis: 'info',
      content: {
        male: "💡 **Key Insight**: An LLM is essentially a probability engine. It doesn't 'think' like humans - it predicts what word should come next based on patterns it learned during training. Despite this mechanical approach, the results can feel remarkably intelligent.",
        female: "💡 **Key Insight**: An LLM learns to mirror human communication patterns. It doesn't truly understand emotions or experiences like we do - it recognizes patterns in how we express ourselves. Yet these patterns are so intricate that its responses can feel genuinely understanding and thoughtful.",
      },
    },
    {
      type: 'list',
      items: [
        {
          male: "**Scale Matters**: Modern LLMs have billions (even trillions) of parameters - like having billions of tiny knobs to fine-tune performance",
          female: "**Scale Matters**: Modern LLMs have billions (even trillions) of parameters - think of these as countless subtle adjustments that help the model understand nuance and context",
        },
        {
          male: "**Training is Expensive**: Training a cutting-edge LLM requires massive computational resources - think data centers running for months",
          female: "**Training is Intensive**: Creating an LLM requires enormous computational effort - specialized data centers working continuously for months to learn language patterns",
        },
        {
          male: "**No True Understanding**: LLMs process patterns statistically; they don't have beliefs, desires, or genuine comprehension of the world",
          female: "**Pattern Recognition, Not Consciousness**: LLMs recognize and reproduce patterns; they don't have feelings, personal experiences, or true understanding of human emotions",
        },
      ],
    },
  ],
  examples: [
    {
      title: 'Gaming AI Assistant',
      description: {
        male: "Imagine an LLM integrated into your favorite multiplayer game. You could ask it 'What's the best strategy for this map with my current loadout?' and it would analyze your situation, recall patterns from thousands of gameplay scenarios, and suggest tactics - like having a pro gamer coach available 24/7.",
        female: "Picture an LLM helping you plan a creative project. You could say 'I want to design a cozy reading space that feels welcoming but sophisticated,' and it would suggest color palettes, furniture arrangements, and lighting ideas - drawing from countless interior design discussions and examples it learned from.",
      },
    },
    {
      title: 'Code Debugging Partner',
      description: {
        male: "When you're stuck on a programming problem at 2 AM, an LLM can act like that senior developer who always knows where to look. Paste your error message, describe what you're trying to do, and it'll suggest solutions based on patterns from millions of similar debugging sessions.",
        female: "When you're working on a complex presentation, an LLM can be like that friend who always knows how to structure a compelling story. Describe your key points, and it'll help you organize them into a flow that builds connection and keeps your audience engaged.",
      },
    },
  ],
  analogies: [
    {
      text: {
        male: "Think of an LLM like an advanced autocomplete system. You know how your phone keyboard predicts the next word? An LLM is like that concept supercharged - instead of just one word, it can predict entire sentences, paragraphs, or even code blocks, all while maintaining context and coherence.",
        female: "Imagine an LLM as a deeply attentive listener who's heard millions of conversations. When you start talking, they can sense where you're going and offer thoughts that feel natural - not because they share your experiences, but because they've learned the patterns of how people communicate in similar situations.",
      },
    },
    {
      text: {
        male: "An LLM is like having access to a massive library where every book has been indexed down to individual sentence patterns. When you ask a question, it rapidly scans through these patterns to construct an answer - similar to how a search engine finds relevant pages, but instead of showing you links, it synthesizes the information into a coherent response.",
        female: "Think of an LLM like a skilled improviser in a conversation. It's heard so many dialogues that when you start a sentence, it can naturally complete it or respond appropriately - not from a script, but from understanding the rhythm and flow of how people communicate, much like how you intuitively know how to respond in a familiar social situation.",
      },
    },
  ],
  visualReferences: ['neural-network-basic', 'scale-comparison'],
  metadata: {
    order: 1,
    estimatedMinutes: 5,
    learningObjectives: [
      'Define what a Large Language Model is',
      'Understand the scale and training requirements of LLMs',
      'Recognize that LLMs work through pattern recognition, not consciousness',
    ],
    keywords: ['LLM', 'neural network', 'parameters', 'training', 'pattern recognition'],
  },
}

/**
 * Section 2: How They Generate Text
 * 
 * Explains the text generation process with gender-specific analogies
 * that make the technical concepts more relatable.
 */
const howTheyGenerateText = {
  id: 'intro_how_generate_text',
  title: 'How They Generate Text',
  introduction: {
    male: "Ever wonder how an LLM actually produces text that makes sense? It's not magic - it's a systematic process that's actually pretty logical once you break it down. Think of it like a highly optimized prediction engine running through multiple stages to generate each word.",
    female: "Curious about how an LLM creates responses that flow so naturally? The process is fascinating - it's like watching a skilled writer craft a response in real-time, considering context and meaning at every step. Let's explore the journey from your prompt to the AI's reply.",
  },
  contentBlocks: [
    {
      type: 'paragraph',
      content: {
        male: "The generation process starts when you input a prompt. The LLM breaks your text down into tokens (more on this in Module 2), processes them through its neural network layers, and then generates a response one token at a time. Each token is selected based on probability - the model calculates which token is most likely to come next given all the context it has.",
        female: "When you ask an LLM a question, it begins a thoughtful process of crafting a response. Your words are first interpreted and understood (tokenization), then the model considers the entire context - what you said, how you said it, and what would make sense as a reply. It then generates its response piece by piece, each word building naturally on what came before.",
      },
    },
    {
      type: 'callout',
      emphasis: 'tip',
      content: {
        male: "🎯 **Pro Tip**: The quality of output heavily depends on input. Precise, well-structured prompts generally yield better results - it's like giving a compiler clean code versus messy syntax.",
        female: "🎯 **Pro Tip**: The way you phrase your question shapes the response you get. Clear, thoughtful prompts help the LLM understand your intent better - it's like how a good conversation starts with being specific about what you're looking for.",
      },
    },
    {
      type: 'list',
      items: [
        {
          male: "**Tokenization**: Input text is split into tokens (words, subwords, or characters) - like breaking code into parseable units",
          female: "**Tokenization**: Your message is broken down into meaningful pieces (words or parts of words) - similar to how we naturally pause and emphasize in speech",
        },
        {
          male: "**Context Processing**: The model analyzes all tokens together using attention mechanisms to understand relationships and dependencies",
          female: "**Understanding Context**: The model considers how all the pieces relate to each other - like understanding how tone and word choice create meaning in a conversation",
        },
        {
          male: "**Next Token Prediction**: Based on probabilities calculated from training, the model selects the most likely next token",
          female: "**Crafting the Response**: Drawing on learned patterns, the model chooses each next word that best continues the thought naturally",
        },
        {
          male: "**Iterative Generation**: This prediction process repeats token-by-token until a complete response is formed or a stop condition is met",
          female: "**Building Naturally**: The response grows organically, word by word, each choice informed by everything that came before, creating a coherent message",
        },
      ],
    },
    {
      type: 'paragraph',
      content: {
        male: "Temperature and sampling parameters control the generation process - like tuning variables in an algorithm. Lower temperature makes output more deterministic and focused (good for factual tasks), while higher temperature introduces more randomness and creativity (useful for brainstorming or creative writing).",
        female: "The model can be tuned to generate in different styles - sometimes more consistent and reliable (great when you need accuracy), other times more creative and exploratory (perfect for brainstorming or when you want fresh perspectives). This flexibility lets you adapt how the AI responds based on what you need.",
      },
    },
  ],
  examples: [
    {
      title: 'Autocomplete on Steroids',
      description: {
        male: "Think of your IDE's autocomplete feature. When you type 'array.', it suggests methods like 'map', 'filter', 'reduce'. LLMs work similarly but at a vastly larger scale - they can predict not just the next function call, but entire code blocks, explanations, and optimizations based on context.",
        female: "Remember how your messaging app suggests responses like 'Sounds good!' or 'See you then!'? LLMs work on the same principle but much more sophisticated - they can predict not just short replies but can continue your thoughts, match your tone, and adapt to the conversation's context.",
      },
    },
    {
      title: 'Real-Time Generation',
      description: {
        male: "When you watch an LLM respond in real-time (like ChatGPT's streaming responses), you're seeing the prediction process in action. Each word appears as it's selected from the probability distribution - it's literally generating the response token-by-token as you watch.",
        female: "When you see an AI's response appear word-by-word on your screen, you're witnessing the creation process unfold in real-time. Each word is chosen thoughtfully based on what came before, like watching someone compose their thoughts as they speak.",
      },
    },
  ],
  analogies: [
    {
      text: {
        male: "Imagine text generation like playing a strategy game where every move is calculated based on probability. You have the game state (context), you calculate the best next move (token prediction), execute it, and then reassess for the next move. The difference is LLMs do this calculation thousands of times per second.",
        female: "Think of text generation like composing a text message reply - you read what someone sent (context), think about how to respond, type the first word, consider how it flows, add the next word, and continue building your message naturally. LLMs follow this same intuitive process, just much faster and based on vast experience.",
      },
    },
    {
      text: {
        male: "It's like having a GPS that recalculates your route at every intersection. At each point (token), the LLM evaluates all possible next words, calculates probabilities based on training data, and selects the optimal path forward - continuously adjusting based on the context it has built up.",
        female: "Picture writing a story where each sentence flows from the last - you're constantly aware of what you've written and where you want to go. LLMs maintain this awareness of the entire conversation, letting each new word build naturally on the context, creating responses that feel coherent and intentional.",
      },
    },
  ],
  visualReferences: ['token-generation-flow', 'probability-distribution'],
  metadata: {
    order: 2,
    estimatedMinutes: 7,
    learningObjectives: [
      'Understand the step-by-step process of text generation',
      'Recognize how tokenization breaks down input',
      'Explain how probability drives word selection',
      'Identify factors that influence generation quality',
    ],
    keywords: ['tokenization', 'prediction', 'context', 'probability', 'temperature', 'sampling'],
  },
}

/**
 * Section 3: Real-World Applications
 * 
 * Demonstrates practical uses of LLMs with gender-specific examples
 * that highlight different use cases and contexts.
 */
const realWorldApplications = {
  id: 'intro_real_world_applications',
  title: 'Real-World Applications',
  introduction: {
    male: "LLMs aren't just theoretical tech - they're already transforming how we work, code, and solve problems. From developer tools to automation systems, LLMs are being integrated into products you might use daily. Let's explore where this technology is making the biggest impact.",
    female: "LLMs are already woven into our daily digital lives in ways you might not even realize. From helping us communicate better to making our creative work easier, these AI systems are becoming collaborative partners in how we express ourselves and connect with others. Let's see where this technology is making a real difference.",
  },
  contentBlocks: [
    {
      type: 'paragraph',
      content: {
        male: "The most visible applications of LLMs are conversational AI assistants (ChatGPT, Claude, Gemini), but the technology extends far beyond chat interfaces. LLMs power code completion in IDEs, automate customer support, generate documentation, assist in data analysis, and even help with security testing. They're particularly valuable for tasks that require understanding context, generating structured output, or translating between different formats (natural language to code, for example).",
        female: "While chatbots like ChatGPT are the most recognizable face of LLM technology, these AI systems are quietly helping in countless other ways. They assist with writing and editing, help brainstorm ideas, provide personalized learning support, facilitate better communication across languages, and even support mental health resources. The common thread? They excel at understanding what you need and helping you express or create it.",
      },
    },
    {
      type: 'callout',
      emphasis: 'info',
      content: {
        male: "⚡ **Reality Check**: LLMs are powerful tools, not replacements for human expertise. They're best used as augmentation - enhancing your capabilities rather than replacing your judgment. Always verify critical outputs, especially in production environments.",
        female: "⚡ **Reality Check**: LLMs are collaborative tools, not substitutes for human insight and creativity. They work best when combined with your judgment and expertise - think of them as assistants who help you think through ideas, not oracles with all the answers. Always review important outputs critically.",
      },
    },
    {
      type: 'list',
      items: [
        {
          male: "**Development Tools**: GitHub Copilot, Cursor, and other AI coding assistants use LLMs to suggest code, refactor functions, and explain complex algorithms",
          female: "**Writing & Communication**: Tools like Grammarly and Notion AI help craft clearer messages, brainstorm ideas, and organize thoughts into coherent narratives",
        },
        {
          male: "**DevOps & Automation**: LLMs help write scripts, troubleshoot errors, and even generate infrastructure-as-code configurations",
          female: "**Creative Support**: AI tools assist with content creation, from drafting social media posts to structuring presentations or generating visual concepts",
        },
        {
          male: "**Data Processing**: Converting unstructured text into structured formats, extracting key information, and generating reports from raw data",
          female: "**Learning & Growth**: Personalized tutoring systems, language learning apps, and educational platforms that adapt to individual learning styles",
        },
        {
          male: "**Security**: Analyzing code for vulnerabilities, generating test cases, and assisting with penetration testing documentation",
          female: "**Customer Experience**: Chatbots that understand context and emotion, providing more natural and helpful customer service interactions",
        },
      ],
    },
  ],
  examples: [
    {
      title: 'GitHub Copilot',
      description: {
        male: "One of the most impactful LLM applications for developers. As you code, Copilot suggests entire functions, generates unit tests, and even explains unfamiliar code. It's like pair programming with an AI that has seen millions of repositories - it won't always be perfect, but it significantly speeds up routine coding tasks and helps you discover new approaches.",
        female: "Grammarly uses LLM technology to go beyond basic spell-check - it understands your writing goals and helps you communicate more effectively. Whether you're writing a professional email or a creative piece, it suggests improvements in tone, clarity, and style. It's like having a writing coach who understands context and helps you express your ideas with confidence.",
      },
      code: "// Copilot can suggest complete functions:\nfunction calculateFibonacci(n) {\n  // AI suggests the implementation\n  if (n <= 1) return n;\n  return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);\n}",
    },
    {
      title: 'Customer Support Automation',
      description: {
        male: "Companies like Intercom and Zendesk integrate LLMs to handle tier-1 support automatically. The system understands customer queries, searches knowledge bases, and provides relevant solutions - escalating to human agents only when necessary. This reduces response times and allows human support staff to focus on complex issues.",
        female: "Mental health apps like Woebot use LLM technology to provide supportive conversations and cognitive behavioral therapy techniques. While not replacing human therapists, these AI companions offer accessible emotional support, helping users process feelings and develop coping strategies. It's technology serving human wellbeing in a deeply personal way.",
      },
    },
    {
      title: 'Content & Documentation',
      description: {
        male: "LLMs help generate technical documentation, API references, and README files from code. Tools analyze your codebase and produce human-readable documentation automatically - maintaining consistency and saving developers from the tedious task of documenting every function and parameter manually.",
        female: "Content creators use LLMs to overcome writer's block, generate social media variations, and adapt messaging for different audiences. The AI helps brainstorm angles, suggests headlines, and can even adapt a single piece of content into multiple formats - from blog posts to Twitter threads to email newsletters.",
      },
    },
  ],
  analogies: [
    {
      text: {
        male: "Think of LLM applications like power tools in a workshop. A drill doesn't replace a craftsman's skill - it amplifies their capability to work faster and tackle harder materials. Similarly, LLM tools don't replace expertise; they handle routine tasks and provide starting points, freeing you to focus on higher-level problem-solving and creative work.",
        female: "LLM applications are like having a talented collaborator who excels at different things than you do. You bring vision, judgment, and personal insight; the AI brings pattern recognition, quick iteration, and tireless assistance. Together, you can accomplish more than either could alone - it's about complementary strengths, not replacement.",
      },
    },
  ],
  visualReferences: ['application-landscape', 'use-case-matrix'],
  metadata: {
    order: 3,
    estimatedMinutes: 10,
    learningObjectives: [
      'Identify major categories of LLM applications',
      'Understand how LLMs augment rather than replace human capabilities',
      'Recognize real-world tools that use LLM technology',
      'Evaluate appropriate use cases for LLM integration',
    ],
    keywords: [
      'applications',
      'chatbots',
      'code assistants',
      'automation',
      'content generation',
      'customer support',
    ],
  },
}

/**
 * Complete Module 1 Content Export
 * 
 * @type {ModuleContent}
 */
export const module1Content = {
  moduleId: MODULE_IDS.MODULE_1,
  title: 'Introduction to LLMs',
  description: 'Learn the fundamentals of Large Language Models through engaging, gender-differentiated content',
  sections: [whatAreLLMs, howTheyGenerateText, realWorldApplications],
  metadata: {
    totalEstimatedMinutes: 22, // Sum of all section times: 5 + 7 + 10
    prerequisites: [],
    learningOutcomes: [
      'Understand what Large Language Models are and how they work',
      'Explain the text generation process from prompt to response',
      'Identify and evaluate real-world LLM applications',
      'Recognize the strengths and limitations of LLM technology',
    ],
  },
}

export default module1Content
