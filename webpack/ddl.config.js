const webpack = require('webpack');
var path = require('path');
var assetsPath = path.resolve(__dirname, '../static/static/operating-item-view');
const vendors = [
    "react","react-dom","react-router","redux","react-router-redux","jcloudui","react-redux","superagent"
];

module.exports = {
    output: {
        path: assetsPath,
        filename: '[name].js',
        library: '[name]',
    },
    entry: {
        "lib": vendors,
    },
    plugins: [
        new webpack.DllPlugin({
            path: assetsPath+'/manifest.json',
            name: '[name]',
            context: assetsPath,
        }),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        })
    ],
};