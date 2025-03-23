import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import type Token from "./Token.js";

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
	@property({ type: Boolean })
	showAll!: boolean;

	@slot({ type: HTMLElement, "default": true })
	tokens!: Array<Token>;

	onIconClick() {
		this.showAll = !this.showAll;
	}

	get hasOverflowTokens() {
		return this.tokens.length > 3;
	}
}

Tokenizer.define();

export default Tokenizer;
