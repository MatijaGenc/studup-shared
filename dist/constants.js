"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALLOWED_CV_MIME_TYPES = exports.MAX_CV_SIZE_BYTES = exports.MAX_JOB_HOURLY_RATE = exports.ALLOWED_PROFILE_IMAGE_MIME_TYPES = exports.MAX_PROFILE_IMAGE_SIZE_BYTES = void 0;
exports.MAX_PROFILE_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
exports.ALLOWED_PROFILE_IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
// 4 MiB of file data becomes ~5.6 MB as base64 plus JSON, which stays under the
// 6 MB synchronous Lambda invocation limit used by the API Gateway proxy.
// A 10 MiB file cannot be transported through this path at all.
// Sanity ceiling for a student hourly wage; not a billing policy.
exports.MAX_JOB_HOURLY_RATE = 1000;
exports.MAX_CV_SIZE_BYTES = 4 * 1024 * 1024;
exports.ALLOWED_CV_MIME_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
//# sourceMappingURL=constants.js.map