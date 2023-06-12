# Develop Token (ui5con-token) and Tokenizer (ui5con-tokenizer) web components in TypeScript


The `ui5con-web-component` project demostrates web comopnents development flow with the usage of the [UI5 Web Components](https://github.com/SAP/ui5-webcomponents) tools and TypeScript. The tools provide build, ru



## Prerequisites
- [Node.js](https://nodejs.org/) - **version v18.15.0 or later** (check the version with `node -v`)
- npm - **version 9 or later** (check the version with `npm -v` and `npm install -g npm@latest` to update if necessary)
- Based on the IDE - you might need some extensions for better TypeScript support


## Getting started

### Step 1. Use `@ui5/webcomponents-package` to get the initial setup of the project.


```sh
npm init @ui5/webcomponents-package@1.15.0
```

### Step 2. Follow the prompts.

The initialization script will ask you to choose:

Ok to proceed? (y)
- Package name: type **`@ui5con/components`**
- Project type (JavaScript/TypeScript): choose **`TypeScript`**
- Component name (the class name of our first web component): type **`UI5ConToken`**
- ? JSDoc namespace - press **`[Enter]`** to skip


### Step 3. Just follow the instructions:

```sh
cd <packageName>
npm i
npm start
```

### Step 4. Open the index.html
-> add screenshot of the starting page

### Step 5. Build the project

```sh
npm run build
```


### Step 6. Open the project in your IDE.

#### Get Familiar with the project structure
- describe main files

## Development of the `UI5ConToken` web component

Token API

- text as @slot (`<ui5-token>Grey</ui5-token>`)
- @event("close/delete/remove") when pressing the icon



## Development of the `UI5ConTokenizer` web component

Tokenizer API

- @slot
  tokens: Array<Token>
- @event("close/delete/remove") when pressing the icon

## Use the `UI5ConToken` and `UI5ConTokenizer` web components in SmartStore app
