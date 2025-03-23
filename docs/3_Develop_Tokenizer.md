# Develop a `Tokenizer` web component
The `Tokenizer` will be a container for `Tokens`, providing responsive behavior - overflow when Tokens can't fit in the available width.

<br>

## 1. Create Tokenizer via `create-ui5-element`

UI5 Web Components tools provide the `create-ui5-element` command that bootstraps a new web component (generates `Tokenizer.ts`, `TokenizerTemplate.tsx` and `Tokenizer.css`).

- Open new terminal and run the command in the project's ("components") root:

```sh
npm run create-ui5-element Tokenizer
```

-  Afterwards, import the component `import "./dist/Tokenizer.js";` in the `bundle.esm.js` (root level file).


<br>

## 2. Clean-up code (Tokenizer.ts, TokenizerTemplate.tsx and Tokenizer.css)
Once again, there is code generated for demonstration purposes that we won't need.

<br>

- **`src/Tokenizer.ts`**  - replace the file content with:

```js
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";

// Template
import TokenizerTemplate from "./TokenizerTemplate.js";

// Styles
import TokenizerCss from "./generated/themes/Tokenizer.css.js";

@customElement({
	tag: "my-tokenizer",
	renderer: jsxRenderer,
	styles: TokenizerCss,
	template: TokenizerTemplate,
})
class Tokenizer extends UI5Element {
}

Tokenizer.define();

export default Tokenizer;

```

**Note:** If you get any TS errors - restart the IDE (probably it did not detect the new TS declarations)

<br>

- **`src/TokenizerTemplate.tsx`** - replace the file content with:

```tsx
export default function TokenizerTemplate(this: Tokenizer) {
	return (
		<div>My Tokenizer</div>
	);
}
```

<br>

## 3. Display the `Tokenizer`
By default, the tag is defined as `my-{className.toLowerCase}`, e.g. **`my-tokenizer`** and we are going to use it.

<br>

- **`test/pages/index.html`** - add `my-tokenizer` instance right after the `my-token` examples:

```html
<my-tokenizer></my-tokenizer>
```

<br>

## 4. Add styles

<br>

- **`src/themes/Tokenizer.css`** - append the following styles:

```css
:host {
	display: inline-flex;
	border: 0.0625rem solid var(--sapContent_ForegroundBorderColor);
	border-radius: 0.375rem;
	padding: 0.5rem;
	position: relative;
	box-sizing: border-box;
}
```

<br>

<img width="181" alt="Screenshot 2023-06-22 at 14 08 09" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/c6f88c1b-020f-47b4-918b-90e07e495178"></br></br>

## 5. Add slot
We need to add a `slot` to render content, provided from outside. The `Tokenizer` is expected to work with `Token(s)`, so we call the slot **`tokens`**.

<br>

- **`src/Tokenizer.ts`** -  import the `@slot` decorator to the top and the `tokens` slot:

```js
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";

....

class Tokenizer extends UI5Element {
	@slot({ type: HTMLElement, "default": true })
	tokens!: Array<HTMLElement>;
}
```

<br>

- **`src/TokenizerTemplate.tsx`** -  use `slot` element in the template:

```tsx
export default function TokenizerTemplate(this: Tokenizer) {
	return (
		<div> <slot></slot> </div>
	);
}
```

<br>

- **`test/pages/index.html`** - add content to the `my-tokenizer`:

```html
<my-tokenizer>
	<div>Token 1</div>
	<div>Token 2</div>
	<div>Token 3</div>
</my-tokenizer>
```

<br>

<img width="760" alt="Screenshot 2023-06-25 at 12 55 03" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/0d0c9928-8ac0-4a89-8973-2abee2cb4119"></br></br>


## 6. Integrate `Token`
We used plain divs so far. Now, let's use the `Token`.

<br>

- **`src/Tokenizer.ts`** -  import the `Token` as type and change the type of the Array elements:

