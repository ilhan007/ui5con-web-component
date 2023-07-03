# Use the `Tokenizer` web component in the Smart Store application [optional]
This section can be followed if you already created the Tokenizer web component in the [Develop Tokenizer](./3_Develop_Tokenizer.md) optional step.

The `Tokenizer` will some more responsiveness to the `Tag's` column.

<br>

## 1. Import the `Tokenizer` 
First, we have to import the `Tokenizer`  web component in the `Detail.tsx` file.

- **`src/detail/Detail.tsx`**

<br>

```diff
import TokenReactComponent from "./TokenReactComponent";
+ import "@ui5con/components/dist/Tokenizer";
```

<br>

## 2. Use the `Tokenizer` 
Use `my-tokenizer` in the `Detail.tsx` file inside the `Tag` column as a container for all tokens.

- **`src/detail/Detail.tsx`**
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

- **`src/types/index.ts`**

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

## Hoooray! Congratulation! Hands-on completed!
The Tokenizer is fully integrated and can be used to display all the tokens.

<br>

<img width="1175" alt="Screenshot 2023-06-23 at 15 35 38" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/e05cdfe2-9c68-4574-b93b-a303718b32f9">

<br>

<img width="1413" alt="Screenshot 2023-07-03 at 16 58 06" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/be8255be-8570-4a63-a54e-a071c22c871b">


## Thank You for joining our hands-on!


