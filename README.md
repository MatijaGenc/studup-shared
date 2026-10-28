# @studup/shared

Shared Zod validation schemas, TypeScript enums, and types for StudUp projects.

## Usage

```bash
yarn add @studup/shared@github:MatijaGenc/studup-shared
```

```ts
import { email, password, jmbag } from '@studup/shared'
import { JobStatus, ApplicationStatus } from '@studup/shared'
```

## Schemas

- `email` — min 1, max 45, valid email format
- `password` — min 8, max 50, 1 upper, 1 lower, 1 number
- `jmbag` — exactly 10 digits
- `oib` — exactly 11 digits
- `phoneNumber` — 1-100 chars
- `firstName`, `lastName` — 1-45 chars
- `address` — 1-100 chars
- `companyName` — 1-90 chars
- `rating` — integer 1-5
- `jobTitle` — 1-70 chars
- `jobDescription` — max 500 chars
- `jobHourlyRate` — positive number
- `maximumApprovedApplications` — integer min 1
- `verificationCode` — exactly 6 chars
- `stringDate` — string or Date

## Enums

- `JobStatus` — ACTIVE, CLOSED, DELETED
- `JobType` — NORMAL, FAST
- `ApplicationStatus` — APPLIED, REJECTED, APPROVED, CANCELED
- `ComplainStatus` — UNSUBMITTED, SUBMITTED, ACCEPTED, REJECTED

## Git hook setup with Yarn 4

After installing dependencies, run `yarn hooks:install` from this repository root. Yarn 4 does not run `prepare` during install. Complete this step for each new clone/worktree so code pushes run the quality gate; `yarn check` is also available explicitly. See [QUALITY_GATES.md](QUALITY_GATES.md) and [Yarn lifecycle documentation](https://yarnpkg.com/advanced/lifecycle-scripts).
