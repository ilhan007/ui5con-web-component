## Use `Token` web component in the Smart Store application

Congratulations, you've reached the final part!
Now that you've implemented the Token or both the Token and Tokenizer web components, it's time to put them in action.

<br>

## 1. Мake the components consumable via `NPM` 

The project has a package.json and it is prepared to be published to NPM and in productive scenario this is exactly what you would do.
However, for the purpose of the hands-on we will simulate as if the components were published on NPM with the usage of `npm link`.

Run the following command in the project's root:

```sh
cd <packageName>
npm link
```

<br>

## 2. Clone the Smart Store application

Choose a folder, outside of the current project, to clone the application.

```sh
cd ..
git clone https://github.com/ilhan007/ui5con-app.git
```

<br>

## 3. Run the app

- Navigate to the application root and install dependencies.

```sh
cd /ui5con-app
npm install
```

<br>

- Run the app - should open on **`http://localhost:3000/ui5con-app#/`**.

```sh
npm start
```

<br>

- The **`Home`** page opens. It's providing an overview for Smart Store Manager and quick actions to manage the smart stores.

<br>

<img width="995" alt="Screenshot 2023-06-17 at 19 24 43" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/ada2c3c1-ef1e-45a3-ad58-202c7cf3a2f8"></br></br>

<br>

- Navigate to the **`Inventory`** page by pressing the Iventory card (focused on the previous image). Here you see the Table with products, which we will enhance by replacing the plain texts in `Tags` column (underlined in the image below) with the newly created components.

<br>
<img width="830" alt="Screenshot 2023-06-20 at 8 05 15" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/3c2fa9ad-0940-4e94-af44-734240398900"></br></br>

<br>

## 4. Install `@ui5con/components`

In the first step, running `npm link` in the components' project defined `@ui5con/components` as a global package.
Now, run the following in the application's root folder:

```sh
npm link @ui5con/components
```

**Note:** This is like running `npm install <package>` for a package that exists in the public NPM.

<br>

## 5. Explore the relevant application views

The **`/ui5con-app/src/detail/Detail.tsx`** is defining the **`Inventory`** table. At the bottom, you will find the template of the **`Tags`** column.


- **`Detail.tsx`**
```jsx
<ui5-table-cell class="table-status-cell-content">
	{
	product.tags.map((tag: string, idx: number) => 
		<TokenReactComponent product={product} key={idx} readonly={this.state.readonly} text={tag} tokenDelete={this.tokenDelete.bind(this)}/>
	)}
</ui5-table-cell>
```

Every product has multiple tags. For each tag, the app renders the `TokenReactComponent` - let's explore it.

<br>

- **`TokenReactComponent.tsx`**

The `TokenReactComponent` renders plain text. Our goal is to replace it with the newly created `my-token` web compoenent.


```jsx
render() {
	return (
	    <span>{this.props.text}</span>
	   //<my-token readonly={this.props.readonly}>{this.props.text}</my-token>
	);
}
```

<br>

## 6. Use **`Token`**

- Add the imports to **`/ui5con-app/src/detail/TokenReactComponent.tsx`**.

```js
import @ui5con/components/dist/Token.js
```

<br>

- Use the `my-token` by uncommenting it.
 
```jsx
render() {
	return (
	   <my-token readonly={this.props.readonly}>{this.props.text}</my-token>
	);
}
```

<br>


- You will get `Property 'my-token' does not exist on type 'JSX.IntrinsicElements'` as the tag is unknown for the TS compiler. To fix this, open **`src/types/index.ts`**. and declare the tags in the `IntrinsicElements` interface.

```ts
import type Token from "@ui5con/components/dist/Token.js";
import type Tokenizer from "@ui5con/components/dist/Tokenizer.js";
declare global {
	namespace JSX {
	  interface IntrinsicElements {
		['my-token']: CustomElement<Token>;
                ['my-tokenizer']: CustomElement<Tokenizer>;
```

<br>

- The **`my-token`** instances are now displayed in the **`Tags`** column. You can toggle the **`Edit`** button and see the `decline` icon also toggled,
because the app is already setting/unsetting `readonly` property on pressing the button.

<br>

<img width="1126" alt="Screenshot 2023-06-19 at 18 12 34" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/b5c0f647-f562-408f-a5e4-0bb5712d7231"></br></br>

## 7. Implement `token delete`

After we displayed the tokens, and the Edit button shows/hides their `decline` icon. Td so we need to add application logic to react on user pressing the icon
in the **`/ui5con-app/src/detail/TokenReactComponent.tsx`** file.

<br>

- Create DOM reference to "my-token" to later attach an event listener on.

```diff
+ import React, { Component } from "react";

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

-  Attach for the Token's "delete" event and calling existing "deleteTag" method that deletes a tag gy given product and tag's text

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
+           this.props.deleteTag(this.props.product, this.props.text); 
+         });
+       }

}

export default TokenReactComponent;
```

<br>

- Add two addiotanal attributes to my-token. The "ref" is used to get a DOMRef, while "data-product" is used to store the product that the tag belongs to.

```diff
        ...
	render() {
		return (
+                 <my-token ref={this.tokenRef} readonly={this.props.readonly} data-product={this.props.product}>{this.props.text}</my-token>
		);
	}
}
```

<br>

- Now, if you enable "Edit" mode by pressing the "Edit" button and press the `decline` icon on any `my-token` - it should be removed.

Next [Use `Tokenizer` web component in the Smart Store application](./4_Use_Tokenizer_in_Smart_Store_app.md)
