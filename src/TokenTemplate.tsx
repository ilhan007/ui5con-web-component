import Icon from "@ui5/webcomponents/dist/Icon.js";
import decline from "@ui5/webcomponents-icons/dist/decline.js";
import type Token from "./Token.js";

export default function TokenTemplate(this: Token) {
	return (
		<div class="my-token-root">
			<slot></slot>
			{!this.readonly &&
				<Icon name={decline} mode="Interactive" onClick={this.handleIconClick}></Icon>
			}
		</div>);
}
