import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import models from './models';

const PORT = 3000;
const app = express();
const graphqlEndpoint = '/graphql';

// using merge graphql to consolidate
// types and resolvers
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schemas')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

// create schema for graphql
const myGraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// setup graphql for use in express
app.use(
  graphqlEndpoint,
  bodyParser.json(),
  graphqlExpress({
    schema: myGraphQLSchema,
    context: {
      models,
      // for testing purposes
      user: {
        id: 1,
      },
    },
  }),
);

// setup graphiql for use in express
app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndpoint }));

models.sequelize.sync({}).then(() => {
  app.listen(PORT);
});
