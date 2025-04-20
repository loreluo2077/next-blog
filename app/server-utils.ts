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

/**
 * 获取所有博客文章数据
 * 使用缓存机制避免重复读取文件系统
 */
export const getPostsData = async (): Promise<PostData[]> => {
    // 如果缓存存在，直接返回缓存的数据
    if (postsCache) {
        return postsCache;
    }

    // 获取 posts 目录的绝对路径
    const postsDirectory = path.join(process.cwd(), 'posts')

    // 异步读取目录下所有文件名
    const fileNames = await fs.readdir(postsDirectory)

    // 处理每个文件
    const posts = await Promise.all(fileNames.map(async (fileName) => {
        // 移除文件扩展名(.md 或 .mdx)得到文章 ID
        const id = fileName.replace(/\.mdx?$/, '')
        // 构建文件的完整路径
        const fullPath = path.join(postsDirectory, fileName)
        // 异步读取文件内容
        const fileContents = await fs.readFile(fullPath, 'utf8')
        // 解析 Markdown 文件，分离元数据和内容
        const matterResult = matter(fileContents)

        // 返回处理后的文章数据
        return {
            id,
            ...matterResult.data as PostMetadata,  // 展开元数据（如标题、日期、标签等）
            content: '\r\n' + `# ${matterResult?.data.title}` + matterResult.content,  // 添加标题到内容中
            stats: readingTime(matterResult.content)  // 计算阅读时间
        } as PostData
    }));


    // 过滤掉草稿状态的文章
    const filteredPosts = posts.filter((post: PostData) => !post.draft);
    // console.log('Filtered posts:', filteredPosts);

    // 将文章分为置顶和非置顶两类
    const { pinnedPosts, commonPosts } = filteredPosts.reduce((acc: { pinnedPosts: PostData[], commonPosts: PostData[] }, post: PostData) => {
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
        // 置顶文章按指定顺序排序
        ...pinnedPosts.sort((a, b) => {
            if (pinnedSort === 'asc') {
                return (a.pinned || 0) - (b.pinned || 0)
            } else {
                return (b.pinned || 0) - (a.pinned || 0)
            }
        }),
        // 普通文章按日期降序排序
        ...commonPosts.sort((a, b) => dayjs(a.date).isBefore(dayjs(b.date)) ? 1 : -1)
    ];

    return postsCache;
}

/**
 * 获取所有标签及其使用次数
 * 使用缓存机制避免重复计算
 */
export const getTagsData = async (): Promise<Record<string, number>> => {
    // 如果缓存存在，直接返回缓存的数据
    if (tagsCache) {
        return tagsCache;
    }

    const posts = await getPostsData();
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
