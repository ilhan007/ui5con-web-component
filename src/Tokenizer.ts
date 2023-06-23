import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import "@ui5/webcomponents-icons/dist/show.js";
import "@ui5/webcomponents-icons/dist/hide.js";
import TokenizerTemplate from "./generated/templates/TokenizerTemplate.lit.js";

// Styles
import TokenizerCss from "./generated/themes/Tokenizer.css.js";
import Token from "./Token.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>my-tokenizer</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5con/components/dist/Tokenizer.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.components.Tokenizer
 * @extends sap.ui.webc.base.UI5Element
 * @tagname my-tokenizer
 * @public
 */
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

	onEnterDOM() {
		ResizeHandler.register(this, this.calculateOverflowTokens.bind(this));
	}

	calculateOverflowTokens() {
		const tokensContainer = this.shadowRoot!.querySelector<HTMLDivElement>(".overflow-area")!;

		this.tokens.forEach(token => {
			const shouldOverflow = tokensContainer.offsetWidth <= token.offsetLeft + token.offsetWidth;
			token.toggleAttribute("hidden", shouldOverflow);
		});
	}

	onIconClick() {
		this.showAll = !this.showAll;
	}

	get effectiveIcon() {
		return this.showAll ? "hide" : "show";
	}
}

Tokenizer.define();

export default Tokenizer;
