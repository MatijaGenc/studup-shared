import {
    ALLOWED_CV_MIME_TYPES,
    ApplicationStatus,
    ApplicationStatusId,
    type ApplicationStatusValue,
    applicationStatusFromId,
    applicationStatusToId,
    authSessionResponseSchema,
    type CodebookType,
    type DocumentDownloadRequest,
    type DocumentDownloadResponse,
    type DocumentKind,
    documentDownloadRequestSchema,
    documentDownloadResponseSchema,
    documentDownloadUrlSchema,
    documentKindSchema,
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
const documentKind: DocumentKind = 'cert2'
const documentRequest: DocumentDownloadRequest = {
    studentId: '00000000-0000-4000-8000-000000000001',
    documentKind,
}
const managedDocumentResponse: DocumentDownloadResponse = {
    downloadUrl: 'https://studup-cv.s3.eu-central-1.amazonaws.com/cv.pdf?X-Amz-Signature=abc%2Fdef%3D',
    expiresInSeconds: 60,
}
const externalDocumentResponse: DocumentDownloadResponse = {
    downloadUrl: 'https://university.example.edu/certificates/student-1.pdf',
    expiresInSeconds: null,
}
const parsedDocumentKind: DocumentKind = documentKindSchema.parse(documentKind)
const parsedDocumentUrl: string = documentDownloadUrlSchema.parse(managedDocumentResponse.downloadUrl)
const parsedDocumentRequest: DocumentDownloadRequest = documentDownloadRequestSchema.parse(documentRequest)
const parsedDocumentResponse: DocumentDownloadResponse = documentDownloadResponseSchema.parse(managedDocumentResponse)
const schemas = [
    studentSchema,
    employerSchema,
    jobSchema,
    email,
    authSessionResponseSchema,
    jobApplicationCreateRequestSchema,
    jobSearchRequestSchema,
    documentDownloadRequestSchema,
    documentDownloadResponseSchema,
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
    documentKind,
    documentRequest,
    managedDocumentResponse,
    externalDocumentResponse,
    parsedDocumentKind,
    parsedDocumentUrl,
    parsedDocumentRequest,
    parsedDocumentResponse,
    schemas,
]
