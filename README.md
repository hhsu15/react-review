# React Review

## Get started

Just to refresh React. We will be using hooks rather than class components.

To create a react project

```sh
npx create-react-app <project name>

```

To start the app, go into the folder and run

```sh
npm start
```

Refer to `Project_1/jsx` for the basic example how to redenr something on the browser.

Couple of things:

- Use {variale} to pass variable
- bool value, obj will not be rendered. Numers and strings are ok
- The jsx elements have slightly different props compared to the attributes of html elements. Check the example for `input` where you can have quite a few props like min, max, list, style,...

## Rules to convert html to jsx

- use camelcase, e.g., maxLength, autoCapitalize, noValidate
- always use {} for the value of the props
- If the value is a type of boolean you can use a short cut like this
  - <input spellCheck={true}> is same as <input spellCheck>
- use `className` as opposed to `class`
- for style, always use object as opposed to string, for exmaple,
  - <div style={{textDecoration: 'none', padding:'5px'}}></div>

Check MDN web docs for attributes for HTML elements. E.g., Textarea: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea

## Props system

Props are passed from the parent componet down to child components.

Refer to `project_2/pdas` for quick example

### React Developer tool

Install the React Developer tool browser extension to help you debug.

Open "inspect" and find "components". You will be able to see the props for each compoent

## Some CSS libray

**Bulma**

A good CSS library, for example:

Bulma Card: https://bulma.io/documentation/components/card/

To add Bulma into our project using npm:

```sh
npm install bulma

```

Then, import the css into the `App.js` file.

```js
import 'bulma/css/bulma.css';
```

To make sure your layout can be displayed nicely, be sure to check out the Columns:

https://bulma.io/documentation/columns/

## Handle events

Pass a callback to an event. For exmaple, `onClick`:

```js
...
return (
  <div>
    <button onClick={() => console.log('clicked!')}>Click me!</button>
  </div>
);
```

## State system

In oder to update the screen, we need to "rerender" the components. This is where the "state" comes in to play.

If we use the function component, we will use the `useState` function. It returns two things - first is the state value, second is the setter function.

```js
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <button onClick={handleClick}>Add count</button>
      <div>Count: {count}</div>
    </div>
  );
}
```

### Show a list of elements

A very common thing we do is to show a list of elements to the screen. We use `.map` to perform this type of task.
For example,

```js
const renderList = myList.map(item, index) => {return <MyComponent prop1={item} prop2={index}>}

```

#### Modify the size of images

Very often we need to change the size of the image.

## Apply CSS to component

To apply css to particular components, simple create a css file like, `App.css` and import it to your component

```js
// in App.js
import './App.css';
```

Refer to `project_3/src/App.css to see how to do basic layout.

## Make HTTP request using axio

```sh
npm install axios
```

Now, in order to make this like a syncronous function, we use the `async`, `await`:

```js
const searchImages = async () => {
  const response = await axios.get('https://api.unsplash.com/search/photos', {
    headers: {
      Authorization: 'Client-ID xxxxx'
    }, //for headers you need to add to the request
    params: { query: 'cars' } // help turn an obj to a query string and added to the uel
  });

  return response;
};
```

## Communicate from child to parent component

When you have input element within a form, if user clicks on "enter" it will automatically trigger the submit event. If you have a button in the form it will do the same submit behavior by default. So it's convenient to use a form compared to just plain input.

```js
function SearchBar() {
  const handleSubmit = event => {
    event.reventDefault(); // use this to prevent the default submit behavior
    console.log('I need to tell parent about something');
  };
}
return (
  <div>
    <form onSubmit={handleSubmit}>
      <input type="text" onChange />
    </form>
  </div>
);
```

## UseContext

To share data to children components.

Here are the steps to use useContext.

1. Create a context provider component

```javascript
import { createContext } from 'react';

const MyContext = createContext();
```

To use it, you will write out someting like this:

```
<MyContext.Provider />
```

2. Specify the data you want to share, using the 'value' prop.

```javascript
<MyContext.Provider value={10}>
  <MyComponent />
</MyContext.Provider>
```

So we end up often just put the provider at top and just wrap all the children.

3. Receive the data inside a child component, by using useContext

```javascript
import {useContext} from 'react'
import MyContext from "./components"

function MyComponent () {
  const num = useContext(MyContext)
  ...
}
```

So usually if we can decide what states we need to share (refered to as Applicaiton states), we can create a custom Provider component like this which is pretty elegant!

```js
import { createContext, useState } from 'react';

const MyContext = createContext();

function Provider({ children }) {
  const [someState, setSomeState] = useState('hi');

  const valueToShare = {
    someState: someState
    somefunc: () => setSomeState("there!")
  };
  return <MyContext.Provider value={valueToState}>{children}</MyContext.Provider>
}
export {Provider}
export default MyContext;

// this way you can import like this:
// import MyContext, {Provider} from "./components/path"
```

So to provider the context you might have something like this..

```js
import App from "./App"
import {Provider} from "./somewhere"

...

return (
  <Provider>
    <App>
  </Provider>
)
```

And to receive the context in one of the children components, you might have something like this...

```js
import { useContext } from 'react';
import MyContext from '../some/where';

function SomeChildComponent() {
  const {someState, someFunc} = useContext(MyContext);
  ...
}
```

# Custom Hooks

For reusable logics you can create custom hooks to make the code cleaner. Say if you have this piece of code in many places...

```javascript
import {useContext} from 'react'
import MyContext from "./components"

...
const num = useContext(MyContext)

```

You can create a custom hook for this:

```javascript
// useBookContext

function useMyContext() {
  return useContext(MyContext);
}
```

Then you can just use this useMyContext hook everywhere in your code.
