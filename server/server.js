import express from 'express';
import graphqlHTTP from 'express-graphql';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import schema from './schema';
import {dbConnect} from './dbloader';

function server() {
  const dbPool = dbConnect();

  const app = express();
  app.use(cookieParser());
  app.use(bodyParser());

  app.use('/gql', graphqlHTTP(req => ({
    schema: schema,
    graphiql: true,
    context: { cookies: req.cookies, db: dbPool },
    rootValue: {},
  })));

  return app;
}

export default server;
