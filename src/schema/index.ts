import { buildSchemaSync, Mutation, Query, Resolver } from 'type-graphql';
// import { HouseResolver } from "./house";
import { authChecker } from './auth';
import { ImageResolver } from './image';

@Resolver()
class Dummy {
  @Query(() => String)
  hello(): String {
    return 'Hello';
  }
}

export const schema = buildSchemaSync({
  resolvers: [ImageResolver, Dummy],
  emitSchemaFile: process.env.NODE_ENV === 'development',
  authChecker,
});
