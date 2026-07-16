import mongoose, { Schema } from "mongoose";
import type { Course } from "../types/course.types";

const courseSchema = new Schema<Course>(
    {
        courseCode: {
            type:String,
            required:true,
            unique:true,
            uppercase:true,
            trim:true,
        },

        title:{
            type:String,
            required:true,
            trim:true,
            minlength:3,
            maxlength:150,
        },

        credits:{
            type:Number,
            required:true,
            min:1,
            max:10,
        },

        lecturerId:{
            type:Schema.Types.ObjectId,
            ref:"Lecturer",
            required:true,
        },

        capacity:{
            type:Number,
            required:true,
            min:1,
        },

        enrolledCount:{
            type:Number,
            default:0,
            min:0,
        },

        enrollmentOpen:{
            type:Boolean,
            default:true,
        }
    },
    {
        timestamps:true,
    }
);

export const CourseModel = mongoose.model<Course>(
    "Course",
    courseSchema,
);