const path = require('path');
console.log('Starting webpack configuration...');
module.exports = {
  mode: 'development', // or 'production'
  entry: './src/index.js', // Entry file of your application
  output: {
    filename: 'bundle.js', // Output bundle file
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  resolve: {
    fallback: {
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
      // Add other core modules as needed
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // Add these loaders for handling CSS files
      },
    ],
  },
  // ... other webpack configurations
};
console.log('Webpack configuration completed.');
