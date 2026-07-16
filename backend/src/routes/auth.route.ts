import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { validate } from "../middlewares/validation.middleware";
import { studentRegisterSchema, lecturerRegisterSchema, loginSchema } from "../validators/auth.validator";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register/student", validate(studentRegisterSchema), authController.studentRegister);
router.post("/register/lecturer", validate(lecturerRegisterSchema), authController.lecturerRegister);
router.post("/login", validate(loginSchema), authController.login);
router.post("/logout", authenticate, authController.logout);

export default router;