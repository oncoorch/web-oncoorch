# web-oncoorch

Sitio web publico de Oncoorch.

## Proposito

Este repositorio contiene solo la web publica de Oncoorch:

- `https://oncoorch.com`
- `https://www.oncoorch.com`

La aplicacion clinica y administrativa permanece separada en `oncoorch/nicop-platform` y conserva sus dominios propios, incluyendo `https://admin.oncoorch.com`.

## Aplicacion

La web es una aplicacion Next.js autonoma.

```text
Runtime: Node 24
Framework: Next.js
Puerto interno: 80
Build: Dockerfile en la raiz
```

El contenedor ejecuta Next como usuario no-root y usa `cap_net_bind_service` para escuchar en el puerto interno `80`, que coincide con la configuracion actual del servicio web en Dokploy.

## Ramas

- `main`: produccion. Dokploy despliega automaticamente desde esta rama.
- `develop`: preparacion antes de mezclar a `main`.

## Dokploy

Servicio esperado:

```text
Repository: oncoorch/web-oncoorch
Branch: main
Build path: /
Build type: Dockerfile
Dockerfile: Dockerfile
Container port: 80
Auto Deploy: enabled
Domains: oncoorch.com, www.oncoorch.com
```

Variables recomendadas:

```text
NODE_ENV=production
PORT=80
NEXT_PUBLIC_SITE_URL=https://oncoorch.com
CONTACT_WEBHOOK_URL=<server-side webhook URL>
```

`CONTACT_WEBHOOK_URL` debe configurarse solo en Dokploy como secreto/variable de servidor. No usar `NEXT_PUBLIC_` para ese valor.

## Cloudflare

Cloudflare debe ser el DNS autoritativo para `oncoorch.com` en plan Free. Squarespace queda solo como registrador.

Registros esperados:

```text
A      @       <VPS_IP>        Proxied
CNAME  www     oncoorch.com    Proxied
A      admin   <VPS_IP>        Proxied
A      dokploy <VPS_IP>        Proxied o DNS only durante emision de certificado
```

Usar SSL/TLS `Full (strict)` cuando Traefik/Dokploy tenga certificados validos en el origen para todos los hostnames.
