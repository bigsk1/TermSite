import { getCryptoPrice } from '../api';

// Map of common crypto keywords to their CoinGecko IDs
const cryptoMap = {
  btc: 'bitcoin',
  bitcoin: 'bitcoin',
  eth: 'ethereum',
  ethereum: 'ethereum',
  sol: 'solana',
  solana: 'solana',
  bnb: 'binancecoin',
  binance: 'binancecoin',
  xrp: 'ripple',
  ripple: 'ripple',
  doge: 'dogecoin',
  dogecoin: 'dogecoin',
  ada: 'cardano',
  cardano: 'cardano',
  dot: 'polkadot',
  polkadot: 'polkadot',
  ltc: 'litecoin',
  litecoin: 'litecoin',
};

// Function to format price with commas
const formatPrice = (price: number) => {
  if (price === undefined) return 'N/A';

  // For small values, show more decimals
  if (price < 1) {
    return price.toFixed(6);
  }

  // Format with commas
  return price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// Format market cap in billions or millions
const formatMarketCap = (marketCap: number) => {
  if (marketCap === undefined) return 'N/A';

  if (marketCap >= 1_000_000_000) {
    return `$${(marketCap / 1_000_000_000).toFixed(2)}B`;
  } else if (marketCap >= 1_000_000) {
    return `$${(marketCap / 1_000_000).toFixed(2)}M`;
  } else {
    return `$${marketCap.toLocaleString()}`;
  }
};

// Format 24h change with color indication
const formatChange = (change: number) => {
  if (change === undefined) return 'N/A';

  const changeFixed = change.toFixed(2);
  if (change > 0) {
    return `<span class="text-green-500">▲ ${changeFixed}%</span>`;
  } else if (change < 0) {
    return `<span class="text-red-500">▼ ${changeFixed}%</span>`;
  } else {
    return `<span class="text-gray-400">• ${changeFixed}%</span>`;
  }
};

export const crypto = async (args: string[]): Promise<string> => {
  // Display help if requested or no arguments provided
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    return `
Usage: crypto [coin] [coin2] ...

Examples:
  crypto btc          - Get Bitcoin price
  crypto eth sol      - Get Ethereum and Solana prices
  crypto list         - Show available cryptocurrencies

Available coins: btc, eth, sol, bnb, xrp, doge, ada, dot, ltc
Alternative names like "bitcoin" or "ethereum" also work.
`;
  }

  // Show list of available cryptocurrencies
  if (args.includes('list')) {
    let cryptoList = 'Available cryptocurrencies:\n\n';

    // Create a map to group aliases by coin name
    const coinGroups = {};

    // Group all aliases by their full coin name
    Object.entries(cryptoMap).forEach(([shortName, fullName]) => {
      if (!coinGroups[fullName]) {
        coinGroups[fullName] = [];
      }
      coinGroups[fullName].push(shortName);
    });

    // Get sorted list of unique coin names
    const uniqueCoins = Object.keys(coinGroups).sort();

    // Format the output
    cryptoList += uniqueCoins
      .map((coin) => {
        return `${coin} (${coinGroups[coin].join(', ')})`;
      })
      .join('\n');

    return cryptoList;
  }

  // Process crypto requests
  const coinRequests = args.map((arg) => arg.toLowerCase());
  const results = [];

  // Only fetch a maximum of 5 coins at once
  const coinsToFetch = coinRequests.slice(0, 5);

  for (const coinRequest of coinsToFetch) {
    // Map shorthand to full coin name
    const coinId = cryptoMap[coinRequest] || coinRequest;

    // Fetch the cryptocurrency data
    const result = await getCryptoPrice(coinId);

    if (result.success) {
      // Format the result into a nice output
      results.push(`
<div class="crypto-card p-2 mb-2 border-l-4 border-blue-500 pl-2">
  <div class="crypto-name font-bold">${
    result.name.charAt(0).toUpperCase() + result.name.slice(1)
  }</div>
  <div class="crypto-price">Price: $${formatPrice(result.price)}</div>
  <div class="crypto-change">24h: ${formatChange(result.change24h)}</div>
  <div class="crypto-market-cap">Market Cap: ${formatMarketCap(
    result.marketCap,
  )}</div>
  <div class="crypto-updated text-xs text-gray-500">Updated: ${
    result.lastUpdated
  }</div>
</div>
`);
    } else {
      // Return error message if fetching failed
      results.push(`
<div class="crypto-card p-2 mb-2 border-l-4 border-red-500 pl-2">
  <div class="crypto-name font-bold">${coinRequest}</div>
  <div class="crypto-error text-red-500">Error: ${result.error}</div>
  <div class="crypto-hint text-xs text-gray-500">Try 'crypto list' to see available coins</div>
</div>
`);
    }
  }

  // If too many coins were requested, add a note
  if (coinRequests.length > 5) {
    results.push(`
<div class="text-yellow-500 mt-2">
  Note: Maximum 5 coins can be fetched at once. Showing first 5 of ${coinRequests.length} requested.
</div>
`);
  }

  return results.join('');
};

export default crypto;
