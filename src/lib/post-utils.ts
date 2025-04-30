import path from "path";
import fs from "fs/promises";  // 使用异步文件系统操作
import matter from "gray-matter";
import readingTime from "reading-time";
import dayjs from "dayjs";
import { blogConfig } from "@/blog.config";
import { PostData, PostMetadata, PostsCache, TagsCache } from "@/types/index";

// 缓存对象
let postsCache: PostsCache = null;
let tagsCache: TagsCache = null;

const postDir = 'src/posts'

/**
 * 获取所有博客文章数据
 * 使用缓存机制避免重复读取文件系统
 */
export const getPostsData = async (locale: string): Promise<PostData[]> => {
    if (postsCache) {
        return postsCache.filter(post => post.locale === locale);
    }

    const postsDirectory = path.join(process.cwd(), postDir)
    const fileNames = await fs.readdir(postsDirectory)

    const posts = await Promise.all(fileNames.map(async (fileName) => {
        // 从文件名中提取语言信息
        const [baseName, locale] = fileName.split('_');

        // 如果没有语言标识，记录警告并返回 null
        if (!locale) {
            console.warn(`[警告] 文章 "${fileName}" 没有设置语言标识，该文章将被排除`);
            return null;
        }

        const id = baseName.replace(/\.mdx?$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = await fs.readFile(fullPath, 'utf8')
        const matterResult = matter(fileContents)

        // 获取文件名中的语言（移除.md或.mdx扩展名）
        const postLocale = locale.replace(/\.mdx?$/, '');

        return {
            id,
            ...matterResult.data as PostMetadata,
            content: '\r\n' + `# ${matterResult?.data.title}` + matterResult.content,
            stats: readingTime(matterResult.content),
            locale: postLocale
        } as PostData
    }));

    // 过滤掉 null 值（没有语言标识的文章）和草稿
    const validPosts = posts.filter((post): post is PostData =>
        post !== null && !post.draft
    );

    // 将文章分为置顶和非置顶两类
    const { pinnedPosts, commonPosts } = validPosts.reduce((acc: { pinnedPosts: PostData[], commonPosts: PostData[] }, post: PostData) => {
        if (post.pinned) {
            acc.pinnedPosts.push(post)
        } else {
            acc.commonPosts.push(post)
        }
        return acc
    }, { pinnedPosts: [], commonPosts: [] })

    // 获取置顶文章的排序方式（升序或降序）
    const { pinnedSort } = blogConfig.blog

    // 排序并缓存结果
    postsCache = [
        ...pinnedPosts.sort((a, b) => {
            if (pinnedSort === 'asc') {
                return (a.pinned || 0) - (b.pinned || 0)
            } else {
                return (b.pinned || 0) - (a.pinned || 0)
            }
        }),
        ...commonPosts.sort((a, b) => dayjs(a.date).isBefore(dayjs(b.date)) ? 1 : -1)
    ];

    // 根据请求的语言返回过滤后的文章
    return postsCache.filter(post => post.locale === locale);
}

/**
 * 获取所有标签及其使用次数
 * 使用缓存机制避免重复计算
 */
export const getTagsData = async (locale: string): Promise<Record<string, number>> => {
    // 如果缓存存在，直接返回缓存的数据
    if (tagsCache) {
        return tagsCache;
    }

    const posts = await getPostsData(locale);
    tagsCache = posts.reduce((acc: Record<string, number>, post) => {
        post.tags.forEach((tag) => {
            if (!acc[tag]) {
                acc[tag] = 0
            }
            acc[tag]++
        })
        return acc
    }, {});

    return tagsCache;
}

/**
 * 清除缓存
 * 在需要更新数据时调用（比如添加新文章后）
 */
export const clearCache = (): void => {
    postsCache = null;
    tagsCache = null;
}
