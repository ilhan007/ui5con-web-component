# Use the `Token` web component in the Smart Store application
Now that you've implemented the Token or both the Token and Tokenizer web components, it's time to put them into action!

<br>

## 1. Мake components consumable via `NPM` 

The project has a `package.json` and it is prepared to be published to NPM in a productive scenario, this is exactly what you would do.
However, for the hands-on, we will simulate as if the components were published on NPM with the usage of `npm link`.

Run the following command in the project's root:

```sh
npm link
```

<br>

## 2. Clone the Smart Store application

Open new terminal and choose a folder outside of the current project to clone the application.

```sh
cd ..
git clone https://github.com/ilhan007/ui5con-app.git
```

<br>

## 3. Run the app

<br>

- Navigate to the application root and install dependencies.

```sh
cd ui5con-app
npm install
```

<br>

- Run the app - should open on **`http://localhost:3000/ui5con-app#/`**.

```sh
npm start
```

<br>

- The **`Home`** page opens. It's providing an overview for the Smart Store Manager and quick actions to manage the smart stores.

<br>

<img width="995" alt="Screenshot 2023-06-17 at 19 24 43" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/ada2c3c1-ef1e-45a3-ad58-202c7cf3a2f8"></br></br>

<br>

- Navigate to the **`Inventory`** page by pressing the Inventory card (focused on the previous image). Here you see the Table with products, which we will enhance by replacing the plain texts in the `Tags` column (underlined in the image below) with the newly created `Token` web component.

<br>

<img width="1211" alt="Screenshot 2023-06-24 at 19 40 52" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/6f01a068-0b02-430d-88fd-6b47caf98e19"></br></br>

<br>

## 4. Install `@ui5con/components`

Run the command in the application's root folder:

```sh
npm link @ui5con/components
```

**Note:** This is like running `npm install <package>` for a package that exists in the public NPM.

<br>

## 5. Open the app in your IDE

The `SmartStore` app is written in React and TypeScript, so we have TSX files (the TypeScript version of JSX templates).

The **`src/detail/Detail.tsx`** is defining the **`Inventory`** table. At the bottom, you will find the template of the **`Tags`** column.

<br>

- **`src/detail/Detail.tsx`**
```jsx
<ui5-table-cell class="table-status-cell-content">
	{
	product.tags.map((tag: string, idx: number) => 
		<TokenReactComponent key={idx}  productKey={product.key} readonly={this.state.readonly} text={tag} deleteTag={this.deleteTag.bind(this)}/>
	)}
</ui5-table-cell>
```

Every product has multiple tags and for each tag, we render the `TokenReactComponent` - let's explore it.

<br>

- **`src/detail/TokenReactComponent.tsx`**

The `TokenReactComponent` renders plain text in a span. Our goal is to replace it with the newly created `my-token` web component.


```jsx
render() {
	return (
	    <span>{this.props.text}</span>
	);
}
```

<br>

## 6. Import **`Token`**

- Import the Token in **`src/detail/TokenReactComponent.tsx`**.

```js
import "@ui5con/components/dist/Token.js";
```

<br>

## 7. Use **`Token`**

- Use the `my-token` tag. Notice how we also bind the Token's `readonly` property to the app's state.
 
```jsx
render() {
	return (
	   <my-token readonly={this.props.readonly}>{this.props.text}</my-token>
	);
}
```

<br>

- You will get a TS error: `Property 'my-token' does not exist on type 'JSX.IntrinsicElements'` as the tag is unknown for the TS compiler. Open **`src/types/index.ts`** to declare the tag.

```diff
+import type Token from "@ui5con/components/dist/Token.js";
declare global {
	namespace JSX {
		interface IntrinsicElements {
+			['my-token']: CustomElement<Token>;
```

<br>

<img width="1883" alt="Screenshot 2023-06-25 at 13 37 27" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/f1100122-9a86-4e8d-b8e0-c405752402aa"></br>

**Tokens displayed!** The Tokens are now displayed in the **`Tags`** column. You can toggle the **`Edit`** button and see the `decline` icon also toggled,
because the app is already setting/unsetting `readonly` property on pressing the button.

<br>

## 8. Implement `tag deletion`

Until now, we displayed the tokens, and also pressing the `Edit` button shows/hides the `decline` icon of the tokens. Now, we need to add logic to react to the user pressing the icon.

<br>

- Open **`src/detail/TokenReactComponent.tsx`** file and create DOM reference for **`my-token`** to later attach an event listener on.

```diff
import React, { Component } from "react";

import { Product } from "../types";

import "@ui5con/components/dist/Token.js";
+ import Token from "@ui5con/components/dist/Token.js";

class TokenReactComponent extends Component<TokenReactComponentProps> {	
+	tokenRef: React.RefObject<Token>; // DOM reference to "my-token" to attach event listener on.

	constructor (props: TokenReactComponentProps) {
		super(props);
+               this.tokenRef = React.createRef<Token>();
	}
}

...

export default TokenReactComponent;
```

<br>


- Add new attribute `ref={this.tokenRef}`.

```diff
        ...
	render() {
		return (
+                 <my-token ref={this.tokenRef} readonly={this.props.readonly}>{this.props.text}</my-token>
		);
	}
}
```

<br>

-  Attach event listener for the Token's "delete" event.

```diff
...

class TokenReactComponent extends Component<TokenReactComponentProps> {	
        tokenRef: React.RefObject<Token>; // DOM reference to "my-token" to attach event listener on.

	constructor (props: TokenReactComponentProps) {
		super(props);
                this.tokenRef = React.createRef<Token>();
	}

       
+       componentDidMount() {
+         this.tokenRef.current!.addEventListener("delete", () => { 
+           this.props.deleteTag(this.props.productKey, this.props.text); 
+         });
+       }

}

export default TokenReactComponent;
```

Now, you can press the `Edit` button and remove any Token.

<br>

# Hands-on "Standard" flow completed!

<br>
<br>

# Use the `Tokenizer` web component in the Smart Store application [optional]
This section can be followed if you already created the Tokenizer web component in the [Develop Tokenizer](./3_Develop_Tokenizer.md) extended step.

Here will integrate the `Tokenizer` to add some more responsiveness to the `Tag's` column.
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

## Hoooray! Well done! Hands-on [extended] completed!

<br>

<img width="1175" alt="Screenshot 2023-06-23 at 15 35 38" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/e05cdfe2-9c68-4574-b93b-a303718b32f9">

<br>

<img width="1215" alt="Screenshot 2023-06-23 at 15 45 12" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/8bbf3dd5-1bd0-4984-b171-6ebe8ac90354">


