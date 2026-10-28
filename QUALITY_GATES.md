# Quality gates

Use Node 26 and yarn 4.18.0. Install from the committed lockfile, then run `yarn run check` from this repository root. The command runs typecheck, read-only formatting, lint, build and tests in order; any failure stops the chain and returns a nonzero exit code. Format/lint checks never rewrite source. Run an explicit formatting command separately when fixing a failure.

CI calls the same command. The pre-push hook runs it for code updates, including main; deletion-only updates contain no code to validate. Install dependencies to install the hook (Husky in app repositories; `prepare` in shared/infrastructure). Do not bypass hooks or treat a local pass as evidence that remote CI/deployment succeeded.

`test:gates` injects real failing child processes at each of the typecheck/lint/build/test positions, verifies later commands stop, rejects missing configuration/executables, and exercises the actual hook with a failing package manager and deletion-only input. These tests verify failure propagation; they supplement each tool's normal checks.

Before marking a task done, attach its commands, outcomes, test counts, relevant platform/environment, and any inapplicable checks with reasons. Record implementation, local validation, push, CI, deployment and live verification separately. Review the diff and scan staged changes for secrets before push. UI, database, infrastructure and native changes also require the applicable checks below.

## Shared package and consumers

Run `yarn install --immutable`, then `yarn check`. The runner also executes `test:consumers`, compiling a consumer against the built public declarations with strict TypeScript. Direct Node tests import the packaged dist entry point and cover exports, validation and a regression test proving an empty test directory fails. Gate regression tests are separate; they cannot hide a missing shared test suite.

For public runtime/type changes additionally run backend, frontend and mobile quality gates against the changed package and verify their pinned dependency revisions before release. The small compile fixture checks representative API families, not every consumer or semantic compatibility. `prepare`/`prepack` build distribution files; the hook installer only changes Git config when the package itself is a Git checkout, never a consumer's parent repository.
