---
title: Environment Variable Checklist Generator: 136 Variables in 15 Groups, Filtered by Deployment Shape
slug: /en/reference/env-variable-checklist
page_type: Interactive module page
source: https://doc.fastgpt.io/docs/development/configuration
source_type: 官方文档
meta_title: FastGPT environment variable checklist generator
meta_description: Filter the 136 environment variables down to the ones a given deployment actually needs, with the ones that have no default and the ones that are off by default marked.
keywords: FastGPT environment variables, deployment configuration, env template, self-hosted
schema_type: TechArticle
date_published: 2026-09-09
date_modified: 2026-09-09
interactive_module: lookup
interactive_data: b4-env-variable-checklist.json
---

# Environment Variable Checklist Generator: 136 Variables in 15 Groups, Filtered by Deployment Shape

The configuration template holds 136 variables in 15 groups. A single deployment touches far fewer: 104 carry a default and run untouched, 32 genuinely have to be filled in, and another 24 are off by default and only take effect once enabled explicitly. The module below narrows that down by deployment shape and the features in use.

## Why filling the template line by line is a poor plan

The template lists every variable that could ever be needed. It is not a form to be completed. Filling it line by line goes wrong in three ways.

First, it replaces working defaults with something else. Of the 136 variables, 104 ship with a default, most of them tuned for a single-host deployment, and hand-editing them to a more reasonable looking number tends to run into resource ceilings instead.

Second, it switches on features that are not wanted. Variables in the object storage, sandbox and enhanced parsing groups matter only when those features are used, and a half-filled configuration is worse than an empty one: the service starts and fails later, with an error that points at a downstream component.

Third, it misses the ones that genuinely matter. The required variables are spread across groups rather than gathered at the top, so working top to bottom tends to stop somewhere in the middle - and what gets missed is usually a secret or an external service address, exactly the class with no default.

## Interactive module: checklist by deployment shape

Choose a deployment shape and the features to enable, and the module lists the variables this deployment actually needs, the default for each, and which ones have to be filled in. It can show required variables only, or include the ones that are off by default.

<!-- fastgpt-interactive: lookup | data: b4-env-variable-checklist.json | fallback-table-below -->

| Control | Parameter | Range | Default | Notes |
| --- | --- | --- | --- | --- |
| Deployment shape | deployMode | Single-host Docker Compose / Cluster / External dependencies | Single-host Docker Compose | Decides whether the database and cache group needs filling in |
| Features to enable | features | Object storage / Sandbox / Enhanced PDF parsing / Chat log push / Commercial edition | All off | Each selection pulls that group's variables into the checklist |
| Required only | requiredOnly | On / Off | Off | Lists only the 32 variables with no default |
| Include off-by-default | includeDisabled | On / Off | Off | The 24 variables that are off by default need to be enabled explicitly |

### Distribution across 15 groups

This table is the full distribution and can be read on its own. Where the with-default count is lower than the variable count, the difference is what has to be filled in for that group.

| Group | Variables | With default | On by default | Template has notes |
| --- | --- | --- | --- | --- |
| Basic configuration | 4 | 4 | 4 | 3 |
| Secrets | 4 | 3 | 4 | 4 |
| Service addresses and integrations | 34 | 24 | 30 | 18 |
| Sandbox proxy and network | 3 | 3 | 3 | 3 |
| Object storage | 14 | 11 | 14 | 3 |
| Database and cache | 15 | 10 | 5 | 12 |
| Logging | 12 | 12 | 12 | 3 |
| Domain and frontend | 3 | 3 | 2 | 3 |
| Security | 10 | 5 | 10 | 10 |
| Feature switches | 8 | 6 | 8 | 7 |
| Chat log push (optional) | 3 | 3 | 0 | 3 |
| Concurrency and limits | 6 | 6 | 6 | 6 |
| Resource limits | 8 | 8 | 8 | 8 |
| Enhanced PDF parsing (optional) | 8 | 2 | 2 | 8 |
| Knowledge base processing concurrency | 4 | 4 | 4 | 4 |

## Where the 32 variables with no default sit

They are not spread evenly. The service address and integration group holds the most, because it carries addresses and credentials for external services, which cannot have defaults. Object storage and the database and cache group hold several each, depending on whether built-in components or external instances are used.

One class deserves separate attention: variables that carry a default and still have to be changed. These defaults sit in the public configuration template, so anyone holding the same template knows them. They are:

