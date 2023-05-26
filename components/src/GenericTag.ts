import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";

// Template
import GenericTagTemplate from "./generated/templates/GenericTagTemplate.lit.js";

// Styles
import GenericTagCss from "./generated/themes/GenericTag.css.js";

import { PLEASE_WAIT } from "./generated/i18n/i18n-defaults.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>generic-tag</code> component is a demo component that displays some text.
 *
 * @constructor
 * @alias demo.components.GenericTag
 * @extends sap.ui.webc.base.UI5Element
 * @tagname generic-tag
 * @public
 */
@customElement({
	tag: "generic-tag",
	renderer: litRender,
	styles: GenericTagCss,
	template: GenericTagTemplate,
})
class GenericTag extends UI5Element {
	static i18nBundle: I18nBundle;

	static async onDefine() {
		GenericTag.i18nBundle = await getI18nBundle("comonents");
	}

	get pleaseWaitText() {
		return GenericTag.i18nBundle.getText(PLEASE_WAIT);
	}
}

GenericTag.define();

export default GenericTag;
