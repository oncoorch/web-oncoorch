import type { NextConfig } from 'next';

const securityHeaders = [
  { key: 'Content-Security-Policy', value: "default-src 'self'; img-src 'self' data: https://crm.oncoorch.com; style-src 'self' 'unsafe-inline' https://crm.oncoorch.com; script-src 'self' 'unsafe-inline' https://crm.oncoorch.com; connect-src 'self' https://crm.oncoorch.com wss://crm.oncoorch.com; frame-src https://crm.oncoorch.com; font-src 'self' data: https://crm.oncoorch.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests" },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  poweredByHeader: false,
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
};

export default nextConfig;
