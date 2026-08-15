# Restrict Docker publication to the China Site

The Docker and Nginx publication path supports only the `cn` Site Variant and fails fast for other variants. The International Site and Preview Hosts publish through Cloudflare Pages, which keeps each hosting channel aligned with one redirect runtime and prevents CN redirect rules from entering IO or Preview deployments.
