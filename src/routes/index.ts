import { Router } from "express";
import { UserController } from "../modules/User/controller.js";

const userRouter = Router();

userRouter.get("/findOne", UserController.findOne);
userRouter.post("/create", UserController.create);

export { userRouter };
