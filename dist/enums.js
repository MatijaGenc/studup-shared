"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationType = exports.ComplainStatus = exports.ComplaintStatus = exports.ApplicationStatusId = exports.ApplicationStatus = exports.JobType = exports.JobStatus = void 0;
exports.applicationStatusFromId = applicationStatusFromId;
exports.applicationStatusToId = applicationStatusToId;
exports.JobStatus = {
    ACTIVE: 1,
    CLOSED: 2,
    DELETED: 3,
};
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