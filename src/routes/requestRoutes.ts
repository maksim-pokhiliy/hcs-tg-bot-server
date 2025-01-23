import { RequestHandler, Router } from "express";

import { handlePlaceRequest } from "../controllers/requestController.js";

const router = Router();

router.post("/place-request", handlePlaceRequest as RequestHandler);

export default router;