| Variable | Group | Default in template | What it controls |
| --- | --- | --- | --- |
| DEFAULT_ROOT_PSW | Basic configuration | `123456` | Initial password for the root account |
| ROOT_KEY | Secrets | `fdafasd` | Root-level API credential |
| AES256_SECRET_KEY | Secrets | `fastgptsecret` | Key used to encrypt sensitive fields at rest |
| INVOKE_TOKEN_SECRET | Secrets | `fastgpt_invoke_token_secret_32_chars_min` | Signing key for internal invocation tokens |
| AGENT_SANDBOX_PROXY_SECRET | Sandbox proxy and network | `default_fastgpt_agent_sandbox_proxy_secret` | Signing key for the sandbox proxy |
| AGENT_SANDBOX_OPENSANDBOX_API_KEY | Service addresses and integrations | `my_secure_sandbox_key_123` | API credential for the sandbox service |
| STORAGE_ACCESS_KEY_ID | Object storage | `minioadmin` | Built-in object storage account |
| STORAGE_SECRET_ACCESS_KEY | Object storage | `minioadmin` | Built-in object storage password |

Checking a configuration file against this table beats trying to recall which ones were changed. The two object storage entries matter only when the built-in storage is in use; an external object store replaces them with its own credentials.

Another class is the addresses and tokens for commercial edition or external platform integration. Running open source only means leaving them empty, and the service will start regardless. Filling in an address without its token fails at call time instead, and that half-filled state is harder to diagnose than an empty one.

Counted by group, the three holding the most variables without a default are Service addresses and integrations (10), Enhanced PDF parsing (optional) (6), Database and cache (5). That distribution doubles as a checking order before deployment: work through those three groups first, then pick off the scattered ones in the remaining groups, which beats reading the template from line one. The table above also settles quickly whether a group needs attention at all - where the variable count equals the with-default count, that group can be left alone.

## Confirming a change actually took effect

Editing the configuration file is not the same as the service reading the new value. This step gets skipped often, and what it produces - configuration that looks right with behaviour that has not changed - is harder to chase than an error.

First, confirm the container was recreated rather than restarted. Environment variables are read when a container is created, and a restart does not re-read the file; the container has to come back up against the new configuration, or the file is new while the process still holds the old value.

Second, confirm from the service's own output rather than from the file. The file only states an intention; startup logs and runtime behaviour state what is actually in use. This matters most for variables that have defaults: a misspelled name makes the service fall back to the default silently, and the line in the file looks perfectly fine.

Third, confirm item by item rather than in bulk. After changing seven or eight variables, a service that starts proves nothing about each one. Listing the changed variables and checking them individually costs less than working backwards from symptoms later, and the checklist the module above produces can be used directly for that pass.

## What the 24 off-by-default variables are

Part of the template is commented out, 24 variables in total. They are not deprecated; they are the enable-when-needed set.

They cluster around a few optional features: chat log push is off as a whole group, enhanced parsing is mostly off, and part of the database and cache group exists for external instances and is unnecessary with the built-in components.

Deciding what to enable works from the feature backwards, not from the variable name forwards. Establish whether this deployment uses a given feature, then look at which variables that group needs, rather than reading names one by one and guessing what each controls. The module above is organised in that order.

## 41 variables carry no note in the template

Of the 136 variables, 95 come with an explanatory note and the remaining 41 carry only a name and a default. That gap is stated here rather than papered over, and the last column of the table above is the number of documented variables per group.

For an undocumented variable there are two ways to work it out. One is the group it sits in, which already says which subsystem it belongs to. The other is searching the open-source repository for the name: it is usually read in only one or two places, and reading that usage beats guessing from the name.

Guessing from the literal name is not advisable. The same word can mean different things across groups - a variable with limit in its name may cap concurrency in one group and request size in another, and tuning the wrong one has entirely different consequences.

## Version differences and expiry

The 136 variables here come from the v4.16.2 configuration template. Templates gain and lose variables between versions and change defaults, so comparing the two templates before an upgrade is worth the few minutes - especially looking for new variables with no default, since those stop the service from starting. Variables already edited are not overwritten on upgrade, but new ones do not appear in an existing configuration file by themselves.

## Keep reading

- [Error code lookup](/en/reference/error-code-lookup)
- [Knowledge base chunk and index settings estimator](/en/guide/kb-chunk-and-index-settings)

> Parameters and rules on this page are taken from the FastGPT open-source repository at v4.16.2, verified 2026-09-09.

## References

- [FastGPT environment variables](https://doc.fastgpt.io/docs/development/configuration)
- [FastGPT Docker Compose deployment](https://doc.fastgpt.io/docs/development/docker)
