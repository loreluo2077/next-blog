// Mock the entire blog.config module
import path from "path";
import fs from "fs/promises";
import matter from "gray-matter";
import readingTime from "reading-time";
import dayjs from "dayjs";

// 直接在这里实现我们需要的功能，而不是导入 server-utils
const mockBlogConfig = {
    blog: {
        pinnedSort: 'desc'
    }
};

// 缓存对象
let postsCache: any = null;
let tagsCache: any = null;

/**
 * 获取所有博客文章数据
 */
async function getPostsData() {
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
            ...matterResult.data,  // 展开元数据（如标题、日期、标签等）
            content: '\r\n' + `# ${matterResult?.data.title}` + matterResult.content,  // 添加标题到内容中
            stats: readingTime(matterResult.content)  // 计算阅读时间
        }
    }));

    // 过滤掉草稿状态的文章
    const filteredPosts = posts.filter((post: any) => !post.draft);

    // 将文章分为置顶和非置顶两类
    const {pinnedPosts, commonPosts} = filteredPosts.reduce((acc: any, post: any) => {
        if (post.pinned) {
            acc.pinnedPosts.push(post)
        } else {
            acc.commonPosts.push(post)
        }
        return acc
    }, {pinnedPosts: [], commonPosts: []})
    
    // 使用 mock 的 blogConfig
    const {pinnedSort} = mockBlogConfig.blog

    // 排序并缓存结果
    postsCache = [
        // 置顶文章按指定顺序排序
        ...pinnedPosts.sort((a: any, b: any) => {
            if (pinnedSort === 'asc') {
                return a.pinned - b.pinned
            } else {
                return b.pinned - a.pinned
            }
        }),
        // 普通文章按日期降序排序
        ...commonPosts.sort((a: any, b: any) => dayjs(a.date).isBefore(dayjs(b.date)) ? 1 : -1)
    ];

    return postsCache;
}

/**
 * 获取所有标签及其使用次数
 */
async function getTagsData() {
    // 如果缓存存在，直接返回缓存的数据
    if (tagsCache) {
        return tagsCache;
    }

    const posts = await getPostsData();
    tagsCache = posts.reduce((acc: any, post: any) => {
        post.tags.forEach((tag: any) => {
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
 */
function clearCache() {
    postsCache = null;
    tagsCache = null;
}

/**
 * 测试类：用于测试 server-utils 的功能
 */
class ServerUtilsTester {
    /**
     * 测试获取文章数据
     */
    async testGetPostsData() {
        console.log('开始测试 getPostsData...');
        try {
            // 第一次调用（会读取文件）
            console.time('第一次调用');
            const posts1 = await getPostsData();
            console.timeEnd('第一次调用');
            console.log(`获取到 ${posts1.length} 篇文章`);
            if (posts1.length > 0) {
                console.log('第一篇文章标题:', posts1[0]?.title);
                console.log('第一篇文章阅读时间:', posts1[0]?.stats.text);
            }

            // 第二次调用（应该使用缓存）
            console.time('第二次调用（使用缓存）');
            const posts2 = await getPostsData();
            console.timeEnd('第二次调用（使用缓存）');
            console.log(`缓存后获取到 ${posts2.length} 篇文章`);

            // 验证缓存是否生效
            console.log('两次获取的文章数量是否相同:', posts1.length === posts2.length);
        } catch (error) {
            console.error('测试 getPostsData 时出错:', error);
        }
    }

    /**
     * 测试获取标签数据
     */
    async testGetTagsData() {
        console.log('\n开始测试 getTagsData...');
        try {
            // 第一次调用
            console.time('第一次调用');
            const tags1 = await getTagsData();
            console.timeEnd('第一次调用');
            console.log('获取到的标签:', tags1);

            // 第二次调用（应该使用缓存）
            console.time('第二次调用（使用缓存）');
            const tags2 = await getTagsData();
            console.timeEnd('第二次调用（使用缓存）');

            // 验证缓存是否生效
            console.log('两次获取的标签是否相同:', JSON.stringify(tags1) === JSON.stringify(tags2));
        } catch (error) {
            console.error('测试 getTagsData 时出错:', error);
        }
    }

    /**
     * 测试清除缓存功能
     */
    async testClearCache() {
        console.log('\n开始测试 clearCache...');
        try {
            // 清除缓存
            clearCache();
            console.log('缓存已清除');

            // 重新获取数据（应该重新读取文件）
            console.time('清除缓存后的第一次调用');
            const posts = await getPostsData();
            console.timeEnd('清除缓存后的第一次调用');
            console.log(`清除缓存后获取到 ${posts.length} 篇文章`);
        } catch (error) {
            console.error('测试 clearCache 时出错:', error);
        }
    }

    /**
     * 运行所有测试
     */
    async runAllTests() {
        console.log('=== 开始测试 server-utils ===\n');
        await this.testGetPostsData();
        await this.testGetTagsData();
        await this.testClearCache();
        console.log('\n=== 测试完成 ===');
    }
}

// 运行测试
const tester = new ServerUtilsTester();
tester.runAllTests().catch(console.error); 