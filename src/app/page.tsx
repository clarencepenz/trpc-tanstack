"use client";

import React from "react";
import { trpc } from "@/utils/trpc.utils";
import Image from "next/image";
import { Todo } from "@/types";

export default function Home() {
  const trpcUtils = trpc.useUtils();

  const { data: loginData, mutateAsync: handleLogin } =
    trpc.auth.login.useMutation({
      onSuccess: ({}) => {
        console.log(loginData);
        trpcUtils.profile.getProfile.invalidate(); // Use this to refech the profile data
      },
      onError: (error) => {
        console.log(error);
      },
    });

  const { data: createAccountData, mutateAsync: handleCreateAccount } =
    trpc.auth.createAccount.useMutation({
      onSuccess: ({}) => {
        console.log(createAccountData);
      },
      onError: (error) => {
        console.log(error);
      },
    });

  const { data: userProfile, isLoading } = trpc.profile.getProfile.useQuery();

  // const { data: userDisplayName } =
  //   trpc.profile.getProfileByDisplayName.useQuery({
  //     username: "username",
  //   });

  const { data: todoData, isLoading: isTodoLoading } =
    trpc.public.getTodos.useQuery();

  console.log("isLoading", isLoading);
  console.log("userProfile", userProfile);

  // console.log("userDisplayName", userDisplayName);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <button
          onClick={() =>
            handleLogin({ email: "test@blog.com", password: "blogtest" })
          }
          className="bg-blue-900 text-white"
        >
          Login
        </button>
        <button
          onClick={() =>
            handleCreateAccount({
              email: "test@blog.com",
              password: "blogtest",
              contact: { phone: "1234567890", country: "Nigeria" },
              role: "USER",
              account: "CUSTOMER",
            })
          }
          className="bg-green-900 text-white"
        >
          Create Account
        </button>

        <div className="flex gap-4 items-start flex-col">
          {isTodoLoading ? (
            <p>Loading...</p>
          ) : (
            <React.Fragment>
              {todoData?.map((todo: Todo) => (
                <div key={todo.id} className="flex gap-4 items-start">
                  <p>{todo.title}</p>
                  <p className="bg-red-700 text-white">
                    {todo.completed ? "Completed" : "Not Completed"}
                  </p>
                </div>
              ))}
            </React.Fragment>
          )}
        </div>
      </main>
    </div>
  );
}
