import { buildSchemaSync, Mutation, Query, Resolver } from 'type-graphql';
import { authChecker } from './auth';
import { HouseResolver } from './house';
import { ImageResolver } from './image';

@Resolver()
class Dummy {
  @Query(() => String)
  hello(): String {
    return 'Hello';
  }
}

export const schema = buildSchemaSync({
  resolvers: [ImageResolver, HouseResolver, Dummy],
  emitSchemaFile: process.env.NODE_ENV === 'development',
  authChecker,
});
