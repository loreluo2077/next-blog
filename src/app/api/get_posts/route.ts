import { NextResponse } from "next/server";
import { getPostsData } from "@/lib/post-utils";


export async function GET(req: any, res: any) {
    const { searchParams } = new URL(req.url);
    const locale = searchParams.get('locale');
    //如果语言为空,则默认使用中文
    const posts = await getPostsData(locale || 'zh')
    return NextResponse.json({
        code: 200,
        message: "ok",
        data: posts
    })
}