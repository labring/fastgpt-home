#!/bin/sh

set -eu

generated_routes=/etc/nginx/customers-proxy.conf
generated_location=/etc/nginx/customers-proxy-location.conf
routes_source=/etc/nginx/customers-proxy-routes.conf
location_template=/etc/nginx/customers-proxy-location.conf.template

is_enabled() {
  case "${CUSTOMERS_PROXY_ENABLED:-false}" in
    1 | true | TRUE | yes | YES) return 0 ;;
    *) return 1 ;;
  esac
}

render_customers_proxy() {
  origin_host=${CUSTOMERS_ORIGIN_HOST:-}
  proxy_secret=${CUSTOMERS_PROXY_SECRET:-}
  dns_resolver=${CUSTOMERS_DNS_RESOLVER:-}

  case "$origin_host" in
    '' | *[!A-Za-z0-9.-]*) origin_host_is_safe=false ;;
    *) origin_host_is_safe=true ;;
  esac
  if [ "$origin_host_is_safe" != true ] || \
    ! printf '%s' "$origin_host" | grep -Eq '^[A-Za-z0-9]([A-Za-z0-9.-]*[A-Za-z0-9])?$'; then
    echo '[customers-proxy] CUSTOMERS_ORIGIN_HOST must be a hostname without a scheme or path' >&2
    exit 1
  fi

  case "$proxy_secret" in
    '' | *[!A-Za-z0-9_-]*) proxy_secret_is_safe=false ;;
    *) proxy_secret_is_safe=true ;;
  esac
  if [ "$proxy_secret_is_safe" != true ] || [ "${#proxy_secret}" -lt 32 ]; then
    echo '[customers-proxy] CUSTOMERS_PROXY_SECRET must be at least 32 URL-safe characters' >&2
    exit 1
  fi

  if [ -z "$dns_resolver" ]; then
    dns_resolver=$(awk '/^nameserver[[:space:]]+[0-9.]+$/ { print $2; exit }' /etc/resolv.conf)
  fi
  case "$dns_resolver" in
    '' | *[!0-9.]*) dns_resolver_is_safe=false ;;
    *) dns_resolver_is_safe=true ;;
  esac
  if [ "$dns_resolver_is_safe" != true ] || \
    ! printf '%s' "$dns_resolver" | grep -Eq '^[0-9]{1,3}(\.[0-9]{1,3}){3}$'; then
    echo '[customers-proxy] CUSTOMERS_DNS_RESOLVER must be an IPv4 resolver address' >&2
    exit 1
  fi

  rendered_location=$(mktemp /etc/nginx/customers-proxy-location.conf.XXXXXX)
  sed \
    -e "s|@@CUSTOMERS_ORIGIN_HOST@@|$origin_host|g" \
    -e "s|@@CUSTOMERS_PROXY_SECRET@@|$proxy_secret|g" \
    -e "s|@@CUSTOMERS_DNS_RESOLVER@@|$dns_resolver|g" \
    "$location_template" > "$rendered_location"
  chmod 600 "$rendered_location"
  mv "$rendered_location" "$generated_location"
  cp "$routes_source" "$generated_routes"
  echo "[customers-proxy] enabled for origin host $origin_host" >&2
}

if is_enabled; then
  render_customers_proxy
else
  printf '# Customers proxy disabled; static fastgpt-home routing is unchanged.\n' > "$generated_routes"
  printf '# Customers proxy disabled.\n' > "$generated_location"
  echo '[customers-proxy] disabled' >&2
fi

nginx -t
exec nginx -g 'daemon off;'
