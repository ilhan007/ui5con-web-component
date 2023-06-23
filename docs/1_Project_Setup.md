# Project setup
`@ui5/webcomponents-package` provides all you need to start developing web components, based on UI5 Web Components framework - project skeleton, demo web component, TypeScript setup and development server to allow start coding rightaway.

## 1. Create project

Open your OS Terminal in any folder in your file system and use `@ui5/webcomponents-package` to initialize the project.


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


<img width="627" alt="Screenshot 2023-06-23 at 13 36 41" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/4133292a-8cc7-494b-8168-7b47aea6f18f"></br></br>

<br>

- **Play with the generated web component**

The project comes with a demo web component that's already used in the index.html. 
And, it's interactive - clicking on it increments the counter.

<img width="599" alt="Screenshot 2023-06-23 at 13 37 27" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/0c67d922-6e1a-43c8-bb83-a027e906b8e3"></br></br>

<br>

- **Switch themes**
  
Theming is also set up. By default, there are 4 themes the component supports (Morning Horizon, Evening Horizon, Horizon HCB and HCW), that you can switch themes with the links below the component.

<img width="612" alt="Screenshot 2023-06-23 at 13 40 31" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/7839986d-ce72-44b0-a109-36f64ff565c6"></br></br>


## 5. Build the project

We need to build the project only once, so that all TypeScript definitons are properly built
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

Here we define our component (tag, properties, styles, template) via the usage of TypeScript decorators!

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

