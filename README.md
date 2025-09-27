
# CrownQuestNL

Next.js + Tailwind site for CrownQuestNL.

## Local dev
```bash
npm install
npm run dev
```

## Deploy to Vercel (recommended)
1. Create a Vercel account and install the Vercel CLI (`npm i -g vercel`) or use the dashboard.
2. Run:
```bash
vercel
```
3. Follow prompts to deploy. You'll get a live *.vercel.app URL.
4. Add your custom domain (e.g., crownquestnl.ca) in Vercel > Settings > Domains.

## Deploy to Netlify
- Use "Import from Git" or drag-and-drop a zip of this project.
- Build command: `npm run build`
- Publish directory: `.next` (Netlify will auto-detect Next.js).

