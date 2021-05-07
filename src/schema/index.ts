import { buildSchemaSync, Mutation, Query, Resolver } from 'type-graphql';
// import { ImageResolver } from "./image";
// import { HouseResolver } from "./house";
import { authChecker } from './auth';

@Resolver()
class Dummy {
  @Query(() => String)
  hello() {
    return 'hello';
  }
}

export const schema = buildSchemaSync({
  resolvers: [Dummy],
  emitSchemaFile: process.env.NODE_ENV === 'development',
  authChecker,
});
