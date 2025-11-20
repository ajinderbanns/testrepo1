/**
 * Module 2 Content with Gender-Specific Variations
 * 
 * Contains all text content, examples, and analogies for Module 2,
 * with separate variations for male and female themes.
 * 
 * @module data/module2Content
 */

/**
 * Tokenization Content
 */
export const tokenizationContent = {
  male: {
    intro: {
      title: "Breaking Down the Code",
      description: "Think of tokenization like parsing data in a game engine. Before the system can process player commands, it needs to break them down into smaller, executable chunks. That's exactly what tokenization does for text.",
      analogy: "Imagine you're speedrunning a game and giving rapid-fire inputs. The game doesn't process 'jump+dash+attack' as one thing—it breaks it into individual commands the engine understands. Tokenization works the same way for language.",
    },
    process: {
      title: "The Tokenization Algorithm",
      steps: [
        "Text Input: 'Let's level up quickly!'",
        "Word Splitting: ['Let', \"'s\", 'level', 'up', 'quickly', '!']",
        "Subword Processing: ['Let', \"'\", 's', 'level', 'up', 'quick', 'ly', '!']",
        "Token Assignment: Each piece gets a unique ID in the vocabulary",
      ],
      techNote: "Modern LLMs use Byte-Pair Encoding (BPE) or SentencePiece—algorithms that find optimal subword units, like how compression algorithms find patterns in data.",
    },
    examples: [
      { 
        text: "gg wp team",
        context: "Gaming shorthand shows how tokenization handles informal text and abbreviations"
      },
      {
        text: "The algorithm optimizes performance by caching results",
        context: "Technical language demonstrates how specialized vocabulary is tokenized"
      },
      {
        text: "ngl that build is op",
        context: "Slang and internet speak reveals tokenization's adaptability"
      }
    ]
  },
  female: {
    intro: {
      title: "Understanding Through Conversation",
      description: "Think about how you break down a text message before responding. You don't just see letters—you naturally identify words, phrases, and even emojis. Tokenization is how AI does this same thing, breaking language into pieces it can understand.",
      analogy: "It's like how you'd organize a group chat message. 'omg that's so cute 💕' isn't just one blob of text. You see 'omg', 'that's', 'so', 'cute', and the emoji as separate meaningful units. That's tokenization.",
    },
    process: {
      title: "How Text Becomes Tokens",
      steps: [
        "Text Input: 'Let's meet up for coffee!'",
        "Word Splitting: ['Let', \"'s\", 'meet', 'up', 'for', 'coffee', '!']",
        "Subword Processing: ['Let', \"'\", 's', 'meet', 'up', 'for', 'coffee', '!']",
        "Token Assignment: Each piece gets recognized as a unique element",
      ],
      techNote: "Modern AI uses smart methods like BPE that learn which pieces make sense together—similar to how you learn text abbreviations through social media.",
    },
    examples: [
      { 
        text: "omg this is literally so amazing",
        context: "Casual conversation shows how natural speech patterns are processed"
      },
      {
        text: "The emotional connection between characters drives the narrative",
        context: "Complex ideas demonstrate how meaning is preserved through tokenization"
      },
      {
        text: "ngl she's giving main character energy",
        context: "Modern slang reveals how AI adapts to evolving language"
      }
    ]
  }
}

/**
 * Embeddings Content
 */
