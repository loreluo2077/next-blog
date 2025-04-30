import { getTagsData } from "@/lib/post-utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { blogConfig } from "@/blog.config";
import PageContainer from "@/components/page-container";
import { LangParams } from "@/types";

export async function generateMetadata({ params }: { params: LangParams }) {
    const { title, tags } = blogConfig
    return {
        title: `${tags?.title} - ${title}`,
        description: `${tags.description} ${Object.keys(getTagsData(params.locale)).join(", ")}`,
    }
}


const Tags = async ({ params }: { params: { locale: string } }) => {
    const tags = await getTagsData(params.locale)

    return (
        <PageContainer>
            <div className={'flex'}>
                {Object.keys(tags).map((tag: string) => (
                    <Link href={`/blog?tag=${tag}`}>
                        <Button className={'text-lg px-4 underline-offset-8'} size={'lg'} variant={'link'} key={tag}>
                            <span className={'font-bold'}>{tag}</span>
                            <span className={'text-gray-500'}>({tags[tag]})</span>
                        </Button>
                    </Link>
                ))}
            </div>
        </PageContainer>
    )
}

export default Tags