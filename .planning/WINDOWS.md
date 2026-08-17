---
schema_version: 1
open_count: 4
waived_count: 0
fixed_count: 0
total_count: 4
last_updated: 2026-08-17T06:44:36.794Z
---

# Broken Windows Ledger

> Cross-phase defect register. With `workflow.windows_enforce` enabled, `/gsd-ship` blocks while `open_count > 0`.
> Waive with `gsd-tools windows waive <id> "<reason>"` (reason required).
> Mark fixed with `gsd-tools windows fixed <id>`.

| id | phase | kind | file | line | description | status | reason | recorded_at | resolved_at |
|----|-------|------|------|------|-------------|--------|--------|-------------|-------------|
| 1 | quick | skipped-test | scripts/verify-release.test.js |  | The fixture regression skips only on actually case-insensitive volumes; case-sensitive Linux and APFS hosts execute the complete 1,195-page CLI. | open |  | 2026-08-16T07:11:06.218Z |  |
| 2 | 05 | deviation | scripts/verify-guide-content.js |  | The established full verifier validates both locale records but reports only verified slugs. | open |  | 2026-08-17T04:15:43.205Z |  |
| 3 | 06 | deviation | src/lib/guideSeo.ts |  | Guide localized metadata now emits noindex-follow through the option-based helper. | open |  | 2026-08-17T05:36:50.690Z |  |
| 4 | 07 | deviation | scripts/verify-guide-export.js | 197 | Malformed encoded Guide output routes retain scoped inventory diagnostics. | open |  | 2026-08-17T06:44:36.794Z |  |

````json
[
  {
    "id": 1,
    "kind": "skipped-test",
    "phase": "quick",
    "file": "scripts/verify-release.test.js",
    "line": null,
    "description": "The fixture regression skips only on actually case-insensitive volumes; case-sensitive Linux and APFS hosts execute the complete 1,195-page CLI.",
    "status": "open",
    "reason": "",
    "recorded_at": "2026-08-16T07:11:06.218Z",
    "resolved_at": null
  },
  {
    "id": 2,
    "kind": "deviation",
    "phase": "05",
    "file": "scripts/verify-guide-content.js",
    "line": null,
    "description": "The established full verifier validates both locale records but reports only verified slugs.",
    "status": "open",
    "reason": "",
    "recorded_at": "2026-08-17T04:15:43.205Z",
    "resolved_at": null
  },
  {
    "id": 3,
    "kind": "deviation",
    "phase": "06",
    "file": "src/lib/guideSeo.ts",
    "line": null,
    "description": "Guide localized metadata now emits noindex-follow through the option-based helper.",
    "status": "open",
    "reason": "",
    "recorded_at": "2026-08-17T05:36:50.690Z",
    "resolved_at": null
  },
  {
    "id": 4,
    "kind": "deviation",
    "phase": "07",
    "file": "scripts/verify-guide-export.js",
    "line": 197,
    "description": "Malformed encoded Guide output routes retain scoped inventory diagnostics.",
    "status": "open",
    "reason": "",
    "recorded_at": "2026-08-17T06:44:36.794Z",
    "resolved_at": null
  }
]
````
