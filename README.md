![Oxford logo](https://github.com/ISicily/epidoc-viewer/blob/master/src/Oxford-University-rectangle-logo.png?raw=true)

# I.Sicily EpiDoc Viewer

Transforms EpiDoc into a conventional set of editorial mark-up, based upon the Leiden conventions in epigraphic studies.

You can play with the tranformation using the Githup Pages version of this app:

[https://isicily.github.io/epidoc-viewer/](https://isicily.github.io/epidoc-viewer/)

The TEI document that appears there now is pulled automatically from:

[https://raw.githubusercontent.com/ISicily/ISicily/master/alists/ISic-all-example.xml](https://raw.githubusercontent.com/ISicily/ISicily/master/alists/ISic-all-example.xml)

and includes exemplars of the conversion rules.

Convert your own epidoc by replacing what's in the 'epidoc' panel with your own epidoc.  You must paste at least a `div[type="edition"]` but can also paste the entire TEI Doc if you like.  The converter will (more-or-less) instantly generate equivalent Leiden in the 'leiden' panel.  Any change you make in the epidoc panel will update the Leiden.

You can also fork this repository if you'd like to tweak the epidoc to leiden rules.  There are two sets of rules:

[Interpreted](https://github.com/ISicily/epidoc-viewer/blob/master/src/components/rules.js)

[Diplomatic](https://github.com/ISicily/epidoc-viewer/blob/master/src/components/diplomaticRules.js)

The conversion uses a [TreeWalker](https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker) to walk through the epidoc XML tree in document order, applying rules to the elements as it goes.

There is also an associated CSS stylesheet [https://github.com/ISicily/epidoc-viewer/blob/master/src/components/Leiden.css](https://github.com/ISicily/epidoc-viewer/blob/master/src/components/Leiden.css)

We render the viewer with React, but the underlying rules and their application are pure javascript/css.  Use them in any javascript project - the bits you need are comfortably ensconsed within:

(https://github.com/ISicily/epidoc-viewer/blob/master/src/components/convert.js)[https://github.com/ISicily/epidoc-viewer/blob/master/src/components/convert.js]

and

https://github.com/ISicily/epidoc-viewer/blob/master/src/components/Leiden.css](https://github.com/ISicily/epidoc-viewer/blob/master/src/components/Leiden.css)

We may at some point extract this to an NPM module - let us know if that would be useful for your project.  We might also extract a React component to NPM if that would be useful.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
