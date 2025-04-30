import SocialList from "@/components/social-list";
import I18nMDX from "@/components/i18n-mdx";

import type { Metadata } from 'next'
import { getMetadata } from "@/lib/utils";

export const metadata: Metadata = getMetadata("home")

const Home = ({ params }: { params: { locale: string } }) => {
    const { locale } = params;
    console.log('Current locale:', locale);
    return (
        <div className={"container"}>
            <I18nMDX slug="intro" locale={locale} />
            <SocialList />
        </div>
    )
}

export default Home