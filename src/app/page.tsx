"use client";

import React, { useState } from "react";
import { trpc } from "@/utils/trpc.utils";
import { AddPostSchema } from "@/types/schema/public";

export default function Home() {
  const [editPostId, setEditPostId] = useState(0);
  const [newTitle, setNewTitle] = useState("");

  const trpcUtils = trpc.useUtils();

  const { data: postData, isLoading, error } = trpc.public.getPosts.useQuery();

  const { mutateAsync: addPost, isLoading: isLoadingAddPost } =
    trpc.public.addPost.useMutation({
      onSuccess: () => {
        trpcUtils.public.getPosts.invalidate();
      },
      onError: (err) => {
        alert("Failed to add Post: " + err.message);
      },
    });

  const { mutateAsync: updatePost, isLoading: isLoadingUpdatePost } =
    trpc.public.updatePost.useMutation({
      onSuccess: () => {
        trpcUtils.public.getPosts.invalidate();
      },
      onError: (err) => {
        alert("Failed to toggle Post: " + err.message);
      },
    });

  const handleAddPost = () => {
    if (!newTitle.trim()) return;
    addPost({ id: Date.now(), title: newTitle });
    setNewTitle("");
  };

  const handleUpdatePost = () => {
    updatePost({ id: editPostId, title: newTitle });
    setNewTitle("");
  };

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error)
    return <p className="text-red-600 text-center">Error loading Posts</p>;

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todos x</h1>
      <div className="flex gap-2 mb-4">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="border px-2 py-1 flex-grow text-black/80"
          placeholder="New Post..."
        />
        <button
          onClick={editPostId !== 0 ? handleUpdatePost : handleAddPost}
          className="bg-blue-600 text-white px-4 py-1 rounded"
          disabled={isLoadingAddPost}
        >
          {isLoadingAddPost || isLoadingUpdatePost
            ? "Processing..."
            : editPostId !== 0
            ? "Update"
            : "Add"}
        </button>
      </div>

      <ul className="space-y-2">
        {postData?.slice(0, 15).map((todo: AddPostSchema) => (
          <li
            key={todo.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>{todo.title}</span>
            <button
              onClick={() => {
                setEditPostId(todo.id);
                setNewTitle(todo.title);
              }}
              disabled={isLoadingUpdatePost}
              className={`px-3 py-1 rounded bg-green-600 text-white`}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
