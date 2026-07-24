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
export declare const ComplainStatus: {
    readonly UNSUBMITTED: 1;
    readonly SUBMITTED: 2;
    readonly ACCEPTED: 3;
    readonly REJECTED: 4;
};
export type ComplainStatusValue = (typeof ComplainStatus)[keyof typeof ComplainStatus];
//# sourceMappingURL=enums.d.ts.map