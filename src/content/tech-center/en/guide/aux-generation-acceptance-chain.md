---
slug: /en/guide/aux-generation-acceptance-chain
meta_title: "FastGPT Workflow Generation: Acceptance Chain"
meta_description: "Review a FastGPT assisted workflow from brief to candidate, then test branch conditions, tool inputs and outputs, and the version selected for release."
schema_type: Article
page_type: 实施指南
date_published: 2026-11-09
date_modified: 2026-11-09
keywords: ""
---

# Acceptance Chain for Natural-Language Workflow Generation

**Assisted generation returns a candidate version, not a usable one. Acceptance has four stopping points: whether the candidate matches the brief, whether applying it overwrote existing nodes, whether every node's input and output hold during debug, and whether variables and loops resolve before publishing. Only after those four checks does a candidate become a workflow a team can maintain.**

## The chain lowers build cost, not judgment cost

A workflow has four layers: nodes, connections, variables and conditions. Manual building puts most effort into the structure: placing nodes, drawing arrows, naming things, fixing references. Assisted generation takes that layer over, produces a candidate from a written plan, arranges the canvas, and hands it back. Judgment stays with people: which node should carry this change, where an exception returns to, whether a write needs confirmation first.

Keeping the two layers apart also clarifies what acceptance means. The goal is not a correct first pass; it is that every uncertainty gets found. In FastGPT v4.17.3 assisted generation is a commercial-edition capability that requires edit permission on the application, plus an administrator who has enabled assisted generation and the sandbox. When either condition is missing, the entry point does not appear or generation stops partway.

## Writing the brief before generating

The brief has three parts. The first describes input: which system the workflow reads from, what the fields are called, what triggers a run. The second describes judgment: which condition splits the flow, which cases must go to a person. The third describes output: which system receives the result, who sees the receipt.

A brief with all three parts gives the node list something to be compared against. A one-line brief such as "build a support flow" produces a candidate whose distance from expectation is too large to review item by item. Two kinds of wording to avoid: degree words such as faster or smarter, which generate no corresponding node, and implied actions such as "archive it along the way", where the node, the destination and the timing all need to be stated before debug reveals that nobody implemented the step.

## First checkpoint: does the candidate match the brief

Read the node list before applying anything. Match each action in the brief to a node. If the brief says read the ticket, judge priority and write a note, the candidate should contain three corresponding actions. Extra wrapper nodes are implementation detail and can stay, provided it is clear which action each one serves.

Immediately after applying, check one thing: whether existing nodes were overwritten. Auto-layout changes positions, and positions do not affect execution; replaced nodes do. Save a copy of the flow before and after, then compare node identifiers. Arrow direction on the canvas shifts with layout and is not a signal.

## Second checkpoint: node inputs and outputs under debug

The debug panel is the only place where "looks right" and "runs right" separate. Run the main path step by step and inspect each node: whether fields that should carry values do, and whether the expected structures appear in output. Form and choice nodes produce different output fields, one returning structured input and the other returning the user's selection, and downstream references differ accordingly. The two cannot be reviewed as if they were interchangeable.

A brief also fixes vocabulary. If the brief calls a field priority while the source system calls it urgency, the generated node references one name and the query returns the other. Aligning names before generation is cheaper than untangling them afterwards.

Follow with boundary input: empty values, very long text, missing required fields. An error under boundary input is a normal result. What matters is the message: one that names the node and the field shortens the fix, while one that reports a generic failure leaves the whole branch to be inspected by hand. Node-level snapshots of inputs and outputs also let two runs be compared directly, which is faster than reading configuration, especially after variable references have been edited.

## Third checkpoint: variables, dynamic options and loops

Variables fall into three groups: ordinary field references, passwords and tool keys, and authentication headers for HTTP or MCP requests. All three can be inserted through the selector. Hand-typed names break after a rename, and reinserting through the selector is the quickest way to confirm.

Single and multiple choice support options generated from a variable, and an empty option set raises an explicit error. Acceptance means supplying an empty set first to see where the error lands, then a normal set to confirm the rendered options match the data source.

Loops are the other easily missed area. Conditional exits control a return to an earlier step, and connections that form an unconditional serial loop are rejected before debug or publish. Checking means confirming that every connection returning upstream hangs off a condition. A return without one should be rewritten.

## Fourth checkpoint: publish and rollback

Three things before publishing: the candidate is saved, variables resolve at runtime, and edit versus publish permissions are clear. After publishing, the live application runs the published version, while canvas edits belong to the next one. The two are separate states.

Rollback follows the publish record, not canvas undo. The record keeps version, time and the person who published, which lets a rollback select the previous version and confirm the scope with that person. Undo returns to an earlier canvas state and discards manual edits made in between.

## Layered failure modes

Generation layer: the candidate lacks actions, or node names have no relation to the brief. The cause is usually an abstract brief, and rewriting the description beats retrying.

Application layer: nodes were overwritten, or an existing branch condition points to a node that no longer exists. The cause is usually skipping the before-and-after comparison.

Runtime layer: the main path passes while a branch reports an empty variable. The cause is usually a reference written as if the upstream node always executes.

Publish layer: debug passes and the live version errors. The cause is usually a mismatch between the debugged version and the published one, or permissions and model references that did not follow the publish.

Work down the layers instead of across them. Generation problems call for a better brief, application problems for a rollback, runtime problems for corrected references, publish problems for a fresh publish. Changing all four at once removes any way to tell which change mattered.

A short log of which layer each fix landed on pays off. A run of generation-layer fixes means the brief template needs work; repeated publish-layer fixes point at release discipline rather than at content.

## Test branches and fields with a refund request

Prepare two refund requests with the same order ID. Attach valid evidence to one and leave it out of the other. After applying the candidate, identify the nodes that fetch the order, evaluate the evidence and report the status. Check which field each node reads, then verify that the order ID stays consistent and that the branch reads the evidence check. Add an unknown order to test the handoff. Save the node inputs and outputs for each run. If a request without evidence reaches the approval path, inspect the input reference and the branch condition before editing the prompt. Keep these inputs for release regression and add a boundary case whenever the refund rule changes.

## Source of facts

Verified on 2026-11-09. Product version: FastGPT v4.17.3.

| Topic | Source |
| --- | --- |
| Assisted workflow generation, variables, loops, publish requirements | [Release notes 4.17.3](https://github.com/labring/FastGPT/releases/tag/v4.17.3) |
| Node tool calls and generated parameters | [Release notes 4.16.0](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-16/4160) |
