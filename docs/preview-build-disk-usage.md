# Preview build disk usage

The Preview Host exports every published content locale before packaging a verified artifact.
Large exports can exhaust the runner's disk even when the final compressed upload is much
smaller. PR [#347](https://github.com/labring/fastgpt-home/pull/347) failed with
`No space left on device` in the build-and-package step. Its complete job log was unavailable,
so the exact failing substep has not been established.

## Artifact ownership

`npm run build:preview` consumes the completed `out/` export when packaging succeeds:

```text
out/
  -- same-filesystem rename --> staging/payload/out/
  -- seal and replace -------> .release-artifacts/site/preview-disabled/payload/out/
```

This avoids allocating a second complete export during Preview packaging. The final artifact
path, manifest schema, inventory hashes, hidden files, and Worker verification contract stay
the same. The subsequent workflow steps save `.next/cache` and upload the sealed artifact;
they must not depend on a root-level `out/` after a successful Preview build.

Direct `packagePreviewArtifact(root, metrics)` calls and `npm run package:preview` retain the
default copy behavior. Consumers that still need an independent source export must not opt
into `consumeExport`. Production publication packaging remains unchanged.

Moving the export requires both paths to be on the same filesystem. An `EXDEV` failure must
leave the source intact and fail visibly, rather than falling back to the full copy this mode
is intended to avoid. Hard links are not an acceptable substitute: modifying an artifact
would also modify the original export.

## Failure recovery

- Before committing a new artifact, packaging failures restore a consumed export to `out/`.
- An existing artifact is retained until the replacement is sealed, and restored if the final
  rename fails.
- If recovery itself fails, the remaining staging/backup is preserved and its location is
  reported. Do not remove that location until the export has been recovered.
- A hard process kill or machine failure cannot run JavaScript recovery handlers. A fresh CI
  run can rebuild the export; inspect retained staging paths before local recovery.

## Disk diagnostics

Preview builds report filesystem capacity with a timestamp and stage, including available
bytes and free inodes. Samples during the child build distinguish prolonged generation
pressure from the later packaging phase. These are filesystem-wide observations, not a
per-directory size attribution or an exact peak between samples.

Build output is inherited directly. Cancellation signals reach the build process group on
POSIX; on Windows, forwarding is limited to the direct child process. A cancelled build
returns a failure status and does not proceed to packaging.

For directory attribution, run bounded snapshots at relevant phase boundaries:

```sh
df -h .
df -i .
for dir in node_modules .next out .release-artifacts; do
  if [ -d "$dir" ]; then
    du -sh "$dir"
  fi
done
```

Do not add `.next/cache` to `.next` when summing sizes: it is already included. A missing
diagnostic must be reported as unavailable and must not replace the build's exit status.

## Validation

```sh
node --test scripts/verify-preview-artifact.test.js scripts/verify-site-artifact.test.js scripts/lib/run-with-disk-monitor.test.js scripts/prepare-build.test.js
```

The regressions cover default-copy isolation, successful export consumption, content and
inventory preservation, packaging/commit failures, cross-filesystem failure, and failed
recovery. The disk monitor is exercised with real short-lived child processes.

For full-scale acceptance, use the same commit, Site Variant, and cache conditions for both
runs. Verify the complete artifact and published URL set, then compare the filesystem
samples around packaging. Passing fixture tests alone is not evidence that a larger content
batch now fits on the hosted runner.

## Capacity beyond packaging

This change does not reduce the earlier `next build` intermediate files or the number of
exported routes. If generation itself fills the disk, retain the static architecture and
measure larger runners, independent Site Variant jobs, or narrower valid route generation.
Do not silently omit published content from Preview Hosts to make a build pass.

On-demand rendering/ISR is a separate architectural decision: `output: 'export'` cannot
generate missing pages at request time. It requires a compatible runtime, a runtime content
source, cache invalidation, and separate publication validation. See the
[Next.js static export limitations](https://nextjs.org/docs/app/guides/static-exports).
