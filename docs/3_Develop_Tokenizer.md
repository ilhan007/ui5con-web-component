# Develop `Tokenizer` web component
As we said in the beggining, the `Tokenizer` will be a container for `Tokens`, providing responsive beahviour - overflow when the Tokens can't fit the available width.
This is very common scenario when tokens are used in Tables' columns.

<br>

## 1. Create a new web component via `create-ui5-element`

Another benefit of using the UI5 Web Components tools is the available `create-ui5-element` command that bootstraps a new component.
Run the command (that generates `Tokenizer.ts`, `Tokenizer.hbs` and `Tokenizer.css`) in the project's root:

```sh
npm run create-ui5-element Tokenizer
```

**Note:** Make sure to import the component `import "./dist/Tokenizer.js";` in the `bundle.esm.js` (root level file).

<br>

## 2. Clean-up some code
As with the Token, there is code generated for demonstration purpose that we won't need.

<br>

- **`Tokenizer.ts`**

```diff
## Change (Tokenizer.ts)

...

import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
- import property from "@ui5/webcomponents-base/dist/decorators/property.js";
- import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
- import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

...

- /**
-  * Example custom event.
-  * Please keep in mind that all public events should be documented in the API Reference as shown below.
-  *
-  * @event sap.ui.webc.components.Tokenizer#interact
-  * @public
-  */
- @event("interact", { detail: { /* event payload ( optional ) */ } })
class Tokenizer extends UI5Element {
- 	/**
- 	* Defines the value of the component.
- 	*
- 	* @type {string}
- 	* @name sap.ui.webc.components.Tokenizer.prototype.value
- 	* @defaultvalue ""
- 	* @public
- 	*/
- 	@property()
- 	value!: string;
- 
- 	/**
- 	* Defines the text of the component.
- 	*
- 	* @type {Node[]}
- 	* @name sap.ui.webc.components.Tokenizer.prototype.default
- 	* @slot
- 	* @public
- 	*/
- 	@slot({ type: Node, "default": true })
- 	text!: Array<Node>;
}
```

<br>

- **`Tokenizer.hbs`**

```diff
## Change (Tokenizer.hbs):

- <div>Hello World</div>
+ <div>My Tokenizer</div>
```

<br>

## 3. Display the `Tokenizer`
By default the tag is set to `my-{className.toLowerCase}`, e.g. **`my-tokenizer`**.

<br>

- **`index.html`**

```diff
## Change (index.html):

<my-token readonly>Readonly token</my-token>
+ <br>
+ <my-tokenizer></my-tokenizer>
```

<br>

## 4. Add styles

<br>

- **`Tokenizer.css`**

```diff
## Change (Tokenizer.css):

+ :host {
+	border: var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);
+	border-radius: 0.375rem;
+       display: block;
+       padding: 0.5rem;
+       position: relative;
+       box-sizing: border-box;
+ }
```

<br>

<img width="181" alt="Screenshot 2023-06-22 at 14 08 09" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/c6f88c1b-020f-47b4-918b-90e07e495178"></br></br>

## 5. Add slot
The `Tokenizer` is expected to work with `Token(s)`, so we call the slot **`tokens`**.

<br>

- **`index.html`**

```diff
## Change (index.html):

- <my-tokenizer></my-tokenizer>
+ <my-tokenizer>
+	<div>Token 1</div>
+	<div>Token 2</div>
+	<div>Token 3</div>
+ </my-tokenizer>
```

<br>

- **`Tokenizer.hbs`**

```diff
## Change (Tokenizer.hbs):

- <div>My UI5Conf Tokenizerizer</div>
+ <div> <slot></slot> </div>
```

<br>

- **`Tokenizer.ts`**

```diff
## Change (Tokenizer.ts)

...

import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
+ import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

...

class Tokenizer extends UI5Element {
+ 	@slot({ type: HTMLElement, "default": true })
+ 	tokens!: Array<HTMLElement>;
}
```

<img width="113" alt="Screenshot 2023-06-22 at 14 02 06" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/9a1f85cf-ea6c-450d-be19-41e804dddd86"></br></br>



## 6. Integrate `Token`
In the previous step, we used plain divs. Now, we import the `Token` as it will be the main slotted element inside the `Tokenizer` 
and use it as type of the `tokens` slot.

<br>

- **`Tokenizer.ts`**

