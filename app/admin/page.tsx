import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Post } from "@/lib/types";
import { signOut, deletePost } from "@/app/admin/actions";

export const revalidate = 0;

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}

export default async function AdminPage() {
  const supabase = createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<Post[]>();

  return (
    <div className="admin-wrap">
      <div className="admin-header">
        <h1 className="admin-title">Posts</h1>
        <div className="btn-row">
          <Link href="/" className="btn btn-quiet">
            View site
          </Link>
          <Link href="/admin/new" className="btn btn-primary">
            New post
          </Link>
          <form action={signOut}>
            <button type="submit" className="btn btn-quiet">
              Sign out
            </button>
          </form>
        </div>
      </div>

      {!posts || posts.length === 0 ? (
        <p className="empty-state">No posts yet — create your first one.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <span className={`tag ${post.published ? "" : "tag-draft"}`}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td>{formatDate(post.created_at)}</td>
                <td>
                  <div className="btn-row">
                    <Link href={`/admin/edit/${post.id}`} className="btn btn-quiet">
                      Edit
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deletePost(post.id);
                      }}
                    >
                      <button type="submit" className="btn btn-danger">
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
