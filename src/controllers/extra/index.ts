import express from "express";
import { createExtraRoute } from "./create-extra";
import { getExtraByIdRoute } from "./get-extra-by-id";
import { getExtraListRoute } from "./get-extra-list";
import { updateExtraStatusRoute } from "./update-status";

export const extrasRouter = express();

extrasRouter.post("/", createExtraRoute);

extrasRouter.get("/", getExtraListRoute);

extrasRouter.get("/:id", getExtraByIdRoute);

extrasRouter.put("/:id/status", updateExtraStatusRoute);
