import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import express from 'express';
import getBabelRelayPlugin from 'babel-relay-plugin';

const APP_PORT = 8000;
const GRAPHQL_PORT = 3000;

function startAppServer(callback) {
  // Serve the Relay app
  const compiler = webpack({
    entry: path.resolve(__dirname, 'js', 'start.js'),
    module: {
      loaders: [
        {
          exclude: /node_modules/,
          loader: 'babel',
          test: /\.js$/,
        }
      ]
    },
    output: {filename: '/app.js', path: '/', publicPath: '/js/'}
  });
  let appServer = new WebpackDevServer(compiler, {
    contentBase: '/public/',
    proxy: {'/graphql': `http://localhost:${GRAPHQL_PORT}/gql`},
    publicPath: '/js/',
    stats: {colors: true}
  });
  // Serve static resources
  appServer.use('/', express.static(path.resolve(__dirname, 'public')));
  appServer.listen(APP_PORT, () => {
    console.log(`App is now running on http://localhost:${APP_PORT}`);
    if (callback) {
      callback();
    }
  });
  return appServer;
}

let appServer = startAppServer(() => {
  console.log("app server started");
});

