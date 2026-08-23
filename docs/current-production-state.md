# Current production state

Date: 2026-08-23 UTC

## Public website target

The public website belongs in this repository and should deploy through Dokploy from `oncoorch/web-oncoorch`.

```text
Dokploy application: oncoorch-website
Repository: oncoorch/web-oncoorch
Branch: main
Build type: Dockerfile
Dockerfile: Dockerfile
Internal port: 3002
Auto deploy: enabled on push
Domains: oncoorch.com, www.oncoorch.com
```

## Separate platform target

The clinical/admin platform remains separate.

```text
Dokploy project: NICOP
Repository: oncoorch/nicop-platform
Branch: main
Compose path: ./infra/docker/docker-compose.contabo.yml
Auto deploy: enabled on push
Admin domain: admin.oncoorch.com
```

## DNS shape

```text
A      oncoorch.com          169.58.168.77   Proxied
CNAME  www.oncoorch.com      oncoorch.com    Proxied
A      admin.oncoorch.com    169.58.168.77   Proxied
A      dokploy.oncoorch.com  169.58.168.77   Proxied, or DNS only while issuing origin certs
```

Do not move `admin.oncoorch.com` into the website service.

## Dashboard domain

`https://dokploy.oncoorch.com/` should route through Traefik to the Dokploy dashboard service on internal port `3000`. The helper script in the workspace output folder is `outputs/fix-dokploy-dashboard-domain.sh`.

## Security follow-up

Rotate temporary access tokens, API keys, and passwords used during recovery.
