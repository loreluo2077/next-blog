import ProjectContent from "@/components/project-content";
import type { Metadata } from "next";
import { getMetadata } from "@/lib/utils";
import PageContainer from "@/components/page-container";
import { LangParams } from "@/types";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = getMetadata("project")

const Projects = async ({ params }: { params: LangParams }) => {
    const { locale } = await params;
    return (
        <PageContainer className="space-y-8 mt-6">
            <ProjectContent locale={locale} />
        </PageContainer>
    )
}


export default Projects;