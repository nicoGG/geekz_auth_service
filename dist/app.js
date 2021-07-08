"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var colors = require('colors');
//SERVER
const apollo_server_express_1 = require("apollo-server-express");
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const graphql_playground_middleware_express_1 = __importDefault(require("graphql-playground-middleware-express"));
//DB CONECTION
const mongoose_1 = __importDefault(require("./database/mongoose"));
//SCHEMA
const type_graphql_1 = require("type-graphql");
//RESOLVERS
const category_1 = require("./resolvers/category");
const product_1 = require("./resolvers/product");
const listen = () => __awaiter(void 0, void 0, void 0, function* () {
    const schema = yield type_graphql_1.buildSchema({
        resolvers: [product_1.ProductResolver, category_1.CategoriesResolver],
        emitSchemaFile: true,
        validate: false,
    });
    //Connect Mongo DB
    mongoose_1.default();
    const apolloServer = new apollo_server_express_1.ApolloServer({ schema });
    const app = express_1.default();
    apolloServer.applyMiddleware({ app });
    app.use(compression_1.default());
    app.use(cors_1.default());
    app.get('/', graphql_playground_middleware_express_1.default({ endpoint: '/graphql' }));
    let PORT = process.env.PORT || '3000';
    const httpServer = http_1.createServer(app);
    httpServer.listen({ port: PORT }, () => console.log(colors.red(`SERVIDOR CORRIENDO 🚀 http://localhost:${PORT}${apolloServer.graphqlPath}`)));
});
listen().catch((error) => {
    console.log(error, 'error');
});
//# sourceMappingURL=app.js.map