import {
    ALLOWED_CV_MIME_TYPES,
    ApplicationStatus,
    ApplicationStatusId,
    type ApplicationStatusValue,
    applicationStatusFromId,
    applicationStatusToId,
    authSessionResponseSchema,
    type CodebookType,
    email,
    employerSchema,
    JobStatus,
    JobStatusId,
    type JobStatusValue,
    JobType,
    type JobTypeValue,
    jobApplicationCreateRequestSchema,
    jobSchema,
    jobSearchRequestSchema,
    jobStatusFromId,
    jobStatusToId,
    MAX_CV_SIZE_BYTES,
    phoneNumber,
    studentSchema,
    type UserType,
} from '../dist'

// Compile the same public value/type families consumed by web, native and backend.
const user: UserType = 'student'
const codebook: CodebookType = 'university'
const application: ApplicationStatusValue = ApplicationStatus.CANCELED
const legacyApplicationId: number = ApplicationStatusId.APPLIED
const mappedApplication: ApplicationStatusValue = applicationStatusFromId(legacyApplicationId)
const mappedApplicationId: number = applicationStatusToId(mappedApplication)
const jobType: JobTypeValue = JobType.FAST
const jobStatus: JobStatusValue = JobStatus.CLOSED
const jobStatusId: number = JobStatusId.ACTIVE
const mappedJobStatus: JobStatusValue = jobStatusFromId(jobStatusId)
const mappedJobStatusId: number = jobStatusToId(mappedJobStatus)
const maxBytes: number = MAX_CV_SIZE_BYTES
const types: readonly string[] = ALLOWED_CV_MIME_TYPES
const normalizedPhone: string = phoneNumber.parse('+385 91 234 5678')
const schemas = [
    studentSchema,
    employerSchema,
    jobSchema,
    email,
    authSessionResponseSchema,
    jobApplicationCreateRequestSchema,
    jobSearchRequestSchema,
]
void [
    user,
    codebook,
    application,
    legacyApplicationId,
    mappedApplication,
    mappedApplicationId,
    jobType,
    jobStatus,
    jobStatusId,
    mappedJobStatus,
    mappedJobStatusId,
    maxBytes,
    types,
    normalizedPhone,
    schemas,
]
