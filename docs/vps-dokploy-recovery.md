# VPS and Dokploy recovery checklist

Use this checklist before changing Cloudflare DNS for `oncoorch.com` and `www.oncoorch.com`.

The purpose is to recover or confirm Dokploy access while preserving the working admin service at `admin.oncoorch.com`.

## Rules

- Do not change the existing `admin.oncoorch.com` service unless intentionally migrating it.
- Do not switch Cloudflare SSL/TLS to `Full (strict)` until origin certificates are valid.
- Do not proxy `dokploy.oncoorch.com` while recovering access through port `3000`.
- Prefer read-only checks before restarting containers.

## 1. Find the VPS public IP

SSH into the VPS and run:

```bash
curl -fsS https://ifconfig.me && echo
curl -fsS https://api.ipify.org && echo
curl -fsS https://icanhazip.com && echo
```

The returned IP is the candidate `<VPS_IP>` for Cloudflare.

## 2. Check Docker containers

```bash
docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}"
```

Look for containers named or imaged like:

```text
dokploy
traefik
postgres
redis
```

## 3. Check listening ports

```bash
ss -tulpn | sed -n '1,120p'
```

Expected ports commonly include:

```text
22    SSH
80    HTTP / Traefik
443   HTTPS / Traefik
3000  Dokploy dashboard if exposed directly
```

## 4. Check firewall

```bash
sudo ufw status verbose
```

Minimum required during recovery:

```text
22/tcp
80/tcp
443/tcp
3000/tcp only if accessing Dokploy directly by port
```

## 5. Check logs without changing services

```bash
docker ps --format "{{.Names}}" | grep -Ei "dokploy|traefik"
```

Then:

```bash
docker logs <dokploy-container-name> --tail 120
docker logs <traefik-container-name> --tail 120
```

## 6. Local HTTP checks on the VPS

```bash
curl -k -I --max-time 8 http://127.0.0.1:3000
curl -k -I --max-time 8 http://127.0.0.1
curl -k -I --max-time 8 https://127.0.0.1
```

A `200`, `301`, `302`, `401`, or `404` can all be useful evidence depending on which service responds. Connection refused or timeout means the port/service is unavailable.

## 7. Cloudflare DNS after confirming VPS IP

In Cloudflare, use the confirmed `<VPS_IP>`:

```text
A      @       <VPS_IP>       Proxied
CNAME  www     oncoorch.com   Proxied
A      dokploy <VPS_IP>       DNS only
```

Keep the existing working `admin.oncoorch.com` record unchanged.

## 8. Recover Dokploy panel access

Try, in this order:

```text
http://<VPS_IP>:3000
http://dokploy.oncoorch.com:3000
https://dokploy.oncoorch.com
```

If only `http://<VPS_IP>:3000` works, finish DNS and panel domain configuration inside Dokploy before proxying the dashboard hostname through Cloudflare.

## 9. Create public website service

Once Dokploy is accessible, create a separate service:

```text
Name: oncoorch-web
Provider: GitHub
Repository: oncoorch/web-oncoorch
Branch: main
Auto Deploy: enabled
Domains: oncoorch.com, www.oncoorch.com
```

Use the container port from the website implementation:

```text
3000 for Node/Next server
80 for static/Nginx
```

## 10. Final public verification

```bash
curl -I -L https://oncoorch.com
curl -I -L https://www.oncoorch.com
curl -I -L https://admin.oncoorch.com
```

The public website must no longer show `Squarespace - Website Expired`, and `admin.oncoorch.com` must keep its expected response.
