# Deploy

Push `main` to build and deploy automatically with Cloudflare Workers Builds.
Worker: `lukeberrypi-blog` · [Build settings](https://dash.cloudflare.com/861e22f1e41ed20cb63c9f699ea8d1f5/workers/services/view/lukeberrypi-blog/production/settings#builds).

## Manual deploy

Run from the repo root with Node **22.23.3** and Bun **1.3.6** (see `.node-version` and `package.json`). Log in once per machine:

```sh
bun install --frozen-lockfile
bunx wrangler@4.153.0 login
bun run deploy
```

## Check / troubleshoot

```sh
curl -IL https://lukeberrypi.com/articles/
bunx wrangler@4.153.0 deployments list
bunx wrangler@4.153.0 tail
```

Expect HTTP 200, `server: cloudflare`, and a `cf-ray` header. For stale DNS, add
`--doh-url https://dns.quad9.net/dns-query` to curl.
For build failures, check the dashboard's Deployments → build logs.

## Gotchas

- `wrangler.jsonc` uploads Astro's static `dist/`; `bun run start` / `astro preview` is only for local use.
- Both `lukeberrypi.com` and `www.lukeberrypi.com` serve the site directly. There is no forced www redirect.
- The custom `404.html` is served with HTTP 404 for missing routes; `/rss.xml` is generated at build time.
- Static-asset requests can bypass Worker execution, so an empty `tail` does not mean the site is down; check curl and build logs too.
- No application secrets or database are currently required. Future build-time variables require a rebuild.
- DNS lives in Cloudflare; registration stays at Namecheap. Preserve Zoho MX/DKIM, `_atproto`, and `_domain-proof` records.
- Emergency rollback: `bunx wrangler@4.153.0 rollback <VERSION_ID>` using a version from `deployments list`. This changes production immediately; also revert the bad Git commit before the next push.

[Wrangler command reference](https://developers.cloudflare.com/workers/wrangler/commands/workers/)
