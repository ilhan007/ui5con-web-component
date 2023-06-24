# Develop `Token` web component
It's time for fun! While coding, the server will auto-refresh the `index.html`, so you can keep track on the changes.

<br>

## 1. Clean up (Token.hbs, Token.css, Token.ts)
Each components' package comes with a demo web component with certain functionality. The first step is to cleanup for a fresh start.

<br>

- **`Token.ts`**

```js
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

// Template
import TokenTemplate from "./generated/templates/TokenTemplate.lit.js";

// Styles
import TokenCss from "./generated/themes/Token.css.js";

class Token extends UI5Element {
}

```

<br>

- **`Token.hbs`** - replace the template with the following markup.

```html
<div> My test component</div>
```

<br>

- **`Token.css`** - remove all styles.

```css
:host {
}
```

<br>


## 2. Add some styles

**Note:** all `--sap*` variables are global and commonly used by apps and UI frameworks to implement the SAP design. They are available as they are included and part of the underlying UI5 Web Components framework.

<br>

- **`Token.css`**

```css
:host {
  display: inline-flex;
  color: var(--sapTextColor);
  background: var(--sapBaseColor);
  border: 1px solid var(--sapContent_ForegroundBorderColor);
  border-radius: 0.5rem;
  font-size: var(--sapFontSize);
  font-family: var(--sapFontFamily);
  padding: 0.3125rem;
}
```

<br>

## 3. Add `slot`
The `slot` is a standard HTML element and widely used with web components. It alows to control where the children of a web component should be inserted.
In this case, we will use the `slot` to display text inside the `Token`.

<br>

- **`index.html`** - add text inside `my-token`.

```html
<my-token id="myFirstComponent">Component's text</my-token>
```

<br>

- **`Token.hbs`** - use the `slot` to tell where exactly to display the text.

```html
<!-- Change Token.hbs to: -->
<div> <slot></slot> </div>
```

<br>

<img width="743" alt="Screenshot 2023-06-23 at 13 54 10" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/bd73911c-1f36-4fe1-a28c-7619dee2e5a8"> </br></br>

<br>

## 4. Add `icon`
The Token needs a "X" icon, that later the user will click to remove it. UI5 Web Components provide a large collection of icons SVGs. And, we are going to need the `decline` icon, which is part of the `@ui5/webcomponents-icons` package and the `Icon(<ui5-icon>)` web component from the `@ui5/webcomponents` package. We have to install these packages before using the icon.

<br>

- Add the **`dependencies`** - run the following in your project's root.

```sh
npm i -S @ui5/webcomponents @ui5/webcomponents-icons
```

<br>

- **`Token.ts`**

```diff
## Change (Token.ts)
...

import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
+ import Icon from "@ui5/webcomponents/dist/Icon.js";
+ import "@ui5/webcomponents-icons/dist/decline.js";

...

@customElement({
	tag: "my-token",
	renderer: litRender,
	styles: TokenCss,
	template: TokenTemplate,
+	dependencies: [Icon],
})

...
```
**Note:** If the IDE complains about the imports - close/open the IDE. The IDE did not get that you have just installed the dependencies.

<br>

- **`Token.hbs`**

```html
<!-- Change Token.hbs to: -->
<div class="my-token-root">
	<slot></slot>
	<ui5-icon name="decline"></ui5-icon>
 </div>
```

<br>

- **`Token.css`** - add styles to align the text and the icon.

```css
:host {
	display: inline-flex;
	color: var(--sapTextColor);
	background: var(--sapBaseColor);
	border: 1px solid var(--sapContent_ForegroundBorderColor);
	border-radius: 0.5rem;
	font-size: var(--sapFontSize);
	font-family: var(--sapFontFamily);
	padding: 0.3125rem;
}

/* new styles */
:host(:hover) {
	background: var(--sapButton_Hover_Background);
	cursor: default;
}

.my-token-root {
	display: flex;
	align-items: center;
}

ui5-icon {
	color: var(--sapInformationColor);
	background: var(--sapHoverColor);
	border-radius: 50%;
	margin-inline-start: 0.5rem;
}

```

<br>

## 5. Add `readonly` property
The `Token` (and the `Tokenizer`) will be used in a Table that will support "Edit" mode. We will need to display the `decline` icon in "Edit" mode, othwerwise hide it. Let's add a boolean property to show/hide the `decline` icon.


<br>

- **`Token.ts`**

```js
// Add `readonly` property and the property decorator.

import property from "@ui5/webcomponents-base/dist/decorators/property.js";

class Token extends UI5Element {
	@property({ type: Boolean })
	readonly!: boolean;
}
```

<br>

- **`Token.hbs`** 
When `readonly` is set - the icon won't be rendered. When `readonly` is not set - the icon gets rendered.

```html
<!-- Change Token.hbs to: -->

<div class="my-token-root">
	<slot></slot>
	{{#unless readonly}}
		<ui5-icon name="decline"></ui5-icon>
	{/unless}}
</div>
```

<br>

- **`index.html`** - add a second token with `readonly` set to test the property.

```html
   <my-token>Component's text</my-token>
   <my-token readonly>This is readonly</my-token>
```

<img width="359" alt="Screenshot 2023-06-20 at 14 00 19" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/a27d2c16-2b28-45c5-b90a-0bd442a29634"></br>

<br>

## 6. Add `delete` event
We need to fire an event, when the user clicks on the `decline` icon, so the application can react accordingly.
To do so, we use the `fireEvent` method, provided by `UI5Element` and available in all descendants.

- **`Token.ts`**

```js
// Add `handleIconClick` to the Token class.

class Token extends UI5Element {

	handleIconClick() {
		this.fireEvent("delete");
	}
}
```

<br>

- **`Token.hbs`** - attach the click handler on the `ui5-icon`.

```html
<!-- Change Token.hbs to: -->

<div class="my-token-root">
	<slot></slot>
	{{#unless readonly}}
		<ui5-icon name="decline" interactive @click={{handleIconClick}}></ui5-icon>
	{{/unless}}
</div>
```


<br>

## Well Done, Token is ready!

Now, you can continue normally with implementing the Tokenizer web component, or skip forward to the final step.

- Next: [Develop `Tokenizer` web component](./3_Develop_Tokenizer.md)
- Final: [Use `Token` and `Tokenizer` web components in the Smart Store application](./4_Use_in_Smart_Store_app.md)
