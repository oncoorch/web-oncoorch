# Deployment runbook: web-oncoorch

This repository is reserved for the public Oncoorch website only.

## Production contract

- Production branch: `main`
- Staging/preparation branch: `develop`
- Production domains: `oncoorch.com`, `www.oncoorch.com`
- Deployment platform: Dokploy
- DNS/proxy/edge TLS: Cloudflare Free
- Registrar: Squarespace Domains

The admin application must remain in a separate repository and keep using `admin.oncoorch.com`.

## Current known state

As of the last public diagnosis:

- Cloudflare is authoritative for `oncoorch.com`.
- `oncoorch.com` and `www.oncoorch.com` reach Cloudflare but still show `Squarespace - Website Expired`.
- `admin.oncoorch.com` reaches Traefik and returns `401 Basic realm="traefik"`, which is consistent with a live protected service.
- `dokploy.oncoorch.com` does not resolve yet.

## Required Cloudflare DNS records

Replace `<VPS_IP>` with the public IP of the Dokploy server.

```text
Type   Name      Content        Proxy status
A      @         <VPS_IP>       Proxied
CNAME  www       oncoorch.com   Proxied
A      admin     <VPS_IP>       Proxied
A      dokploy   <VPS_IP>       DNS only during panel recovery
```

Do not change `admin.oncoorch.com` unless the existing admin service is being intentionally migrated.

## Cloudflare SSL/TLS

Start with:

```text
SSL/TLS mode: Full
```

Move to:

```text
SSL/TLS mode: Full (strict)
```

only after Dokploy/Traefik has valid origin certificates for all active hostnames.

Do not use `Flexible` for this setup.

## Dokploy service for this repo

Create a separate Dokploy service for the public website.

```text
Name: oncoorch-web
Provider: GitHub
Repository: oncoorch/web-oncoorch
Branch: main
Build path: /
Auto Deploy: enabled
Domains: oncoorch.com, www.oncoorch.com
```

Set the internal container port according to the website framework:

```text
Next.js / Node: 3000
Static/Nginx: 80
Astro dev-style adapter: 4321 only if intentionally used in production
```

Prefer a production Dockerfile or production build command. Do not run development servers in production.

## Dokploy admin/app service

Keep the admin service separate:

```text
Domain: admin.oncoorch.com
Repository: current admin/app repository
Branch: main
Auto Deploy: enabled
```

Do not point `admin.oncoorch.com` to this web repository.

## Safe rollout order

1. Keep the existing admin service unchanged.
2. Confirm the public VPS IP for Dokploy.
3. Add `dokploy.oncoorch.com` in Cloudflare as `A <VPS_IP>` with `DNS only`.
4. Recover Dokploy access using `http://<VPS_IP>:3000`, `http://dokploy.oncoorch.com:3000`, or the configured HTTPS dashboard hostname.
5. Add the public website code to this repo.
6. Create the `oncoorch-web` service in Dokploy from `oncoorch/web-oncoorch`, branch `main`.
7. Enable Auto Deploy for the service.
8. Add `oncoorch.com` and `www.oncoorch.com` to the Dokploy service domains.
9. Change Cloudflare `@` and `www` away from Squarespace and toward `<VPS_IP>`.
10. Deploy and verify public HTTP responses.
11. Confirm `admin.oncoorch.com` still behaves as expected.
12. Switch Cloudflare SSL/TLS to `Full (strict)` after origin certificates are valid.

## Verification commands

```bash
curl -I -L https://oncoorch.com
curl -I -L https://www.oncoorch.com
curl -I -L https://admin.oncoorch.com
curl -I -L https://dokploy.oncoorch.com
```

Expected after rollout:

```text
oncoorch.com       200, or a deliberate 301/302 to the canonical hostname
www.oncoorch.com   200, or a deliberate 301/302 to the canonical hostname
admin.oncoorch.com 200, 302 login, or expected 401 Traefik auth
dokploy.oncoorch.com resolves in DNS
```

The public website must no longer show:

```text
Squarespace - Website Expired
```
