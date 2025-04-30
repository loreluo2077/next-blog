import { routing } from "@/i18n/routing";
import PageContainer from "./page-container";
interface I18nMDXProps {
    slug: string;
    locale: string;
}

export default async function I18nMDX({ slug, locale }: I18nMDXProps) {
    try {
        //从contents文件夹中,根据语言和slut来获取对应的mdx,然后加载出来
        const { default: Content } = await import(`@/contents/${slug}_${locale}.mdx`);
        return (
            <div>
                <PageContainer>
                    <Content />
                </PageContainer>
            </div>
        );
    } catch (error) {
        //如果内容不存在,则查找默认语言的mdx
        try {
            const defaultLocale = routing.defaultLocale;
            const { default: Content } = await import(`@/contents/${slug}_${defaultLocale}.mdx`);
            return (
                <div>
                    <PageContainer>
                        <Content />
                    </PageContainer>
                </div>
            );
        } catch (defaultError) {
            console.error(`MDX file not found: ${slug}_${locale}.mdx and ${slug}_${routing.defaultLocale}.mdx`);
            return <div>Content not found</div>;
        }
    }
}