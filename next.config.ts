import type { NextConfig } from "next";

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' vercel-insights.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self' https: data:;
  connect-src 'self' data: https://*.vercel.app https://vercel-insights.com;
  frame-src 'self' blob: data:;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
`;

const nextConfig: NextConfig = {
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: "X-Frame-Options",
          value: "DENY", // or "SAMEORIGIN" if you need self-embedding
        },
        { key: 'Content-Security-Policy', value: cspHeader.replace(/\n/g, '') },
      ],
    },
  ]
};

export default nextConfig;
