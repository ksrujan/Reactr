# Steps to create React App from Scratch
## npm init
This will create a package.json file. You can use the below code to create with default values

<code> 
    npm init -y 
</code> 

## Basic packages that are required

### packages for transpiling ES6 
- @babel/core
- @babel/preset-env
- @babel/preset-jsx

The first two babel packages(core, preset-env) are required for transpiling ES6.
"preset-jsx" is required for transpiling JSX

### packages for building application 
- webpack
- webpack-cli
- webpack-dev-server

These packages are required to configure and setup webpack. We need the webpack to build the application. webpack-dev-server helps in running the app locally without the need of any additonal webserver

### packages for loading the files 
- babel-loader

Webpack is a bundler and requires loaders for each file type. Babel-loader is used for loading js or jsx files. This is help webpack in trnaspiling and bundling the es6 code.

- html-webpack-plugin

Webpack also has the provision to use various plugins. html plugin allow webpack to insert the bundled js files into the specified html file.

### packages for React 
- react
- react-dom

These are the two packages that are required to create a basic react application. "react" is the core package for react. "react-dom" is responsible for rendering the DOM 

<code> 

    npm i --save-dev @babel/core @babel/preset-env @babel/preset-react webpack webpack-cli webpack-dev-server babel-loader html-webpack-plugin react react-dom 

</code>

## Setup files

### setup babel
To setup babel for transpiling we need to create a .babelrc file in the root of the application.

.babelrc will have a json format. We need to provide the presets for babel which will be an array of strings

<code>

    {
        "presets":[
            "@babel/preset-env",
            "@babel/preset-react"
        ]
    }

</code>

### setup index.html

Create a basic index.html file with a empty div and id

<code>

    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>ReactR: React app in ES6 from scratch</title>
        </head>
        <body>
            <div id="mount"></div>
        </body>
    </html>

</code>

### Create Application code

Let us have a separate folder for application code

create a folder with name "src" in the project folder
create an App.js in src folder

In App.js we need to import react packages

<code>

    import React from 'react';
    import ReactDOM from 'react-dom';
</code>

create a function component that returns a basic HTML or JSX

<code>

    const App = () => <h1>Hello! Welcome to React</h1>

</code>

This will be the react application that need to be rendered in the DOM
In order to render the component we use react-dom library

<code>

    ReactDOM.render(<App/>, document.getElementById('mount'))
</code>

where mount is the div id that we created in index.html

Below is the complete App.js code

<code>

    // import react packages
    import React from 'react';
    import ReactDOM from 'react-dom';

    // Create a basic react function component using jsx
    const App = () => <h1>Hello! Welcome to React</h1>

    // use react-dom to render the above create function component in DOM
    // mount is the div created in index.html
    ReactDOM.render(<App/>, document.getElementById('mount'))

</code>


### setup webpack

Webpack file will reside in the root of the application. 
Webpack will use commonjs pattern (this will use require statements).
First require html-webpack-plugin
Webpack config file will export a module.

webpack config will have three main sections

#### entry
This will tell webpack what is the entry file.

<code>

    entry: "./src/App.js"
</code>

#### module
Here we will setup the rules for various files and their loaders

For this sample we are using on js files so we will setup the rule and loader for js/jsx

rules will be a collection and each object will take three properties
- test: this will be a regular expression to test the filetype
- exclude: this will be a regular expression that will tell webpack which files/folder it need to ignore or exclude
- use: this is an object which will specify which loader should be used for the file type

<code>

    module:{
        rules:[
            test:/\.(js|jsx)$/,
            exclude: /node_modules/,
            use:{
                loader:"babel-loader"
            }
        ]
    }
</code>

#### plugins

plugins will be a collection of plugin objects

Here we will update webpack with html plugin so that webpack will update the html template with the bundle file. This is the step that will add the script tag in html with the generated bundle file.

<code>

    plugins:[
        new HtmlWebpackPlugin({
            template:"index.html"
        })
    ]
</code>

complete webpack file is placed below for reference

<code>

    const HtmlWebpackPlugin = require('html-webpack-plugin');

    module.exports = {
        entry:"./src/App.js",
        module:{
            rules:[
                {
                    test:/\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use:{
                        loader: "babel-loader"
                    }
                }
            ],
        },
        plugins:[
            new HtmlWebpackPlugin({
                template:"index.html"
            })
        ]
    }
</code>

## Running the Application

In order to run the app we need to create the scripts in package.json file

Update the scripts section in the generated package.json with a start script

<code>

    "start": "webpack serve --open --mode development"
</code>

Now we should be able to run the below command in cmd prompt to run the ap

<code>

    npm start
</code>