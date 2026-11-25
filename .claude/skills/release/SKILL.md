---
name: release
description: Release a new version of the standalone idempotency shop through a reviewed pull request. Use when asked to release or ship a version, including a rollback release.
---

# Release

1. Ask for the version (x.y.z) and a one-line summary if either is missing. From the standalone repository root, check the current branch and working tree. Verify that the publishing remote points to `Baran-06/idempotency-shop` (named `shop` in the rollback workspace). Base release work on current standalone `main`.
2. Run `npm run ci` from the repository root. If it fails, stop and show the error.
3. Set the version in `package.json` and keep `package-lock.json` consistent.
4. Add `## [x.y.z] - YYYY-MM-DD` to the top of `CHANGELOG.md`. Use Added, Changed, and Fixed entries as applicable based on `git log` since the last release. Preserve earlier version entries.
5. Run `npm run ci` again on the release changes. If it fails, stop and show the error. Show `git diff` and wait for explicit approval before committing. Commit only the version and changelog changes as `release: x.y.z`.
6. Give the owner the commands to push the current topic branch (for example, `git push -u shop HEAD`) and open a pull request against protected `main` in the standalone repository. The owner performs the push. Never push directly to `main`. Wait for required reviews and the `check` job. Ask the owner to approve the merge and the production deployment before they merge. The main-branch push triggers production deployment automatically.
7. After the owner confirms publication, match the successful production workflow run to the commit on `main`. Open the live URL from `shop.json` with Playwright MCP at 390×844. Also verify the owner-specified production domain when it differs. Report all console errors and warnings in one table and failed network requests in a separate table. Verification is complete when both lists are empty and the release-specific UI checks pass.

## Controlled rollback

- Get explicit approval for the intentionally broken production release. Put the UI change in its own commit and keep release metadata in a separate commit. Use a merge method that keeps those commits separate. A merge commit preserves the original bug SHA. Rebase and merge requires finding the rewritten bug SHA on `main`. Squash merging a combined PR loses the separate bug commit.
- Branch from current standalone `main` after the bad release. Verify that the bug SHA is on `main` and inspect its patch. Use `git revert --no-commit <bug-sha>`, review the staged inverse patch, run `npm run ci`, and obtain explicit approval before committing the revert. Then run the release steps for the recovery version.
- Record the successful production workflow run URL and deployed SHA for the baseline, bad release, and recovery. Record UTC timestamps for first confirmed detection and first verified recovery on the production domain. Recovery duration is the elapsed time between those observations. Add the links, timestamps, duration, and verification results to the recovery PR after production verification and with the owner's approval.
