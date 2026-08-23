import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { ChatwootWidget } from '../components/ChatwootWidget';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://oncoorch.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Onco-Orch | Orquestacion clinica oncologica', template: '%s | Onco-Orch' },
  description: 'Plataforma inteligente que conecta informacion, decisiones y equipos a lo largo del continuo oncologico.',
  applicationName: 'Onco-Orch',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Onco-Orch | Cada paso debe estar conectado',
    description: 'Orquestacion clinica inteligente para una atencion oncologica continua, segura y centrada en la persona.',
    locale: 'es_EC',
    type: 'website',
    url: '/',
    siteName: 'Onco-Orch',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { colorScheme: 'dark', themeColor: '#061f4a' };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es-EC" data-nicop-theme="dark">
      <body>
        {children}
        <ChatwootWidget />
      </body>
    </html>
  );
}
