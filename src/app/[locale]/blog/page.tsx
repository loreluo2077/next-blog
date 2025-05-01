import { getPostsData, getTagsData } from "@/lib/post-utils";
import BlogContent from "@/components/blog-content";
import type { Metadata } from "next";
import { getMetadata } from "@/lib/utils";
import PageContainer from "@/components/page-container";
import { LangParams } from "@/types";
import { Separator } from "@/components/ui/separator";
import TagFilter from "@/components/tag-filter";

export const metadata: Metadata = getMetadata("blog")

const Blog = async ({ params, searchParams }: { params: LangParams, searchParams: { tag?: string } }) => {
    const posts = await getPostsData(params.locale);
    const tags = await getTagsData(params.locale);
    console.log(tags);
    return (
        <PageContainer >
            <div className="flex  mt-6 justify-between items-center">
                <TagFilter locale={params.locale} currentTag={searchParams.tag} tags={tags} />
            </div>
            <Separator />
            <BlogContent posts={posts} />
        </PageContainer>
    )
}

export default Blog