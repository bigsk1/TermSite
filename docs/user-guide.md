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

### Fun Commands

| Command | Description |
|---------|-------------|
| `snake` | Snake game (currently under maintenance) |
| `forkbomb` | Simulates a fork bomb attack (requires `--force` flag) |
| `rm -rf /` | Simulates the system deletion command (safe to use; just a visual effect) |

## Command Examples

Here are some examples of how to use various commands:

```
help                 // Shows all available commands
google termsite      // Searches Google for "termsite"
echo Hello World     // Displays "Hello World"
matrix 0.1           // Enables Matrix effect with 0.1 opacity
forkbomb --force     // Simulates a fork bomb attack
```

## Visual Effects

### Matrix Effect

The `matrix` command enables a visual effect similar to the digital rain from The Matrix movie. You can control the opacity of the effect:

```
matrix        // Enables with default opacity (0.05)
matrix 0.2    // Enables with 0.2 opacity
matrix off    // Disables the effect
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