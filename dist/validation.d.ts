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
    gdprConsentRequired: string;
};
export declare const email: z.ZodString;
export declare const jmbag: z.ZodString;
export declare const phoneNumber: z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodString>;
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
export declare const stringDate: z.ZodUnion<readonly [z.ZodNull, z.ZodPipe<z.ZodString, z.ZodTransform<Date | null, string>>, z.ZodDate]>;
/** Deprecated legacy transport field. A privacy notice is not consent. */
export declare const gdprConsent: z.ZodOptional<z.ZodBoolean>;
export declare const studentSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    jmbag: z.ZodString;
    phoneNumber: z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodString>;
    address: z.ZodString;
    universityId: z.ZodString;
    gdprConsent: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const employerSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    companyName: z.ZodString;
    oib: z.ZodString;
    phoneNumber: z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodString>;
    address: z.ZodString;
    gdprConsent: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const jobSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    hourlyRate: z.ZodNumber;
    phoneNumber: z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodString>;
    startDate: z.ZodUnion<readonly [z.ZodNull, z.ZodPipe<z.ZodString, z.ZodTransform<Date | null, string>>, z.ZodDate]>;
    endDate: z.ZodUnion<readonly [z.ZodNull, z.ZodPipe<z.ZodString, z.ZodTransform<Date | null, string>>, z.ZodDate]>;
    startTime: z.ZodUnion<readonly [z.ZodNull, z.ZodPipe<z.ZodString, z.ZodTransform<Date | null, string>>, z.ZodDate]>;
    endTime: z.ZodUnion<readonly [z.ZodNull, z.ZodPipe<z.ZodString, z.ZodTransform<Date | null, string>>, z.ZodDate]>;
    categoryId: z.ZodString;
    closeDate: z.ZodUnion<readonly [z.ZodNull, z.ZodPipe<z.ZodString, z.ZodTransform<Date | null, string>>, z.ZodDate]>;
    maximumApprovedApplications: z.ZodNumber;
    jobType: z.ZodEnum<{
        FAST: "FAST";
        NORMAL: "NORMAL";
    }>;
}, z.core.$strip>;
export declare const complaintSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    categoryId: z.ZodString;
    status: z.ZodOptional<z.ZodEnum<{
        readonly UNSUBMITTED: 1;
        readonly SUBMITTED: 2;
        readonly ACCEPTED: 3;
        readonly REJECTED: 4;
    }>>;
}, z.core.$strip>;
export declare const createJobComplaintSchema: z.ZodObject<{
    description: z.ZodString;
    jobId: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=validation.d.ts.map