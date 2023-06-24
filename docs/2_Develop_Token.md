# Develop `Token` web component
It's time for fun! While coding, the server will auto-refresh the `index.html`, so you can keep track on the changes.

<br>

## 1. Clean up (Token.hbs, Token.css, Token.ts)

Each components package generates a demo web component with certain functionality. The first step is to cleanup the code we won't need.

<br>

- **`Token.ts`**

```diff
## Change (Token.ts)
...

import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
- import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
- import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
- import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
- import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
...
- import { COUNT } from "./generated/i18n/i18n-defaults.js";
...

class Token extends UI5Element {
-	static i18nBundle: I18nBundle;
-
-	static async onDefine() {
-		Token.i18nBundle = await getI18nBundle("@ui5con/components");
-	}
-
-	/**
-	 * Defines the component count.
-	 * @public
-	 * @type { sap.ui.webc.base.types.Integer }
-	 */
-	@property({ validator: Integer, defaultValue: 0 })
-	count!: number;
-
-	onClick() {
-		this.count++;
-	}
-
-	get counterText() {
-		return Token.i18nBundle.getText(COUNT);
-	}
}
```

<br>

- **`Token.hbs`**

```diff
## Change (Token.hbs):
- <div @click="{{onClick}}">{{counterText}} :: {{count}}</div>
+ <div> My test component</div>
```

<br>

- **`Token.css`** - remove all styles

<br>

```diff
## Change (Token.css):
:host {
-	padding: 0 2rem;
-	color: var(--sapAvatar_6_TextColor);
-	background-color: var(--sapAvatar_6_Background);
-	border: 2px solid var(--my-component-border-color);
-	border-radius: 0.5rem;
-	box-shadow: var(--sapContent_Shadow0);
-	text-align: center;
-	line-height: 3rem;
-	font-size: 1.25rem;
-	user-select: none;
}
```

<br>


## 2. Add styles
It's time to change our component's visual appearance. Let's add these styles:

- **`Token.css`**

```diff
## Change (Token.css):
:host {
+  display: inline-flex;
+  color: var(--sapTextColor);
+  background: var(--sapBaseColor);
+  border: 1px solid var(--sapContent_ForegroundBorderColor);
+  border-radius: 0.5rem;
+  font-size: var(--sapFontSize);
+  font-family: var(--sapFontFamily);
+  padding: 0.3125rem;
}
```

<br>

## 3. Add `slot`
The `slot` is a standard HTML element and it is a placeholder inside a web component that you can fill with your own markup.
By default, the markup provided inside the custom element is not visualized if we haven't specified where to be placed with the use of `<slot></slot>` tag. In this case, we will use the `slot` to display text inside the Token.

<br>

- **`index.html`** - add text inside `my-token`.

```diff
## Change (index.html):
- <my-token id="myFirstComponent"></my-token>
+ <my-token>Component's text</my-token>
```
<br>

- **`Token.hbs`** - use the `slot` to tell where exactly to display the text.
```diff
## Change (Token.hbs):
- <div> My test component</div>
+ <div> <slot></slot> </div>
```
<br>

<img width="743" alt="Screenshot 2023-06-23 at 13 54 10" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/bd73911c-1f36-4fe1-a28c-7619dee2e5a8"> </br></br>

<br>

## 4. Add `icon`
In this step, we will enhance Token's visual appearance by showing an icon.
The Token needs a "X" icon, that later the user will click to remove it. UI5 Web Components provide a large collection of icons SVGs. And, we are going to need the `decline` icon, which is part of the `@ui5/webcomponents-icons` package and the `Icon(<ui5-icon>)` web component from the `@ui5/webcomponents` package. We have to install these packages before using the icon.

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

```diff
## Change (Token.hbs):
- <div>
+ <div class="my-token-root">
     <slot></slot>
+    <ui5-icon name="decline"></ui5-icon>
 </div>
```

<br>

- **`Token.css`** - add styles to align the text and the icon.

```diff
## Change (Token.css):
:host { ... }
+
+ :host(:hover) {
+ 	background: var(--sapButton_Hover_Background);
+ 	cursor: default;
+ }
+
+ .my-token-root {
+ 	display: flex;
+ 	align-items: center;
+ }
+
+ [ui5-icon] {
+	color: var(--sapInformationColor);
+	background: var(--sapHoverColor);
+	border-radius: 50%;
+	margin-inline-start: 0.5rem;
+ }
```

<br>

## 5. Add `readonly` property
The `Token` (and the `Tokenizer`) will be used in a Table that will support "Edit" mode. We will need to display the `decline` icon in "Edit" mode, othwerwise hide it. Let's add a boolean property to show/hide the `decline` icon.


<br>

- **`Token.ts`**

```diff
## Change (Token.ts)
...

import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
+ import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

...

class Token extends UI5Element {
+	@property({ type: Boolean })
+	readonly!: boolean;
}
```

<br>

- **`Token.hbs`** 
When `readonly` is set - the icon won't be rendered. When `readonly` is not set - the icon gets rendered.

```diff
## Change (Token.hbs):
 <div class="my-token-root">
     <slot></slot>
+    {{#unless readonly}}
         <ui5-icon name="decline"></ui5-icon>
+    {{/unless}}
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
We need to fire an event (`delete`), when the user clicks on the `decline` icon, so the application can react accordingly.
To do so, we use the `fireEvent` method, provided by `UI5Element` and available in all descendants. Internally, it uses the standard `dispatchEvent` and adds framework-related enhanced functionality.

- **`Token.ts`**

```diff
## Change (Token.ts)
...
class Token extends UI5Element {
	@property({ type: Boolean })
	readonly!: boolean;

+	handleIconClick() {
+		this.fireEvent("delete");
+	}
}
```

<br>

- **`Token.hbs`** - attach the click handler on the `ui5-icon`.

```diff
## Change (Token.hbs):
 <div class="my-token-root">
    <slot></slot>
    {{#unless readonly}}
-        <ui5-icon name="decline"></ui5-icon>
+        <ui5-icon name="decline" interactive @click={{handleIconClick}}></ui5-icon>
    {{/unless}}
 </div>
```


<br>

## Well Done, Token is ready!

Now, you can continue normally with implementing the Tokenizer web component, or skip forward to the final step.

- Next: [Develop `Tokenizer` web component](./3_Develop_Tokenizer.md)
- Final: [Use `Token` and `Tokenizer` web components in the Smart Store application](./4_Use_in_Smart_Store_app.md)
