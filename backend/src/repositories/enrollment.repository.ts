import type { ClientSession } from "mongoose";
import { EnrollmentModel } from "../models/enrollment.model";
import type { EnrollmentDocument, CreateEnrollmentRequest, UpdateEnrollmentRequest } from "../types/enrollment.types";

export const createEnrollment = async (data: CreateEnrollmentRequest, session?: ClientSession): Promise<EnrollmentDocument> => {
    const result = await EnrollmentModel.create([data], { session: session || null });
    return result[0] as EnrollmentDocument;
};

export const findEnrollment = async (studentId: string, courseId: string, session?: ClientSession): Promise<EnrollmentDocument | null> => {
    const query = EnrollmentModel.findOne({ studentId, courseId });

    if (session) {
        query.session(session);
    }

    return query;
};

export const findEnrollmentById = async (id: string): Promise<EnrollmentDocument | null> => {
    return EnrollmentModel.findById(id)
        .populate("studentId")
        .populate("courseId");
};

export const getAllEnrollments = async (): Promise<EnrollmentDocument[]> => {
    return EnrollmentModel.find()
        .populate("studentId")
        .populate("courseId");
};

export const getEnrollmentsByStudent = async (studentId: string) => {
    return EnrollmentModel.find({ studentId })
        .populate("courseId");
};

export const getEnrollmentsByCourse = async (courseId: string) => {
    return EnrollmentModel.find({
        courseId,
        status: "active",
    }).populate("studentId");
};

export const countActiveEnrollments = async (courseId: string) => {
    return EnrollmentModel.countDocuments({
        courseId,
        status: "active",
    });
};

export const withdrawEnrollment = async (studentId: string, courseId: string, session?: ClientSession) => {
    return EnrollmentModel.findOneAndUpdate(
        {
            studentId,
            courseId,
        },
        {
            status: "withdrawn",
            withdrawnAt: new Date(),
        },
        {
            new: true,
            session: session || null,
        },
    );
};

export const updateEnrollment = async (id: string, data: UpdateEnrollmentRequest, session?: ClientSession): Promise<EnrollmentDocument | null> => {
    return EnrollmentModel.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true,
            session: session || null,
        },
    );
};

export const deleteEnrollment = async (id: string): Promise<EnrollmentDocument | null> => {
    return EnrollmentModel.findByIdAndDelete(id);
};