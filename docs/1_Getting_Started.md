## Getting started

Your objective is to **develop two web components (Token and Tokenizer)** and **integrate them in an existing app** (the [SmartStore](https://ilhan007.github.io/ui5con-app/#/home) app), because these components are required for our app, but missing in the standard [UI5 Web Components](https://sap.github.io/ui5-webcomponents/playground/components) set.

- -> action item: add snapshot of the components
- -> action item: add snapshot of the app view, that new components will be used

## Start coding

### Step 1. Use `@ui5/webcomponents-package` to get the initial setup of the project.


```sh
npm init @ui5/webcomponents-package@1.15.0
```


### Step 2. Follow the prompts.

First, you will be asked to install @ui5/webcomponents-package
- Ok to proceed? (y) - **`Press [ENTER] to continue`**

The, you will be asked to choose:

- Package name: type **`@ui5con/components`**
- Project type (JavaScript/TypeScript): choose **`TypeScript`**
- Component name (the class name of our first web component): type **`Token`**
- JSDoc namespace - press **`[Enter]`**


### Step 3. Follow the instructions to run the project.

Execute the commands one by one (`npm i` make take some time)
```sh
cd <packageName>
npm i
npm start
```


### Step 4. Open the index.html page.

- Once the server starts, it will open a page with link to the **`index.html - just click on it`**.

<img width="552" alt="Screenshot 2023-06-15 at 14 40 47" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/3fa10b5c-fdf4-403f-aca7-68df072a86b2">



- **Play with the generated web component**

The project comes with a dummy web component that's already used in the index.html. 
And, it's interactive - clicking on it increments the counter

<img width="402" alt="Screenshot 2023-06-15 at 14 52 35" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/7f076d35-7606-41b1-a699-157e35f2f7ef">



- **Switch themes**
  
Theming is also setup, you can switch themes with the links below the component to see how it feels like.

<img width="403" alt="Screenshot 2023-06-15 at 14 50 38" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/0b038e3b-c757-4fec-a049-4a7e730aea87">



### Step 5. Build the project

Last thing before we start coding is to build the project, so that all TypeScript definitons are properly built
and avoid any TypeScript warnings in the IDE.

You can keep the server running and open another terminal from the same project folder and run the build command.
Or, if you prefer, you can stop the server and then run the build command.

```sh
npm run build
```

### Step 6. Open the project in your IDE.

Let's get Familiar with the project a little bit. Although at first you will see a lot of folders and files,
you will get used to them soon. For now, the important files to understand are:

- **`src/Token.ts`** - the beahviour of the component (the Token TypeScript class)

This is the most important file. Here we define our component - its behavior, its properties, etc.
The init script already generated the boilerplate code of a UI5 Web Component.

- The Token extends UI5Element - this is the base class for all [UI5 Web Components](https://sap.github.io/ui5-webcomponents/playground/components) available
- The web component is defined via the `@customElement` decorator. For example, the tag name is set to `my-token` and this is how the elment should be used in HTML. 

```js
@customElement({
	tag: "my-token",
	renderer: litRender,
	styles: TokenCss,
	template: TokenTemplate,
})
class Token extends UI5Element {
```

- And, it has a single property, defined via the `@property` decorator. The property is changed whenever someone clicks on the element
in the `onClick` handler (see next point how the handler is attached).
**Note:** When component property (e.g. state) changes, the component will re-render automatically.

```js
  @property({ validator: Integer, defaultValue: 0 })
	count!: number;

  onClick() {
		this.count++;
	}
```



- **`src/Token.hbs`** - the template of the component (the HTML markup of the Token, written as Handlebars template)

Currently, it's almost blank, just a `div` with a `click` handler, displaying some text to just prepare to the ground.
What you need to know is that the context inside the Token.hbs template is an instance of the Token class.
In other words, whatever you can access with `this` in Token.ts, f.e `this.counterText`, `this.count`, you can use in the template inside curly moustache statements - `{{counterText}}`, {{count}}.

```html
<div @click="{{onClick}}">{{counterText}} :: {{count}}</div>
```


- **`src/themes/Token.css`** - the styles of the component

Here you will wriet the styles of the Token component. Whatever styles you write, they will be applied to the template that we have just talked about in the previous step.

Next [Develop `UI5ConToken` web component](./2_Develop_Token.md)

