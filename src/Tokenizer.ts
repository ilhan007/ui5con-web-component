import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import "@ui5/webcomponents-icons/dist/show.js";
import "@ui5/webcomponents-icons/dist/hide.js";

// Template
import TokenizerTemplate from "./generated/templates/TokenizerTemplate.lit.js";

// Styles
import TokenizerCss from "./generated/themes/Tokenizer.css.js";
import Token from "./Token.js";

@customElement({
	tag: "my-tokenizer",
	renderer: litRender,
	styles: TokenizerCss,
	template: TokenizerTemplate,
	dependencies: [Icon],
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

	get activeIcon() {
		return this.showAll ? "hide" : "show";
	}
}

Tokenizer.define();

export default Tokenizer;
