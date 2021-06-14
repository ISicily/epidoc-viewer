<img align="left" src="src/ox-rect.png?raw=true" alt="oxford logo" height="80" >
<img align="right" src="src/LOGO_ERC-FLAG_EU_cropped.jpg?raw=true" alt="erc logo" height=80" >
<img align="center" src="src/ISicily_english_reduced.jpg?raw=true" alt="isicily logo" height=80" >

<br clear="both"/>

# I.Sicily EpiDoc Viewer

<div>This project has received funding from the John Fell Fund of the University of Oxford, and from the European Research Council (ERC) under the European Union’s Horizon 2020 research and innovation programme (grant agreement No 885040, “Crossreads”).</div>

Transforms EpiDoc into a conventional set of editorial mark-up, based upon the Leiden conventions in epigraphic studies.

You can play with the tranformation using the Githup Pages version of this app:

[https://isicily.github.io/epidoc-viewer/](https://isicily.github.io/epidoc-viewer/)

The TEI document that appears there now is pulled automatically from:

[https://raw.githubusercontent.com/ISicily/ISicily/master/alists/ISic-all-example.xml](https://raw.githubusercontent.com/ISicily/ISicily/master/alists/ISic-all-example.xml)

and includes exemplars of the conversion rules.

Convert your own epidoc by replacing what's in the 'epidoc' panel with your own epidoc.  You must paste at least a `div[type="edition"]` but can also paste the entire TEI Doc if you like.  The converter will (more-or-less) instantly generate equivalent Leiden in the 'leiden' panel.  Any change you make in the epidoc panel will update the Leiden.

## Customize

You can fork this repository if you'd like to tweak the epidoc to leiden rules or otherwise modify the interface (title, logo).

### General Customization

#### Fork the repo

<img width="956" alt="image" src="https://user-images.githubusercontent.com/547165/119873024-16464880-bef2-11eb-8c25-dfac09060213.png">

#### Clone your fork to your computer

in a terminal:

```git clone git@github.com:jchartrand/epidoc-viewer.git```

#### Install Dependencies

```npm install``` 

OR 

```yarn install```

Now Change what you’d like in the web app, e.g., title, image, layout.

You can see the effect by running a dev server with:

```npm run start```
OR
```yarn run start``` 

#### Deploy

You can deploy to your own server by running:

```npm run build```
OR
```yarn run build``` 

and then copy the contents of the build directory to whichever directory is appropriate on your server.

You can also deploy to Github Pages on your forked server (as we do for this repository).

Run the ‘npm run deploy’ or ‘yarn run deploy’ if you want to run on Github pages.  You'll have to  make sure that the homepage in package.json is set to the github pages url for your fork, e.g.

```"homepage": "https://jchartrand.github.io/epidoc-viewer",```

You will also have to enable Github pages in the settings of your repo (Settings/pages).

#### Updating core files

To update the core epidoc-viewer-core files (if there is a new release, say if the default rules change), run 

```yarn upgrade @isicily/epidoc-viewer-core --latest```
OR
```npm install @isicily/epidoc-viewer-core@latest```

Then run the build and copy your files to your server, or deploy to GitHub pages.

### Adding rules or overriding rules

  There are two sets of rules, which are actually defined in the core repo on which this repo depends (although you shouldn't have to change that core repo:

[Interpreted](https://github.com/ISicily/epidoc-viewer-core/blob/master/src/rules.js)

[Diplomatic](https://github.com/ISicily/epidoc-viewer-core/blob/master/src/diplomaticRules.js)

And an associated CSS stylesheet [https://github.com/ISicily/epidoc-viewer-core/blob/master/src/Leiden.css](https://github.com/ISicily/epidoc-viewer-core/blob/master/src/Leiden.css)

To override or add, create a rules object like those defined above, but only include rules for those tags you wish to add or override, e.g.,

```javascript
const yourRules = {
    'w': node => {
        if (node.getAttribute('part') === 'I') {
            const exChild = node.querySelector('ex')
            if (exChild) {
                exChild.append('-')
            }
        } 
    },
    'ex': node => {
        const cert = node.getAttribute('cert')
        node.prepend('('); 
        if (cert === 'low') node.append('?')
        node.append(')')
    },
    'abbr': node => {
        if (node.parentNode.nodeName !== 'expan') node.append('(- - -)')
    }
}
```

and then pass those rules into the LeidenViewer component as a prop:

```<LeidenViewer tei={tei} showInterpreted={showInterpreted} overridingRules={yourRules}/>```

The conversion uses a [TreeWalker](https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker) to walk through the epidoc XML tree in document order, applying rules to the elements as it goes.

We render the viewer with React, but the underlying rules and their application are pure javascript/css.  Use them in any javascript project - the bits you need are comfortably ensconsed within [https://github.com/ISicily/epidoc-viewer-core](https://github.com/ISicily/epidoc-viewer-core) which also has an NPM package [https://www.npmjs.com/package/@isicily/epidoc-viewer-core](https://www.npmjs.com/package/@isicily/epidoc-viewer-core)





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


