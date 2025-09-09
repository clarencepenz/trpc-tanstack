"use client";

import React from "react";
import { trpc } from "@/utils/trpc.utils";

export default function Home() {
  const { data: postData, isLoading, error } = trpc.public.getPosts.useQuery();

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error)
    return <p className="text-red-600 text-center">Error loading Posts</p>;

  const posts = postData?.slice(0, 15);

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Posts {posts.length}</h1>
      <ul className="space-y-2">
        {posts.map((todo) => (
          <li
            key={todo.id}
            className="flex flex-col items-start gap-2 border p-2 rounded"
          >
            <span className="text-xl font-bold">{todo.title}</span>
            <span className="text-md text-white/60">{todo.body}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
