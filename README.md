# Personal Blog

A minimal personal blog. Next.js (App Router) front end, Supabase (free tier)
for the database and admin login, Markdown post content, deployable free on
Vercel.

## 1. Create a free Supabase project

1. Go to https://supabase.com and create a free account/project.
2. Once the project is ready, open **SQL Editor → New query**, paste in the
   contents of `supabase/schema.sql`, and run it. This creates the `posts`
   table and locks it down with row-level security (anyone can read
   *published* posts; only your logged-in admin account can read drafts or
   write).
3. Open **Authentication → Users → Add user** and create yourself an admin
   account (email + password). This is the only account that should exist —
   there's no public sign-up flow.
4. Open **Project Settings → API** and copy the **Project URL** and **anon
   public key**.

## 2. Configure the app

```bash
cp .env.example .env.local
```

Fill in `.env.local` with the values from step 1:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_SITE_NAME=Your Blog Name
```

## 3. Run it locally

```bash
npm install
npm run dev
```

- Visit `http://localhost:3000` for the public blog.
- Visit `http://localhost:3000/admin` to sign in and write posts.

## 4. Writing posts

In `/admin`, click **New post**. Content is written in Markdown. Leave a post
unpublished to keep it as a draft — it's saved to the database but won't show
on the public site until you check **Published**.

## 5. Deploy for free

1. Push this project to a GitHub repo.
2. Go to https://vercel.com, import the repo (free Hobby tier is enough).
3. Add the same three environment variables from `.env.local` in the Vercel
   project settings.
4. Deploy. Your blog is now live; visit `/admin` on the deployed URL to sign
   in and publish.

## Project structure

```
app/
  page.tsx                 Home page — list of published posts
  posts/[slug]/page.tsx    Single post page (renders Markdown)
  admin/
    login/page.tsx         Admin sign-in
    page.tsx               Dashboard — list/edit/delete all posts
    new/page.tsx            Create a post
    edit/[id]/page.tsx      Edit a post
    actions.ts              Server actions: auth + CRUD
  globals.css              Design tokens and all styling
lib/supabase/              Supabase client helpers (browser + server)
middleware.ts              Protects /admin routes, requires sign-in
supabase/schema.sql        Database schema + row-level security policies
```

## Notes

- The design is deliberately minimal: one accent color, two typefaces
  (a serif display face for headlines, a serif body face for reading, and a
  monospace face used sparingly for dates/labels), and a lot of whitespace.
  All of it lives in `app/globals.css` as CSS custom properties if you want
  to adjust the palette.
- Supabase's free tier covers this comfortably (500MB database, 50k monthly
  active users for auth) — a personal blog won't come close to those limits.
- To add a second admin, just add another user in Supabase Authentication;
  no code changes needed.
