"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobSearchRequestSchema = exports.ratingRequestSchema = exports.jobApplicationStatusRequestSchema = exports.jobApplicationCreateRequestSchema = exports.verifyRegistrationRequestSchema = exports.refreshRequestSchema = exports.loginRequestSchema = exports.refreshResponseSchema = exports.authSessionResponseSchema = exports.authUserSchema = exports.applicationStatusSchema = exports.uuidSchema = void 0;
const zod_1 = require("zod");
const enums_1 = require("./enums");
const validation_1 = require("./validation");
exports.uuidSchema = zod_1.z.string().uuid();
exports.applicationStatusSchema = zod_1.z.enum([
    enums_1.ApplicationStatus.APPLIED,
    enums_1.ApplicationStatus.REJECTED,
    enums_1.ApplicationStatus.APPROVED,
    enums_1.ApplicationStatus.CANCELED,
]);
exports.authUserSchema = zod_1.z.object({
    id: zod_1.z.string(),
    isAdmin: zod_1.z.boolean(),
    isBlocked: zod_1.z.boolean(),
    isVerified: zod_1.z.boolean(),
    type: zod_1.z.enum(['student', 'employer']),
});
exports.authSessionResponseSchema = zod_1.z.object({
    accessToken: zod_1.z.string().min(1),
    expiresAt: zod_1.z.string(),
    refreshToken: zod_1.z.string().min(1),
    user: exports.authUserSchema,
});
exports.refreshResponseSchema = zod_1.z.object({
    accessToken: zod_1.z.string().min(1),
    expiresAt: zod_1.z.string(),
    refreshToken: zod_1.z.string().min(1),
});
exports.loginRequestSchema = zod_1.z.object({
    email: validation_1.email,
    password: validation_1.password,
});
exports.refreshRequestSchema = zod_1.z.object({
    refreshToken: zod_1.z.string().min(1),
});
exports.verifyRegistrationRequestSchema = zod_1.z.object({
    email: validation_1.email,
    verificationCode: validation_1.verificationCode,
});
exports.jobApplicationCreateRequestSchema = zod_1.z.object({
    jobId: exports.uuidSchema,
});
exports.jobApplicationStatusRequestSchema = zod_1.z.object({
    id: exports.uuidSchema,
    status: exports.applicationStatusSchema,
});
exports.ratingRequestSchema = zod_1.z.object({
    description: zod_1.z.string().max(500).optional(),
    jobId: exports.uuidSchema,
    rating: validation_1.rating,
});
exports.jobSearchRequestSchema = zod_1.z.object({
    categoryId: exports.uuidSchema.optional(),
    employerName: zod_1.z.string().max(200).optional(),
    jobType: zod_1.z.enum(['NORMAL', 'FAST']).optional(),
    maxHourlyRate: zod_1.z.coerce.number().min(0).optional(),
    minHourlyRate: zod_1.z.coerce.number().min(0).optional(),
    pageNumber: zod_1.z.coerce.number().int().min(1).default(1),
    pageSize: zod_1.z.coerce.number().int().min(1).max(100).default(20),
    sortBy: zod_1.z.enum(['createdAt', 'rating']).default('createdAt'),
    sortOrder: zod_1.z.enum(['asc', 'desc']).default('desc'),
    title: zod_1.z.string().max(200).optional(),
});
//# sourceMappingURL=contracts.js.map