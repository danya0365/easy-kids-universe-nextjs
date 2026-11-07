This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Cloudflare Workers

This app runs on Cloudflare Workers through [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare). Local development stays `npm run dev`.

```bash
npm run cf:build            # next build + OpenNext worker bundle
npm run cf:deploy           # build and deploy worker easy-kids-universe
npm run cf:deploy:staging   # build and deploy worker easy-kids-universe-dev
```

Deploy needs a Cloudflare API token (`wrangler login` or `CLOUDFLARE_API_TOKEN` plus `CLOUDFLARE_ACCOUNT_ID`). Do not commit secrets. Workers Builds injects `WORKERS_CI_COMMIT_SHA` for the footer.
