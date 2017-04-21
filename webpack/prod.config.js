require('babel-polyfill');

// Webpack config for creating the production bundle.
var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var strip = require('strip-loader');

var projectRootPath = path.resolve(__dirname, '../');
var assetsPath = path.resolve(projectRootPath, './static/operating-item-view');
var theme = require(path.resolve(projectRootPath, "./webpack/theme.js"))();
// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    // "vendor":["react","react-dom","react-router","redux","react-router-redux","jcloudui","react-redux","superagent"],
    'category': [
      './src/containers/Category/client.js'
    ],
    'brand': [
      './src/containers/Brand/client.js'
    ],
    'specifications': [
      './src/containers/Specifications/client.js'
    ],
    'editgoods': [
      './src/containers/EditGoods/client.js'
    ],
    'goodsrlease': [
      './src/containers/GoodsRlease/client.js'
    ],
    //供货申请审核
    'supplyaudit': [
      './src/containers/SupplyAudit/client.js'
    ],
    //商品库管理
    'itembase': [
      './src/containers/ItemBase/client.js'
    ],
    //销售商品管理
    'saleitem': [
      './src/containers/SellGoods/client.js'
    ],
    //销售商品编辑
    'saleitemedit': [
      './src/containers/SaleItemEdit/client.js'
    ],
    'batchupload': [
      './src/containers/BatchUpload/client.js'
    ]
  },
  output: {
    path: assetsPath,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/operating-item-view/'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: [strip.loader('debug'), 'babel']},
      { test: /\.json$/, loader: 'json-loader' },
      { test:/\.css$/,loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&localIdentName=[local]&sourceMap!autoprefixer?browsers=last 2 version!less?outputStyle=expanded&sourceMap=true&sourceMapContents=true')},
      { test: /\.less$/, exclude: /node_modules/,loader: ExtractTextPlugin.extract('style', 'css-loader?modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:8]&sourceMap!autoprefixer?browsers=last 2 version!less?outputStyle=expanded&sourceMap=true&sourceMapContents=true') },
      { test: /\.less$/, include: /node_modules/,loader: ExtractTextPlugin.extract('style','css-loader!' + `less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`)},
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css-loader?modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:8]&sourceMap!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true') },
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
    new webpack.DllReferencePlugin({
        context: assetsPath,
        manifest: require('../static/dll/manifest.json'),
    }),
    //new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js'),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "vendor",

    //   // filename: "vendor.js"
    //   // (Give the chunk a different name)

    //   minChunks: Infinity,
    //   // (with more entries, this ensures that no other module
    //   //  goes into the vendor chunk)
    // }),
    // new CleanPlugin([assetsPath], { root: projectRootPath }),

    // css files from the extract-text-plugin loader
    new ExtractTextPlugin('[name]-[chunkhash].css', {allChunks: true}),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      },

      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false
    }),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    // optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),

    webpackIsomorphicToolsPlugin
  ]
};
