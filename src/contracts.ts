import { z } from 'zod'

import { ApplicationStatus } from './enums'
import { email, password, rating, verificationCode } from './validation'

export const uuidSchema = z.string().uuid()

export const applicationStatusSchema = z.enum([
    ApplicationStatus.APPLIED,
    ApplicationStatus.REJECTED,
    ApplicationStatus.APPROVED,
    ApplicationStatus.CANCELED,
])

export const authUserSchema = z.object({
    id: z.string(),
    isAdmin: z.boolean(),
    isBlocked: z.boolean(),
    isVerified: z.boolean(),
    type: z.enum(['student', 'employer']),
})

export const authSessionResponseSchema = z.object({
    accessToken: z.string().min(1),
    expiresAt: z.string(),
    refreshToken: z.string().min(1),
    user: authUserSchema,
})

export const refreshResponseSchema = z.object({
    accessToken: z.string().min(1),
    expiresAt: z.string(),
    refreshToken: z.string().min(1),
})

export const loginRequestSchema = z.object({
    email,
    password,
})

export const refreshRequestSchema = z.object({
    refreshToken: z.string().min(1),
})

export const verifyRegistrationRequestSchema = z.object({
    email,
    verificationCode,
})

export const jobApplicationCreateRequestSchema = z.object({
    jobId: uuidSchema,
})

export const jobApplicationStatusRequestSchema = z.object({
    id: uuidSchema,
    status: applicationStatusSchema,
})

export const ratingRequestSchema = z.object({
    description: z.string().max(500).optional(),
    jobId: uuidSchema,
    rating,
})

export const jobSearchRequestSchema = z.object({
    categoryId: uuidSchema.optional(),
    employerName: z.string().max(200).optional(),
    jobType: z.enum(['NORMAL', 'FAST']).optional(),
    maxHourlyRate: z.coerce.number().min(0).optional(),
    minHourlyRate: z.coerce.number().min(0).optional(),
    pageNumber: z.coerce.number().int().min(1).default(1),
    pageSize: z.coerce.number().int().min(1).max(100).default(20),
    sortBy: z.enum(['createdAt', 'rating']).default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
    title: z.string().max(200).optional(),
})
