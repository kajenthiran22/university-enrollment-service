import { Router } from "express";
import * as studentController from "../controllers/student.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";
import { USER_ROLES } from "../constants/auth.constants";
import { validate } from "../middlewares/validation.middleware";
import { createStudentSchema, updateStudentSchema, studentIdSchema } from "../validators/student.validator";
import * as enrollmentController from "../controllers/enrollment.controller";
import { enrollmentIdSchema } from "../validators/enrollment.validator";

const router = Router();

router.post("/", authenticate, authorize(USER_ROLES.ADMIN), validate(createStudentSchema), studentController.createStudent);
router.get("/", authenticate, authorize(USER_ROLES.ADMIN, USER_ROLES.LECTURER), studentController.getAllStudents);
router.get("/:id", authenticate, authorize(USER_ROLES.ADMIN, USER_ROLES.LECTURER, USER_ROLES.STUDENT), validate(studentIdSchema), studentController.getStudentById);
router.put("/:id", authenticate, authorize(USER_ROLES.ADMIN), validate(updateStudentSchema), studentController.updateStudent);
router.delete("/:id", authenticate, authorize(USER_ROLES.ADMIN), validate(studentIdSchema), studentController.deleteStudent);

router.get("/:id/enrollments", authenticate, authorize(USER_ROLES.ADMIN, USER_ROLES.LECTURER, USER_ROLES.STUDENT), validate(studentIdSchema), enrollmentController.getEnrollmentsByStudent);

export default router;