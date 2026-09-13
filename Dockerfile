# Package a verified CN bundle: docker build -f Dockerfile -t fastgpt-home BUNDLE_DIR
FROM fholzer/nginx-brotli@sha256:1982def7c54f70db5186b30fa2e4a1fdf6116f42b45d95627594bd872a75cf6e AS runtime
LABEL org.opencontainers.image.source="https://github.com/labring/fastgpt-home"
RUN rm -rf /usr/share/nginx/html
COPY payload/out /usr/share/nginx/html
COPY payload/runtime/nginx.conf /etc/nginx/conf.d/default.conf
COPY payload/runtime/nginx-security-headers.conf /etc/nginx/security-headers.conf
COPY payload/runtime/nginx-redirects.conf /etc/nginx/generated-redirects.conf
COPY payload/runtime/nginx-embeddable-security-headers.conf /etc/nginx/embeddable-security-headers.conf
COPY manifest.json /etc/nginx/site-manifest.json
COPY payload/verification.json /etc/nginx/site-verification.json
RUN nginx -t
