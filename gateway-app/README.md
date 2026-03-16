# Gateway Impact Lab — AI Matching Prototype

AI-powered service-learning matching engine for Ho Chi Minh City. Matches students with 100 community partner organizations using Claude AI and a deeper learning framework.

## Live Features

- **Custom intake form**: Any visitor can fill in their profile and get matched
- **Sample students**: 6 pre-built student archetypes for demo purposes
- **Real AI matching**: Claude analyzes logistics, bilateral value, growth edge, competency fit, and deeper learning dimensions
- **100 real HCMC partners**: Across 8 pathways (Education, Environment, Healthcare, Technology, Arts, Community, Animal Welfare, Food Security)

## Deploy to Vercel (Free) — 5 Minutes

### Step 1: Push to GitHub

```bash
# In the gateway-app folder:
git init
git add .
git commit -m "Gateway Impact Lab matching prototype"

# Create a repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/gateway-impact-lab.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your `gateway-impact-lab` repo
4. Vercel auto-detects Next.js — click **Deploy**
5. After deploy, go to **Settings → Environment Variables**
6. Add: `ANTHROPIC_API_KEY` = your key from [console.anthropic.com](https://console.anthropic.com)
7. Click **Redeploy** (Deployments tab → three dots → Redeploy)

Your site is now live at `https://gateway-impact-lab.vercel.app` (or whatever Vercel assigns).

### Step 3: Custom Domain (Optional)

In Vercel Settings → Domains, add your custom domain (e.g., `match.gatewayimpactlab.com`).

## Local Development

```bash
# Install dependencies
npm install

# Create .env.local with your API key
cp .env.example .env.local
# Edit .env.local and add your real ANTHROPIC_API_KEY

# Run dev server
npm run dev
# Open http://localhost:3000
```

## Project Structure

```
gateway-app/
├── app/
│   ├── api/
│   │   └── match/
│   │       └── route.js      ← Server-side API route (calls Claude, keeps API key safe)
│   ├── layout.js             ← Root HTML layout
│   └── page.js               ← Main UI (intake form, sample students, results)
├── lib/
│   ├── partners.js           ← 100 HCMC community partner profiles
│   └── prompt.js             ← AI matching system prompt (deeper learning logic)
├── package.json
├── next.config.js
└── .env.example
```

## How the Matching Works

The system prompt encodes Gateway's matching logic in five priority layers:

1. **Logistics Feasibility** (hard filter): District proximity, transport, schedule overlap, language
2. **Bilateral Value**: Student strengths serve partner needs AND partner develops student competencies
3. **Growth Edge**: Placement stretches the student beyond comfort zone
4. **Competency-Pathway Fit**: Development goals align with what the partner actually teaches
5. **Identity & Purpose Alignment**: Student motivation connects to org mission

Every match is evaluated against Mehta & Fine's Deeper Learning framework (Mastery, Identity, Creativity) and weighted toward future-proof skills.

## Cost

- **Vercel hosting**: Free (hobby tier)
- **Claude API**: ~$0.02–0.05 per match request (Sonnet). Budget ~$5–10/month for demos.
- **Domain**: ~$10/year if you want a custom URL

## Data & Privacy

- No user data is stored (stateless — each match is a fresh API call)
- API key is server-side only (never exposed to the browser)
- To add data persistence later, connect Supabase and log match requests + outcomes

---

Built for Gateway Impact Lab's HCMC pilot (Fall 2026).
Harvard Graduate School of Education.
