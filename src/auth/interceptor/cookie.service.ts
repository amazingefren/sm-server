import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { FastifyReply } from "fastify";
import { Observable, tap } from "rxjs";

@Injectable()
export class CookieInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = GqlExecutionContext.create(context);
    console.log("PREV");
    const response: FastifyReply = ctx.getContext().response;
    return next.handle().pipe(
      tap((_) => {
        console.log("Setting Cookie?");
        // THIS IS 100% IN THE HEADER FOR THE RESPONSE
        response.setCookie(
          "Authorization",
          "Bearer THISWILLBETHE-ACCESS_TOKEN-AREAANDIWILLUSETHISSAMEINTERCEPTORTORETURNADIFFERENTSETOFRESULTSUCHASTHEUSERORSOMETHINGNOTSUREYET",
          { sameSite: "none", secure: true }
        );

        // YOU CAN TEST BY NULLIFYING THE DATA RETURNED
        // response.send({})

        // BUT I CANT SEEM TO FIND WHERE THE COOKIE IS AM I DUMB????
        // NOT CAUGHT IN NETWORK, OR STORAGE, NO LOGS? CORS MAYBE? ILL TEST LATER
        // NEVERMIND I FOUND IT, POST (PRE OPTIONS METHOD) NOT POST OPTIONS METHOD
        // OK SO THE COOKIE IS SENT
        // SO NOW TO STORE IT DO I NEED TO CHANGE SOMETHING ON THE SERVER
        // OR IS APOLLO STUDIO PREVENT THE COOKING FROM BEING STORED IN THE COOKIE JAR
        // :(
        // THIS WAS ALOT MORE COMPLEX THAN I THOUGH (with nestjs+graphql+fastify)
        // BUT ATLEAST ITS POSSIBLE
        console.log(response);
      })
    );
  }
}
