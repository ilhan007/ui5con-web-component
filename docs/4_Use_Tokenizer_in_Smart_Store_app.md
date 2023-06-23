## [In progress, don't do this step] Use `Tokenizer` web component in the Smart Store application
This is the final exersice 


## 1. Import the `Tokenizer` 
Import the `Tokenizer`  web component in `Detail.tsx`

<br>

```sh
import "@ui5con/components/dist/Tokenizer";
```

<br>

## 2. Use `Tokenizer` 
Use `my-tokenizer` in `Detail.tsx` file inside the `Tag` column as a container for all tokens.

<br>

```jsx
<ui5-table-cell class="table-status-cell-content">
	<my-tokenizer>
	{
		product.tags.map((tag: string, idx: number) => 
			<TokenReactComponent product={product} key={idx} readonly={this.state.readonly} text={tag} deleteTag={this.deleteTag.bind(this)}/>
  	)}
	</my-tokenizer>
</ui5-table-cell>
```

<br>

## 3. Declare `my-tokenizer` tag to `IntrinsicElements` interface

<br>

```diff
import type Token from "@ui5con/components/dist/Token.js";
+ import type Tokenizer from "@ui5con/components/dist/Tokenizer.js";

declare global {
	namespace JSX {
	  interface IntrinsicElements {
		['my-token']: CustomElement<Token>;
+   		['my-tokenizer']: CustomElement<Tokenizer>;
```

<br>

## Final! Well Done! Hands-on completed!

<img width="1175" alt="Screenshot 2023-06-23 at 15 35 38" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/e05cdfe2-9c68-4574-b93b-a303718b32f9">



