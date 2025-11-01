
import { Course } from './types';

export const COURSES: Course[] = [
  {
    id: 'intro-to-ai',
    title: 'Introduction to Artificial Intelligence',
    description: 'A beginner-friendly course covering the fundamental concepts of AI, machine learning, and neural networks.',
    thumbnailUrl: 'https://picsum.photos/seed/ai1/600/400',
    modules: [
      {
        id: 'm1',
        type: 'text',
        title: 'What is AI?',
        content: `
# Welcome to AI!

Artificial Intelligence (AI) is a broad area of computer science that makes machines seem like they have human intelligence. The goals of artificial intelligence include computer-enhanced learning, reasoning, and perception.

AI is not a single technology. It's an umbrella term for a range of techniques, including:
- **Machine Learning (ML):** Algorithms that allow computers to learn from data without being explicitly programmed.
- **Deep Learning:** A subset of ML based on artificial neural networks with many layers (deep neural networks).
- **Natural Language Processing (NLP):** Enabling computers to understand, interpret, and generate human language.

This course will provide a high-level overview of these exciting fields.
        `,
      },
      {
        id: 'm2',
        type: 'video',
        title: 'Course Video Tutorial',
        youtubeId: '_0EHZzmpxhk',
      },
      {
        id: 'm3',
        type: 'quiz',
        title: 'Knowledge Check #1',
        questions: [
          {
            questionText: 'What does AI stand for?',
            options: ['Automated Intelligence', 'Artificial Intelligence', 'Algorithmic Integration', 'Applied Inference'],
            correctAnswer: 'Artificial Intelligence',
          },
          {
            questionText: 'Which of the following is a subset of Machine Learning?',
            options: ['Deep Learning', 'Data Science', 'Cybersecurity', 'Web Development'],
            correctAnswer: 'Deep Learning',
          },
        ],
      },
      {
        id: 'm4',
        type: 'code',
        title: 'Code: Hello AI World',
        embedUrl: 'https://trinket.io/embed/python/86cd2949d156',
      }
    ],
  },
  {
    id: 'deep-learning-fundamentals',
    title: 'Deep Learning Fundamentals',
    description: 'Explore the building blocks of deep learning, including neural networks, activation functions, and backpropagation.',
    thumbnailUrl: 'https://picsum.photos/seed/ai2/600/400',
    modules: [
      {
        id: 'm1',
        type: 'text',
        title: 'Artificial Neural Networks (ANNs)',
        content: `
# Artificial Neural Networks

Inspired by the human brain, an Artificial Neural Network (ANN) is a computational model consisting of interconnected nodes, or "neurons". These neurons are organized in layers:
- **Input Layer:** Receives the initial data.
- **Hidden Layers:** Perform computations. A "deep" network has multiple hidden layers.
- **Output Layer:** Produces the final result.

Each connection between neurons has a weight, which is adjusted during the training process. This is how the network "learns".
        `,
      },
      {
        id: 'm2',
        type: 'video',
        title: 'Course Video Tutorial',
        youtubeId: '_0EHZzmpxhk',
      },
      {
        id: 'm3',
        type: 'quiz',
        title: 'Neural Network Basics Quiz',
        questions: [
          {
            questionText: 'Which layer of a neural network receives the initial data?',
            options: ['Output Layer', 'Hidden Layer', 'Input Layer', 'Processing Layer'],
            correctAnswer: 'Input Layer',
          },
          {
            questionText: 'What is adjusted during the training process of a neural network?',
            options: ['Number of layers', 'Neuron activation', 'Connection weights', 'Input data'],
            correctAnswer: 'Connection weights',
          },
           {
            questionText: 'A network with many hidden layers is called a...',
            options: ['Wide network', 'Complex network', 'Shallow network', 'Deep network'],
            correctAnswer: 'Deep network',
          },
        ],
      },
      {
        id: 'm4',
        type: 'code',
        title: 'Code: Simulating a Neuron',
        embedUrl: 'https://trinket.io/embed/python/86cd2949d156',
      },
    ],
  },
  {
    id: 'python-for-ai',
    title: 'Python for AI Crash Course',
    description: 'Get up to speed with Python, the most popular language for AI and Machine Learning. This course includes hands-on coding exercises.',
    thumbnailUrl: 'https://picsum.photos/seed/ai4/600/400',
    modules: [
      {
        id: 'm1',
        type: 'text',
        title: 'Why Python for AI?',
        content: `
# Why Python is the King of AI Development

Python's simplicity, extensive libraries (like TensorFlow, PyTorch, and Scikit-learn), and strong community support make it the go-to language for AI projects. Its readable syntax allows developers to focus on solving complex problems rather than wrestling with the language itself.
        `,
      },
      {
        id: 'm2',
        type: 'video',
        title: 'Course Video Tutorial',
        youtubeId: '_0EHZzmpxhk',
      },
      {
        id: 'm3',
        type: 'quiz',
        title: 'Python Syntax Check',
        questions: [
          {
            questionText: 'What function is used to display text in Python?',
            options: ['display()', 'echo()', 'print()', 'log()'],
            correctAnswer: 'print()',
          },
          {
            questionText: 'Which of the following is a correctly defined variable?',
            options: ['my-variable = 10', '1variable = 10', 'my_variable = 10', 'var my_variable = 10'],
            correctAnswer: 'my_variable = 10',
          }
        ]
      },
      {
        id: 'm4',
        type: 'code',
        title: 'Your First Python Snippet',
        embedUrl: 'https://trinket.io/embed/python/86cd2949d156',
      }
    ],
  },
  {
    id: 'nlp-for-beginners',
    title: 'Natural Language Processing for Beginners',
    description: 'Learn how computers are taught to understand and process human language, from sentiment analysis to text generation.',
    thumbnailUrl: 'https://picsum.photos/seed/ai3/600/400',
    modules: [
      {
        id: 'm1',
        type: 'text',
        title: 'Understanding NLP',
        content: `
# Natural Language Processing (NLP)

NLP is a field of AI that gives machines the ability to read, understand, and derive meaning from human languages. It's the technology behind:
- **Spam filters:** Classifying emails as spam or not.
- **Virtual assistants:** Like Siri and Alexa.
- **Machine translation:** Google Translate.
- **Sentiment analysis:** Determining if a product review is positive or negative.

A key challenge in NLP is ambiguity. The same words can mean different things in different contexts.
        `,
      },
      {
        id: 'm2',
        type: 'video',
        title: 'Course Video Tutorial',
        youtubeId: '_0EHZzmpxhk',
      },
      {
        id: 'm3',
        type: 'quiz',
        title: 'NLP Concepts Quiz',
        questions: [
          {
            questionText: 'What does NLP stand for?',
            options: ['Natural Language Programming', 'New Logic Paradigm', 'Natural Language Processing', 'Network Learning Protocol'],
            correctAnswer: 'Natural Language Processing',
          },
          {
            questionText: 'Which of the following is an application of NLP?',
            options: ['Image recognition', 'Spam filtering', 'Self-driving cars', 'Playing chess'],
            correctAnswer: 'Spam filtering',
          }
        ]
      },
      {
        id: 'm4',
        type: 'code',
        title: 'Code: Basic Text Analysis',
        embedUrl: 'https://trinket.io/embed/python/86cd2949d156',
      },
    ],
  },
];