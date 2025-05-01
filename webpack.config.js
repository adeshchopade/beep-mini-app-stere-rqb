const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env, argv) => {
  // Determine which .env file to use based on mode
  const mode = argv.mode || 'development';
  const dotenvFile = mode === 'production' ? '.env.production' : '.env.development';
  
  console.log(`Building for ${mode} mode using ${dotenvFile}`);
  
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  targets: {
                    browsers: [
                      // Support for older browsers in WebView
                      'last 2 Chrome versions',
                      'last 2 Safari versions',
                      'last 2 iOS versions',
                      'last 2 Android versions',
                      'ie 11'
                    ]
                  },
                  useBuiltIns: 'usage',
                  corejs: 3
                }],
                '@babel/preset-react'
              ]
            }
          },
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader'
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
        inject: true,
      }),
      // Add dotenv-webpack plugin
      new Dotenv({
        path: path.resolve(__dirname, dotenvFile),
        // Allow .env file to override if it exists
        systemvars: true, // Load all system variables as well
        defaults: path.resolve(__dirname, '.env.development')
      }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: false,
      port: 3000,
      hot: true,
    },
    // For production builds to be compatible with older browsers
    target: ['web', 'es5'],
    // Add source maps for debugging
    devtool: mode === 'production' ? 'nosources-source-map' : 'source-map',
  };
}; 