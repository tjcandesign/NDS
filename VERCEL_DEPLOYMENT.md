# Vercel Deployment Guide - NDS (Niche Design Studios)

Complete step-by-step guide to deploy the NDS portfolio website to Vercel.

## Prerequisites

✅ GitHub repository created and pushed: https://github.com/tjcandesign/NDS.git
✅ Sanity CMS project configured
✅ Content published in Sanity

## Step-by-Step Deployment

### 1. Go to Vercel Dashboard

Visit: https://vercel.com/dashboard

### 2. Create New Project

- Click **"Add New..."** → **"Project"**
- Select **"Import Git Repository"**
- Search for and select: `NDS`
- Click **"Import"**

### 3. Configure Project Settings

**Basic Settings:**
- **Project Name**: `nds` (or `niche-design-studios`)
- **Framework**: Select **"Next.js"** (auto-detected)
- **Root Directory**: `./` (default)

**Don't click Deploy yet!** → Go to Environment Variables first

### 4. Add Environment Variables

In the Vercel dashboard, find the **"Environment Variables"** section and add:

| Variable Name | Value |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `qb84mjun` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `SANITY_WRITE_TOKEN` | `skTz7sanqr4HZX2TxOCGkB5heW8owdaGEqyK5Xx2x92aLL6WukDf102evIW2xmxgdjIpPLpz5ZqlzWmk3tWyrCfSjbUj2cGViR8QdgA6Nl5xyVgtIqpdlRSyFjocidUYPADKh5A2T5NFrGpHjgvG1g0Kd8TgHFKraohGnhRE7yV5rftx0uqg` |

### 5. Deploy

Click **"Deploy"** and wait for deployment to complete (2-5 minutes).

You'll see:
- ✅ Build successful
- ✅ Deployment complete
- 🔗 Your live URL (e.g., `https://nds-portfolio.vercel.app`)

### 6. Verify Deployment

Visit your deployment URL:
- Open: `https://your-nds-domain.vercel.app`
- You should see your NDS portfolio homepage
- Check all pages load correctly
- Verify Sanity CMS content displays properly

---

## 🎯 Key Vercel Features

### Analytics
- **Settings** → **Analytics** - Monitor traffic and performance

### Logs
- **Deployments** → **Logs** - View build and runtime logs

### Domains
- **Settings** → **Domains** - Add custom domain
  - Example: `nichedesignstudiodc.com` (if you own the domain)

### Auto-Redeployment
- Vercel automatically redeploys when you push to GitHub main branch

---

## 🌐 Custom Domain Setup (Optional)

### Add Custom Domain

1. Go to **Settings** → **Domains**
2. Click **"Add"**
3. Enter your domain (e.g., `nichedesignstudiodc.com`)
4. Follow DNS configuration instructions
5. Vercel provides free SSL certificate

### DNS Setup Examples

**For GoDaddy, Namecheap, etc:**
- Point your domain DNS to Vercel's nameservers
- Vercel will provide the exact nameserver addresses

---

## 🆘 Troubleshooting

### Build Fails
1. Check **Deployments** → **Logs** for error messages
2. Verify all environment variables are set correctly
3. Check that Sanity project ID is correct

### Content Not Showing
- Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
- Check Sanity CMS has published content
- Try redeploying if content was just published

### Images Not Loading
- Check Sanity image URLs are accessible
- Verify Sanity project is public (not private)
- Check image optimization settings

### Slow Page Load
- Use Vercel Analytics to identify bottlenecks
- Consider enabling Image Optimization
- Review Sanity query performance

---

## 📊 Post-Deployment Checklist

- [ ] Visit your deployment URL
- [ ] Check homepage loads correctly
- [ ] Navigate to all pages (About, Portfolio, Blog, Contact)
- [ ] Verify Sanity content displays properly
- [ ] Check images load correctly
- [ ] Test contact form (if implemented)
- [ ] Verify mobile responsiveness

---

## 🚀 Next Steps

1. **Custom Domain** (Recommended)
   - Go to **Settings** → **Domains**
   - Add your custom domain

2. **SSL Certificate** (Automatic)
   - Vercel automatically provides free SSL
   - All HTTPS by default

3. **Analytics** (Recommended)
   - Enable analytics in Settings
   - Monitor traffic and performance

4. **SEO**
   - Update meta tags with your domain
   - Submit sitemap to Google Search Console
   - Add robots.txt

---

## 🔄 Content Updates via Sanity

When you publish content in Sanity:
1. Vercel automatically triggers a redeployment (via webhooks)
2. Your site updates within 2-5 minutes
3. No manual deployment needed

### To Speed Up Updates
- Configure Sanity webhooks to Vercel
- See Sanity docs for webhook setup

---

## 📞 Support Links

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Sanity Docs**: https://www.sanity.io/docs
- **Next.js Sanity Integration**: https://github.com/sanity-io/next-sanity

---

## 💡 Pro Tips

- Use `vercel --prod` CLI to deploy from your local machine
- Enable "Preview Deployments" for testing
- Set up Slack notifications for deployments
- Monitor Core Web Vitals in Analytics

Your NDS portfolio is now live! 🎉
