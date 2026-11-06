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

## Compatibility

`@studup/shared` currently targets Node 26 and Yarn 4.18.0, the versions used by local quality gates and CI. Install from the committed `yarn.lock` with `yarn install --immutable`. See [QUALITY_GATES.md](QUALITY_GATES.md) for the full validation sequence.

The package declares `zod` `^4.0.0` as a peer dependency in `package.json`. Consumers must install a compatible Zod 4 release; the shared package does not bundle its own Zod copy. The public runtime and type entry points are `dist/index.js` and `dist/index.d.ts`.

## Distribution policy

`dist/` is intentionally tracked. Consumers install this private package as a Git dependency and may not run a package build, so the committed `dist/` files are the usable runtime and declaration entry points. Source changes must keep `dist/` synchronized; `prepack` also rebuilds it before packing. Do not ignore or delete `dist/` as generated output.

`node_modules/`, TypeScript build metadata, and the machine-local Yarn install state are ignored. `.yarn/install-state.gz` is not part of the package contract.

## Release validation

Run `yarn install --immutable` and then `yarn check` from this repository root. `yarn check` runs typecheck, read-only format checking, lint, build, the shared test suite including gate self-tests, and strict consumer-contract compilation. CI performs the same install and check on Node 26 with Yarn 4.18.0.

For changes to exported runtime or type surfaces, also run the backend, frontend and mobile quality gates against the changed package and verify their pinned dependency revisions before release. A local pass does not replace CI or deployment verification. The compile fixture covers representative API families, not every consumer.

## Git hook setup with Yarn 4

After installing dependencies, run `yarn hooks:install` from this repository root. Yarn 4 does not run `prepare` during install. Complete this step for each new clone/worktree so code pushes run the quality gate; `yarn check` is also available explicitly. See [QUALITY_GATES.md](QUALITY_GATES.md) and [Yarn lifecycle documentation](https://yarnpkg.com/advanced/lifecycle-scripts).
