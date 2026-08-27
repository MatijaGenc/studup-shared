import { z } from 'zod';
export declare const messages: {
    required: string;
    invalidDate: string;
    invalidEmail: string;
    emailMaxLength: string;
    jmbagLength: string;
    jmbagOnlyNumbers: string;
    phoneMaxLength: string;
    passwordMinLength: string;
    passwordMaxLength: string;
    passwordLowercase: string;
    passwordUppercase: string;
    passwordNumber: string;
    nameMaxLength: string;
    surnameMaxLength: string;
    oibLength: string;
    oibOnlyNumbers: string;
    addressMaxLength: string;
    companyNameMaxLength: string;
    invalidCode: string;
    jobDescriptionMaxLength: string;
    jobTitleMaxLength: string;
    invalidPhoneFormat: string;
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
export declare const stringDate: z.ZodUnion<[z.ZodEffects<z.ZodString, Date, string>, z.ZodEffects<z.ZodDate, Date, Date>]>;
export declare const studentSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    jmbag: z.ZodString;
    phoneNumber: z.ZodString;
    address: z.ZodString;
    universityId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    jmbag: string;
    phoneNumber: string;
    address: string;
    universityId: string;
}, {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    jmbag: string;
    phoneNumber: string;
    address: string;
    universityId: string;
}>;
export declare const employerSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    companyName: z.ZodString;
    oib: z.ZodString;
    phoneNumber: z.ZodString;
    address: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    phoneNumber: string;
    address: string;
    companyName: string;
    oib: string;
}, {
    email: string;
    password: string;
    phoneNumber: string;
    address: string;
    companyName: string;
    oib: string;
}>;
export declare const jobSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    hourlyRate: z.ZodNumber;
    phoneNumber: z.ZodString;
    startDate: z.ZodUnion<[z.ZodEffects<z.ZodString, Date, string>, z.ZodEffects<z.ZodDate, Date, Date>]>;
    endDate: z.ZodUnion<[z.ZodEffects<z.ZodString, Date, string>, z.ZodEffects<z.ZodDate, Date, Date>]>;
    startTime: z.ZodUnion<[z.ZodEffects<z.ZodString, Date, string>, z.ZodEffects<z.ZodDate, Date, Date>]>;
    endTime: z.ZodUnion<[z.ZodEffects<z.ZodString, Date, string>, z.ZodEffects<z.ZodDate, Date, Date>]>;
    categoryId: z.ZodString;
    closeDate: z.ZodUnion<[z.ZodEffects<z.ZodString, Date, string>, z.ZodEffects<z.ZodDate, Date, Date>]>;
    maximumApprovedApplications: z.ZodNumber;
    jobType: z.ZodEnum<["NORMAL", "FAST"]>;
}, "strip", z.ZodTypeAny, {
    phoneNumber: string;
    title: string;
    description: string;
    hourlyRate: number;
    startDate: Date;
    endDate: Date;
    startTime: Date;
    endTime: Date;
    categoryId: string;
    closeDate: Date;
    maximumApprovedApplications: number;
    jobType: "NORMAL" | "FAST";
}, {
    phoneNumber: string;
    title: string;
    description: string;
    hourlyRate: number;
    startDate: string | Date;
    endDate: string | Date;
    startTime: string | Date;
    endTime: string | Date;
    categoryId: string;
    closeDate: string | Date;
    maximumApprovedApplications: number;
    jobType: "NORMAL" | "FAST";
}>;
export declare const complaintSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    categoryId: z.ZodString;
    status: z.ZodOptional<z.ZodNativeEnum<{
        readonly UNSUBMITTED: 1;
        readonly SUBMITTED: 2;
        readonly ACCEPTED: 3;
        readonly REJECTED: 4;
    }>>;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
    categoryId: string;
    status?: 3 | 1 | 2 | 4 | undefined;
}, {
    title: string;
    description: string;
    categoryId: string;
    status?: 3 | 1 | 2 | 4 | undefined;
}>;
export declare const createJobComplaintSchema: z.ZodObject<{
    description: z.ZodString;
    jobId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    description: string;
    jobId: string;
}, {
    description: string;
    jobId: string;
}>;
//# sourceMappingURL=validation.d.ts.map