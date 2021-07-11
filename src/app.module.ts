import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { PostModule } from "./posts/post.module";
import { UserModule } from "./users/user.module";
import { AuthModule } from './auth/auth.module';
// import { AppController } from "./app.controller";

@Module({
  imports: [
    AuthModule,
    UserModule,
    PostModule,
    GraphQLModule.forRoot({
      autoSchemaFile: require('path').join(process.cwd(), 'src/schema.gql'),
      debug: true,
      // context: ({req, res}) => ({req, res}),
      playground: true,
    }),
  ],

  // controllers: [AppController],
})
export class AppModule {}
