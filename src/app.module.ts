import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { PostModule } from "./posts/post.module";
import { UserModule } from "./users/user.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    AuthModule,
    UserModule,
    PostModule,
    GraphQLModule.forRoot({
      autoSchemaFile: require("path").join(process.cwd(), "src/gen/schema.gql"),
      debug: true,
      cors: { origin: "https://studio.apollographql.com", credentials: true },
      context: ({ request, reply }) => ({ request, response: reply }),
      playground: true,
    }),
  ],
})
export class AppModule {}
