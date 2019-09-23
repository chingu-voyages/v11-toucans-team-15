const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  resolve: { extensions: ['.js', '.ts'] },
  devServer: {
    contentBase: path.join(__dirname, '../dist/'),
    port: 9000
  },
  entry: {
    app: './src/assets/javascripts/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' }, // This will resolve url() & @imports inside CSS
          { loader: 'postcss-loader' }, // This we apply postCSS fixes like autoprefixer & minifying
          { loader: 'sass-loader',
            options: { implementation: require('sass') }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [{
          loader: 'file-loader',
          options: { outputPath: 'images' }
        }]
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: [{
          loader: 'file-loader',
          options: { outputPath: 'fonts' }
        }]
      }
    ]
  },
  plugins: [
    require('autoprefixer'),
    require('cssnano'),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Colma | Digital Agency HTML5 Template',
      path: path.join(__dirname, '../dist'),
      filename: 'index.html'
    }),

    new MiniCssExtractPlugin({
      filename: 'bundle.css'
    }),

    new CopyWebpackPlugin([
      { from: 'src/assets/images', to: 'images' }
    ])
  ]

};