export const embeddingsContent = {
  male: {
    intro: {
      title: "From Tokens to Coordinates",
      description: "After tokenization, each token needs to become a number the neural network can process. Embeddings are like coordinate systems—each word gets a position in high-dimensional space based on its meaning.",
      analogy: "Think of embeddings like a skill tree in an RPG. Each skill has multiple attributes (damage, cooldown, mana cost, range). Words work the same way—each has hundreds of 'attributes' that define its meaning in different contexts.",
    },
    vectors: {
      title: "Understanding Vector Space",
      concept: "Each word becomes a vector—a list of numbers representing its meaning. Similar words have similar vectors, like how similar builds in a game have similar stats.",
      example: "king = [0.2, 0.8, 0.1, ...] (hundreds more)\nqueen = [0.2, 0.7, 0.1, ...] (hundreds more)\n\nThey're close because they share conceptual 'stats'.",
    },
    similarity: {
      title: "Measuring Semantic Distance",
      explanation: "We calculate similarity using cosine distance—basically measuring the angle between vectors. Smaller angle = more similar meaning, like how similar strategies cluster together in competitive games.",
      examples: [
        "'sword' and 'blade' are close (similar items)",
        "'tank' and 'healer' are distant (different roles)",
        "'buff' and 'enhance' are near-identical (synonyms)",
      ]
    }
  },
  female: {
    intro: {
      title: "Words as Relationships",
      description: "Once text is tokenized, AI needs to understand what each word actually means. Embeddings are like a map of relationships—words that have similar vibes or meanings end up close together in this map.",
      analogy: "Think of it like a friend network. You have different friend groups based on how you know them (school, work, online), and how close you are. Words work the same way—they cluster with related words based on meaning and context.",
    },
    vectors: {
      title: "The Language Map",
      concept: "Every word gets a unique position in a multi-dimensional space. Words with similar meanings are positioned near each other, like how close friends appear together in your social circle.",
      example: "happy = [lots of numbers representing its vibe]\njoyful = [similar numbers, close position]\nsad = [different numbers, distant position]",
    },
    similarity: {
      title: "Understanding Connections",
      explanation: "AI measures how similar words are by looking at their positions in this space. Words that are used in similar contexts naturally end up closer together—like how you can tell people are friends by the contexts they appear in.",
      examples: [
        "'sister' and 'sibling' are super close (family)",
        "'love' and 'adore' are neighbors (similar feelings)",
        "'confident' and 'insecure' are far apart (opposites)",
      ]
    }
  }
}

/**
 * Attention Content
 */
export const attentionContent = {
  male: {
    intro: {
      title: "Dynamic Context Loading",
      description: "Attention is like a game's draw distance system—it decides which objects matter for the current frame. In language, attention determines which words are important for understanding each other word.",
      analogy: "When you're playing an FPS, your crosshair focuses on targets while the peripheral vision stays blurred. Attention works similarly—for each word, the model focuses strongly on relevant words and barely registers irrelevant ones.",
    },
    mechanism: {
      title: "How Attention Calculates Relevance",
      concept: "Each token generates three vectors: Query (what I'm looking for), Key (what I offer), and Value (what I contain). The model multiplies Queries and Keys to calculate attention scores—like matching search parameters.",
      formula: "Attention(Q, K, V) = softmax(Q·K^T / √d) · V",
      interpretation: "This formula is essentially a weighted average where weights are determined by relevance scores.",
    },
    patterns: {
      title: "Attention Patterns in Action",
      examples: [
        {
          sentence: "The developer fixed the bug in the code.",
          focus: "When processing 'bug', attention focuses heavily on 'fixed' and 'code'—contextual dependencies",
        },
        {
          sentence: "She scored the winning goal, and everyone cheered.",
          focus: "When processing 'everyone', attention distributes across the whole event sequence",
        }
      ]
    }
  },
  female: {
    intro: {
      title: "Understanding Through Connection",
      description: "Attention is how AI figures out which words matter for understanding each other word. It's like when you're reading a text and automatically connect pronouns to who they're about—that's attention in action.",
      analogy: "Think about following a conversation with multiple people. When someone says 'she', you automatically know which person they mean based on context. Attention helps AI do this same connection-making with words.",
    },
    mechanism: {
      title: "How AI Connects the Dots",
      concept: "For every word, the AI asks 'what should I pay attention to?' and looks at all other words to decide. Words that are more relevant get more attention—like how you naturally focus more on certain parts of a story.",
      formula: "The math creates a score for each word pair, showing how much one word should 'listen to' another",
      interpretation: "Higher scores mean stronger connections—like how main characters in a show have stronger narrative connections than background characters.",
    },
    patterns: {
      title: "Seeing Attention at Work",
      examples: [
        {
          sentence: "Sarah texted her friend about the party.",
          focus: "When processing 'her', attention connects strongly to 'Sarah'—pronoun resolution",
        },
        {
          sentence: "The book was amazing, she couldn't put it down.",
          focus: "When processing 'it', attention links back to 'book' across the sentence",
        }
      ]
    }
  }
}

