require('babel-polyfill');

// Webpack config for development
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var assetsPath = path.resolve(__dirname, '../static/operating-item-view');
var host = (process.env.HOST || 'localhost');
var port = (+process.env.PORT + 1) || 3001;
var theme = require(path.resolve(__dirname, "../webpack/theme.js"))();
// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

var babelrc = fs.readFileSync('./.babelrc');
var babelrcObject = {};
var overlay = false;

try {
  babelrcObject = JSON.parse(babelrc);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}


var babelrcObjectDevelopment = babelrcObject.env && babelrcObject.env.development || {};

// merge global and dev-only plugins
var combinedPlugins = babelrcObject.plugins || [];
combinedPlugins = combinedPlugins.concat(babelrcObjectDevelopment.plugins);

var babelLoaderQuery = Object.assign({}, babelrcObjectDevelopment, babelrcObject, {plugins: combinedPlugins});
delete babelLoaderQuery.env;

// Since we use .babelrc for client and server, and we don't want HMR enabled on the server, we have to add
// the babel plugin react-transform-hmr manually here.

// make sure react-transform is enabled
babelLoaderQuery.plugins = babelLoaderQuery.plugins || [];
var reactTransform = null;
for (var i = 0; i < babelLoaderQuery.plugins.length; ++i) {
  var plugin = babelLoaderQuery.plugins[i];
  if (Array.isArray(plugin) && plugin[0] === 'react-transform') {
    reactTransform = plugin;
  }
}

if (!reactTransform) {
  reactTransform = ['react-transform', {transforms: []}];
  babelLoaderQuery.plugins.push(reactTransform);
}

if (!reactTransform[1] || !reactTransform[1].transforms) {
  reactTransform[1] = Object.assign({}, reactTransform[1], {transforms: []});
}

// make sure react-transform-hmr is enabled
reactTransform[1].transforms.push({
  transform: 'react-transform-hmr',
  imports: ['react'],
  locals: ['module']
});

module.exports = {
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    'category': [
      'webpack-hot-middleware/client?overlay='+overlay+'&path=http://' + host + ':' + port + '/__webpack_hmr',
      './src/containers/Category/client.js'
    ],
    'brand': [
      'webpack-hot-middleware/client?overlay='+overlay+'&path=http://' + host + ':' + port + '/__webpack_hmr',
      './src/containers/brand/client.js'
    ],
    'specifications': [
      'webpack-hot-middleware/client?overlay='+overlay+'&path=http://' + host + ':' + port + '/__webpack_hmr',
      './src/containers/Specifications/client.js'
    ],
    'editgoods': [
      'webpack-hot-middleware/client?overlay='+overlay+'&path=http://' + host + ':' + port + '/__webpack_hmr',
      './src/containers/EditGoods/client.js'
    ],
    'goodsrlease': [
      'webpack-hot-middleware/client?overlay='+overlay+'&path=http://' + host + ':' + port + '/__webpack_hmr',
      './src/containers/GoodsRlease/client.js'
    ],
    //供货申请审核
    'supplyaudit': [
      'webpack-hot-middleware/client?overlay='+overlay+'&path=http://' + host + ':' + port + '/__webpack_hmr',
      './src/containers/SupplyAudit/client.js'
    ],
    //商品库管理
    'itembase': [
      'webpack-hot-middleware/client?overlay='+overlay+'&path=http://' + host + ':' + port + '/__webpack_hmr',
      './src/containers/ItemBase/client.js'
    ],
    //销售商品管理
    'saleitem': [
      'webpack-hot-middleware/client?overlay='+overlay+'&path=http://' + host + ':' + port + '/__webpack_hmr',
      './src/containers/SellGoods/client.js'
    ],
    //销售商品编辑
    'saleitemedit': [
      'webpack-hot-middleware/client?overlay='+overlay+'&path=http://' + host + ':' + port + '/__webpack_hmr',
      './src/containers/SaleItemEdit/client.js'
    ],
    'batchupload': [
      'webpack-hot-middleware/client?overlay='+overlay+'&path=http://' + host + ':' + port + '/__webpack_hmr',
      './src/containers/BatchUpload/client.js'
    ]
  },
  output: {
    path: assetsPath,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: 'http://' + host + ':' + port + '/operating-item-view/'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel?' + JSON.stringify(babelLoaderQuery), 'eslint-loader']},
      { test: /\.json$/, loader: 'json-loader' },
      //{ test: /\.less$/, loader: 'style!css!less' },
      // { test: /\.less$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!less?outputStyle=expanded&sourceMap' },
      // { test: /\.scss$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap' },

      { test:/\.css$/,loader: 'style!css?modules&importLoaders=2&localIdentName=[local]&sourceMap!autoprefixer?browsers=last 2 version!less?outputStyle=expanded&sourceMap=true&sourceMapContents=true'},
      { test: /\.less$/, exclude: /node_modules/,loader: 'style!css?modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:8]&sourceMap!autoprefixer?browsers=last 2 version!less?outputStyle=expanded&sourceMap=true&sourceMapContents=true' },
      { test: /\.less$/, include: /node_modules/,loader: 'style!css!' + `less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`},
      { test: /\.scss$/, loader:'style!css-loader?modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:8]&sourceMap!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true'},

      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
      { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=100' }
    ]
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx']
  },
  plugins: [
    // hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: false  // <-------- DISABLE redux-devtools HERE
    }),
    new webpack.DllReferencePlugin({
        context: assetsPath,
        manifest: require('../static/dll/manifest.json'),
    }),
    webpackIsomorphicToolsPlugin.development()
  ]
};
