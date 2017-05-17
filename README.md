# webpack-butternut-plugin

#### Webpack plugin for fast, future-friendly minifier with supporting supports ES2015+.

#### Install

via ***yarn***:

    yarn add --dev webpack-butternut-plugin

or via ***npm***:

    npm i --save-dev webpack-butternut-plugin

#### Usage

```js
// In webpack.config.js
const ButternutPlugin = require('webpack-butternut-plugin');

module.exports = {
  plugins: [
      new ButternutPlugin()
  ]
}
```

All possible input Butternut's options you can find [this](https://github.com/Rich-Harris/butternut#javascript-api).