/**
 * Interactive Examples
 */
export const interactiveExamples = {
  tokenization: [
    "Hello world!",
    "The quick brown fox jumps over the lazy dog",
    "AI is transforming technology",
    "Can't wait to see what happens next!",
    "https://example.com/path?query=value",
    "I❤️coding",
  ],
  embeddings: {
    clusters: [
      {
        name: "Technology",
        words: ["computer", "software", "algorithm", "data", "code", "program"]
      },
      {
        name: "Emotions",
        words: ["happy", "sad", "excited", "anxious", "calm", "angry"]
      },
      {
        name: "Family",
        words: ["mother", "father", "sister", "brother", "parent", "sibling"]
      },
      {
        name: "Actions",
        words: ["run", "walk", "jump", "climb", "swim", "fly"]
      }
    ]
  },
  attention: [
    {
      sentence: "The cat sat on the mat.",
      description: "Simple sentence showing local attention patterns"
    },
    {
      sentence: "She went to the store because she needed milk.",
      description: "Pronoun resolution and causal relationships"
    },
    {
      sentence: "Although it was raining, they decided to go hiking anyway.",
      description: "Complex sentence with contrasting clauses"
    }
  ]
}

/**
 * Quiz Questions
 */
export const quizQuestions = {
  tokenization: [
    {
      question: "What is the main purpose of tokenization?",
      options: [
        "To make text look prettier",
        "To break text into processable units",
        "To translate text to other languages",
        "To check for spelling errors"
      ],
      correctIndex: 1,
      explanation: "Tokenization breaks text into smaller units (tokens) that language models can process. It's the first step in understanding text."
    },
    {
      question: "Which type of tokenization can handle unknown words better?",
      options: [
        "Character-level tokenization",
        "Word-level tokenization",
        "Subword tokenization (like BPE)",
        "Sentence-level tokenization"
      ],
      correctIndex: 2,
      explanation: "Subword tokenization (like BPE) can break unknown words into known subword units, making it more flexible than pure word-level approaches."
    }
  ],
  embeddings: [
    {
      question: "What do embeddings represent?",
      options: [
        "The length of words",
        "Words as numerical vectors capturing meaning",
        "The frequency of words in text",
        "The grammatical role of words"
      ],
      correctIndex: 1,
      explanation: "Embeddings convert words into numerical vectors where similar meanings result in similar vectors—capturing semantic relationships."
    },
    {
      question: "Why do similar words have similar embeddings?",
      options: [
        "They have similar spellings",
        "They appear in similar contexts during training",
        "They have the same length",
        "They're in the same language"
      ],
      correctIndex: 1,
      explanation: "Words that appear in similar contexts during training learn similar embeddings, following the distributional hypothesis: 'you shall know a word by the company it keeps.'"
    }
  ],
  attention: [
    {
      question: "What does the attention mechanism help models do?",
      options: [
        "Run faster",
        "Use less memory",
        "Focus on relevant parts of the input",
        "Generate longer responses"
      ],
      correctIndex: 2,
      explanation: "Attention allows models to dynamically focus on relevant parts of the input when processing each token, helping understand context and relationships."
    },
    {
      question: "In the sentence 'Sarah gave her book to Maria', when processing 'her', which word should receive high attention?",
      options: [
        "gave",
        "Sarah",
        "book",
        "Maria"
      ],
      correctIndex: 1,
      explanation: "The pronoun 'her' refers to 'Sarah', so attention weights should be highest for Sarah when processing 'her'—this is pronoun resolution."
    }
  ]
}
