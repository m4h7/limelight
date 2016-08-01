import {
  graphql,
  GraphQLID,
  GraphQLList,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import {
  recordLoader,
  recordsLoader,
} from './dbloader';

const RecordType = new GraphQLObjectType({
  name: 'Record',
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
  },
});

const ViewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: {
    record: {
      type: RecordType,
      resolve(parent, {id}, context) {
         return recordLoader.load(id);
      }
    },
    records: {
      type: new GraphQLList(RecordType),
      resolve(parent, args, context) {
         return recordsLoader.load("");
      }
    },
  }
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    viewer: {
      type: ViewerType,
      resolve(root, args, context) {
        return {};
      }
    }
  },
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
  }),
});

const schema = new GraphQLSchema({
  query: queryType,
//  mutation: mutationType,
});

export default schema;
