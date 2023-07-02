# Develop `Token` web component
It's time for fun! While coding, the server will auto-refresh the `index.html`, so you can keep track of the changes.

<br>

## 1. Clean up (Token.hbs, Token.css, Token.ts)
Each components package comes with a demo web component with certain functionality. The first step is to do cleanup for a fresh start.

<br>

- **`src/Token.ts`** - replace file content with:

```js
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

// Template
import TokenTemplate from "./generated/templates/TokenTemplate.lit.js";

// Styles
import TokenCss from "./generated/themes/Token.css.js";

@customElement({
	tag: "my-token",
	renderer: litRender,
	styles: TokenCss,
	template: TokenTemplate,
	dependencies: [],
})
class Token extends UI5Element {
}

Token.define();

export default Token;

```

<br>

- **`src/Token.hbs`** - replace the template with the following markup:

```html
<div> My test component</div>
```

<br>

- **`src/themes/Token.css`** - remove all styles:

```css
:host {
}
```

<br>


## 2. Add some styles

**Note:** all `--sap*` CSS variables are maintained by the SAP Design team and commonly used by apps and UI frameworks to implement the SAP themes. They are included as part of the underlying UI5 Web Components framework and are available for usage.

<br>

- **`src/Token.css`** - append the following styles:

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
The `slot` is a standard HTML element and is widely used with web components. It allows you to control where the children of a web component should be inserted.
In this case, we will use the `slot` to display text inside the `Token`.

<br>

- **`src/Token.hbs`** - replace the template with the following markup:

```html
<div> <slot></slot> </div>
```

<br>

- **`test/pages/index.html`** - add text inside `my-token`:

```html
<my-token>Component's text</my-token>
```

**Note:** Тhe `slot`defines where exactly to display the text and this can be seen in the ShadowDOM via the Chrome Dev Tools (the right figure).

<br>

<img width="737" alt="Screenshot 2023-06-25 at 12 43 25" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/20fcced2-3f60-4e3a-82ea-5128783c3af6"></br>

<br>

## 4. Add `icon`
The Token needs a `X` icon, that later the user will click to remove it. UI5 Web Components provide a large collection of icon SVGs. And, we are going to use the `decline` icon, which is part of the `@ui5/webcomponents-icons` package, and the `Icon(<ui5-icon>)` web component from the `@ui5/webcomponents` package. We have to install these packages beforehand.

<br>

- Install **`dependencies`** - run the following in your project's root (keep the server running, run the command from another terminal if needed):

```sh
npm i @ui5/webcomponents @ui5/webcomponents-icons
```

<br>

- **`src/Token.ts`** - apply the highlighted (green) changes:

**Note:** If the IDE complains about the imports - close/open the IDE. The IDE did not detected you've just installed the dependencies.

```diff

import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
+import Icon from "@ui5/webcomponents/dist/Icon.js";
+import "@ui5/webcomponents-icons/dist/decline.js";


@customElement({
	tag: "my-token",
	renderer: litRender,
	styles: TokenCss,
	template: TokenTemplate,
+	dependencies: [Icon], // declare it as a dependency
})
class Token extends UI5Element {
...
}

```

<br>

- **`src/Token.hbs`** - replace the file content with:

```html
<div class="my-token-root">
	<slot></slot>
	<ui5-icon name="decline"></ui5-icon>
 </div>
```

<br>

- **`src/themes/Token.css`** - append the following styles:

```css
/* New styles to append (don't remove the previously added) */

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

<img width="740" alt="Screenshot 2023-06-25 at 12 44 07" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/41f5f7c0-6e82-463c-bf26-607b2ffe5b1b"></br>

<br>

## 5. Add `readonly` property
The `Token` (and the `Tokenizer`) will be used in a Table that will support "Edit" mode. We will need to display the `decline` icon in "Edit" mode, otherwise hide it. Let's add a boolean property to show/hide the `decline` icon.


<br>

- **`src/Token.ts`** - import the `@property` decorator to the top and add the `readonly` property:

```js

import property from "@ui5/webcomponents-base/dist/decorators/property.js";

...

class Token extends UI5Element {
	@property({ type: Boolean })
	readonly!: boolean;
}
```

<br>

- **`src/Token.hbs`** - replace file content with:


```html
<div class="my-token-root">
	<slot></slot>
	{{#unless readonly}}
		<ui5-icon name="decline"></ui5-icon>
	{{/unless}}
</div>
```
When `readonly` is set - the icon won't be rendered. When `readonly` is not set - the icon gets rendered.

<br>

- **`test/pages/index.html`** - add a second token with `readonly` set to test the property.

```html
   <my-token>Component's text</my-token>
   <my-token readonly>This is readonly</my-token>
```

<img width="359" alt="Screenshot 2023-06-20 at 14 00 19" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/a27d2c16-2b28-45c5-b90a-0bd442a29634"></br>

<br>

## 6. Add `delete` event
We need to fire an event, when the user clicks on the `decline` icon, so the application can react accordingly.
To do so, we use the `fireEvent` method, provided by `UI5Element` and available in all descendants.

- **`src/Token.ts`** - add the `handleIconClick` method to the class:

```js
class Token extends UI5Element {
	handleIconClick() {
		this.fireEvent("delete");
	}
}
```

<br>

- **`src/Token.hbs`** -  replace file content with:

```html
<div class="my-token-root">
	<slot></slot>
	{{#unless readonly}}
		<ui5-icon name="decline" interactive @click={{handleIconClick}}></ui5-icon>
	{{/unless}}
</div>
```

Click handler attached on the `ui5-icon`.


<br>

## Well Done, the Token is ready!

It's time to decide how to continue your journey, based on the time factor!

You can either continue with:
<br>
[Use `Token` web component in the Smart Store application](./4_Use_WebComps_in_Smart_Store_app.md) (Standard flow)

Or, choose the extended flow and continue with implementing a second web component - the Tokenizer:
<br>
[Develop `Tokenizer` web component](./3_Develop_Tokenizer.md) (Extended flow +10min)


