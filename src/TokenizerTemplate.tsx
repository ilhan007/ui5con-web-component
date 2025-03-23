import Icon from "@ui5/webcomponents/dist/Icon.js";
import "@ui5/webcomponents-icons/dist/show.js";
import "@ui5/webcomponents-icons/dist/hide.js";
import type Tokenizer from "./Tokenizer.js";

export default function TokenizerTemplate(this: Tokenizer) {
	return (
		<div class="root">
			<div class="overflow-area">
				<slot></slot>
			</div>
			{this.hasOverflowTokens &&
				<Icon onClick={this.onIconClick} mode="Interactive" name={activeIcon.call(this)}></Icon>
			}
		</div>
	);
}

function activeIcon(this: Tokenizer) {
	return this.showAll ? "hide" : "show";
}
