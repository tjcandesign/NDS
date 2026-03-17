# Sanity CMS Content Management Guide for Niche Design Studios

## Overview

Your website now uses **Sanity CMS** to manage content. This means you can edit content directly in Sanity Studio without touching code or redeploying manually.

---

## Why Content Wasn't Updating Before

### The Problem (Static Site Generation)

Your site uses **Static Site Generation (SSG)**, which means:

```
1. BUILD TIME (happens on Vercel):
   → Next.js fetches all content from Sanity
   → Generates static HTML files
   → Deploys to Vercel's servers

2. WHEN USER VISITS:
   → Serves pre-built HTML instantly (very fast!)

3. WHEN YOU CHANGE CONTENT IN SANITY:
   ❌ Old HTML files still exist
   ❌ Site keeps showing old content
   ❌ NEEDS NEW BUILD to fetch fresh content
```

### Why This Matters

- ✅ **Fast performance** - HTML is pre-built, no database queries on each request
- ❌ **Delayed updates** - Changes need a rebuild (but only ~30-60 seconds with webhooks)

---

## How Content Updates Work Now (With Webhooks)

```
1. YOU EDIT CONTENT IN SANITY
   ↓
2. CLICK "PUBLISH"
   ↓
3. SANITY SENDS WEBHOOK to Vercel
   ↓
4. VERCEL AUTOMATICALLY REBUILDS
   (fetches fresh content from Sanity)
   ↓
5. NEW HTML GENERATED & DEPLOYED (~30-60 seconds)
   ↓
6. SITE SHOWS UPDATED CONTENT
```

**Result**: Changes appear within 1 minute automatically!

---

## Accessing Sanity Studio

### Studio URL
```
https://your-site.com/studio
```
(Replace `your-site` with your actual domain)

Or go directly to:
```
https://nds-site.vercel.app/studio
```

### Login
Use your Sanity credentials to log in.

---

## What You Can Now Edit in Sanity

### 1. **Site Settings** (Global Configuration)
This controls email, Instagram, navigation links, and process steps.

**Location**: Click on the **gear icon** (⚙️) in the Sanity Studio sidebar or look for "Site Settings"

**Editable Fields**:
- ✏️ **Contact Email** - Email address shown in footer
- ✏️ **Instagram URL** - Instagram link in footer
- ✏️ **Address** - Address shown in footer
- ✏️ **Phone Number** - Phone in footer
- ✏️ **Navigation Links** - Edit "About", "Portfolio", "Project Inquiry" links
- ✏️ **Design Process Steps** - Edit the 4 steps (Discover, Design, Refine, Deliver)

### 2. **Portfolio Projects**
Already Sanity-controlled. Edit project details, images, and descriptions.

### 3. **Pages**
You have a "Page" document type for future use (About page, etc.)

---

## Step-by-Step: Updating Content

### Example 1: Change Navigation Links

1. **Go to Sanity Studio** → Click **gear icon** (Settings)
2. **Look for "Site Settings"** document
3. **Scroll to "Navigation Links"** array
4. **Edit existing link**:
   - Change "About" label to something else
   - Change `/about` URL to `/new-url`
5. **Click "Publish"** (top right)
6. **Wait 30-60 seconds** for automatic rebuild
7. **Refresh website** to see changes

✨ The navigation will update automatically!

### Example 2: Update Contact Email

1. **Go to Sanity Studio** → **Site Settings**
2. **Find "Contact Email"** field
3. **Change** `hello@nichedesignstudios.com` to your new email
4. **Click "Publish"**
5. **Wait 30-60 seconds**
6. **Check footer** - email is updated!

### Example 3: Change Process Steps

1. **Go to Sanity Studio** → **Site Settings**
2. **Scroll to "Design Process Steps"**
3. **Click on a step** (e.g., "Discover")
4. **Edit the description** - make it more detailed
5. **Click outside** to save
6. **Click "Publish"** (top right)
7. **Wait 30-60 seconds** for homepage to update
8. **Visit homepage** - new text appears!

### Example 4: Add Instagram Link

1. **Go to Sanity Studio** → **Site Settings**
2. **Find "Instagram URL"** field
3. **Enter** `https://www.instagram.com/yourprofile/`
4. **Click "Publish"**
5. **Wait 30-60 seconds**
6. **Check footer** - Instagram icon now clickable!

---

## Important: Your Data Currently

The Site Settings document hasn't been created in Sanity yet. Here's what I've done:

