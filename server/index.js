require('babel-register');
import server from './server';
import http from 'http';

function run() {
  let app = server();

  http.createServer(app).listen(3000);
  console.log("server created");
}

run();
