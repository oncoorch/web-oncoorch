# Dokploy service templates

Use one of these templates when the real public website code is added to this repository.

The Dokploy service must deploy from:

```text
Repository: oncoorch/web-oncoorch
Branch: main
Auto Deploy: enabled
Domains: oncoorch.com, www.oncoorch.com
```

## Option A: Node or Next.js application

Use this when the website has a Node server, for example Next.js standalone output.

Expected Dokploy settings:

```text
Service type: Application
Provider: GitHub
Repository: oncoorch/web-oncoorch
Branch: main
Build path: /
Container port: 3000
Domains: oncoorch.com, www.oncoorch.com
Auto Deploy: enabled
```

Recommended `Dockerfile` shape:

```Dockerfile
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "start"]
```

Adjust the final copy and command if the framework uses standalone output.

## Option B: Static website with Nginx

Use this when the build produces static files, for example `dist`, `build`, or `out`.

Expected Dokploy settings:

```text
Service type: Application
Provider: GitHub
Repository: oncoorch/web-oncoorch
Branch: main
Build path: /
Container port: 80
Domains: oncoorch.com, www.oncoorch.com
Auto Deploy: enabled
```

Recommended `Dockerfile` shape:

```Dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.27-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
```

Change `/app/dist` if the framework outputs to a different directory.

## Docker Compose variant

Use Docker Compose only if the public website needs more than one container. For a single web container, prefer a Dokploy Application service.

Example:

```yaml
services:
  web:
    build:
      context: .
    restart: unless-stopped
    environment:
      NODE_ENV: production
      PORT: 3000
    ports:
      - "3000"
```

When using Docker Compose in Dokploy, configure domains through Dokploy's Domains tab instead of hard-coding Traefik labels unless there is a specific reason.

## Required checks before connecting domains

Before changing Cloudflare `@` and `www` to the VPS, verify:

```text
[ ] The Dokploy service builds successfully.
[ ] The service exposes the expected internal port.
[ ] The service is healthy in Dokploy.
[ ] The admin service still works at admin.oncoorch.com.
[ ] Cloudflare SSL/TLS is set to Full during migration.
```

## Required checks after connecting domains

```bash
curl -I -L https://oncoorch.com
curl -I -L https://www.oncoorch.com
curl -I -L https://admin.oncoorch.com
```

Expected:

```text
oncoorch.com and www.oncoorch.com no longer show Squarespace - Website Expired.
admin.oncoorch.com keeps its expected login/auth response.
```
