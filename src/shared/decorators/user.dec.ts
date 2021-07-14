import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const CurrentUser = createParamDecorator(
  (_, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const final = ctx.getContext().req
    if (final.user){
      return ctx.getContext().req.user;
    }
    throw new Error(
      "CurrentUser decorator called without a valid user..." +
        "Check GqlAuthGuard is being used"
    )
  }
);
