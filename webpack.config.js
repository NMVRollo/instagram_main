const path = require('path');

const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const devMode = process.env.NODE_ENV !== 'production';

const cssExtractor = devMode ? 'style-loader' : MiniCssExtractPlugin.loader;

const cssRegex = /\.css$/;
const cssScopeRegex = /\.scope\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassScopeRegex = /\.scope\.(scss|sass)$/;

const postCSSLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [
        [
          'autoprefixer',
          {
            Browserslist: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9']
          }
        ]
      ]
    }
  }
};

const styleRule = ({ styleRegex, excludeRegex = undefined, loaderList = [] }) => {
  const test = styleRegex;
  const exclude = excludeRegex;

  return {
    test,
    exclude,
    use: [
      'cache-loader',
      cssExtractor,
      ...loaderList,
      postCSSLoader
    ]
  };
};

const server = {
  name: 'server',
  target: 'node',
  devtool: false,
  entry: path.resolve('./server/index.js'),
  externals: [nodeExternals()],
  output: {
    path: path.resolve('./build/server'),
    filename: 'index.js'
  },
  resolve: {
    alias: {
      validation: path.resolve('validation'),
      config: path.resolve('./config.js'),
      models: path.resolve('./server/models'),
      controllers: path.resolve('./server/controllers'),
      middlewares: path.resolve('./server/middlewares'),
      router: path.resolve('./server/router'),
      db: path.resolve('./server/db')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          'cache-loader',
          'babel-loader'
        ]
      }
    ]
  },
  plugins: [
    new NodemonPlugin()
  ]
};

const client = {
  name: 'client',
  entry: path.resolve('./client/src/index.js'),
  output: {
    publicPath: '/',
    filename: 'bundle.js',
    path: path.resolve('./build/client')
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    hot: true,
    open: true,
    overlay: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000'
      }
    }
  },

  resolve: {
    alias: {
      router: path.resolve('./client/src/router/'),
      api: path.resolve('./client/src/api/'),
      components: path.resolve('./client/src/components/'),
      helpers: path.resolve('./client/src/helpers/'),
      store: path.resolve('./client/src/store/'),
      pages: path.resolve('./client/src/pages/'),
      assets: path.resolve('./client/src/assets/'),
      validation: path.resolve('./validation'),
      config: path.resolve('./config.js')
    }
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve('./client/public/index.html'),
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'cache-loader',
          'babel-loader'
        ]
      },
      {
        test: /\.(woff|woff2|ttf|eot|jpe?g|png|gif|svg|mp4$|ogv$|webm$)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'src/'
        }
      },
      styleRule({
        styleRegex: cssRegex,
        excludeRegex: cssScopeRegex,
        loaderList: ['css-loader']
      }),
      styleRule({
        styleRegex: cssScopeRegex,
        loaderList: [
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            }
          }
        ]
      }),
      styleRule({
        styleRegex: sassRegex,
        excludeRegex: sassScopeRegex,
        loaderList: ['css-loader', 'sass-loader']
      }),
      styleRule({
        styleRegex: sassScopeRegex,
        loaderList: [
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            }
          },
          'sass-loader'
        ]
      })
    ]
  }
};

module.exports = [server, client];
