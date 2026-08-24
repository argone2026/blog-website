import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Post } from "@/lib/types";

export const revalidate = 0;

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Journal";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d
    .toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
    .replace(",", "");
}

export default async function HomePage() {
  const supabase = createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .returns<Post[]>();

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
        {!posts || posts.length === 0 ? (
          <p className="empty-state">Nothing published yet. Check back soon.</p>
        ) : (
          <ul className="index-list">
            {posts.map((post) => (
              <li className="index-row" key={post.id}>
                <span className="index-date">{formatDate(post.created_at)}</span>
                <span className="index-spine" aria-hidden="true" />
                <div>
                  <h2 className="index-title">
                    <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                  </h2>
                  {post.excerpt && <p className="index-excerpt">{post.excerpt}</p>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>

      <footer className="site-footer">
        <div className="wrap">{siteName}</div>
      </footer>
    </>
  );
}
