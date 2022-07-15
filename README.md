# Mermaid Tool

![Version of EditorJS that the plugin is compatible with](https://badgen.net/badge/Editor.js/v2.0/blue)

Provides [Mermaid](http://mermaid-js.github.io/mermaid/) Blocks for the [Editor.js](https://ifmo.su/editor).

## Installation

### Install via NPM

Get the package

```shell
npm i --save editorjs-mermaid
```

Include module at your application

```javascript
const MermaidTool = require('editorjs-mermaid');
```

### Download to your project's source dir

1. Upload folder `dist` from repository
2. Add `dist/bundle.js` file to your page.

### Load from CDN

You can load specific version of package from [jsDelivr CDN](https://www.jsdelivr.com/package/npm/@editorjs/header).

`https://cdn.jsdelivr.net/npm/@editorjs/header@latest`

Then require this script on page with Editor.js through the `<script src=""></script>` tag.

## Usage

Add a new Tool to the `tools` property of the Editor.js initial config.

If you want to configure mermaid, use the `onReady` property of Editor.js.

```javascript
var editor = EditorJS({
  ...

  tools: {
    ...
    mermaid: MermaidTool,
  },

  ...

  onReady: () => {
    MermaidTool.config({ 'theme': 'neutral' })
  }

  ...
});
```

## Output data

| Field   | Type     | Description        |
| ------- | -------- | ------------------ |
| caption | `string` | caption            |
| code    | `string` | mermaid code       |

```json
{
  "type": "header",
  "data": {
    "caption": "flowchart sample",
    "code": "flowchart LR\nA-->B"
  }
}
```
