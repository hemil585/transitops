import express, { type Router } from "express";
import * as controller from "./controller.js";
import { authenticate } from "../../middleware/auth.js";
import { authorize } from "../../middleware/rbac.js";

export const vehicleRouter: Router = express.Router();

vehicleRouter.get("/", controller.getAll);

vehicleRouter.get("/:id", controller.getOne);

vehicleRouter.post(
    "/",
    authenticate,
    authorize("fleet_manager"),
    controller.create,
);

vehicleRouter.patch(
    "/:id",
    authenticate,
    authorize("fleet_manager"),
    controller.update,
);

vehicleRouter.delete(
    "/:id",
    authenticate,
    authorize("fleet_manager"),
    controller.remove,
);