"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationType = exports.ComplainStatus = exports.ComplaintStatus = exports.ApplicationStatusId = exports.ApplicationStatus = exports.JobType = exports.JobStatusId = exports.JobStatus = void 0;
exports.jobStatusFromId = jobStatusFromId;
exports.jobStatusToId = jobStatusToId;
exports.applicationStatusFromId = applicationStatusFromId;
exports.applicationStatusToId = applicationStatusToId;
exports.JobStatus = {
    ACTIVE: 'ACTIVE',
    CLOSED: 'CLOSED',
    DELETED: 'DELETED',
};
exports.JobStatusId = {
    ACTIVE: 1,
    CLOSED: 2,
    DELETED: 3,
};
const JOB_STATUS_BY_ID = {
    [exports.JobStatusId.ACTIVE]: exports.JobStatus.ACTIVE,
    [exports.JobStatusId.CLOSED]: exports.JobStatus.CLOSED,
    [exports.JobStatusId.DELETED]: exports.JobStatus.DELETED,
};
function jobStatusFromId(id) {
    return JOB_STATUS_BY_ID[id] ?? exports.JobStatus.ACTIVE;
}
function jobStatusToId(status) {
    return exports.JobStatusId[status];
}
exports.JobType = {
    NORMAL: 1,
    FAST: 2,
};
exports.ApplicationStatus = {
    APPLIED: 'APPLIED',
    REJECTED: 'REJECTED',
    APPROVED: 'APPROVED',
    CANCELED: 'CANCELED',
};
exports.ApplicationStatusId = {
    APPLIED: 1,
    REJECTED: 2,
    APPROVED: 3,
    CANCELED: 4,
};
const APPLICATION_STATUS_BY_ID = {
    [exports.ApplicationStatusId.APPLIED]: exports.ApplicationStatus.APPLIED,
    [exports.ApplicationStatusId.REJECTED]: exports.ApplicationStatus.REJECTED,
    [exports.ApplicationStatusId.APPROVED]: exports.ApplicationStatus.APPROVED,
    [exports.ApplicationStatusId.CANCELED]: exports.ApplicationStatus.CANCELED,
};
function applicationStatusFromId(id) {
    return APPLICATION_STATUS_BY_ID[id] ?? exports.ApplicationStatus.APPLIED;
}
function applicationStatusToId(status) {
    return exports.ApplicationStatusId[status];
}
exports.ComplaintStatus = {
    UNSUBMITTED: 1,
    SUBMITTED: 2,
    ACCEPTED: 3,
    REJECTED: 4,
};
exports.ComplainStatus = exports.ComplaintStatus;
exports.NotificationType = {
    APPLICATION_APPLIED: 'APPLICATION_APPLIED',
    APPLICATION_APPROVED: 'APPLICATION_APPROVED',
    APPLICATION_REJECTED: 'APPLICATION_REJECTED',
    JOB_COMPLETED: 'JOB_COMPLETED',
    JOB_COMPLETION_CONFIRMED: 'JOB_COMPLETION_CONFIRMED',
};
//# sourceMappingURL=enums.js.map