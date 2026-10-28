import {
    ALLOWED_CV_MIME_TYPES,
    ApplicationStatus,
    type ApplicationStatusValue,
    type CodebookType,
    email,
    employerSchema,
    JobType,
    type JobTypeValue,
    jobSchema,
    MAX_CV_SIZE_BYTES,
    phoneNumber,
    studentSchema,
    type UserType,
} from '../dist'

// Compile the same public value/type families consumed by web, native and backend.
const user: UserType = 'student'
const codebook: CodebookType = 'university'
const application: ApplicationStatusValue = ApplicationStatus.CANCELED
const jobType: JobTypeValue = JobType.FAST
const maxBytes: number = MAX_CV_SIZE_BYTES
const types: readonly string[] = ALLOWED_CV_MIME_TYPES
const normalizedPhone: string = phoneNumber.parse('+385 91 234 5678')
const schemas = [studentSchema, employerSchema, jobSchema, email]
void [user, codebook, application, jobType, maxBytes, types, normalizedPhone, schemas]
