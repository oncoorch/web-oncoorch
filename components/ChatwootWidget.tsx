'use client';

import Script from 'next/script';

const baseUrl = 'https://crm.oncoorch.com';
const websiteToken = 'K6kwNY1xeo6qXAfiX1eQjvXn';

declare global {
  interface Window {
    chatwootSDK?: {
      run: (config: { websiteToken: string; baseUrl: string }) => void;
    };
  }
}

export function ChatwootWidget() {
  return (
    <Script
      id="chatwoot-sdk"
      src={`${baseUrl}/packs/js/sdk.js`}
      strategy="afterInteractive"
      onLoad={() => {
        window.chatwootSDK?.run({ websiteToken, baseUrl });
      }}
    />
  );
}
