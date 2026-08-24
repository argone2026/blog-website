import PostForm from "@/app/admin/PostForm";
import { createPost } from "@/app/admin/actions";

export default function NewPostPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return <PostForm action={createPost} error={searchParams.error} />;
}
