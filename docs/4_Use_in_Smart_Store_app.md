## Use `Token` and `Tokenizer` web components in the Smart Store application

### Step 1: Мake the components consumable via `NPM` 

Usually you would publish your components in NPM and then everyone can consume them via NPM,
but this requires a NPM user and also there we publish productive packages mostly.
So for our purpose we will simulate as if the components were published on NPM with the usage of `npm link`.

In the project's root run:
```sh
cd <packageName>
npm link
```

### Step 2: Clone the Smart Store application

Choose a folder, outside of the current project, to clone the application.

```sh
cd ..
git clone https://github.com/ilhan007/ui5con-app.git
```

### Step 3: Run the app

Navigate to the application root folder and run:

```sh
npm install
```

After the dependencies are installde, run the app:

```sh
npm start
```

The app should automatically open in your browser tab:
-> screenshot of the App's home page

Navigate to the Inventory to see the table, that you will enahnce with the Token and Tokenizer.
To do so, press on first card
-> screenshot of the card

And, you will see the Inventory view
-> screenshot of the App's detail page


### Step 4: Link the components with `npm link`

Run the following in the app's root folder:

```sh
npm link <packageName>
```

### Step 5: Import the Token and Tokenizer

- Open the app in your IDE

- Find the `Details's` view `/ui5con-app/src/detail/Detail.tsx`

- Import the `Token` and the `Tokenizer` into the file

```js
import @my/components/dist/Token.js
import @my/components/dist/Tokenizer.js
```

### Step 6: Use the Token and Tokenizer

As we imported already the components, we can use them via their tag names (`my-token` and `my-tokenizer`) in the app views. The application is writtent in React, so in this case we will use them in tsx.
