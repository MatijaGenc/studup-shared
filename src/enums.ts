export const JobStatus = {
    ACTIVE: 1,
    CLOSED: 2,
    DELETED: 3,
} as const
export type JobStatusValue = (typeof JobStatus)[keyof typeof JobStatus]

export const JobType = {
    NORMAL: 1,
    FAST: 2,
} as const
export type JobTypeValue = (typeof JobType)[keyof typeof JobType]

export const ApplicationStatus = {
    APPLIED: 1,
    REJECTED: 2,
    APPROVED: 3,
    CANCELED: 4,
} as const
export type ApplicationStatusValue = (typeof ApplicationStatus)[keyof typeof ApplicationStatus]

export const ComplainStatus = {
    UNSUBMITTED: 1,
    SUBMITTED: 2,
    ACCEPTED: 3,
    REJECTED: 4,
} as const
export type ComplainStatusValue = (typeof ComplainStatus)[keyof typeof ComplainStatus]