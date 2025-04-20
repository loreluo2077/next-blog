import { NextResponse } from "next/server";
import { getPostsData } from "@/app/server-utils";

export async function GET(req: any, res: any) {
    const posts = await getPostsData()
    return NextResponse.json({
        code: 200,
        message: "ok",
        data: posts
    })
}