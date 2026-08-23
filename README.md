# web-oncoorch

Sitio web publico de Oncoorch.

## Proposito

Este repositorio debe contener solo la web publica de Oncoorch:

- `https://oncoorch.com`
- `https://www.oncoorch.com`

La aplicacion/admin debe mantenerse en un repositorio separado y conservar el dominio:

- `https://admin.oncoorch.com`

## Ramas

- `main`: produccion. Dokploy debe desplegar automaticamente desde esta rama.
- `develop`: pruebas o preparacion antes de mezclar a `main`.

## Dokploy

Crear un servicio independiente en Dokploy para este repositorio:

- Repository: `oncoorch/web-oncoorch`
- Branch: `main`
- Build path: `/`
- Auto Deploy: enabled
- Domains: `oncoorch.com`, `www.oncoorch.com`

Configurar el puerto interno segun el framework usado por la web. Valores comunes:

- Next.js / Node: `3000`
- Nginx / sitio estatico en contenedor: `80`

## Cloudflare

Cloudflare debe ser el DNS autoritativo para `oncoorch.com` en plan Free. Squarespace queda solo como registrador.

Registros esperados:

```text
A      @       <VPS_IP>        Proxied
CNAME  www     oncoorch.com    Proxied
A      admin   <VPS_IP>        Proxied
A      dokploy <VPS_IP>        DNS only mientras se recupera/accede al panel
```

Usar SSL/TLS `Full` al inicio. Cambiar a `Full (strict)` solo cuando Dokploy/Traefik tenga certificados validos en el origen para todos los hostnames.
