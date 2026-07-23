import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { env } from "../config/env";
import { UserModel } from "../models/user.model";
import { HASHING } from "../constants/auth.constants";

async function seedAdmin(): Promise<void> {
    try {
        await mongoose.connect(env.MONGODB_URI);

        const adminEmail = "admin@example.com";
        const adminPassword = "Password123";

        const existingAdmin = await UserModel.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log("Admin user already exists.");
            return;
        }

        const hashedPassword = await bcrypt.hash(adminPassword, parseInt(HASHING.SALT_ROUNDS));

        await UserModel.create({
            email: adminEmail,
            password: hashedPassword,
            role: "admin",
            status: "APPROVED",
        });

        console.log("Admin user seeded successfully.");
    } catch (error) {
        console.error("Failed to seed admin user:", error);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
}

void seedAdmin();