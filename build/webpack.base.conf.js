
var path = require('path');
var config = require('../config');
var utils = require('./utils');
var projectRoot = path.resolve(__dirname, '../');
var vueLoaderConfig = require('./vue-loader.conf');

var env = process.env.NODE_ENV;
// check env & config/index.js to decide whether to enable CSS source maps for the
// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap);
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap);
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd;

module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: env === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': path.resolve(__dirname, '../src'),
      'mock': path.resolve(__dirname, process.env.MOCK_DATA ? '../src/mock/mock' : '../src/mock/empty'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.resolve(__dirname, '../src')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, '../src'), path.resolve(__dirname, '../test')]
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
