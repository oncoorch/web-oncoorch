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

## Current Dokploy web service

The public website is now deployed by Dokploy from this repository.

```text
Dokploy application: oncoorch-website
Application ID: g7QsKZUYOynTraWJoxC9i
Docker service: oncoorchwebsite-l4balv
Repository: oncoorch/web-oncoorch
Branch: main
Build type: Dockerfile
Internal port: 80
Auto deploy: enabled on push
Domains: oncoorch.com, www.oncoorch.com
```

The temporary recovery container `oncoorch-web-recovery` has been removed.

## Verified public state

`oncoorch.com` and `www.oncoorch.com` return `HTTP/2 200` through Cloudflare and serve the Dokploy-deployed public site.

The origin certificate for `oncoorch.com` and `www.oncoorch.com` is now issued by Let's Encrypt.

`admin.oncoorch.com` still returns the expected Traefik Basic Auth response:

```text
HTTP/2 401
www-authenticate: Basic realm="traefik"
```

`dokploy.oncoorch.com` resolves publicly to `169.58.168.77`; the Dokploy panel responds on port `3000`.

## Remaining work

Rotate the temporary access tokens and passwords that were shared during the recovery session.
