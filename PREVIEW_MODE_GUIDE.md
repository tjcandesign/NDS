# Preview Mode & Draft Projects Guide

## Overview

Your site now supports **Draft Projects** and **Preview Mode**. This lets you:
- ✅ Create projects without publishing them yet
- ✅ View draft projects before making them live
- ✅ Share preview links with collaborators
- ✅ Edit in Sanity without affecting the live site

---

## How It Works

```
LIVE SITE:
  Shows only published projects (published == true)

PREVIEW MODE:
  Shows all projects including drafts (published == false)
  Activated by secret token
```

---

## Setup: Add Environment Variable

Add this to your `.env.local` file:

```bash
SANITY_PREVIEW_SECRET=your-secret-preview-key-here-change-this
```

⚠️ **Important**: Generate a strong, random secret. Example:
```bash
SANITY_PREVIEW_SECRET=sk_3n4ch7dHk2K9mZpQwEr5vT8xJbL2nM6q
```

Then:
1. **Commit** this to `.env.example` (without the actual secret)
2. **Add** the secret to Vercel environment variables
3. **Restart** Vercel deployment

---

## Creating Draft Projects

### Step 1: Create Project in Sanity
1. Go to `/studio`
2. Click **Projects** (left sidebar)
3. Click **Create** → **Portfolio Project**

### Step 2: Fill in Project Details
- Title, location, category, images, description, etc.
- ⚠️ **Important**: Leave **"Publish Project"** UNCHECKED

```
Title: New Secret Project
Category: Residential
Location: Washington, DC
...
[✓] Publish Project  ← UNCHECKED (this is a draft)
```

### Step 3: Click "Publish" (to Sanity)
The project is now saved but **NOT visible on the live site**

### Step 4: View in Preview Mode
Use the preview link to see the draft:
```
https://your-site.com/api/preview?secret=YOUR_SECRET&slug=/portfolio/new-secret-project
```

---

## Using Preview Mode

### Method 1: Direct Preview URL
```
/api/preview?secret=YOUR_SECRET&slug=/portfolio/your-project-slug
```

**Example:**
```
https://nds-site.vercel.app/api/preview?secret=sk_3n4ch7dHk2K9mZpQwEr5vT8xJbL2nM6q&slug=/portfolio/new-residential-renovation
```

When you visit this URL:
- ✅ Draft projects appear
- ✅ All pages show draft content
- ✅ You stay in preview until you exit

### Method 2: Preview via Sanity Studio
1. In Sanity, create/edit a project
2. Click the **eye icon** (👁️) to preview
3. Choose your deployment

### Exit Preview Mode
Click the exit preview link that appears:
```
/api/preview/exit
```

Or just navigate to the live site URL directly.

---

## Publishing a Draft Project

### Step 1: Go to Sanity Studio
`/studio` → **Projects** → Find your draft

### Step 2: Check "Publish Project"
```
[✓] Publish Project  ← CHECK THIS
```

### Step 3: Click "Publish"
- Wait 30-60 seconds for rebuild
- Project now appears on live `/portfolio` page
- Everyone can see it!

### To Unpublish
Uncheck **"Publish Project"** → Publish → Wait → Project removed from live site

---

## Common Workflows

### Workflow 1: Create & Review Before Publishing

```
1. Create project in Sanity (unpublished)
   ↓
2. View in preview mode
   /api/preview?secret=...&slug=/portfolio/my-project
   ↓
3. Review and get feedback
   ↓
4. Make changes if needed
   ↓
5. Check "Publish Project" when ready
   ↓
6. Publish to Sanity
   ↓
7. Wait 30-60 seconds
   ↓
8. Live on /portfolio! 🎉
```

### Workflow 2: Temporary Feature Removal

```
1. Uncheck "Publish Project"
   ↓
2. Publish to Sanity
   ↓
3. Wait 30-60 seconds
   ↓
4. Project removed from /portfolio
   ↓
5. But still accessible in preview mode if needed
```

### Workflow 3: Share Draft with Team

```
1. Create draft project
   ↓
2. Generate preview URL:
   /api/preview?secret=YOUR_SECRET&slug=/portfolio/draft-project
   ↓
3. Share URL with team (they see draft)
   ↓
4. They give feedback
   ↓
5. You make changes
   ↓
6. They review again in preview
   ↓
7. Publish when approved
```

---

## What's Published vs. Draft

### LIVE SITE (/portfolio)
Shows projects where: `published == true`

```
Project A (published: true)  ✓ Shows
Project B (published: false) ✗ Hidden
Project C (published: true)  ✓ Shows
```

### PREVIEW MODE (/api/preview/...)
Shows all projects: `published == true OR false`

```
Project A (published: true)  ✓ Shows
Project B (published: false) ✓ Shows (only in preview!)
Project C (published: true)  ✓ Shows
```

---

## FAQ

### Q: I created a project but don't see it on /portfolio
**A:** Check "Publish Project" is checked in Sanity, then publish and wait 30-60 seconds.

### Q: How do I preview a draft?
**A:** Use the preview URL:
```
/api/preview?secret=YOUR_SECRET&slug=/portfolio/project-slug
```

### Q: Can I share preview links with others?
**A:** Yes! Anyone with the preview secret can access preview mode. Share the link.

### Q: What if I forget to publish?
**A:** Your project stays as draft (hidden from /portfolio). Use preview mode to check it whenever you want.

### Q: Can I schedule projects for later?
**A:** Not built-in yet. For now, create as draft → Publish when ready.

### Q: Do drafts appear on the homepage?
**A:** No. Only published projects appear on featured sections.

### Q: What if my preview secret is exposed?
**A:** Change it in `.env.local` and Vercel, then redeploy. Old preview URLs stop working.

---

## Technical Details

### Files That Changed
- `/sanity/schemas/project.ts` - Added `published` field
- `/sanity/lib/queries.ts` - Split queries for live vs preview
- `/lib/sanity.ts` - Updated `getProject()` and `getAllProjects()` to check draft mode
- `/app/api/preview/route.ts` - New: Enables preview mode
- `/app/api/preview/exit/route.ts` - New: Disables preview mode

### Preview Mode Implementation
Uses Next.js 13+ `draftMode()` API:
- Sets secure HTTP-only cookie
- Non-cacheable responses when enabled
- Works with Vercel's edge network
- Can be toggled from your Sanity studio

---

## Next Steps

1. ✅ Add `SANITY_PREVIEW_SECRET` to `.env.local`
2. ✅ Add secret to Vercel environment variables
3. ✅ Create a test project with `published: false`
4. ✅ Preview it using the preview URL
5. ✅ Publish it and verify it appears on `/portfolio`
6. ✅ Unpublish it and verify it disappears

---

## Summary

- **Draft Projects**: Create without publishing
- **Preview Mode**: See drafts before going live
- **Published Projects**: Only these appear on live site
- **Workflow**: Create → Preview → Publish → Live ✨

Enjoy your new draft & preview system! 🚀
