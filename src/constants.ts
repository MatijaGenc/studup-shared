export const MAX_PROFILE_IMAGE_SIZE_BYTES = 5 * 1024 * 1024

export const ALLOWED_PROFILE_IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const

// 4 MiB of file data becomes ~5.6 MB as base64 plus JSON, which stays under the
// 6 MB synchronous Lambda invocation limit used by the API Gateway proxy.
// A 10 MiB file cannot be transported through this path at all.
export const MAX_CV_SIZE_BYTES = 4 * 1024 * 1024

export const ALLOWED_CV_MIME_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
] as const
