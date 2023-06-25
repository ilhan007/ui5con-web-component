# Develop `Tokenizer` web component
The `Tokenizer` will be a container for `Tokens`, providing responsive behaviour - overflow when Tokens can't fit in the available width.

<br>

## 1. Create Tokenizer via `create-ui5-element`

UI5 Web Components tools provides the `create-ui5-element` command that bootstraps a new web component (generates `Tokenizer.ts`, `Tokenizer.hbs` and `Tokenizer.css`).

- Run the command in the project's root:

```sh
npm run create-ui5-element Tokenizer
```

-  Afterwards, import the component `import "./dist/Tokenizer.js";` in the `bundle.esm.js` (root level file).

<br>

## 2. Clean-up code (Tokenizer.ts, Tokenizer.hbs and Tokenizer.css)
Once again, there is code generated for demonstration purpose that we won't need.

<br>

- **`Tokenizer.ts`**

```js
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

// Template
import TokenizerTemplate from "./generated/templates/TokenizerTemplate.lit.js";

// Styles
import TokenizerCss from "./generated/themes/Tokenizer.css.js"

@customElement({
	tag: "my-tokenizer",
	renderer: litRender,
	styles: TokenizerCss,
	template: TokenizerTemplate,
	dependencies: [],
})
class Tokenizer extends UI5Element {
}

```

<br>

- **`Tokenizer.hbs`**

```html
<!-- Change Tokenizer.hbs to: -->

<div>My Tokenizer</div>
```

<br>

## 3. Display the `Tokenizer`
By default, the tag is defined as `my-{className.toLowerCase}`, e.g. **`my-tokenizer`** in Tokenizer.ts.

<br>

- **`index.html`**

```html
<!-- Add Tokenizer to the index.html: -->

<my-token readonly>Readonly token</my-token>
<br>
<my-tokenizer></my-tokenizer>
```

<br>

## 4. Add styles

<br>

- **`Tokenizer.css`**

```css
## Change (Tokenizer.css):

:host {
	display: inline-flex;
	border: var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);
	border-radius: 0.375rem;
	padding: 0.5rem;
	position: relative;
	box-sizing: border-box;
}
```

<br>

<img width="181" alt="Screenshot 2023-06-22 at 14 08 09" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/c6f88c1b-020f-47b4-918b-90e07e495178"></br></br>

## 5. Add slot
The `Tokenizer` is expected to work with `Token(s)`, so we call the slot **`tokens`**.

<br>

- **`index.html`**

```html
<!-- Add content to the Tokenizer: -->

<my-tokenizer>
	<div>Token 1</div>
	<div>Token 2</div>
	<div>Token 3</div>
</my-tokenizer>
```

<br>

- **`Tokenizer.hbs`**

```html
<!-- Add slot element in the template: -->

<div> <slot></slot> </div>
```

<br>

- **`Tokenizer.ts`**

```js
// Import the "slot" decorator
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";

@customElement({
	tag: "my-tokenizer",
	renderer: litRender,
	styles: TokenizerCss,
	template: TokenizerTemplate,
	dependencies: [],
})
class Tokenizer extends UI5Element {
	// Add "tokens" slot to the component
	@slot({ type: HTMLElement, "default": true })
	tokens!: Array<HTMLElement>;
}

```

<img width="760" alt="Screenshot 2023-06-25 at 12 55 03" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/0d0c9928-8ac0-4a89-8973-2abee2cb4119"></br></br>


## 6. Integrate `Token`
We used plain divs so far. Now, let's use the `Token`.

<br>

- **`Tokenizer.ts`**

```js

import Token from "./Token.js"; // Import the "Token".

@customElement({
	tag: "my-tokenizer",
	renderer: litRender,
	styles: TokenizerCss,
	template: TokenizerTemplate,
	dependencies: [],
})
class Tokenizer extends UI5Element {
	@slot({ type: HTMLElement, "default": true })
	tokens!: Array<Token>; // Change type from "HTMLElement" to "Token".
	
}
```

