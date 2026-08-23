# Current production recovery state

Date: 2026-08-23 UTC

## What is currently fixed

Cloudflare DNS for `oncoorch.com` has been moved away from Squarespace.

The stale Squarespace apex A records were removed:

```text
198.49.23.144
198.49.23.145
198.185.159.145
198.185.159.144
```

The remaining public DNS shape is:

```text
A      oncoorch.com          169.58.168.77   Proxied
CNAME  www.oncoorch.com      oncoorch.com    Proxied
A      admin.oncoorch.com    169.58.168.77   Proxied
A      dokploy.oncoorch.com  169.58.168.77   DNS only
```

`admin.oncoorch.com` was not changed.

## Current temporary web container

A temporary recovery container is running directly on the VPS to prevent `oncoorch.com` and `www.oncoorch.com` from showing the expired Squarespace page or Cloudflare `526`.

```text
Container: oncoorch-web-recovery
Image: nginx:1.27-alpine
Network: dokploy-network
Content path on VPS: /opt/oncoorch-recovery-web
Domains: oncoorch.com, www.oncoorch.com
```

This container is not the final website deployment. It should be removed after the real public website is deployed through Dokploy from this repository.

Removal command after the final Dokploy web service is live:

```bash
docker rm -f oncoorch-web-recovery
```

## Verified public state

`oncoorch.com` and `www.oncoorch.com` return `HTTP/2 200` through Cloudflare.

The origin certificate for `oncoorch.com` and `www.oncoorch.com` is now issued by Let's Encrypt.

`admin.oncoorch.com` still returns the expected Traefik Basic Auth response:

```text
HTTP/2 401
www-authenticate: Basic realm="traefik"
```

`dokploy.oncoorch.com` resolves publicly to `169.58.168.77`; the Dokploy panel responds on port `3000`.

## Remaining work

The final production web service still needs to be created in Dokploy:

```text
Repository: oncoorch/web-oncoorch
Branch: main
Auto Deploy: enabled
Domains: oncoorch.com, www.oncoorch.com
```

Once the real service is deployed and healthy, remove `oncoorch-web-recovery`.
