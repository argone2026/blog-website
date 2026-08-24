import { notFound } from "next/navigation";
import PostForm from "@/app/admin/PostForm";
import { updatePost } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/server";
import type { Post } from "@/lib/types";

export const revalidate = 0;

export default async function EditPostPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { error?: string };
}) {
  const supabase = createClient();
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", params.id)
    .maybeSingle<Post>();

  if (!post) {
    notFound();
  }

  const boundUpdate = updatePost.bind(null, post.id);

  return <PostForm action={boundUpdate} post={post} error={searchParams.error} />;
}
