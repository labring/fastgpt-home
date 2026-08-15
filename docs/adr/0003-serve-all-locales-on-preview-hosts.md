# Serve all locales on preview hosts

Preview hosts serve every supported locale on their own hostname so reviewers can validate cross-locale changes. Every HTML response emits `X-Robots-Tag: noindex, nofollow`, while robots.txt allows crawlers to read that directive. Canonical and hreflang metadata point exclusively to the corresponding production URLs, preview navigation stays on the preview hostname, and preview builds omit the sitemap. This keeps production search ownership with fastgpt.cn and fastgpt.io.
