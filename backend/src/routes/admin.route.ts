import { Router } from "express";

import * as adminController from "../controllers/admin.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";
import { USER_ROLES } from "../constants/auth.constants";
import { validate } from "../middlewares/validation.middleware";
import { userIdSchema } from "../validators/admin.validator";

const router = Router();

router.get("/pending", authenticate, authorize(USER_ROLES.ADMIN), adminController.getPendingUsers);
router.patch("/:id/approve", authenticate, authorize(USER_ROLES.ADMIN), validate(userIdSchema), adminController.approveUser);
router.patch("/:id/reject", authenticate, authorize(USER_ROLES.ADMIN), validate(userIdSchema), adminController.rejectUser);

export default router;