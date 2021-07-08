import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
var colors = require('colors');
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import expressPlayGround from 'graphql-playground-middleware-express';
import dbConnection from './database/mongoose';
import { buildSchema } from 'type-graphql';
import { AdminResolver } from './resolvers/admin.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { AuthUserResolver } from './resolvers/auth.user.resolver';
import { AuthAdminResolver } from './resolvers/auth.admin.resolver';
import { ResourceResolver } from './resolvers/resource.resolver';
import { RoleResolver } from './resolvers/role.resolver';
import path from 'path';

const listen = async () => {
    const schema = await buildSchema({
        resolvers: [
            AdminResolver,
            UserResolver,
            AuthUserResolver,
            AuthAdminResolver,
            RoleResolver,
            ResourceResolver
        ],
        emitSchemaFile: path.resolve(__dirname, '../src/schema', 'schema.gql'),
        validate: false,
    });
    dbConnection();
    const apolloServer = new ApolloServer({
        schema,
        context: ({ req }) => {
            return { token: req.headers.authorization };
        },
    });

    const app = express();
    apolloServer.applyMiddleware({ app });
    app.use(compression());
    app.use(cors());
    app.get('/', expressPlayGround({ endpoint: '/auth' }));
    let PORT = process.env.PORT || '3000';
    const httpServer = createServer(app);
    httpServer.listen({ port: PORT },
        () => console.log(colors.inverse(`🚀🚀 SERVIDOR CORRIENDO 🚀🚀 http://localhost:${PORT}${apolloServer.graphqlPath}/auth`))
    )
};
listen().catch((error) => {
    console.log('error', error);
});