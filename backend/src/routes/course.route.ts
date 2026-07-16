import { Router } from "express";
import * as courseController from "../controllers/course.controller";
import * as enrollmentController from "../controllers/enrollment.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";
import { USER_ROLES } from "../constants/auth.constants";
import { validate } from "../middlewares/validation.middleware";
import { createCourseSchema, updateCourseSchema, courseIdSchema } from "../validators/course.validator";

const router = Router();

router.post("/", authenticate, authorize(USER_ROLES.ADMIN), validate(createCourseSchema), courseController.createCourse);
router.get("/", authenticate, authorize(USER_ROLES.ADMIN, USER_ROLES.LECTURER, USER_ROLES.STUDENT), courseController.getAllCourses);
router.get("/:id", authenticate, authorize(USER_ROLES.ADMIN, USER_ROLES.LECTURER, USER_ROLES.STUDENT), validate(courseIdSchema), courseController.getCourseById);
router.put("/:id", authenticate, authorize(USER_ROLES.ADMIN), validate(updateCourseSchema), courseController.updateCourse);
router.delete("/:id", authenticate, authorize(USER_ROLES.ADMIN), validate(courseIdSchema), courseController.deleteCourse);

router.get("/lecturer/:lecturerId", authenticate, authorize(USER_ROLES.ADMIN, USER_ROLES.LECTURER), courseController.getCoursesByLecturer);

router.post("/:courseId/enrollments", authenticate, authorize(USER_ROLES.STUDENT), validate(courseIdSchema), enrollmentController.enrollStudent);
router.delete("/:courseId/enrollments", authenticate, authorize(USER_ROLES.STUDENT), validate(courseIdSchema), enrollmentController.withdrawStudent);
router.get("/:courseId/students", authenticate, authorize(USER_ROLES.LECTURER), validate(courseIdSchema), enrollmentController.getCourseEnrollments);

export default router;