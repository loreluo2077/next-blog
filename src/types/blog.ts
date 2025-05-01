/**
 * 博客文章元数据接口
 */
export interface PostMetadata {
    title: string;
    date: string;
    tags: string[];
    draft?: boolean;
    pinned?: number;
    [key: string]: any; // 允许其他元数据字段
}

/**
 * 博客文章数据接口
 */
export interface PostData extends PostMetadata {
    id: string;
    content: string;
    toc: any;
    locale: string;
    stats: {
        text: string;
        time: number;
        words: number;
        minutes: number;
    };
}

/**
 * 文章缓存类型
 */
export type PostsCache = PostData[] | null;

/**
 * 标签缓存类型
 */
export type TagsCache = Record<string, Record<string, number>> | null; 