import {
  graphql,
  GraphQLID,
  GraphQLList,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import {
  nodeDefinitions,
  toGlobalId,
  fromGlobalId,
  globalIdField,
  connectionDefinitions,
  connectionArgs,
  connectionFromArray,
  connectionFromPromisedArray,
} from 'graphql-relay';

import { recordLoader, recordsLoader, Record } from './recordLoader';

const {
  nodeInterface,
  nodeField
} = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    if (type === 'Record') {
      return recordLoader.load(Number(id));
    }
    return null;
  },
  (obj) => {
    if (obj instanceof Record) {
        return RecordType;
    }
    return null;
  }
);

const RecordType = new GraphQLObjectType({
  name: 'Record',
  fields: {
    id: globalIdField(),
    title: { type: GraphQLString },
  },
  interfaces: [nodeInterface],
});

const { connectionType: RecordConnection } = connectionDefinitions({ nodeType: RecordType });

const ViewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: {
    record: {
      type: RecordType,
      resolve(parent, { id }, context) {
        return recordLoader.load(id);
      },
    },
    records: {
      type: RecordConnection,
      args: connectionArgs,
      resolve(parent, args, context) {
        return connectionFromPromisedArray(recordsLoader.load(''), args);
      },
    },
  },
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    viewer: {
      type: ViewerType,
      resolve(root, args, context) {
        return {};
      },
    },
    node: nodeField,
  },
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({}),
});

const schema = new GraphQLSchema({
  query: queryType,
  //  mutation: mutationType,
});

export default schema;
