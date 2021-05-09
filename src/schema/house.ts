import {
  ObjectType,
  InputType,
  Field,
  ID,
  Float,
  Int,
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  Authorized,
} from 'type-graphql';
import { Min, Max } from 'class-validator';
import { getBoundsOfDistance } from 'geolib';
import { Context, AuthorizedContext } from './context';

@InputType()
class CoordinatesInput {
  @Min(-90)
  @Max(90)
  @Field(() => Float)
  latitude!: number;

  @Min(-180)
  @Max(180)
  @Field(() => Float)
  longitude!: number;
}

@InputType()
class HouseInput {
  @Field(() => String)
  address!: string;

  @Field(() => String)
  image!: string;

  @Field(() => CoordinatesInput)
  coordinates!: CoordinatesInput;

  @Field(() => Int)
  bedrooms!: number;
}

@ObjectType()
class House {
  @Field(() => ID)
  id!: number;

  @Field(() => String)
  userId!: string;

  @Field(() => Float)
  latitude!: number;

  @Field(() => Float)
  longitude!: number;

  @Field(() => String)
  address!: string;

  @Field(() => String)
  image!: string;

  @Field(() => String)
  publicId?(): string {
    const parts = this.image.split('/');
    //retornar ultimo valor
    return parts[parts.length - 1];
  }

  @Field(() => Float)
  bedrooms!: number;
}

@Resolver(House)
export class HouseResolver {
  @Authorized()
  @Mutation(() => House, { nullable: true })
  async createHouse(
    @Arg('input') input: HouseInput,
    @Ctx() ctx: AuthorizedContext
  ): Promise<House | null> {
    return await ctx.prisma.house.create({
      data: {
        userId: ctx.uid,
        image: input.image,
        address: input.address,
        latitude: input.coordinates.latitude,
        longitude: input.coordinates.longitude,
        bedrooms: input.bedrooms,
      },
    });
  }
}
