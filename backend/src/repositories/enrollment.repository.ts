import { EnrollmentModel } from "../models/enrollment.model";
import type { EnrollmentDocument, CreateEnrollmentRequest, UpdateEnrollmentRequest } from "../types/enrollment.types";

export const createEnrollment = async (data: CreateEnrollmentRequest): Promise<EnrollmentDocument> => {
    return EnrollmentModel.create(data);
};

export const findEnrollment = async (studentId: string, courseId: string): Promise<EnrollmentDocument | null> => {
    return EnrollmentModel.findOne({ studentId, courseId });
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

export const withdrawEnrollment = async (studentId: string, courseId: string) => {
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
        },
    );
};

export const updateEnrollment = async (id: string, data: UpdateEnrollmentRequest): Promise<EnrollmentDocument | null> => {
    return EnrollmentModel.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true,
        },
    );
};

export const deleteEnrollment = async (id: string): Promise<EnrollmentDocument | null> => {
    return EnrollmentModel.findByIdAndDelete(id);
};