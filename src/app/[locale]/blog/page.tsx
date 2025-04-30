import { getPostsData } from "@/lib/post-utils";
import BlogContent from "@/components/blog-content";
import type { Metadata } from "next";
import { getMetadata } from "@/lib/utils";
import PageContainer from "@/components/page-container";
import { LangParams } from "@/types";

export const metadata: Metadata = getMetadata("blog")

const Blog = async ({ params }: { params: LangParams }) => {
    const posts = await getPostsData(params.locale);
    return (
        <PageContainer>
            <BlogContent posts={posts} />
        </PageContainer>
    )
}

export default Blog