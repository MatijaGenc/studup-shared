# API-001 — Private document contract

Defines the shared request/response for `GET /students/{studentId}/documents/{documentKind}/download`: UUID student ID, `cv|cert1|cert2`, HTTPS download URL without embedded credentials, and nullable positive expiry capped at300seconds. Managed CV producers will issue60second S3 URLs; external user-managed certificate links report no managed expiry. Parsing preserves valid signed query strings.

Exports request/response/kind schemas and types plus the specifically named `documentDownloadUrlSchema`. Twenty shared tests and15 tooling tests pass with types/format/lint/build and strict declaration-consumer compilation. Cases include invalid identities/kinds, unsafe URLs, whitespace-prefixed credentials, invalid expiry values and exact signature-query preservation. The additional whitespace case already passed the original validator; no bypass claim is made.

This additive contract does not authorize access or enable an endpoint. Backend relationship checks, private delivery and matching clients are separate work. Local evidence: `recheck-fixes-2026-11-05/private-document-contract/`; publication and exact CI are recorded in the canonical task ledger. Existing application schemas remain unchanged.
