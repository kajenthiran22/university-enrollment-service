import * as enrollmentRepository from "../repositories/enrollment.repository";
import * as studentRepository from "../repositories/student.repository";
import * as courseRepository from "../repositories/course.repository";
import { AppError } from "../common/errors/app.error";
import { ERROR_CODES } from "../constants/error.codes.constants";
import { HTTP_STATUS } from "../constants/http.constants";
import mongoose from "mongoose";

export const enrollStudent = async (userId: string, courseId: string) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const student = await studentRepository.findStudentByUserId(userId, session);

        if (!student) {
            throw new AppError(
                ERROR_CODES.STUDENT_NOT_FOUND,
                "Student not found.",
                HTTP_STATUS.NOT_FOUND,
            );
        }

        const course = await courseRepository.findCourseById(courseId, session);

        if (!course) {
            throw new AppError(
                ERROR_CODES.COURSE_NOT_FOUND,
                "Course not found.",
                HTTP_STATUS.NOT_FOUND,
            );
        }

        if (!course.enrollmentOpen) {
            throw new AppError(
                ERROR_CODES.COURSE_CLOSED,
                "Course enrollment is closed.",
                HTTP_STATUS.CONFLICT,
            );
        }

        if (course.enrolledCount >= course.capacity) {
            throw new AppError(
                ERROR_CODES.COURSE_FULL,
                "Course capacity has been reached.",
                HTTP_STATUS.CONFLICT,
            );
        }

        const existingEnrollment = await enrollmentRepository.findEnrollment(
            student.id,
            course.id,
            session,
        );

        if (existingEnrollment) {
            if (existingEnrollment.status === "active") {
                throw new AppError(
                    ERROR_CODES.ALREADY_ENROLLED,
                    "Student is already enrolled in this course.",
                    HTTP_STATUS.CONFLICT,
                );
            }

            const enrollment = await enrollmentRepository.updateEnrollment(
                existingEnrollment.id,
                {
                    status: "active",
                    enrolledAt: new Date(),
                },
                session,
            );

            await courseRepository.updateCourse(
                course.id,
                {
                    $inc: { enrolledCount: 1 },
                },
                session,
            );

            await session.commitTransaction();

            return enrollment;
        }

        const enrollment = await enrollmentRepository.createEnrollment(
            {
                studentId: student.id,
                courseId: course.id,
                status: "active",
                enrolledAt: new Date(),
            },
            session,
        );

        await courseRepository.updateCourse(
            course.id,
            {
                $inc: { enrolledCount: 1 },
            },
            session,
        );

        await session.commitTransaction();

        return enrollment;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        await session.endSession();
    }
};

export const withdrawStudent = async (userId: string, courseId: string) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const student = await studentRepository.findStudentByUserId(userId, session);

        if (!student) {
            throw new AppError(
                ERROR_CODES.STUDENT_NOT_FOUND,
                "Student not found.",
                HTTP_STATUS.NOT_FOUND,
            );
        }

        const course = await courseRepository.findCourseById(courseId, session);

        if (!course) {
            throw new AppError(
                ERROR_CODES.COURSE_NOT_FOUND,
                "Course not found.",
                HTTP_STATUS.NOT_FOUND,
            );
        }

        const enrollment = await enrollmentRepository.findEnrollment(
            student.id,
            course.id,
            session,
        );

        if (!enrollment) {
            throw new AppError(
                ERROR_CODES.ENROLLMENT_NOT_FOUND,
                "Enrollment not found.",
                HTTP_STATUS.NOT_FOUND,
            );
        }

        if (enrollment.status === "withdrawn") {
            throw new AppError(
                ERROR_CODES.ALREADY_WITHDRAWN,
                "Student already withdrew from this course.",
                HTTP_STATUS.CONFLICT,
            );
        }

        const updatedEnrollment =
            await enrollmentRepository.withdrawEnrollment(
                student.id,
                course.id,
                session,
            );

        await courseRepository.updateCourse(
            course.id,
            {
                $inc: { enrolledCount: -1 },
            },
            session,
        );

        await session.commitTransaction();

        return updatedEnrollment;
    }
    catch (error) {
        await session.abortTransaction();
        throw error;
    }
    finally {
        await session.endSession();
    }
};

export const getEnrollmentById = async (id: string) => {
    return enrollmentRepository.findEnrollmentById(id);
};

export const getAllEnrollments = async () => {
    return enrollmentRepository.getAllEnrollments();
};

export const getEnrollmentsByStudent = async (userId: string) => {
    const student = await studentRepository.findStudentByUserId(userId);

    if (!student) {
        throw new AppError(
            ERROR_CODES.STUDENT_NOT_FOUND,
            "Student not found.",
            HTTP_STATUS.NOT_FOUND,
        );
    }

    return enrollmentRepository.getEnrollmentsByStudent(
        student.id,
    );
};

export const getEnrollmentsByCourse = async (courseId: string) => {
    return enrollmentRepository.getEnrollmentsByCourse(
        courseId,
    );
};

export const deleteEnrollment = async (id: string) => {
    return enrollmentRepository.deleteEnrollment(id);
};