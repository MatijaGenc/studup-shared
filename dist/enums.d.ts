export declare const JobStatus: {
    readonly ACTIVE: 1;
    readonly CLOSED: 2;
    readonly DELETED: 3;
};
export type JobStatusValue = (typeof JobStatus)[keyof typeof JobStatus];
export declare const JobType: {
    readonly NORMAL: 1;
    readonly FAST: 2;
};
export type JobTypeValue = (typeof JobType)[keyof typeof JobType];
export declare const ApplicationStatus: {
    readonly APPLIED: 1;
    readonly REJECTED: 2;
    readonly APPROVED: 3;
    readonly CANCELED: 4;
};
export type ApplicationStatusValue = (typeof ApplicationStatus)[keyof typeof ApplicationStatus];
export declare const ComplaintStatus: {
    readonly UNSUBMITTED: 1;
    readonly SUBMITTED: 2;
    readonly ACCEPTED: 3;
    readonly REJECTED: 4;
};
export type ComplaintStatusValue = (typeof ComplaintStatus)[keyof typeof ComplaintStatus];
export declare const ComplainStatus: {
    readonly UNSUBMITTED: 1;
    readonly SUBMITTED: 2;
    readonly ACCEPTED: 3;
    readonly REJECTED: 4;
};
export type ComplainStatusValue = ComplaintStatusValue;
export declare const NotificationType: {
    readonly APPLICATION_APPLIED: 'APPLICATION_APPLIED';
    readonly APPLICATION_APPROVED: 'APPLICATION_APPROVED';
    readonly APPLICATION_REJECTED: 'APPLICATION_REJECTED';
    readonly JOB_COMPLETED: 'JOB_COMPLETED';
    readonly JOB_COMPLETION_CONFIRMED: 'JOB_COMPLETION_CONFIRMED';
};
export type NotificationTypeValue = (typeof NotificationType)[keyof typeof NotificationType];
//# sourceMappingURL=enums.d.ts.map