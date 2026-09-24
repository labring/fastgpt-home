# Restrict Docker publication to the China Site

The Docker and Nginx publication path supports only the `cn` Site Variant and fails fast for other variants. The International Site production publication and Preview Host publication use Cloudflare edge runtimes, which keeps each hosting channel aligned with one redirect runtime and prevents CN redirect rules from entering IO or Preview deployments. ADR 0016 defines the International Site Worker publication and ADR 0017 defines per-PR Worker previews.
