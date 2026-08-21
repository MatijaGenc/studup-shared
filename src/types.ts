import { z } from 'zod'

export type UserType = 'employer' | 'student'

export const userTypeSchema = z.enum(['employer', 'student'])
export type UserTypeValue = z.infer<typeof userTypeSchema>

export type CodebookType = 'job-category' | 'university'

export const codebookTypeSchema = z.enum(['job-category', 'university'])
export type CodebookTypeValue = z.infer<typeof codebookTypeSchema>