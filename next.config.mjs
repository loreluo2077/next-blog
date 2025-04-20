import createNextIntlPlugin from 'next-intl/plugin';
import withMDX from '@next/mdx';
 
const nextIntl = createNextIntlPlugin();
const mdx = withMDX();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // todo This configuration option will be removed in a future major version.
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  // Optionally, add any other Next.js config below
}

export default nextIntl(mdx(nextConfig));