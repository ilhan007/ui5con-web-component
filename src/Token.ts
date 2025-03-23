import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";

// Template
import TokenTemplate from "./TokenTemplate.js";

// Styles
import TokenCss from "./generated/themes/Token.css.js";

@customElement({
	tag: "my-token",
	renderer: jsxRenderer,
	styles: TokenCss,
	template: TokenTemplate,
})
class Token extends UI5Element {
	eventDetails!: {
		"delete": void,
	}

	@property({ type: Boolean })
	readonly!: boolean;

	handleIconClick() {
		this.fireDecoratorEvent("delete");
	}
}

Token.define();

export default Token;
