<p align="left">
    <a href="https://www.npmjs.com/package/webpack-butternut-plugin">
        <img src="https://img.shields.io/npm/v/webpack-butternut-plugin.svg?style=flat-square">
    </a>
</p>

# Webpack Butternut Plugin

**Webpack plugin for fast, future-friendly minifier with supporting ES2015+.**


#### Install

> via **yarn**:
>
>     yarn add --dev webpack-butternut-plugin
>
> or via **npm**:
>
>     npm i --save-dev webpack-butternut-plugin

#### Usage

```js
const ButternutPlugin = require('webpack-butternut-plugin');

module.exports = {
  plugins: [
      new ButternutPlugin({
          check: true
      })
  ]
}
```

All possible input Butternut's options you can find [this](https://github.com/Rich-Harris/butternut#javascript-api).
