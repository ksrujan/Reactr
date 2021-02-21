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