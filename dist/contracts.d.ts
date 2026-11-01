import { z } from 'zod';
export declare const uuidSchema: z.ZodString;
export declare const applicationStatusSchema: z.ZodEnum<{
    APPLIED: "APPLIED";
    APPROVED: "APPROVED";
    CANCELED: "CANCELED";
    REJECTED: "REJECTED";
}>;
export declare const jobStatusSchema: z.ZodEnum<{
    ACTIVE: "ACTIVE";
    CLOSED: "CLOSED";
    DELETED: "DELETED";
}>;
export declare const authUserSchema: z.ZodObject<{
    id: z.ZodString;
    isAdmin: z.ZodBoolean;
    isBlocked: z.ZodBoolean;
    isVerified: z.ZodBoolean;
    type: z.ZodEnum<{
        employer: "employer";
        student: "student";
    }>;
}, z.core.$strip>;
export declare const authSessionResponseSchema: z.ZodObject<{
    accessToken: z.ZodString;
    expiresAt: z.ZodString;
    refreshToken: z.ZodString;
    user: z.ZodObject<{
        id: z.ZodString;
        isAdmin: z.ZodBoolean;
        isBlocked: z.ZodBoolean;
        isVerified: z.ZodBoolean;
        type: z.ZodEnum<{
            employer: "employer";
            student: "student";
        }>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const refreshResponseSchema: z.ZodObject<{
    accessToken: z.ZodString;
    expiresAt: z.ZodString;
    refreshToken: z.ZodString;
}, z.core.$strip>;
export declare const loginRequestSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const refreshRequestSchema: z.ZodObject<{
    refreshToken: z.ZodString;
}, z.core.$strip>;
export declare const verifyRegistrationRequestSchema: z.ZodObject<{
    email: z.ZodString;
    verificationCode: z.ZodString;
}, z.core.$strip>;
export declare const jobApplicationCreateRequestSchema: z.ZodObject<{
    jobId: z.ZodString;
}, z.core.$strip>;
export declare const jobApplicationStatusRequestSchema: z.ZodObject<{
    id: z.ZodString;
    status: z.ZodEnum<{
        APPLIED: "APPLIED";
        APPROVED: "APPROVED";
        CANCELED: "CANCELED";
        REJECTED: "REJECTED";
    }>;
}, z.core.$strip>;
export declare const ratingRequestSchema: z.ZodObject<{
    description: z.ZodOptional<z.ZodString>;
    jobId: z.ZodString;
    rating: z.ZodNumber;
}, z.core.$strip>;
export declare const jobSearchRequestSchema: z.ZodObject<{
    categoryId: z.ZodOptional<z.ZodString>;
    employerName: z.ZodOptional<z.ZodString>;
    jobType: z.ZodOptional<z.ZodEnum<{
        FAST: "FAST";
        NORMAL: "NORMAL";
    }>>;
    maxHourlyRate: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    minHourlyRate: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    pageNumber: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    pageSize: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    sortBy: z.ZodDefault<z.ZodEnum<{
        createdAt: "createdAt";
        rating: "rating";
    }>>;
    sortOrder: z.ZodDefault<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
    title: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=contracts.d.ts.map