# 💻 TermSite - build a terminal styled website

Highly customizable, easy-to-use, and minimal terminal styled website template, powered by Next.js.

Building a simple website with TermSite and you only need to work with the file: `config.json`. 


Feel free to play with the site here https://bigsk1.vercel.app/

## 📸 Showcase

<p align="center">
<img src="./demo/sk1.jpg" width="600"><br>
<strong>personal term site</strong>
</p>


### Docker Usage

First, clone the project and edit `config.json` to your liking. Then run the following to start the container in DEV mode uses (port 3005)

```shell
docker-compose up -d --build termsite
```

To run docker container in production mode uses (port 3000)

```bash
docker-compose up -d --build termsite-prod
```

## 📄 Configuration

### Basic Configuration

90% of TermSite's configurations are done through the `config.json` file.

```javascript
{
  "readmeUrl": // create a Github README and link it here!
  "title": // title of the website
  "name": // your name, included in 'about' command
  "ascii": // ascii art to display
  "social": {
    "github": // your handle
    "linkedin": // your handle
  },
  "email": // your email
  "ps1_hostname": "liveterm" // hostname in prompt
  "ps1_username": "visitor", // username in prompt
  "resume_url": "../resume.pdf", // path to your resume
  "non_terminal_url": "W",
  "colors": {
    "light": {
      ...
    },
    "dark": {
      ... // you can use existing templates in themes.json or use your own!
    }
  }
}
```

Feel free to change it as you see fit!

### Themes

You can find several pre-configured themes in `themes.json`, and you can replace the colors in `config.json` with the theme color you like! The themes are based on the themes on [this website](https://glitchbone.github.io/vscode-base16-term/#/).

For a better preview of the themes, checkout the images in the `demo` folder.

### Favicons

Favicons are located in `public/`, along with the other files you may want to upload to your website. I used this [website](https://www.favicon-generator.org/) to generate favicons.

### Banner

You may also want to change the output of the `banner` command. To do that, simply paste your generated banner in `src/utils/bin/commands.ts`. I used this [website](https://manytools.org/hacker-tools/ascii-banner/) to generate my banner.

### Advanced Configuration

If you want to further customize your page, feel free to change the source code to your liking!

## 🌐 Deploy on Vercel

The easiest way to deploy a Next.js app is to use the [Vercel Platform](https://vercel.com/) from the creators of Next.js.

You can install `vercel` cli and follow the instruction [here](https://vercel.com/docs/concepts/deployments/overview).

You can also connect your github account to vercel and have vercel automatically deploy the github repository for you.


## Credit

Based on M4TT72's awesome [Terminal](https://github.com/m4tt72/terminal).

Made from Fork at https://github.com/Cveinnt/LiveTerm
