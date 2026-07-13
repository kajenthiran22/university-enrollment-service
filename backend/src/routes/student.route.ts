import { Router } from "express";
import * as studentController from "../controllers/student.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";
import { USER_ROLES } from "../constants/auth.constants";

const router = Router();

router.post("/", authenticate, authorize(USER_ROLES.ADMIN, USER_ROLES.LECTURER, ), studentController.createStudent);
router.get("/", authenticate, authorize(USER_ROLES.ADMIN, USER_ROLES.LECTURER, USER_ROLES.STUDENT), studentController.getAllStudents);
router.get("/:id", authenticate, authorize(USER_ROLES.ADMIN, USER_ROLES.LECTURER, USER_ROLES.STUDENT), studentController.getStudentById);
router.put("/:id", authenticate, authorize(USER_ROLES.ADMIN), studentController.updateStudent);
router.delete("/:id", authenticate, authorize(USER_ROLES.ADMIN), studentController.deleteStudent);

export default router;