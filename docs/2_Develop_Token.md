# Develop of the `UI5ConToken` web component
## 1. Clean up (template, CSS File, TS file)
```diff
## Change (UI5ConToken.ts)
...

import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
- import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
- import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
- import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
- import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";

// Template
...

class UI5ConToken extends UI5Element {
-	static i18nBundle: I18nBundle;
-
-	static async onDefine() {
-		UI5ConToken.i18nBundle = await getI18nBundle("@ui5con/components");
-	}
-
-	/**
-	 * Defines the component count.
-	 * @name NIT_PACKAGE_VAR_NAMESPACE.UI5ConToken.prototype.count
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
-		return UI5ConToken.i18nBundle.getText(COUNT);
-	}
}
```

```diff
## Change (UI5ConToken.hbs):
- <div @click="{{onClick}}">{{counterText}} :: {{count}}</div>
+ <div> My test component</div>
```

```diff
## Change (UI5ConToken.css):
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

### 2. Style component
```diff
## Change (UI5ConToken.css):
:host {
+	background: var(var(--sapButton_TokenBackground));
+	border: var(--sapButton_BorderWidth )solid var(--sapButton_TokenBorderColor);
+	border-radius: 0.375rem;
+	color: var(--sapTextColor);
+	font-size: var(--sapFontSize);
+	font-family: var(--sapFontFamily);
+	padding: 0.3125rem;
+	min-width: 3.625rem;
}
```

### 3. Implement slot
```diff
## Change (index.html):
- <ui5con-token id="myFirstComponent"></ui5con-token>
+ <ui5con-token id="myFirstComponent">Component's text</ui5con-token>
```

```diff
## Change (UI5ConToken.hbs):
- <div> My test component</div>
+ <div> <slot></slot> </div>
```

### 4. Add and style icon

```diff
## Change (UI5ConToken.ts)
...

import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
+ import Icon from "@ui5/webcomponents/dist/Icon.js";
+ import "@ui5/webcomponents-icons/dist/decline.js";

// Template

...

@customElement({
	tag: "ui5con-token",
	renderer: litRender,
	styles: UI5ConTokenCss,
	template: UI5ConTokenTemplate,
+	dependencies: [Icon],
})

...
```

```diff
## Change (UI5ConToken.hbs):
- <div>
+ <div class="ui5con-token-root">
     <slot></slot>
+    <ui5-icon name="decline"></ui5-icon>
 </div>
```

```diff
## Change (UI5ConToken.css):
:host { ... }

+ .ui5con-token-root {
+ 	display: flex;
+ 	align-items: center;
+ }
+
+ [ui5-icon] {
+ 	color: inherit;
+ 	height: 1rem;
+ 	margin-inline-start: 0.5rem;
+ }
+
+ :host(:hover) {
+ 	background: var(--sapButton_Hover_Background);
+ 	cursor: default;
+ }
```

## 5. Add "readonly" property

```diff
## Change (UI5ConToken.ts)
...

import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
+ import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

...

class UI5ConToken extends UI5Element {
+	@property({ type: Boolean })
+	readonly!: boolean;
}
```

```diff
## Change (UI5ConToken.hbs):
 <div class="ui5con-token-root">
     <slot></slot>
+    {{#unless readonly}}
         <ui5-icon name="decline"></ui5-icon>
+    {{/unless}}
 </div>
```

## 6. Add "token-delete" event
```diff
## Change (UI5ConToken.ts)
...

import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
+ import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

...

@customElement({
	tag: "ui5con-token",
	renderer: litRender,
	styles: UI5ConTokenCss,
	template: UI5ConTokenTemplate,
	dependencies: [Icon],
})

+ @event("token-delete")
class UI5ConToken extends UI5Element {
	@property({ type: Boolean })
	readonly!: boolean;

+	handleIconClick() {
+		this.fireEvent("token-delete");
+	}
}
```

```diff
## Change (UI5ConToken.hbs):
 <div class="ui5con-token-root">
    <slot></slot>
    {{#unless readonly}}
-        <ui5-icon name="decline"></ui5-icon>
+        <ui5-icon name="decline" interactive @click={{handleIconClick}}></ui5-icon>
    {{/unless}}
 </div>
```

Next [Develop `Tokenizer` web component](./3_Develop_Tokenizer.md)
