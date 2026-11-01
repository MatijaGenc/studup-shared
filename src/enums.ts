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
    APPLIED: 'APPLIED',
    REJECTED: 'REJECTED',
    APPROVED: 'APPROVED',
    CANCELED: 'CANCELED',
} as const
export type ApplicationStatusValue = (typeof ApplicationStatus)[keyof typeof ApplicationStatus]

export const ApplicationStatusId = {
    APPLIED: 1,
    REJECTED: 2,
    APPROVED: 3,
    CANCELED: 4,
} as const
export type ApplicationStatusIdValue = (typeof ApplicationStatusId)[keyof typeof ApplicationStatusId]

const APPLICATION_STATUS_BY_ID: Record<ApplicationStatusIdValue, ApplicationStatusValue> = {
    [ApplicationStatusId.APPLIED]: ApplicationStatus.APPLIED,
    [ApplicationStatusId.REJECTED]: ApplicationStatus.REJECTED,
    [ApplicationStatusId.APPROVED]: ApplicationStatus.APPROVED,
    [ApplicationStatusId.CANCELED]: ApplicationStatus.CANCELED,
}

export function applicationStatusFromId(id: number): ApplicationStatusValue {
    return APPLICATION_STATUS_BY_ID[id as ApplicationStatusIdValue] ?? ApplicationStatus.APPLIED
}

export function applicationStatusToId(status: ApplicationStatusValue): ApplicationStatusIdValue {
    return ApplicationStatusId[status]
}

export const ComplaintStatus = {
    UNSUBMITTED: 1,
    SUBMITTED: 2,
    ACCEPTED: 3,
    REJECTED: 4,
} as const
export type ComplaintStatusValue = (typeof ComplaintStatus)[keyof typeof ComplaintStatus]

export const ComplainStatus = ComplaintStatus
export type ComplainStatusValue = ComplaintStatusValue

export const NotificationType = {
    APPLICATION_APPLIED: 'APPLICATION_APPLIED',
    APPLICATION_APPROVED: 'APPLICATION_APPROVED',
    APPLICATION_REJECTED: 'APPLICATION_REJECTED',
    JOB_COMPLETED: 'JOB_COMPLETED',
    JOB_COMPLETION_CONFIRMED: 'JOB_COMPLETION_CONFIRMED',
} as const
export type NotificationTypeValue = (typeof NotificationType)[keyof typeof NotificationType]
