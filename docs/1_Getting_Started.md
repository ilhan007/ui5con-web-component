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
- src/UI5Token.ts - beahviour of the component
- src/UI5Token.hbs - the template of the component
- src/themes/UI5Token.css - styles of the component

Next [Develop `UI5ConToken` web component](./2_Develop_Token.md)

