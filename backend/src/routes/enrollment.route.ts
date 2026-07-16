import { Router } from "express";
import * as enrollmentController from "../controllers/enrollment.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";
import { USER_ROLES } from "../constants/auth.constants";
import { validate } from "../middlewares/validation.middleware";
import { enrollmentIdSchema } from "../validators/enrollment.validator";

const router = Router();

router.get("/", authenticate, authorize(USER_ROLES.ADMIN, USER_ROLES.LECTURER), validate(enrollmentIdSchema), enrollmentController.getAllEnrollments);
router.get("/:id", authenticate, authorize(USER_ROLES.ADMIN, USER_ROLES.LECTURER, USER_ROLES.STUDENT), validate(enrollmentIdSchema), enrollmentController.getEnrollmentById);
router.delete("/:id", authenticate, authorize(USER_ROLES.ADMIN), enrollmentController.deleteEnrollment);

export default router;