import React from "react"
import { redirect } from "next/navigation"
import { Metadata } from "next/types"

import { getPosts } from "@/actions/protect/posts"
import NoItemFounded from "@/molecules/no-item-founded"
import PageTitle from "@/molecules/page-title"
import Filter from "@/molecules/user/posts/filter"
import PostItem from "@/molecules/user/posts/post-item"
import { getServerSession } from "@/utils/auth"

export async function generateMetadata(): Promise<Metadata> {
  // TODO: Get user info
  return {
    title: "Posts",
    description: "User posts",
  }
}

export default async function Page({ searchParams }) {
  const session = await getServerSession()
  if (!session) {
    redirect("/sign-in")
  }

  const { total, data } = await getPosts({
    searchParams: {
      authorId: session?.user?.id,
      ...searchParams,
    },
  })

  return (
    <div>
      <PageTitle title="Posts" />

      <Filter total={total} />

      <div className="mt-12">
        {data?.length === 0 ? (
          <NoItemFounded />
        ) : (
          data?.map((post) => (
            <PostItem
              key={post.id}
              {...post}
            />
          ))
        )}
      </div>
    </div>
  )
}
