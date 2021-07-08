import { ObjectId } from 'mongodb';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType({ description: 'Modelo de cliente' })
export class Client {
    @Field(() => ID)
    _id?: ObjectId;

    @Field({ description: 'Client rut' })
    @Property({ required: true })
    rut: string;

    @Field({ description: 'Client first_name' })
    @Property({ type: () => String })
    first_name: string;

    @Field({ description: 'Client last_name' })
    @Property({ type: () => String })
    last_name: string;

    @Field({ description: 'Client Password' })
    @Property({ type: () => String, required: true })
    password: string;

    @Field({ description: 'Client Email' })
    @Property({ type: () => String, required: true })
    email: string;

    @Field({ description: 'Client Phone' })
    @Property({ type: () => String, required: false })
    phone: string;

    @Field({ description: 'Client Password' })
    @Property({ type: () => String, required: false })
    photo_profile: string;

    @Field(() => [String], { description: 'Client Addresses' })
    @Property({ type: () => String, default: [] })
    addresses?: string[];

    @Field({ description: 'Active Client?' })
    @Property({ type: () => Boolean, default: true })
    active?: boolean;
}

export const ClientModel = getModelForClass(Client, { schemaOptions: { timestamps: true, versionKey: false } });