```diff
## Change (Tokenizer.ts)

...

import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
+ import Token from "./Token.js";

...

	* @name sap.ui.webc.components.Tokenizer.prototype.default
	* @slot
	* @public
	*/
	@slot({ type: HTMLElement, "default": true })
-	tokens!: Array<HTMLElement>;
+	tokens!: Array<Token>;
}
```

<br>

- **`index.html`**

```diff
## Change (index.html):
+ <my-tokenizer>
-	<div>Token 1</div>
-	<div>Token 2</div>
-	<div>Token 3</div>
+	<my-token>Token 1</my-token>
+	<my-token>Token 2</my-token>
+	<my-token>Token 3</my-token>
+       <my-token>Token 4</my-token>
+	<my-token>Token 5</my-token>
+ </my-tokenizer>
```

<br>

- **`Tokenizer.hbs`**

```diff
## Change (Tokenizer.hbs):

- <div> <slot></slot> </div>
+ <div class="root">
+	<slot></slot>
+ </div>
```

<br>

- **`Tokenizer.css`**

```diff
## Change (Tokenizer.css):
...
+ .root {
+	display: flex;
+	flex-wrap: nowrap;
+	align-items: center;
+ }

+ ::slotted(my-token) {
+	flex-shrink: 0;
+	order: 1;
+ }
```

<br>

<img width="744" alt="Screenshot 2023-06-23 at 14 23 31" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/d95fc420-6b7c-41fe-8515-0c1123f67f01"></br></br>


## 7. Add `overflow` behavior

<br>

- **`Tokenizer.ts`**
Here we use the `onAfterRendering` lifecycle hook, that allows you to access the DOM every time the component is rendered.

<br>

```diff
## Change (Tokenizer.ts)

...

import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
+ import property from "@ui5/webcomponents-base/dist/decorators/property.js";
+ import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
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

+	onEnterDOM() {
+		ResizeHandler.register(this, this.calculateOverflowTokens.bind(this));
+	}
+
+	calculateOverflowTokens() {
+		const tokensContainer = this.shadowRoot!.querySelector<HTMLDivElement>(".overflow-area")!;
+
+		this.tokens.forEach(token => {
+			const shouldOverflow = tokensContainer.offsetWidth <= token.offsetLeft + token.offsetWidth;
+			token.toggleAttribute("hidden", shouldOverflow);
+		});
+	}
+
+	onIconClick() {
+		const tokensContainer = this.shadowRoot!.querySelector<HTMLDivElement>(".overflow-area")!;
+
+		this.showAll = !this.showAll;
+	}
+
+	get activeIcon() {
+		return this.showAll ? "hide" : "show";
+	}

}
```

<br>

- **`Tokenizer.hbs`**

```diff
## Change (Tokenizer.hbs):

 <div class="root">
+	<div class="overflow-area">
	   <slot></slot>
+	</div>
+	<ui5-icon @click={{onIconClick}} interactive name={{activeIcon}}></ui5-icon>
 </div>
```

<br>

- **`Tokenizer.css`**
By default, for each property an equivalent attribute is supported. Attributes have the same names as properties, but in kebab-case rather than camelCase, e.g **`showAll`** property is equivalent of **`show-all`** attribute.

<br>

```diff
## Change (Tokenizer.css):
...
+ .overflow-area {
+	display: flex;
+	flex-wrap: nowrap;
+	overflow: hidden;
+	align-items: center;
+	gap: 0.5rem;
+	flex-grow: 1;
+ }
+ 
+ ui5-icon {
+	flex-shrink: 0;
+ }
+ 
+ :host ::slotted(my-token[hidden]) {
+	visibility: hidden;
+	order: 2;
+ }
+ 
+ :host([show-all]) .overflow-area {
+	flex-wrap: wrap;
+ }
+
+ :host([show-all]) ::slotted(my-token[hidden]) {
+	visibility: visible;
+ }
```

<br>

## Well Done! The `Tokenizer` is ready.
![localhost_8080_test_pages_index html_sap-ui-theme=sap_horizon (21)](https://github.com/ilhan007/ui5con-web-component/assets/31909318/e2973852-e820-463c-8b4a-576558bca9bd)
<br>
![localhost_8080_test_pages_index html_sap-ui-theme=sap_horizon (22)](https://github.com/ilhan007/ui5con-web-component/assets/31909318/fc1074e9-e424-454e-a80f-ef98d59f90f0)


Next [Use `Token` web component in the Smart Store application](./4_Use_Token_in_Smart_Store_app.md)
