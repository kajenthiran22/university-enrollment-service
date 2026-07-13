import { Router } from "express";
import * as lecturerController from "../controllers/lecturer.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";
import { USER_ROLES } from "../constants/auth.constants";

const router = Router();

router.post("/", authenticate, authorize(USER_ROLES.ADMIN), lecturerController.createLecturer);
router.get("/", authenticate, authorize(USER_ROLES.ADMIN, USER_ROLES.LECTURER), lecturerController.getAllLecturers);
router.get("/:id", authenticate, authorize(USER_ROLES.ADMIN, USER_ROLES.LECTURER), lecturerController.getLecturerById);
router.put("/:id", authenticate, authorize(USER_ROLES.ADMIN), lecturerController.updateLecturer);
router.delete("/:id", authenticate, authorize(USER_ROLES.ADMIN), lecturerController.deleteLecturer);

export default router;