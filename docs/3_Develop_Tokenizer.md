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

![image](https://github.com/ilhan007/ui5con-web-component/assets/31909318/053b3b7a-c286-4b6b-b8f5-a9737b1d9fda)


## 3. Add styles
It's time to change our component's visual appearance. Let's add these styles:

- **`Tokenizer.css`**

```diff
## Change (Tokenizer.css):

+ :host {
+	border: var(--sapButton_BorderWidth )solid var(--sapButton_BorderColor);
+	border-radius: 0.375rem;
+       display: block;
+       padding: 0.5rem;
+       position: relative;
+       box-sizing: border-box;
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
+ 	@slot({ type: HTMLElement, "default": true })
+ 	tokens!: Array<HTMLElement>;
}
```

![image](https://github.com/ilhan007/ui5con-web-component/assets/31909318/005b5366-000f-46a2-8941-3d3e3b25da28)


## 5. Integrate Token
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
...
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

![image](https://github.com/ilhan007/ui5con-web-component/assets/31909318/a405a6f5-dbc5-4090-a3b1-c909065247f0)

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

+	onBeforeRendering() {
+		this.tokens.forEach(token => {
+			token.readonly = this.readonly;
+		});
+	}
}
```

![image](https://github.com/ilhan007/ui5con-web-component/assets/31909318/9b23b02b-374e-461b-8bd5-3faef75f799a)


![image](https://github.com/ilhan007/ui5con-web-component/assets/31909318/6280b3a3-f27b-4782-9c71-c4e25728457a)



## 6. Overflow functionality

- **`Tokenizer.ts`**

```diff
## Change (Tokenizer.ts)

...

import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
+ import Link from "@ui5/webcomponents/dist/Link.js"
import Token from "./Token.js";

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

	onBeforeRendering() {
		this.tokens.forEach(token => {
			token.readonly = this.readonly;
		});
	}

+	onAfterRendering() {
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
...
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

![image](https://github.com/ilhan007/ui5con-web-component/assets/31909318/931321fe-2121-4c5e-87c0-f0d49b518a23)

![image](https://github.com/ilhan007/ui5con-web-component/assets/31909318/c0f5596c-c3a2-4a5a-97b9-d0dadf95e15b)

![image](https://github.com/ilhan007/ui5con-web-component/assets/31909318/120adf3a-546a-4604-a104-fef0d1bfde88)



Next [Use `UI5ConToken` and `UI5ConTokenizer` web components in the Smart Store application](./4_Use_in_Smart_Store_app.md)
