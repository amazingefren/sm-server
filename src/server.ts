require("dotenv").config();
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import fastifyCookie = require("fastify-cookie");

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  app.register(fastifyCookie as any, { secret: process.env.JWT_SECRET });
  await app.listen(3000);
}

try {
  bootstrap();
} catch (err) {
  throw new Error(err);
}
