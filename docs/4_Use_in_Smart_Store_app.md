## Use `Token` and `Tokenizer` web components in the Smart Store application

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

- Run the app.

```sh
npm start
```

<br>

- The app should open on **`http://localhost:3000/ui5con-app#/`**.

This is the **`Home`** page, providing an overview for Smart Store Manager and quick actions to manage the smart stores.

<br>

<img width="995" alt="Screenshot 2023-06-17 at 19 24 43" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/ada2c3c1-ef1e-45a3-ad58-202c7cf3a2f8"></br></br>

<br>

- Navigate to the **`Inventory`** page by pressing the Iventory card (focused on the previous image). Here you see the Table with products, which we will enhance by adding the newly created components.

<br>

<img width="830" alt="Screenshot 2023-06-20 at 8 05 15" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/8fcf7784-3040-454c-8648-d3d72e11fcd2"></br></br>

<br>

## 4. Install `@ui5con/components`

In the first step, running `npm link` in the components' project defined `@ui5con/components` as a global package.
Now, run the following in the application's root folder:

```sh
npm link @ui5con/components
```

**Note:** This is like running `npm install <package>` for a package that exists in the public NPM.

<br>

## 5. Import the Token and Tokenizer

- Open the app in your IDE.

<br>

- Open **`/ui5con-app/src/detail/Detail.tsx`**, defining the **`Inventory`**.

<br>

- Import the **`Token`** and the **`Tokenizer`** after the other imports at the top of the file.

```js
import @ui5con/components/dist/Token.js
import @ui5con/components/dist/Tokenizer.js
```

<br>

## 6. Use the Token and Tokenizer

As the components are imported, we can use them via their tag names (`my-token` and `my-tokenizer`).

<br>

- At the bottom of the file, find the Table and the part using the **`ui5-badge`** web component.

```html
<ui5-table-cell>
    <span className="table-cell-content middle">
        <ui5-badge color-scheme={getBadgeType(item.status!)}>{item.status}</ui5-badge>
    </span>
</ui5-table-cell>
```

<br>

- Replace the **`ui5-table-cell`** content to use the **`my-token`**.

```html
<ui5-table-cell>
    <my-token>{item.status}</my-token>
</ui5-table-cell>
```

<br>

- You will probably get `Property 'my-token' does not exist on type 'JSX.IntrinsicElements'` as the tag is unknown for the TS compiler. To fix this, open **`src/types/index.ts`**. and declare the tag in the IntrinsicElements interface.

```ts
import type Token from "@ui5con/components/dist/Token.js";
declare global {
	namespace JSX {
	  interface IntrinsicElements {
		['my-token']: CustomElement<Token>;
```

<br>

- The **`my-token`** is now displayed in the **`Status`** column.

<br>

<img width="1145" alt="Screenshot 2023-06-17 at 20 10 13" src="https://github.com/ilhan007/ui5con-web-component/assets/15702139/d5477a21-4505-4744-82c7-77fb8b27e429"></br></br>
