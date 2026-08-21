import { z } from 'zod';
export type UserType = 'employer' | 'student';
export declare const userTypeSchema: z.ZodEnum<["employer", "student"]>;
export type UserTypeValue = z.infer<typeof userTypeSchema>;
export type CodebookType = 'job-category' | 'university';
export declare const codebookTypeSchema: z.ZodEnum<["job-category", "university"]>;
export type CodebookTypeValue = z.infer<typeof codebookTypeSchema>;
//# sourceMappingURL=types.d.ts.map