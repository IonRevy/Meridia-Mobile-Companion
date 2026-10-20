# Steam avatar proxy setup

GitHub Pages is static, so Steam's Web API key must stay in the Cloudflare Worker. The avatar dialog calls this Worker and receives only the profile image URL.

## Configure Cloudflare and GitHub

1. Create a Steam Web API key for the account that owns the site.
2. Create a Cloudflare API token with **Workers Scripts: Edit** and **Account Settings: Read** permissions for the intended account. Find the Cloudflare account ID in the account dashboard.
3. In the GitHub repository, add these Actions secrets under **Settings → Secrets and variables → Actions → Secrets**:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
   - `STEAM_API_KEY`
4. Push the Worker files or manually run **Deploy Steam avatar proxy** from the Actions page. The Worker is named `meridia-steam-avatar`.
5. In the GitHub repository, add the Actions variable `VITE_STEAM_PROFILE_API_URL` under **Settings → Secrets and variables → Actions → Variables**. Set it to the Worker URL shown after deployment, for example `https://meridia-steam-avatar.<your-workers-subdomain>.workers.dev/`.
6. Rerun **Deploy to GitHub Pages** so Vite includes that Worker URL in the site build.

The dialog accepts a public Steam profile name, a 17-digit SteamID64, or a Steam Community profile URL. Steam sign-in names are private and cannot be resolved by this API.
