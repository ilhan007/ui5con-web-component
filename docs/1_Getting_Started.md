## Getting started

Your objective is to **develop two web components (Token and Tokenizer)** and **integrate them in an existing app** - the [SmartStore](https://ilhan007.github.io/ui5con-app/#/home) app.
- -> action item: add snapshot of the components


The **`Token`** and **`Tokenizer`** will be used in the **`Status`** column of the [SmartStore Inventory](https://ilhan007.github.io/ui5con-app/#/detail), instead of the badges that are currently used ("DETERIOATING", "IN-STOCK" on the image below). With the Token and Tokenizer, we will implement "Edit" mode of the Table and allow users to edit the statuses.

<img width="898" alt="Screenshot 2023-06-15 at 15 29 33" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/d527a173-75d7-4932-aeab-bc04a57979e8"></br>

- -> action item: add snapshot with the components integrated

The Token will represent the single status and the Tokenizer will be the container for all Tokens, providing responsiveness.
- -> action item: add snapshot to illustrate it

<br>

## 1. Create project

Choose any folder in your file system and use `@ui5/webcomponents-package` to get the initial setup of the project.


```sh
npm init @ui5/webcomponents-package@1.14.2
```

<br>

## 2. Follow the prompts

First, you will be asked to install @ui5/webcomponents-package
- Ok to proceed? (y) - **`Press [ENTER] to continue`**

The, you will be asked to choose:

- Package name: type **`@ui5con/components`**
- Project type (JavaScript/TypeScript): choose **`TypeScript`**
- Component name (the class name of our first web component): type **`Token`**
- JSDoc namespace - press **`[Enter]`**

<br>

## 3. Run the project

Execute the commands one by one, waiting for the previous to finish.

```sh
cd <packageName>
npm i
npm start
```

<br>

## 4. Open the index.html page

Once the server starts, it will open a page in your default browser with a link to the **`index.html`** - just click on it.

<img width="552" alt="Screenshot 2023-06-15 at 14 40 47" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/3fa10b5c-fdf4-403f-aca7-68df072a86b2"></br></br>


- **Play with the generated web component**

The project comes with a demo web component that's already used in the index.html. 
And, it's interactive - clicking on it increments the counter.

<img width="402" alt="Screenshot 2023-06-15 at 14 52 35" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/7f076d35-7606-41b1-a699-157e35f2f7ef"></br></br>


- **Switch themes**
  
Theming is also set up, you can switch themes with the links below the component.

<img width="403" alt="Screenshot 2023-06-15 at 14 50 38" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/0b038e3b-c757-4fec-a049-4a7e730aea87"></br></br>


## 5. Build the project

We need to build the project ony once, so that all TypeScript definitons are properly built
and avoid any TypeScript warnings in the IDE.

You can keep the server running and open another terminal from the same project folder and run the build command.

```sh
npm run build
```

<br>


## 6. Open the project in your IDE

Although at first you will see a lot of folders and files, you will get used to them soon. The important files to understand are:

<br>

### **`src/Token.ts`**

Here we define our component - its behavior, its tag name, the properties, the styles it uses, the template, etc.

```js
@customElement({
	tag: "my-token",
	renderer: litRender,
	styles: TokenCss,
	template: TokenTemplate,
})
class Token extends UI5Element {
```

Our demo component has a single property, called `count`, defined via the `@property` decorator.
And, the `count` is incremented whenever someone clicks on the element in the `onClick` handler (see next point how the handler is attached).

```js
  @property({ validator: Integer, defaultValue: 0 })
  count!: number;

  onClick() {
    this.count++;
  }
```
**Important:** When component's property (e.g. state) changes, the component will re-render automatically.

<br>

### **`src/Token.hbs`**

Here we define the template of the component - the HTML markup, written as Handlebars template.
Currently, the template is almost blank to just prepare the ground for you.

```html
<div @click="{{onClick}}">{{counterText}} :: {{count}}</div>
```

**Important:** Whatever you can access with `this` in Token.ts, f.e `this.counterText`, `this.count`, you can use in the template inside curly moustache statements - `{{counterText}}`, `{{count}}`. The context inside the Token.hbs template is an instance of the Token class.

<br>

### **`src/themes/Token.css`**

Here you will write the styles of the Token component. Whatever styles you write, they will be applied to the template from the previous point.

Next [Develop `Token` web component](./2_Develop_Token.md)

