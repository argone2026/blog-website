"use client";

import Link from "next/link";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import type { Post } from "@/lib/types";

export default function PostForm({
  action,
  post,
  error,
}: {
  action: (formData: FormData) => void;
  post?: Post;
  error?: string;
}) {
  const [content, setContent] = useState(post?.content ?? "");
  const [preview, setPreview] = useState(false);

  return (
    <div className="admin-wrap">
      <div className="admin-header">
        <h1 className="admin-title">{post ? "Edit post" : "New post"}</h1>
        <Link href="/admin" className="btn btn-quiet">
          Back to posts
        </Link>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <form action={action}>
        <div className="field">
          <label htmlFor="title">Title</label>
          <input id="title" name="title" type="text" required defaultValue={post?.title} autoFocus />
        </div>

        <div className="field">
          <label htmlFor="slug">Slug (leave blank to generate from title)</label>
          <input id="slug" name="slug" type="text" defaultValue={post?.slug} />
        </div>

        <div className="field">
          <label htmlFor="excerpt">Excerpt (shown on the homepage)</label>
          <input id="excerpt" name="excerpt" type="text" defaultValue={post?.excerpt ?? ""} />
        </div>

        <div className="field">
          <label htmlFor="content">Content (Markdown)</label>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
            <button
              type="button"
              className={`btn ${!preview ? "btn-primary" : "btn-quiet"}`}
              onClick={() => setPreview(false)}
            >
              Edit
            </button>
            <button
              type="button"
              className={`btn ${preview ? "btn-primary" : "btn-quiet"}`}
              onClick={() => setPreview(true)}
            >
              Preview
            </button>
          </div>

          {!preview ? (
            <textarea id="content" name="content" required value={content} onChange={(e) => setContent(e.target.value)} />
          ) : (
            <div className="markdown-preview" style={{ padding: 16, border: "1px solid var(--muted)" }}>
              <ReactMarkdown>{content || "*(nothing to preview)*"}</ReactMarkdown>
            </div>
          )}
        </div>

        <div className="field checkbox-field">
          <input id="published" name="published" type="checkbox" defaultChecked={post?.published ?? false} />
          <label htmlFor="published" style={{ marginBottom: 0 }}>
            Published
          </label>
        </div>

        <div className="btn-row">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
