# Develop `Tokenizer` web component
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
+ <div>My UI5Conf Tokenizerizer</div>
```

## 2. Visualize component
- **`index.html`**

```diff
## Change (index.html):

<my-token>Component's text</my-token>
+ <my-tokenizer></my-tokenizer>
```

## 3. Add styles
It's time to change our component's visual appearance. Let's add these styles:

- **`Tokenizer.css`**

```diff
## Change (Tokenizer.css):

+ :host {
+	border: var(--sapButton_BorderWidth )solid var(--sapButton_TokenizerBorderColor);
+	border-radius: 0.375rem;
+ }
```

## 4. Add slot

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

- **`Tokenizer.hbs`**

```diff
## Change (Tokenizer.hbs):

- <div>My UI5Conf Tokenizerizer</div>
+ <div> <slot></slot> </div>
```

- **`Tokenizer.ts`**

```diff
## Change (Tokenizer.ts)

...

import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
+ import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

...

class Tokenizer extends UI5Element {
+ 	/**
+ 	* Defines the text of the component.
+ 	*
+ 	* @type {HTMLElement[]}
+ 	* @name sap.ui.webc.components.Tokenizer.prototype.default
+ 	* @slot
+ 	* @public
+ 	*/
+ 	@slot({ type: HTMLElement, "default": true })
+ 	tokens!: Array<HTMLElement>;
}
```

## 5. Integrate Token
- **`Tokenizer.ts`**

```diff
## Change (Tokenizer.ts)

...

import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
+ import Token from "./Token.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

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
+ </my-tokenizer>
```

- **`Tokenizer.hbs`**

```diff
## Change (Tokenizer.hbs):

- <div> <slot></slot> </div>
+ <div class="my-tokenizer-root">
+		<slot></slot>
+ </div>
```

- **`Tokenizer.css`**

```diff
## Change (Tokenizer.css):

+ .my-tokenizer-root {
+	display: flex;
+	flex-wrap: nowrap;
+	align-items: center;
+ }

+ ::slotted([my-token]) {
+	flex-shrink: 0;
+	order: 1;
+ }
```

## 6. Add readonly property

- **`Tokenizer.ts`**

```diff
## Change (Tokenizer.ts)

...

import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
+ import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";

...

class Tokenizer extends UI5Element {
+	@property({ type: Boolean })
+	readonly!: boolean;

 	@slot({ type: HTMLElement, "default": true })
 	tokens!: Array<HTMLElement>;

+	onBeforeRendering(): void {
+		this.tokens.forEach(token => {
+			token.readonly = this.readonly;
+		});
+	}
}
```

## 6. Overflow functionality

- **`Tokenizer.ts`**

```diff
## Change (Tokenizer.ts)

...

import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
+ import Link from "@ui5/webcomponents/dist/Link.js"

...

+ enum TokenizerLayout {
+	Inline = "Inline",
+	Overflow = "Overflow"
+ }
...

@customElement({
	tag: "my-tokenizer",
	renderer: litRender,
	styles: UI5ConTokenizerCss,
	template: UI5ConTokenizerTemplate,
+	dependencies: [
+		Link,
+	],
})
class UI5ConTokenizer extends UI5Element {

...

+	@property({ type: TokenizerLayout, defaultValue: TokenizerLayout.Inline })
+	layout!: TokenizerLayout;
+
+	@property({ type: Boolean })
+	showAll!: boolean;

...

	onBeforeRendering(): void {
		this.tokens.forEach(token => {
			token.readonly = this.readonly;
		});
	}

+	onAfterRendering(): void {
+		if (this.overflow) {
+			this.calculateOverflowTokens();
+		}
+	}
+
+	calculateOverflowTokens() {
+		const tokensContainer = this.shadowRoot!.querySelector<HTMLDivElement>(".my-tokenizer-overflow-wrapper")!;
+
+		this.tokens.forEach(token => {
+			const shouldOverflow = tokensContainer.offsetWidth <= token.offsetLeft + token.offsetWidth;
+			token.toggleAttribute("hidden-token", shouldOverflow);
+		});
+	}
+
+	handleShowMore() {
+		const tokensContainer = this.shadowRoot!.querySelector<HTMLDivElement>(".my-tokenizer-overflow-wrapper")!;
+
+		this.showAll = !this.showAll;
+		tokensContainer.scrollLeft = 0;
+	}
+
+	get overflow() {
+		return this.layout === TokenizerLayout.Overflow;
+	}
}
```

- **`Tokenizer.hbs`**

```diff
## Change (Tokenizer.hbs):

 <div class="my-tokenizer-root">
+	<div class="my-tokenizer-overflow-wrapper">
	   <slot></slot>
+	</div>
+	{{#if overflow}}
+	   {{#if showAll}}
+		  <ui5-link @ui5-click={{handleShowMore}}>
+			 Show less...
+		  </ui5-link>
+	   {{else}}
+		  <ui5-link @ui5-click={{handleShowMore}}>
+			 Show more...
+		  </ui5-link>
+	   {{/if}}
+	{{/if}}
 </div>
```

- **`Tokenizer.css`**

```diff
## Change (Tokenizer.css):

+ .my-tokenizer-overflow-wrapper {
+	display: flex;
+	flex-wrap: wrap;
+	align-items: center;
+	gap: 0.5rem;
+ }
+ 
+ :host([layout="Overflow"]) .my-tokenizer-overflow-wrapper {
+	flex-wrap: nowrap;
+	overflow: hidden;
+ }
+ 
+ :host([layout="Overflow"][show-all]) .my-tokenizer-overflow-wrapper {
+	flex-wrap: wrap;
+ }
+ 
+ :host([layout="Overflow"]) ::slotted([my-token][hidden-token]) {
+	visibility: hidden;
+	order: 2;
+ }
+ 
+ :host([show-all]) ::slotted([my-token][hidden-token]) {
+	visibility: visible;
+ }
```

Next [Use `UI5ConToken` and `UI5ConTokenizer` web components in the Smart Store application](./4_Use_in_Smart_Store_app.md)
