import { Router } from "express";

import authRoutes from "./auth.route";
import studentRoutes from "./student.route";
import lecturerRoutes from "./lecturer.route";

const router = Router();

router.use('/auth', authRoutes);
router.use('/student', studentRoutes);
router.use('/lecturer', lecturerRoutes);

export default router;