import { Router } from "express";

import authRoutes from "./auth.route";
import studentRoutes from "./student.route";

const router = Router();

router.use('/auth', authRoutes);
router.use('/student', studentRoutes);

export default router;