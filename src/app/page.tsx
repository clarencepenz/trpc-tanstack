"use client";

import React, { useState } from "react";
import { trpc } from "@/utils/trpc.utils";

export default function Home() {
  const [formData, setFormData] = useState({
    id: 0.1,
    title: "",
    body: "",
  });

  const trpcUtils = trpc.useUtils();

  const { data: postData, isLoading, error } = trpc.post.getPosts.useQuery();
  const { mutateAsync: handleAddPost, isLoading: isLoadingAddPost } =
    trpc.post.addPost.useMutation({
      onError: (error) => {
        alert(error);
      },
      onSuccess: () => {
        trpcUtils.post.getPosts.invalidate();
        setFormData({
          id: 0.1,
          title: "",
          body: "",
        });
      },
    });

  const { mutateAsync: handleUpdatePost, isLoading: isLoadingUpdatePost } =
    trpc.post.updatePost.useMutation({
      onError: (error) => {
        alert(error);
      },
      onSuccess: () => {
        trpcUtils.post.getPosts.invalidate();
        setFormData({
          id: 0,
          title: "",
          body: "",
        });
      },
    });

  const { mutateAsync: handleDeletePost, isLoading: isLoadingDeletePost } =
    trpc.post.deletePost.useMutation({
      onError: (error) => {
        alert(error);
      },
      onSuccess: () => {
        trpcUtils.post.getPosts.invalidate();
      },
    });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formData.id !== 0.1) {
      handleUpdatePost(formData);
    } else {
      await handleAddPost(formData);
    }
  }

  if (error)
    return <p className="text-red-600 text-center">Error loading Posts</p>;

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{`Posts (${
        postData?.length ?? 0
      })`}</h1>
      <form className="flex flex-col gap-3 mb-6" onSubmit={onSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter title"
          className="border rounded px-3 py-2 text-black/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="body"
          value={formData.body}
          onChange={handleChange}
          placeholder="Enter body"
          className="border rounded px-3 py-2 text-black/70 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={
            isLoadingAddPost ||
            isLoading ||
            isLoadingDeletePost ||
            isLoadingUpdatePost
          }
          className="bg-green-400/80 py-4"
        >
          {isLoadingAddPost ? "Submitting..." : "Submit"}
        </button>
      </form>
      {isLoading && <p className="text-center">Loading Posts...</p>}

      <ul className="space-y-2">
        {postData?.length !== 0 ? (
          postData?.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between gap-2 border p-3 rounded bg-gray-900/30"
            >
              <div className="flex flex-col">
                <span className="text-xl font-bold">{todo.title}</span>
                <span className="text-md text-white/70">{todo.body}</span>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <button
                  onClick={() => handleDeletePost({ id: todo.id })}
                  className="bg-red-600/80 size-3 p-3 text-xs rounded-full flex justify-center items-center"
                >
                  x
                </button>
                <button
                  onClick={() =>
                    setFormData({
                      id: todo.id,
                      title: todo.title,
                      body: todo.body,
                    })
                  }
                >
                  Update
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center">No post found</p>
        )}
      </ul>
    </div>
  );
}
