# REPO001-A: Dependabot dependency updates

## Scope

- Added `.github/dependabot.yml` (new). This document is the only other addition.
- No manifest, lockfile, workflow, permission, or runtime changes.
- Existing untracked `graphify-out/` was left untouched.
- No existing Renovate or Dependabot configuration was present, so no conflict applies.
- No commit, push, workflow dispatch, or GitHub settings change was performed.

## Actual configuration

```yaml
version: 2
updates:
    - package-ecosystem: "npm"
      directory: "/"
      schedule:
          interval: "weekly"
      open-pull-requests-limit: 3
      groups:
          npm-patch:
              applies-to: version-updates
              patterns: ["*"]
              update-types: ["patch"]
          npm-minor:
              applies-to: version-updates
              patterns: ["*"]
              update-types: ["minor"]

    - package-ecosystem: "github-actions"
      directory: "/"
      schedule:
          interval: "weekly"
      open-pull-requests-limit: 3
      groups:
          actions-patch:
              applies-to: version-updates
              patterns: ["*"]
              update-types: ["patch"]
          actions-minor:
              applies-to: version-updates
              patterns: ["*"]
              update-types: ["minor"]
```

The committed file uses expanded YAML lists; the content above is equivalent.

## Design notes

- **Yarn 4 is covered by the npm ecosystem.** `package.json` declares `packageManager: yarn@4.18.0`, and Dependabot's npm ecosystem handles Yarn lockfiles. There is no separate Yarn ecosystem.
- **Weekly schedule**, at the repository root, for both ecosystems.
- **At most 3 open Dependabot PRs per ecosystem.**
- **Patch and minor updates are grouped separately** and restricted to `version-updates`. Security updates remain ungrouped and separate.
- **Major updates are not grouped**, so each major arrives as its own PR. This is the default behaviour for updates that match no group.
- **No auto-merge is configured.** Merging remains an owner decision.
- **No private registries or secrets**, no `insecure-external-code-execution`, no `ignore` rules, and no new workflow permissions.

## Official sources

- Dependabot options reference: <https://docs.github.com/en/code-security/reference/supply-chain-security/dependabot-options-reference>
- Supported ecosystems and repositories: <https://docs.github.com/en/code-security/reference/supply-chain-security/supported-ecosystems-and-repositories>

These were the primary sources verified for this task. In particular, the supported-ecosystems page documents npm-ecosystem coverage for Yarn.

## Owner / GitHub settings requirements

The YAML file alone does not enable or guarantee Dependabot. Repository owners still need to:

- Merge this file to the default branch; version updates are read from the default branch.
- Enable Dependabot alerts and Dependabot security updates in repository settings if security updates are wanted.
- Keep GitHub Actions enabled if the `github-actions` ecosystem is to update workflow actions.
- Decide separately whether to allow auto-merge. That requires a repository setting and usually branch protection; it is intentionally not enabled here.
- Approve any future private-registry configuration and its Dependabot secrets separately. None are configured.
- Handle license review separately. This file does not approve any dependency license.

## Verification

- YAML parsed successfully with Ruby Psych 5.3.1.
- Structural check confirmed only `version` and `updates`, both expected ecosystems, root directory, weekly schedule, limit 3, two version-update groups per ecosystem, and no `ignore`, `registries`, or `insecure-external-code-execution` keys.
- `yarn check` exited 0 with 15/15 tests passing.
- Log: `/Users/danieltosic/Projects/recheck-fixes-2026-11-04/delegation/shared-dependabot-check.log`
- **Not verified:** the first scheduled Dependabot run, PR creation, owner-side repository settings, and license policy. These require GitHub-side action and time.
- Native and consumer UI checks are inapplicable: this change adds static configuration only and has no runtime effect.
