# Deployment runbook: web-oncoorch

This repository is reserved for the public Oncoorch website only.

## Production contract

- Production branch: `main`
- Staging/preparation branch: `develop`
- Production domains: `oncoorch.com`, `www.oncoorch.com`
- Deployment platform: Dokploy
- DNS/proxy/edge TLS: Cloudflare Free
- Registrar: Squarespace Domains
- Runtime: Next.js on Node 24
- Internal container port: `3002`

The clinical/admin platform must remain in `oncoorch/nicop-platform` and keep using its own domains, including `admin.oncoorch.com`.

## Required Cloudflare DNS records

Replace `<VPS_IP>` with the public IP of the Dokploy server.

```text
Type   Name      Content        Proxy status
A      @         <VPS_IP>       Proxied
CNAME  www       oncoorch.com   Proxied
A      admin     <VPS_IP>       Proxied
A      dokploy   <VPS_IP>       Proxied, or DNS only while issuing the first origin certificate
```

Do not change `admin.oncoorch.com`, `app.oncoorch.com`, `api.oncoorch.com`, or other application subdomains as part of a website release.

## Cloudflare SSL/TLS

Use:

```text
SSL/TLS mode: Full (strict)
```

Do not use `Flexible` for this setup.

## Dokploy service for this repo

Use a separate Dokploy application for the public website.

```text
Name: oncoorch-website
Provider: GitHub
Repository: oncoorch/web-oncoorch
Branch: main
Build path: /
Build type: Dockerfile
Dockerfile: Dockerfile
Container port: 3002
Auto Deploy: enabled
Domains: oncoorch.com, www.oncoorch.com
```

Recommended environment variables:

```text
NODE_ENV=production
PORT=3002
NEXT_PUBLIC_SITE_URL=https://oncoorch.com
CONTACT_WEBHOOK_URL=<server-side webhook URL>
```

`CONTACT_WEBHOOK_URL` is server-only. Never expose it as `NEXT_PUBLIC_CONTACT_WEBHOOK_URL`.

## Dokploy admin/app service

Keep the platform separate:

```text
Project: NICOP
Repository: oncoorch/nicop-platform
Branch: main
Compose path: ./infra/docker/docker-compose.contabo.yml
Auto Deploy: enabled
Domain: admin.oncoorch.com
```

Do not point `admin.oncoorch.com` to this web repository.

## Safe rollout order

1. Keep the existing NICOP compose service unchanged.
2. Confirm `oncoorch/web-oncoorch` builds from `main`.
3. Configure the Dokploy website service with container port `3002`.
4. Add `oncoorch.com` and `www.oncoorch.com` to the website service domains.
5. Deploy and verify public HTTP responses.
6. Confirm `admin.oncoorch.com` still behaves as expected.
7. Confirm Cloudflare SSL/TLS is `Full (strict)`.

## Verification commands

```bash
curl -I -L https://oncoorch.com
curl -I -L https://www.oncoorch.com
curl -I -L https://admin.oncoorch.com
curl -I -L https://dokploy.oncoorch.com
```

Expected after rollout:

```text
oncoorch.com        200, or a deliberate redirect to the canonical hostname
www.oncoorch.com    200, or a deliberate redirect to the canonical hostname
admin.oncoorch.com  200, 302 login, or expected 401 Traefik auth
dokploy.oncoorch.com resolves and serves the Dokploy dashboard over HTTPS
```