```js
import type Token from "./Token.js";
...
class Tokenizer extends UI5Element {
	@slot({ type: HTMLElement, "default": true })
	tokens!: Array<Token>; // change "HTMLElement" to "Token"
}
```

<br>

- **`src/TokenizerTemplate.tsx`** - replace file content with:

```tsx
export default function TokenizerTemplate(this: Tokenizer) {
	return (
		<div class="root">
			<slot></slot>
		</div>
	);
}
```

<br>

- **`src/themes/Tokenizer.css`** - append the following styles:

```css
/* New styles to append  (don't remove the previously added) */

.root {
	display: flex;
	align-items: center;
}
```

<br>

- **`test/pages/index.html`** - use `my-token`, instead of div:

```html
<my-tokenizer>
	<my-token>Token 1</my-token>
	<my-token>Token 2</my-token>
	<my-token>Token 3</my-token>
	<my-token>Token 4</my-token>
	<my-token>Token 5</my-token>
</my-tokenizer>
```

<br>

<img width="738" alt="Screenshot 2023-06-25 at 13 02 44" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/b7506e6d-2b8a-46d2-a395-eeefc52ad70a"></br></br>

<br>

## 7. Add `overflow` behavior
We will add simple logic to show up to 3 tokens and hide the rest (see `hasOverflowTokens`, `showAll`) + an icon that allows the user to see all tokens by clicking on it (see `onIconClick`).

<br>

- **`src/Tokenizer.ts`** - replace the file content with:

```js
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";


// Template
import TokenizerTemplate from "./TokenizerTemplate.js";

// Styles
import TokenizerCss from "./generated/themes/Tokenizer.css.js";

// UI5con components
import type Token from "./Token.js";

@customElement({
	tag: "my-tokenizer",
	renderer: jsxRenderer,
	styles: TokenizerCss,
	template: TokenizerTemplate,
})

class Tokenizer extends UI5Element {
	@slot({ type: HTMLElement, "default": true })
	tokens!: Array<Token>;

	@property({ type: Boolean })
	showAll!: boolean;

	onIconClick() {
		this.showAll = !this.showAll;
	}

	get hasOverflowTokens() {
		return this.tokens.length > 3;
	}
}

Tokenizer.define();

export default Tokenizer;

```

<br>

- **`src/TokenizerTemplate.tsx`** - replace the file content with:


```tsx
import Icon from "@ui5/webcomponents/dist/Icon.js";
import "@ui5/webcomponents-icons/dist/show.js";
import "@ui5/webcomponents-icons/dist/hide.js";
import type Tokenizer from "./Tokenizer.js";

export default function TokenizerTemplate(this: Tokenizer) {
	return (
		<div class="root">
			<div class="overflow-area">
				<slot></slot>
			</div>
			{this.hasOverflowTokens &&
				<Icon onClick={this.onIconClick} mode="Interactive" name={activeIcon.call(this)}></Icon>
			}
		</div>
	);
}

function activeIcon(this: Tokenizer) {
	return this.showAll ? "hide" : "show";
}
```

<br>

- **`src/themes/Tokenizer.css`** - append the following styles:

**Note:** For each property an equivalent attribute is supported - with the same name, but hyphenated, e.g. **`showAll`** property is equivalent to **`show-all`** attribute. So, setting the prop and the attr is the same for our component state and this is handled internally by the UI5Element. We always use attributes to apply styles, as only attributes can be set in HTML markup (props can be set only programmatically).

<br>

```css

/* New styles to append (don't remove the previously added) */

.overflow-area {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	overflow: hidden;
	gap: 0.5rem;
}

ui5-icon {
	margin-inline-start: 0.5rem;
	flex-shrink: 0;
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
Clicking on the "eye" should show more and fewer tokens.


<img width="828" alt="Screenshot 2023-06-25 at 13 15 47" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/91074c12-bf77-4659-8150-b45cf393d8f9"></br></br>


Next [Use `Token` and `Tokenizer` web components in the Smart Store application](./4_Use_Token_in_Smart_Store_app.md)
