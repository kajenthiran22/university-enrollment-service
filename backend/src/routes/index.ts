import { Router } from "express";

import authRoutes from "./auth.route";
import adminRoutes from "./admin.route";
import studentRoutes from "./student.route";
import lecturerRoutes from "./lecturer.route";
import courseRoutes from "./course.route";
import enrollmentRoutes from "./enrollment.route";

const router = Router();

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/student', studentRoutes);
router.use('/lecturer', lecturerRoutes);
router.use('/course', courseRoutes);
router.use('/enrollment', enrollmentRoutes);

export default router;