import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { createClient } from "@/lib/supabase/server";
import type { Post } from "@/lib/types";

export const revalidate = 0;

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Journal";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", params.slug)
    .eq("published", true)
    .maybeSingle<Post>();

  if (!post) {
    notFound();
  }

  return (
    <>
      <header className="site-header">
        <div className="wrap">
          <Link href="/" className="site-title">
            {siteName}
          </Link>
          <Link href="/admin" className="site-nav">
            Admin
          </Link>
        </div>
      </header>

      <main className="wrap">
        <article>
          <div className="post-header">
            <span className="post-date">{formatDate(post.created_at)}</span>
            <h1 className="post-title">{post.title}</h1>
          </div>
          <div className="post-body">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </article>
        <Link href="/" className="back-link">
          ← Back to all posts
        </Link>
      </main>

      <footer className="site-footer">
        <div className="wrap">{siteName}</div>
      </footer>
    </>
  );
}
