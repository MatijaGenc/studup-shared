import { z } from 'zod';
export * from 'zod';
export declare const messages: {
    required: string;
};
export declare const email: z.ZodString;
export declare const jmbag: z.ZodString;
export declare const phoneNumber: z.ZodString;
export declare const password: z.ZodString;
export declare const firstName: z.ZodString;
export declare const lastName: z.ZodString;
export declare const oib: z.ZodString;
export declare const address: z.ZodString;
export declare const companyName: z.ZodString;
export declare const verificationCode: z.ZodString;
export declare const rating: z.ZodNumber;
export declare const jobDescription: z.ZodString;
export declare const jobHourlyRate: z.ZodNumber;
export declare const maximumApprovedApplications: z.ZodNumber;
export declare const jobTitle: z.ZodString;
export declare const stringDate: z.ZodUnion<[z.ZodEffects<z.ZodString, Date, string>, z.ZodDate]>;
//# sourceMappingURL=validation.d.ts.map