✅ **Created the structure** in Sanity (what fields exist)
⚠️ **You need to populate** the actual values

### How to Create Site Settings Document

1. **Go to Sanity Studio**
2. **Look for "Site Settings"** in the document types list (left sidebar)
3. **Click "Create"** or **"New"**
4. **Fill in all the fields**:
   ```
   Site Title: Niche Design Studios
   Tagline: Interior Architecture & Design
   Contact Email: hello@nichedesignstudios.com
   Phone: (202) 555-0100
   Address: Washington, DC
   Instagram URL: https://www.instagram.com/melkimball/
   LinkedIn URL: https://www.linkedin.com/...

   Navigation Links (add items):
   - Label: About, URL: /about
   - Label: Portfolio, URL: /portfolio
   - Label: Project Inquiry, URL: /contact

   Design Process Steps (add items):
   - ID: discover, Title: Discover, Description: [enter description]
   - ID: design, Title: Design, Description: [enter description]
   - ID: refine, Title: Refine, Description: [enter description]
   - ID: deliver, Title: Deliver, Description: [enter description]
   ```
5. **Click "Publish"**

---

## What Happens When You Publish

### Automatic Workflow

```
PUBLISH IN SANITY
        ↓
[30-60 seconds waiting...]
        ↓
Website automatically rebuilds
        ↓
Changes live on site!
```

### If Changes Don't Appear

**Wait longer**: Vercel rebuilds can take 1-2 minutes
**Refresh**: Hard refresh (Cmd+Shift+R or Ctrl+Shift+R)
**Check build**: https://vercel.com/dashboard → your project → "Deployments"

---

## FAQ

### Q: Do I need to redeploy after editing in Sanity?
**A:** No! Webhooks automatically rebuild when you publish. Just publish and wait 30-60 seconds.

### Q: Can I edit multiple things and publish once?
**A:** Yes! Edit as much as you want, then click "Publish" once. All changes rebuild together.

### Q: What if Sanity Studio isn't loading?
**A:**
- Check you're logged in
- Check your internet connection
- Try accessing `/studio` on your domain

### Q: Can I revert changes?
**A:** Yes! Every publish creates a version. Click the "history" icon in the top right to see and restore old versions.

### Q: How do I undo accidental changes?
**A:**
1. Click the **clock/history icon** (top right)
2. Find the version before your change
3. Click **"Restore"**
4. Click **"Publish"**

### Q: Will rebuilds affect the live site?
**A:** No, rebuilds happen on Vercel's servers. Your site stays online the whole time.

---

## Technical Details for Reference

### Files Updated to Use Sanity

- **Homepage** (`app/page.tsx`) - Fetches process steps from Sanity
- **Navigation** (`components/Nav.tsx`) - Fetches nav links from Sanity
- **Footer** (`components/Footer.tsx`) - Fetches email, address, Instagram from Sanity
- **Sanity Queries** (`sanity/lib/queries.ts`) - All GROQ queries defined here
- **Sanity Helpers** (`lib/sanity.ts`) - Helper functions with fallbacks

### Webhook Endpoint

**URL**: `https://your-site.com/api/revalidate`
**Trigger**: Any publish in Sanity
**Action**: Rebuilds site with fresh content

### Environment Variables

Already configured in Vercel:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_REVALIDATE_SECRET` (for webhook security)

---

## Next Steps

### Immediate (Required)

1. ✅ **Access Sanity Studio** - `/studio` on your site
2. ✅ **Create Site Settings document** - Fill in email, Instagram, address, nav links, process steps
3. ✅ **Publish** - Click the publish button
4. ✅ **Wait 30-60 seconds** - Webhook triggers rebuild
5. ✅ **Verify** - Check your site for updated content

### Future (Optional)

- Move About page content to Sanity
- Move Contact form options to Sanity
- Set up more sophisticated page structures

---

## Getting Help

If something isn't working:

1. **Check Vercel deployments** - https://vercel.com/dashboard
2. **Check build logs** - Click on the failed deployment to see errors
3. **Verify Sanity data** - Make sure all required fields are filled
4. **Test the webhook** - Sanity Studio → Settings → Webhooks → See if it's triggering

---

## Summary

✨ **You now have a real CMS!**

- Edit content in Sanity Studio
- Changes automatically deploy within 1 minute
- No code changes needed
- No manual deployments needed
- Version history and rollback available
- Secure and scalable

**The next time you want to update text on your site, just go to Sanity Studio, edit, and publish.** That's it!
