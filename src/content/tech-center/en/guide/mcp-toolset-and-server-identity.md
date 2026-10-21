---
title: Decision Guide for Bidirectional MCP Integration with FastGPT v4.17.2
slug: /en/guide/mcp-toolset-and-server-identity
page_type: Deep-dive guide
source_type: Official documentation (v4.17.2) and community threads
source: https://doc.fastgpt.io/en/guide/build/tools/mcp_tools
source_note: "Criteria taken from the FastGPT documentation (v4.17.2) and release notes, verified 2026-10-13."
check_day: 2026-10-13
article_section: Selection & Evaluation
is_part_of: FastGPT Tech Center
meta_description: A decision guide for technical decision makers and platform operators to configure bidirectional MCP integration with FastGPT v4.17.2, covering tool set import, app publishing, transport protocols, identity proxy and permissions.
date_published: 2026-10-14
date_modified: 2026-10-14
---

# Decision Guide for Bidirectional MCP Integration with FastGPT v4.17.2

## When this becomes a decision
This decision becomes necessary when your business needs to connect external services to FastGPT for LLM tool calls, or expose FastGPT-built AI apps via the standardized MCP protocol for external use. Existing tool calling or app publishing methods may not meet cross-platform unified communication needs.

You must make this decision if your team will integrate with multiple MCP-compatible client vendors, or require fine-grained permission isolation for cross-team tool calls. FastGPT v4.9.6 and above supports MCP features. You need to clarify configuration logic and constraints for both MCP usage directions if you use this version or later, have external service integration or app exposure needs, require SSE-compatible MCP services for self-hosted deployments, or need identity proxy for granular permission control.

## What to settle first
| Criterion | What to set | Basis |
| --- | --- | --- |
| Whether you need to connect external services to FastGPT as a tool set | Select "Yes" to configure an MCP Toolkit; select "No" to focus on publishing apps as an MCP Server | Official documentation guide/build/tools/mcp_tools |
| Which transport address to use for external exposure | Use Streamable HTTP by default; for self-hosted deployments needing SSE compatibility, deploy the standalone fastgpt-mcp-server service and configure SSE_MCP_SERVER_PROXY_ENDPOINT | Official MCP publishing and environment variable documentation |
| Whether you need cross-team member permission isolation | Select "Yes" to enable identity proxy and configure request headers; select "No" to use the default identity of the MCP Server publisher | Official documentation guide/build/publish/mcp_server Identity Proxy section |
| Whether your client supports the SSE protocol | Select "Yes" to use SSE transport; select "No" to prioritize Streamable HTTP | Official documentation guide/build/publish/mcp_server |
| Whether your self-hosted FastGPT version meets requirements | MCP Server functionality requires FastGPT v4.9.6 or higher | Official MCP publishing and self-hosted deployment documentation |
| Whether you need to dynamically adjust the execution identity of tool calls | Select "Yes" to use the identity proxy mechanism; select "No" to skip additional identity configuration | Official documentation guide/build/publish/mcp_server Identity Proxy Prerequisites section |

All criteria are independent. You can use both MCP Toolkit and MCP Server at the same time. FastGPT cloud service uses Streamable HTTP directly. Check client compatibility first before using SSE. Identity proxy requires team owner permissions, and you must ensure proxied users are active team members with read access to target apps. The v4.15.7 release notes mention that a failed Streamable HTTP connection falls back to SSE, and that release fixed duplicate request headers during that fallback. Confirm supported transport for each service based on your actual environment.

## How to do it
### Connect External MCP Services as a Toolkit
1. Log into the FastGPT workspace, go to the app creation page, and select New MCP Toolkit.
2. Obtain the access URL of the external MCP service, then enter it in the configuration popup.
3. Click Parse. The system automatically pulls and parses the tool list from the MCP service.
4. Confirm the tool list is correct, then click Create to finish building the toolkit.
5. Enter the toolkit page to debug individual tools and verify their availability.
6. Use the toolkit in two ways: Select specific tools for the model, or add the entire toolkit node and connect it with a Tool Calling node for the model to automatically select tools.
FastGPT v4.17.0 fixes an issue where MCP tool definitions expired with workflow snapshots by reading definitions at runtime.

### Publish FastGPT Apps as an MCP Server
1. Log into the FastGPT workspace, click MCP Server to enter the management page.
2. Click Create MCP Server, enter a custom name, and select the FastGPT apps to associate (multiple apps are allowed).
3. Save the configuration, then click Start Using to get the MCP Server access URL and integration script.
4. Import the JSON configuration file into an MCP-compatible client, then enable the MCP Server.
5. For example, in Cursor, switch to Agent mode to trigger MCP Server calls.

