import express, { NextFunction, Request, Response } from "express";

const userRouter: express.Router = express.Router();

function validateUser(_req: Request, res: Response, next: NextFunction) {
  res.locals.validated = true;
  console.log("res.locals.validated: true - Validated!");
  next();
}

// userRouter.use works the same that app.use does, but it's specific to THIS router
userRouter.use(validateUser);

userRouter.get("/", (_req, res) => {
  res.json({
    msg: "User Router works!!",
  });
});

export default userRouter;
