# Use `Tokenizer` web component in the Smart Store application
This is the final exersice. We will intergrate the `Tokenizer` to add some more responsiveness to the `Tag's` column.
<br>

## 1. Import the `Tokenizer` 
First, we have to import the `Tokenizer`  web component in the `Detail.tsx` file.

<br>

```diff
import TokenReactComponent from "./TokenReactComponent";
+ import "@ui5con/components/dist/Tokenizer";
```

<br>

## 2. Use the `Tokenizer` 
Use `my-tokenizer` in the `Detail.tsx` file inside the `Tag` column as a container for all tokens.

<br>

```jsx
<ui5-table-cell class="table-status-cell-content">
	<my-tokenizer>
	{
		product.tags.map((tag: string, idx: number) => 
			<TokenReactComponent key={idx}  productKey={product.key} readonly={this.state.readonly} text={tag} deleteTag={this.deleteTag.bind(this)}/>
  	)}
	</my-tokenizer>
</ui5-table-cell>
```

<br>

## 3. Declare the `my-tokenizer` tag in `IntrinsicElements` interface

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

## Hoooray! Well Done! Hands-on completed!

<br>

<img width="1175" alt="Screenshot 2023-06-23 at 15 35 38" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/e05cdfe2-9c68-4574-b93b-a303718b32f9">

<br>
<br>

<img width="1215" alt="Screenshot 2023-06-23 at 15 45 12" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/8bbf3dd5-1bd0-4984-b171-6ebe8ac90354">

