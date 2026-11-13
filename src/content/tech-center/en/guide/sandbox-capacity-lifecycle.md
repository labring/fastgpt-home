---
slug: /en/guide/sandbox-capacity-lifecycle
meta_title: "FastGPT Sandbox Capacity and Lifecycle"
meta_description: "Plan FastGPT Agent sandbox capacity using system and team quotas, idle and archive settings, plus Kubernetes resource reservations for new instances."
schema_type: Article
page_type: 实施指南
date_published: 2026-11-09
date_modified: 2026-11-09
keywords: ""
---

# Sandbox Capacity and Lifecycle Management

**Sandbox cost depends on more than instance count: it depends on how long instances live, who reuses them, and whether they are reclaimed cleanly. FastGPT v4.17.3 consolidates quotas into two variables, provides default resource and lifecycle settings, and leaves oversell to Kubernetes deployments. Planning runs from quotas, to lifecycle, to oversell, in that order.**

## Quotas and capacity are two ledgers

A quota states how many active instances may exist at once; capacity states how much resource those instances occupy. The two variables divide the work. `AGENT_SANDBOX_MAX` caps the total number of active instances, defaulting to 100. `AGENT_SANDBOX_MAX_PER_TEAM` caps a single team, unlimited by default. In the commercial edition the admin console takes precedence over environment variables. Application sessions and skill editing draw on the same instance budget.

With only a total cap, one team can occupy every instance and queue everyone else. With only a team cap, the total loses protection. A shared deployment across teams needs both, and the effective limit is the tighter of the two. Setting one and leaving the other open hides the imbalance until a load test finds it, since day-to-day usage looks normal.

## What user-level instances reuse

Since 4.16.0 the sandbox runs at application-user level: several conversations within one application by one user reuse the same sandbox, with separate session directories isolating files. That changes capacity estimation directly — concurrency no longer equals conversation count but follows the number of users online at the same time.

Estimate peaks per user, not per session. Treating conversations as concurrency inflates quotas several times over; estimating purely per user while ignoring that one person may open several applications underestimates. The two errors point in opposite directions, so settle the counting basis before taking a number.

Reuse has a side effect worth naming. One user's sandbox is shared across conversations, with session directories separating files but resources remaining one pool. A long task under that user occupies the budget for all their sessions, and the others wait.

## Three lifecycle states

Default storage is 1 GiB. A running instance suspends after 60 minutes of inactivity and archives after remaining inactive for seven days while suspended. These settings are configurable. Use a disposable file to check which outputs remain available when the environment resumes.

That reclamation rule shapes task design. Long tasks either continue before the pause threshold or write intermediate output to external storage. Test how artifacts are restored after suspension and archive recovery. The three states also map to three operational actions: watch resource usage while running, watch for accumulation while paused, watch resume duration when archived. Their trigger frequencies differ, and folding them into one inspection item hides accumulation.

## Oversell multipliers and their boundaries

CPU and memory oversell multipliers default to 1 and never fall below it. They apply to Kubernetes deployments with OpenSandbox Server 0.2.1 or later, and only affect newly created or rebuilt instances; the resource ceiling of a running instance does not change. These settings change scheduling reservations and preserve the instance resource limits.

The multiplier changes scheduling reservation, not quota. Lowering it buys no additional instances, and raising the quota relieves no pressure on a node. Adjusting both at once leaves no way to tell which one mattered.

## The no-mixed-versions constraint at upgrade

Since 4.16.0 a deployment with the sandbox enabled does not support mixing versions. FastGPT, the sandbox proxy and the sandbox itself must be upgraded as a set, because the preview protocol between them changes with versions; mixed deployments produce previews that will not open and files that will not load.

One backfill job follows the upgrade: sandbox team ownership. It determines which team an instance belongs to, and failure shows up as members unable to see their instances. The three backfill jobs share at most three concurrent slots, so waiting in the queue is normal rather than a fault.

## Planning capacity in three steps

First, collect historical peaks per team, counted by users rather than conversations. Second, sum those peaks, add headroom, and set the total cap; set the team cap slightly above each team's own peak. Third, and only then, consider whether the oversell multiplier needs adjustment, and rebuild one instance to verify.

The order does not change. Touching oversell first turns a quota problem into a scheduling problem and makes each subsequent adjustment less legible; fixing quotas before optimising lifecycle shows where the optimisation space actually is. Write the conclusion as one line — total cap, per-team cap, headroom ratio — and start future changes from that line instead of re-estimating.

## Observation and failure modes

Two lines to watch: active instance count and instance creation failures. When failures rise, check whether the total cap or the team cap is binding. When active instances sit at the ceiling without failures, the quota still has room and the bottleneck lies elsewhere. Both lines need the same time window; mismatched windows make the numbers incomparable.

Failures fall into four groups. Members cannot see instances: check team ownership backfill. Instances rebuild repeatedly: check whether pause reclamation is responsible. Previews fail to open: check that all three components share a version. Files cannot be read: check session directories and storage paths. Grouping by symptom beats guessing from error text, because each group belongs to a different part of the chain.

## Three ledgers to keep

The quota ledger holds the total cap, the team cap and the current active count. The lifecycle ledger holds paused and archived counts. The cost ledger holds the number of instances created in the period. Keeping them apart makes it possible to tell a quota shortage from slow reclamation from a genuine increase in tasks.

Reconcile the three weekly. Checking only the quota ledger misses waste such as a sufficient quota with instances constantly rebuilding; checking only the cost ledger misses a broken reclamation policy. Read together, they give capacity planning something to stand on.

A simple variance check is enough to start: the number of instances created in a period should roughly track active users, and a rise in creations without a rise in users points at reclamation rather than growth. That single comparison catches most of the waste before it reaches a capacity review. Write each anomaly as one line with a date and an instance identifier; recording only "frequent rebuilds" forces the next person to search again, while the identifier leads straight to the matching log.

## Test concurrency and recovery separately

Prepare application sessions for two teams and a separate skill-editing session. Track the instance IDs. Bring one team to its own limit and check whether the other team can still create an instance while capacity remains. Then test the system limit and record the response to the next creation attempt. Keep quota values fixed during the comparison. For lifecycle testing, write a disposable artifact and check its availability after suspension and, separately, after archive recovery. Put durable outputs in the team's chosen storage and verify the read path. On Kubernetes, compare resource requests and limits between a rebuilt instance and an unchanged one after adjusting overcommit.

## Source of facts

Verified on 2026-11-09. Product version: FastGPT v4.17.3.

| Topic | Source |
| --- | --- |
| Sandbox quotas, oversell multiplier, backfill jobs | [Release notes 4.17.3](https://github.com/labring/FastGPT/releases/tag/v4.17.3) |
| User-level instances, resource specifications, lifecycle, no mixed versions | [Release notes 4.16.0](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-16/4160) |
| Agent sandbox storage and lifecycle settings | [Environment variables](https://doc.fastgpt.io/zh-CN/self-host/config/env) |
