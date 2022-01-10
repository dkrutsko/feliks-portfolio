This website uses [Handlebars](https://handlebarsjs.com) templates to implement and compile the HTML. To build the website, install [Node.js](https://nodejs.org) and run the `build` command. To make development easier, run the watch command after installing [`watch-cli`](https://npmjs.org/watch-cli) globally. This project does not use CSS or JavaScript preprocessors.

```bash
# Install packages for project
npm install

# Install watch command globally
npm install -g watch-cli

# Compile Handlebars templates
npm run build

# Watch for changes then build
npm run watch
```