<br>

- **`index.html`**

```html
<!-- Use "my-token", instead of div -->

<my-tokenizer>
	<my-token>Token 1</my-token>
	<my-token>Token 2</my-token>
	<my-token>Token 3</my-token>
	<my-token>Token 4</my-token>
	<my-token>Token 5</my-token>
</my-tokenizer>
```

<br>

- **`Tokenizer.hbs`**

```html
<!-- Change Tokenizer.hbs to:-->

<div class="root">
	<slot></slot>
</div>
```

<br>

- **`Tokenizer.css`**

```css
/* New styles to append */

.root {
	display: flex;
	align-items: center;
}

:slotted(my-token) {
	order: 1;
}
```

<br>

<img width="738" alt="Screenshot 2023-06-25 at 13 02 44" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/b7506e6d-2b8a-46d2-a395-eeefc52ad70a"></br></br>

<br>

## 7. Add `overflow` behavior
Simple logic to show up to 3 tokens and hide the rest + an icon that allows the user to see all tokens by clicking on it.

<br>

- **`Tokenizer.ts`**
```diff
## Change (Tokenizer.ts)

...

import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
+ import property from "@ui5/webcomponents-base/dist/decorators/property.js";
+ import Icon from "@ui5/webcomponents/dist/Icon.js";
+ import "@ui5/webcomponents-icons/dist/show.js";
+ import "@ui5/webcomponents-icons/dist/hide.js";
import Token from "./Token.js";


@customElement({
	tag: "my-tokenizer",
	renderer: litRender,
	styles: UI5ConTokenizerCss,
	template: UI5ConTokenizerTemplate,
+	dependencies: [
+		Icon,
+	],
})
class UI5ConTokenizer extends UI5Element {
+	@property({ type: Boolean })
+	showAll!: boolean;

	@slot({ type: HTMLElement, "default": true })
	tokens!: Array<Token>;

+	onIconClick() {
+		this.showAll = !this.showAll;
+	}
+
+	get hasOverflowTokens() {
+		return this.tokens.length > 3;
+	}
+
+	get activeIcon() {
+		return this.showAll ? "hide" : "show";
+	}

}
```

<br>

- **`Tokenizer.hbs`** - show the icon conditionally, only if tokens overflow.

```html
<!-- Change Tokenizer.hbs to:-->


 <div class="root">
	<div class="overflow-area">
		<slot></slot>
	</div>
	{{#if hasOverflowTokens}}
		<ui5-icon @click={{onIconClick}} interactive name={{activeIcon}}></ui5-icon>
	{{/if}}
 </div>
```

<br>

- **`Tokenizer.css`**

**Note:** for each property an equivalent attribute is supported - with the same name, but hyphenated, e.g **`showAll`** property is equivalent of **`show-all`** attribute. So, setting the prop and the attr is the same for our component state and this is handled internally by the UI5Element. We always use attributes to apply styles, as only attrbiutes can be set in HTML markup (props can be set only programmatically).

<br>

```css

/* New styles to append */
.overflow-area {
	display: flex;
	overflow: hidden;
	align-items: center;
	gap: 0.5rem;
}

ui5-icon {
	margin-inline-start: 0.5rem;
}

::slotted(my-token:nth-child(n + 4)) {
	display: none;
}

:host([show-all]) ::slotted(my-token) {
	display: inline-flex;
}
```

<br>

## Well Done! The `Tokenizer` is ready.
Clicking on the "eye" should show more and less tokens.

<br>

<img width="738" alt="Screenshot 2023-06-25 at 12 59 00" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/8cf66f42-3227-40f9-a613-28c0890d5100"></br>

<br>

<img width="592" alt="Screenshot 2023-06-24 at 19 31 24" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/5b33af90-9e10-4a81-9147-e296d7f15add"></br>



Next [Use `Token` web component in the Smart Store application](./4_Use_Token_in_Smart_Store_app.md)
