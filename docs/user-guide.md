# TermSite User Guide

Welcome to TermSite, a terminal-based website interface. This guide explains all available commands and features to help you navigate the terminal effectively.

## Basic Navigation

The terminal accepts text commands followed by Enter. Use your keyboard to type commands and navigate through previous commands with the up and down arrow keys.

### Global Shortcuts

- `[Tab]`: Trigger command completion
- `[Ctrl+L]` or `clear`: Clear the terminal screen
- `[Alt+C]`: Change cursor style

## Available Commands

### Information Commands

| Command | Description |
|---------|-------------|
| `help` | Shows a list of all available commands |
| `about` | Displays brief information about the author |
| `sumfetch` | Shows a summary of information |
| `banner` | Displays the welcome banner |
| `quote` | Shows a random inspirational quote |
| `crypto` | Displays cryptocurrency prices |

### Navigation Commands

| Command | Description |
|---------|-------------|
| `repo` | Opens the GitHub repository for this project |
| `homepage` | Opens the author's homepage |
| `twitter` | Opens the author's Twitter profile |
| `github` | Opens the author's GitHub profile |
| `github_docs` | Opens the author's GitHub documentation site |
| `email` | Opens your mail client to contact the author |

### Search Commands

| Command | Description |
|---------|-------------|
| `google [query]` | Searches Google for the specified query |
| `duckduckgo [query]` | Searches DuckDuckGo for the specified query |
| `reddit [query]` | Searches Reddit for the specified query |

### Linux-like Commands

| Command | Description |
|---------|-------------|
| `echo [text]` | Displays the text you type after the command |
| `whoami` | Shows the current username |
| `ls` | Lists directories (simulated) |
| `date` | Shows the current date and time |
| `vi`, `vim`, `nvim`, `emacs` | Joke responses about text editors |

### Visual Effects

| Command | Description |
|---------|-------------|
| `matrix [opacity]` | Toggles Matrix-style background effect with optional opacity (0.0-1.0) |
| `matrix off` | Turns off the Matrix effect |
| `theme [theme_name]` | Changes the terminal's color theme |

### Fun Commands

| Command | Description |
|---------|-------------|
| `snake` | Snake game (currently under maintenance) |
| `forkbomb` | Simulates a fork bomb attack (requires `--force` flag) |
| `rm -rf /` | Simulates the system deletion command (safe to use; just a visual effect) |
| `weather [city]` | Shows weather forecast for the specified city |
| `chat [message]` | Talk with a simple AI assistant |

## Command Examples

Here are some examples of how to use various commands:

```
help                 // Shows all available commands
google termsite      // Searches Google for "termsite"
echo Hello World     // Displays "Hello World"
matrix 0.1           // Enables Matrix effect with 0.1 opacity
theme bw             // Changes to black and white theme
forkbomb --force     // Simulates a fork bomb attack
weather new york     // Shows weather for New York
quote                // Shows an inspirational quote
crypto btc eth       // Shows Bitcoin and Ethereum prices
```

## Visual Effects

### Matrix Effect

The `matrix` command enables a visual effect similar to the digital rain from The Matrix movie. You can control the opacity of the effect and set it to show only symbols without changing the background:

```
matrix                // Enables with default opacity
matrix 0.2            // Enables with 0.2 opacity
matrix transparent    // Shows only symbols, keeps current background
matrix 0.3 nobg       // Shows only symbols with 0.3 opacity
matrix symbols        // Alternative syntax for transparent mode
matrix off            // Disables the effect
```

When using the transparent mode (`transparent`, `nobg`, or `symbols` option), the Matrix effect will only show the falling green characters without darkening the background, which works especially well with custom themes like `theme bw` or `theme green`.

### Theme Command

The `theme` command allows you to change the terminal's color scheme:

```
theme            // Shows available themes
theme bw         // Black and white theme
theme green      // Matrix-like green on black theme
theme blue       // Blue theme
theme retro      // Amber/orange terminal theme (like old computers)
theme midnight   // Dark blue with light text
theme default    // Revert to the default theme
```

## API-Based Commands

### Cryptocurrency Price Command

The `crypto` command displays current prices for various cryptocurrencies:

```
crypto btc       // Shows Bitcoin price
crypto eth sol   // Shows Ethereum and Solana prices
crypto list      // Shows all available cryptocurrencies
```

Supported cryptocurrencies include Bitcoin (btc), Ethereum (eth), Solana (sol), Binance Coin (bnb), XRP (xrp), Dogecoin (doge), Cardano (ada), Polkadot (dot), and Litecoin (ltc). You can use either the ticker symbol (like "btc") or the full name (like "bitcoin").

### Quote Command

The `quote` command displays random inspirational quotes. It fetches quotes from an API when online, and uses a fallback database when offline:

```
quote            // Shows a random quote
quote --help     // Displays help information for the quote command
```

### Weather Command

The `weather` command shows the current weather conditions and forecast for a specified location:

```
weather paris    // Shows weather for Paris
weather new york // Shows weather for New York
weather          // Shows usage instructions
```

## Fun Simulations

### Fork Bomb

The `forkbomb` command simulates a system crash with visual effects. It's completely safe and doesn't actually harm your system:

```
forkbomb          // Shows a warning
forkbomb --force  // Simulates the crash effect
```

### System Deletion

The `rm -rf /` command simulates the infamous system deletion command with visual effects. Like the fork bomb, it's completely safe and only shows an animation:

```
rm -rf /  // Simulates system deletion process
```

## Coming Soon

- Improved Snake game
- More interactive commands
- Additional visual themes

---

*This terminal website is a project by bigsk1. Visit the [GitHub repository](https://github.com/bigsk1/TermSite) for more information.* 