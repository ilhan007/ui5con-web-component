## Getting started

Your objective is to **develop two web components (Token and Tokenizer)** and **integrate them in an existing app** (the [SmartStore](https://ilhan007.github.io/ui5con-app/#/home) app), because these components are required for our app, but missing in the standard [UI5 Web Components](https://sap.github.io/ui5-webcomponents/playground/components) set.

- -> action item: add snapshot of the components


The **`Token`** and **`Tokenizer`** will be used in the **`Status`** column of the [SmartStore Inventory](https://ilhan007.github.io/ui5con-app/#/detail) instead of the readonly badges that are currently used ("DETERIOATING", "IN-STOCK" on the image below),
to implement edit mode of the Table and allow users to edit the statuses (displayed via the Token and Tokenizer).

<img width="898" alt="Screenshot 2023-06-15 at 15 29 33" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/d527a173-75d7-4932-aeab-bc04a57979e8">

- -> action item: add snapshot with the components integrated

<br>
<br>

## Create project

### Step 1. Use `@ui5/webcomponents-package` to get the initial setup of the project.


```sh
npm init @ui5/webcomponents-package@1.14.2
```

<br>
<br>

### Step 2. Follow the prompts.

First, you will be asked to install @ui5/webcomponents-package
- Ok to proceed? (y) - **`Press [ENTER] to continue`**

The, you will be asked to choose:

- Package name: type **`@ui5con/components`**
- Project type (JavaScript/TypeScript): choose **`TypeScript`**
- Component name (the class name of our first web component): type **`Token`**
- JSDoc namespace - press **`[Enter]`**

<br>
<br>

### Step 3. Follow the instructions to run the project.

Execute the commands one by one (`npm i` make take some time)
```sh
cd <packageName>
npm i
npm start
```

<br>
<br>

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

<br>
<br>

### Step 5. Build the project

Last thing before we start coding is to build the project, so that all TypeScript definitons are properly built
and avoid any TypeScript warnings in the IDE.

You can keep the server running and open another terminal from the same project folder and run the build command.
Or, if you prefer, you can stop the server and then run the build command.

```sh
npm run build
```

<br>
<br>


### Step 6. Open the project in your IDE.

Let's get Familiar with the project. Although at first you will see a lot of folders and files,
you will get used to them soon. For now, the important files to understand are:

<br>

- **`src/Token.ts`** - the beahviour of the component (the Token TypeScript class)

Here we define our component - its behavior, its properties, etc.
The init script already generated the boilerplate code of our first UI5 Web Component.
The main points are:
- The Token extends UI5Element - the base class for all [UI5 Web Components](https://sap.github.io/ui5-webcomponents/playground/components)
- The Token is defined via the `@customElement` decorator. For example, see the tag name `my-token` -  this is how the element should be used in HTML.

```js
@customElement({
	tag: "my-token",
	renderer: litRender,
	styles: TokenCss,
	template: TokenTemplate,
})
class Token extends UI5Element {
```

- The component has a single property, called `count`, defined via the `@property` decorator. And, the `count` is incremented whenever someone clicks on the element in the `onClick` handler (see next point how the handler is attached).

**Important:** When component's property (e.g. state) changes, the component will re-render automatically.

```js
  @property({ validator: Integer, defaultValue: 0 })
  count!: number;

  onClick() {
    this.count++;
  }
```

<br>

- **`src/Token.hbs`** - the template of the component (the HTML markup of the Token, written as Handlebars template)

Currently, the template is almost blank, just a `div` with a `click` handler, displaying some text to just prepare the ground for you.
Whatever you can access with `this` in Token.ts, f.e `this.counterText`, `this.count`, you can use in the template inside curly moustache statements - `{{counterText}}`, `{{count}}`.

**Important:** the context inside the Token.hbs template is an instance of the Token class.



```html
<div @click="{{onClick}}">{{counterText}} :: {{count}}</div>
```

<br>

- **`src/themes/Token.css`** - the styles of the component

Here you will write the styles of the Token component. Whatever styles you write, they will be applied to the template from the previous point.

Next [Develop `Token` web component](./2_Develop_Token.md)

