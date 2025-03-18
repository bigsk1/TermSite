// // List of commands that require API calls

import { getProjects } from '../api';
import { getQuote } from '../api';
import { getReadme } from '../api';
import { getWeather } from '../api';
import config from '../../../config.json';

export const projects = async (args: string[]): Promise<string> => {
  const projects = await getProjects();
  return projects
    .map(
      (repo) =>
        `${repo.name} - <a class="text-light-blue dark:text-dark-blue underline" href="${repo.html_url}" target="_blank">${repo.html_url}</a>`,
    )
    .join('\n');
};

export const quote = async (args: string[]): Promise<string> => {
  const data = await getQuote();
  return data.quote;
};

export const readme = async (args: string[]): Promise<string> => {
  const readme = await getReadme();
  return `Opening GitHub README...\n
  ${readme}`;
};

export const weather = async (args: string[]): Promise<string> => {
  const city = args.join('+');
  if (!city) {
    return 'Usage: weather [city]. Example: weather casablanca';
  }
  const weather = await getWeather(city);
  return weather;
};

// Simple AI chat responses using a predetermined list
let chatHistory: {question: string; answer: string}[] = [];

export const chat = async (args: string[]): Promise<string> => {
  const question = args.join(' ').trim();
  
  if (!question) {
    return `
Usage: chat [your question]

Examples:
  chat What's your favorite programming language?
  chat Tell me about yourself
  chat clear (to clear chat history)
    `;
  }
  
  // Clear chat history
  if (question.toLowerCase() === 'clear') {
    chatHistory = [];
    return 'Chat history cleared!';
  }
  
  // List of preprogrammed responses
  const responses = [
    { 
      keywords: ['hello', 'hi', 'hey', 'greetings'],
      response: 'Hello there! How can I help you today?'
    },
    { 
      keywords: ['name', 'who are you', 'yourself', 'about you'],
      response: `I'm a terminal-based AI assistant created to help visitors learn more about ${config.name}.`
    },
    { 
      keywords: ['skills', 'experience', 'work', 'projects'],
      response: `${config.name} has worked on various projects. Try the 'projects' command to see a list of GitHub repositories.`
    },
    { 
      keywords: ['contact', 'email', 'message', 'reach'],
      response: `You can contact ${config.name} via email at ${config.email} or through social links available via the 'sumfetch' command.`
    },
    { 
      keywords: ['joke', 'funny', 'laugh', 'humor'],
      response: 'Why do programmers prefer dark mode? Because light attracts bugs!'
    },
    { 
      keywords: ['weather', 'forecast', 'temperature'],
      response: 'I recommend using the weather command followed by your city name to get current weather information.'
    },
    { 
      keywords: ['code', 'programming', 'develop', 'software'],
      response: `${config.name} loves coding! Check out the GitHub profile for more: https://github.com/${config.social.github}`
    },
    { 
      keywords: ['game', 'play', 'snake', 'tetris'],
      response: 'Try playing Snake by using the "snake" command!'
    },
    { 
      keywords: ['help', 'commands', 'features'],
      response: 'Type "help" to see all available commands on this terminal website.'
    }
  ];
  
  // Find a matching response
  let answer = '';
  for (const responseObj of responses) {
    if (responseObj.keywords.some(keyword => question.toLowerCase().includes(keyword))) {
      answer = responseObj.response;
      break;
    }
  }
  
  // Default response if no match found
  if (!answer) {
    answer = `I'm not sure how to respond to that. Try asking something related to ${config.name} or this website's features.`;
  }
  
  // Save to chat history
  chatHistory.push({ question, answer });
  
  // Format and return the response with chat history
  let output = '<div class="chat-container">';
  
  // Display last few chat messages
  const recentChats = chatHistory.slice(-5);
  for (const chat of recentChats) {
    output += `<div class="chat-question">You: ${chat.question}</div>`;
    output += `<div class="chat-answer">${config.name}: ${chat.answer}</div>`;
  }
  
  output += '</div>';
  
  return output;
};
