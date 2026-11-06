# Changelog

This file records compatibility-relevant information for the current `@studup/shared` package version. The package metadata currently declares `0.1.0`. This repository has no published version tags or release dates recorded, so no publication dates are asserted here.

## Unreleased — malformed date text

- Reject NUL and unpaired UTF-16 surrogates before converting date strings. JavaScript's Date parser can otherwise accept a date prefix followed by NUL.
- Preserve valid ISO offsets, real Date inputs, optional empty strings/null, and existing invalid-date messages. Public schema exports are unchanged; date-only/timezone policy is unchanged.
- Focused packaged-output regressions cover the failure and compatibility cases. Consumer verification uses the exact built package in backend, web and mobile before promotion; native builds remain local.

## 0.1.0 — current package baseline

### Package contract

- Public runtime entry point: `dist/index.js`; public declaration entry point: `dist/index.d.ts`.
- `zod` `^4.0.0` is a peer dependency. Consumers install Zod 4 themselves; the package does not bundle a private copy.
- `dist/` is tracked intentionally because consumers install the package as a Git dependency and may not run a build. See the distribution policy in [README.md](README.md).
- TypeScript is configured for strict declaration output, and a strict consumer compile fixture exercises the exported runtime and type families.

### Validation schemas

- Primitive schemas: `email`, `password`, `jmbag`, `oib`, `phoneNumber`, `firstName`, `lastName`, `address`, `companyName`, `rating`, `jobTitle`, `jobDescription`, `jobHourlyRate`, `maximumApprovedApplications`, `verificationCode`, `stringDate`, and `gdprConsent`.
- `phoneNumber` removes spaces, dashes, slashes and parentheses, normalizes the `+385(0)` prefix, and validates Croatian numbering.
- `stringDate` accepts a `Date`, a parseable string, empty string or `null`, and rejects invalid dates.
- `gdprConsent` accepts only the literal `true`.
- Composite schemas: `studentSchema`, `employerSchema`, `jobSchema`, `complaintSchema`, and `createJobComplaintSchema`.
- Croatian validation messages remain available through `messages`.

### Enums and types

- `JobStatus` uses the wire values `ACTIVE`, `CLOSED`, `DELETED`; `JobStatusId` maps them to `1`, `2`, `3`, with `jobStatusFromId` and `jobStatusToId` helpers.
- `ApplicationStatus` uses the wire values `APPLIED`, `REJECTED`, `APPROVED`, `CANCELED`; `ApplicationStatusId` maps them to `1` through `4`, with `applicationStatusFromId` and `applicationStatusToId` helpers.
- `JobType` uses numeric values `NORMAL: 1` and `FAST: 2`.
- `ComplaintStatus` uses numeric values `UNSUBMITTED: 1`, `SUBMITTED: 2`, `ACCEPTED: 3`, `REJECTED: 4`; `ComplainStatus` and `ComplainStatusValue` remain as compatibility aliases.
- `NotificationType` exports the notification wire values.
- `UserType`, `userTypeSchema`, `CodebookType`, and `codebookTypeSchema` provide the exported string union contracts.

### API contracts

- Auth and registration contracts: `authUserSchema`, `authSessionResponseSchema`, `refreshRequestSchema`, `refreshResponseSchema`, `loginRequestSchema`, and `verifyRegistrationRequestSchema`.
- Job application contracts: `jobApplicationCreateRequestSchema`, `jobApplicationStatusRequestSchema`, `ratingRequestSchema`, and `jobSearchRequestSchema`. Job search defaults are `pageNumber: 1`, `pageSize: 20`, `sortBy: 'createdAt'`, and `sortOrder: 'desc'`.
- Status and identity helpers: `uuidSchema`, `applicationStatusSchema`, and `jobStatusSchema`.
- Private document download contract: `documentKindSchema` accepts `cv`, `cert1`, or `cert2`; `documentDownloadRequestSchema` requires a UUID `studentId` and a document kind; `documentDownloadUrlSchema` requires HTTPS without embedded credentials; `documentDownloadResponseSchema` requires a positive integer `expiresInSeconds` no greater than `300`, or `null` for external links without a managed expiry.
- Signed download query strings are preserved exactly rather than normalized.
- The private document download contract is additive. It does not authorize access or enable an endpoint; backend relationship checks and delivery remain separate work.

### File constraints

- CV uploads: maximum `10 * 1024 * 1024` bytes and the exported `ALLOWED_CV_MIME_TYPES`.
- Profile images: maximum `5 * 1024 * 1024` bytes and the exported `ALLOWED_PROFILE_IMAGE_MIME_TYPES`.
