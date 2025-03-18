import axios from 'axios';
import config from '../../config.json';

export const getProjects = async () => {
  const { data } = await axios.get(
    `https://api.github.com/users/${config.social.github}/repos`,
  );
  return data;
};

export const getReadme = async () => {
  const { data } = await axios.get(config.readmeUrl);
  return data;
};

export const getWeather = async (city: string) => {
  try {
    const { data } = await axios.get(`https://wttr.in/${city}?ATm`);
    return data;
  } catch (error) {
    return error;
  }
};

export const getQuote = async () => {
  try {
    const { data } = await axios.get('https://api.quotable.io/random');
    return {
      quote: `"${data.content}" — ${data.author}`,
      source: 'api'
    };
  } catch (error) {
    console.error('Error fetching quote:', error);
    // Fallback quotes when API fails
    const fallbackQuotes = [
      { content: 'The best way to predict the future is to invent it.', author: 'Alan Kay' },
      { content: 'Code is like humor. When you have to explain it, it\'s bad.', author: 'Cory House' },
      { content: 'First, solve the problem. Then, write the code.', author: 'John Johnson' },
      { content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', author: 'Martin Fowler' },
      { content: 'The most powerful tool we have as developers is automation.', author: 'Scott Hanselman' },
      { content: 'Programming isn\'t about what you know; it\'s about what you can figure out.', author: 'Chris Pine' },
      { content: 'The only way to learn a new programming language is by writing programs in it.', author: 'Dennis Ritchie' },
      { content: 'Software is a great combination of artistry and engineering.', author: 'Bill Gates' }
    ];
    
    // Pick a random fallback quote
    const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    
    return {
      quote: `"${randomQuote.content}" — ${randomQuote.author} (offline)`,
      source: 'fallback'
    };
  }
};

// Fetch cryptocurrency prices from CoinGecko API
export const getCryptoPrice = async (coinId: string) => {
  try {
    // Using CoinGecko's public API to fetch prices
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_last_updated_at=true`
    );
    
    // Check if the data exists for the requested coin
    if (!data[coinId]) {
      throw new Error(`No data available for ${coinId}`);
    }
    
    // Extract the data we need
    const coin = data[coinId];
    const price = coin.usd;
    const change24h = coin.usd_24h_change;
    const marketCap = coin.usd_market_cap;
    const lastUpdated = new Date(coin.last_updated_at * 1000).toLocaleString();
    
    return {
      name: coinId,
      price,
      change24h,
      marketCap,
      lastUpdated,
      success: true
    };
  } catch (error) {
    console.error(`Error fetching ${coinId} price:`, error);
    return {
      name: coinId,
      success: false,
      error: error.message || 'Failed to fetch cryptocurrency data'
    };
  }
};