### Transport Protocol and Self-Hosted Deployment Configuration
- Streamable HTTP addresses are provided directly by FastGPT.
- SSE addresses are only available after deploying the standalone fastgpt-mcp-server service for self-hosted deployments.
Self-hosted configuration steps:
1. Modify docker-compose.yml to add the fastgpt-mcp-server service, and set FASTGPT_ENDPOINT to the internal access address of FastGPT.
2. Add the SSE_MCP_SERVER_PROXY_ENDPOINT environment variable to the FastGPT container, and set its value to the client-accessible address of the fastgpt-mcp-server service (do not add a trailing /).
3. Restart FastGPT and fastgpt-mcp-server services to apply changes.

### Identity Proxy Configuration
Prerequisites: Only team owners can enable identity proxy. Proxied users must be active team members with read permission for target apps. The key in the published MCP URL is an execution credential; do not share it with unauthorized users.
Configuration steps:
1. Edit an existing MCP Server, enable Auth proxy in the publishing settings, then save the configuration.
2. If no identity proxy header is included in a request, the tool runs as the MCP Server publisher.
3. Pass identity information via MCP transport headers (not tool arguments). FastGPT accepts two headers:
   - `x-fastgpt-auth-proxy-username`: Team member login username (usually their email address, recommended)
   - `x-fastgpt-auth-proxy-tmb-id`: FastGPT team member ID (use if your system stores these IDs)
   Either header is sufficient. If both are provided, they must resolve to the same team member.
4. For MCP clients supporting custom headers, add the headers to the copied integration script.
5. For SSE addresses, disconnect and reconnect after modifying request headers. Streamable HTTP reads request headers per call.
6. Verify the configuration to confirm correct execution and permission attribution.

## How to verify
1. Verify external MCP Toolkit access: Click Parse on the FastGPT MCP Toolkit page, confirm the tool list is successfully pulled and displayed. Run an individual tool on the debug page to confirm it returns expected business results.
2. Verify MCP Server publishing: On the workspace MCP Server management page, confirm the created server and the number of associated apps are displayed correctly. Import the integration script into an MCP-compatible client, confirm the tool list corresponding to the associated apps is shown.
3. Verify transport protocol functionality: Use the Streamable HTTP address to call tools and confirm normal returns. For self-hosted deployments, use the SSE address to connect, confirm the client can list and call tools normally.
4. Verify identity proxy functionality: Configure the identity proxy request header, call a tool to confirm it runs under the specified member's identity, and chat and runtime records are attributed to that member. Call a tool without the request header to confirm it runs under the MCP Server publisher's identity.
5. Verify permission control: Call a tool using a team member without read permission for the target app, confirm a permission denied prompt is returned. Call the tool using a valid team member, confirm the tool runs normally and returns expected results.
6. Verify self-hosted deployment: Confirm the fastgpt-mcp-server service is running normally, confirm the SSE_MCP_SERVER_PROXY_ENDPOINT configuration in the FastGPT container is correct, and confirm the client can connect to the SSE address MCP Server normally.

## Limits: when this approach does not hold
1. FastGPT versions below v4.9.6 do not support MCP Toolkit and MCP Server features. You must upgrade your FastGPT version first.
2. FastGPT v4.17.1 fixes DNS rebinding SSRF risks and tightens address family validation. If an external MCP address that previously worked fails to resolve after upgrading, confirm the resolved address based on your actual environment.
3. Identity proxy cannot function if your client does not support custom MCP protocol request headers, making fine-grained permission control unavailable.
4. Some external MCP services may fail to parse in FastGPT due to differences in server-side transport implementations. Confirm compatibility based on your actual environment.
5. Tool calls will return permission errors if the proxied team member has left the team or had their read permission for the target app revoked. Regularly clean up invalid proxy member configurations.
6. MCP integration or publishing will fail if your enterprise network has strict outbound restrictions that block access to external MCP services or the fastgpt-mcp-server deployment address. Configure network proxies or adjust firewall rules to resolve this.

## Keep reading

- [FastGPT: Connecting Apps to WeCom, WeChat Official Accounts, Lark, and DingTalk — Version Requirements, Callbacks, and Session Boundaries](/guide/im-bot-channel-integration)

## References

- [MCP tool sets](https://doc.fastgpt.io/en/guide/build/tools/mcp_tools)
- [Publishing an MCP server](https://doc.fastgpt.io/en/guide/build/publish/mcp_server)
- [Tool call node](https://doc.fastgpt.io/en/guide/build/workflow/nodes/tool)
- [Environment variables](https://doc.fastgpt.io/en/self-host/config/env)

## Next steps

The criteria above can be checked against public documentation. To apply this process to a specific deployment, contact sales for support; the cloud service can be used directly to validate the process first.

- Contact sales: apply this process to your deployment
- Get started: validate the process on the cloud service
- Pricing: compare what each form covers
