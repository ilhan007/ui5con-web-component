import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";

import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import "@ui5/webcomponents-icons/dist/decline.js";

// Template
import TokenTemplate from "./generated/templates/TokenTemplate.lit.js";

// Styles
import TokenCss from "./generated/themes/Token.css.js";

@customElement({
	tag: "my-token",
	renderer: litRender,
	styles: TokenCss,
	template: TokenTemplate,
	dependencies: [Icon],
})
class Token extends UI5Element {
	@property({ type: Boolean })
	readonly!: boolean;

	handleIconClick() {
		this.fireEvent("delete");
	}
}

Token.define();

export default Token;
