import {notFound} from "next/navigation";
import {MDXRemote} from "next-mdx-remote/rsc";
import {Suspense} from "react";
import Time from "@/components/time";
import {getPostsData} from "@/app/server-utils";
import SideNav from "@/components/side-nav";
import Comments from "@/plugins/comments";
import shiki from 'rehype-shiki'
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import {remark} from "remark";
import remarkFlexibleToc from "remark-flexible-toc";
import readingTime from "reading-time";
import remarkNormalizeHeadings from "remark-normalize-headings";
import Toc from "@/components/toc";
import {Button} from "@/components/ui/button";
import {TableProperties} from "lucide-react";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import { PostData } from "@/types/blog";



interface PageParams {
    slug: string;
}

const getPost = async (slug: string): Promise<PostData | null> => {
    const post: PostData | undefined = await getPostsData().then((posts) => posts.find((post: PostData) => post.id === slug))
    if (!post) return null
    // 获取目录数据
    const file = await remark()
        .use(remarkNormalizeHeadings)
        .use(remarkFlexibleToc)
        .process(post.content);
    return {
        ...post,
        toc: file.data.toc,
        stats: readingTime(post.content),
    }
}

//在构建时 生成静态路由
export async function generateStaticParams(): Promise<PageParams[]> {
    return getPostsData().then((posts) => posts.map((post: PostData) => ({
        slug: post.id,
    })));
}

//在页面渲染时，生成元数据
export async function generateMetadata({params}: { params: PageParams }) {
    const post = await getPost(params.slug);
    if (!post) return notFound();
    return {
        title: post.title,
        description: post.summary,
    }
}

export default async function Post({params}: { params: PageParams }) {
    const {slug} = params
    console.log('slug',slug)
    const post: any = await getPost(slug)
    console.log('post',post)
    if (!post || post?.draft) notFound()

    return (
        <div className={"w-full flex justify-center"}>
            <div className={'w-full max-w-screen-lg  relative'}>
                {/*mobile*/}
                <div className={'block lg:hidden sticky top-20 p-2 bg-white/80 backdrop-blur-md z-10 w-full shadow-sm'}>
                    <div className={'flex justify-between'}>
                        <div className={'space-x-4'}>
                            <SideNav/>
                        </div>
                        <Drawer>
                            <DrawerTrigger>
                                <Button size={"icon"} variant={"ghost"}>
                                    <TableProperties size={20}/>
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>
                                        Table of contents
                                    </DrawerTitle>
                                </DrawerHeader>
                                <Toc toc={post.toc}/>
                            </DrawerContent>
                        </Drawer>
                    </div>
                </div>

                {/*pc*/}
                <div className={'px-4 pt-8'}>
                    <div className={'sticky top-28 hidden lg:block'}>
                        <div className={'absolute top-24 -left-16 -translate-x-full flex flex-col space-y-4'}>
                            <SideNav/>
                        </div>
                        <div className={'absolute -right-8 translate-x-full'}>
                            <div className={'w-full h-full max-h-[80vh] overflow-auto'}>
                                <div className={'text-base font-bold mb-2'}>
                                    Table of contents
                                </div>
                                <Toc toc={post.toc}/>
                            </div>
                        </div>
                    </div>
                    <article>
                        <div className={'mb-3 text-base text-zinc-400'}>
                            <Time date={post.date}/> · {post.stats.words} words · {post.stats.text}
                        </div>
                        <Suspense fallback={<>Loading...</>}>
                            <MDXRemote
                                source={post.content}
                                options={{
                                    mdxOptions: {
                                        remarkPlugins: [
                                            remarkNormalizeHeadings,
                                            remarkGfm,
                                        ],
                                        rehypePlugins: [
                                            rehypeSlug,
                                            rehypeStringify,
                                            rehypeAutolinkHeadings,
                                        ],
                                        remarkRehypeOptions: {
                                            allowDangerousHtml: true
                                        }
                                    }
                                }}
                            />
                        </Suspense>
                    </article>
                    <Comments/>
                </div>
            </div>
        </div>
    )
}