---
schema_version: 1
open_count: 1
waived_count: 0
fixed_count: 0
total_count: 1
last_updated: 2026-08-16T07:11:06.218Z
---

# Broken Windows Ledger

> Cross-phase defect register. With `workflow.windows_enforce` enabled, `/gsd-ship` blocks while `open_count > 0`.
> Waive with `gsd-tools windows waive <id> "<reason>"` (reason required).
> Mark fixed with `gsd-tools windows fixed <id>`.

| id | phase | kind | file | line | description | status | reason | recorded_at | resolved_at |
|----|-------|------|------|------|-------------|--------|--------|-------------|-------------|
| 1 | quick | skipped-test | scripts/verify-release.test.js |  | The fixture regression skips only on actually case-insensitive volumes; case-sensitive Linux and APFS hosts execute the complete 1,195-page CLI. | open |  | 2026-08-16T07:11:06.218Z |  |

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
  }
]
````
