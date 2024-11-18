import { loadFilesSync } from "@graphql-tools/load-files";
import { Express } from "express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { graphqlHTTP } from "express-graphql";
import path from "path";
import { handlerEvent } from "../base";
export class GraphqlSetup {
  private app: Express;

  constructor(app: Express) {
    this.app = app;
  }

  setupGraphql() {
    console.log(`💖 Setting up GraphQL endpoints`);

    const typeDefs = loadFilesSync(path.resolve(__dirname, "./schema.graphql"));
    const resolvers = this.setupResolvers();

    const schema = makeExecutableSchema({
      typeDefs,
      resolvers,
    });

    this.app.use(
      "/graphql",
      graphqlHTTP({
        schema,
        graphiql: true,
      })
    );

    console.log(`🚀 GraphQL endpoint is ready at /graphql`);
  }

  setupResolvers(): any {
    const resolversName = ["getCoffeeById"];

    const queries = resolversName.reduce((acc: any, name: any) => {
      acc[name] = handlerEvent;
      return acc;
    }, {});

    const resolvers = {
      Query: queries,
    };
    return resolvers;
  }
}