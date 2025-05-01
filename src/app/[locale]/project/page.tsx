import ProjectContent from "@/components/project-content";
import type { Metadata } from "next";
import { getMetadata } from "@/lib/utils";
import PageContainer from "@/components/page-container";

export const metadata: Metadata = getMetadata("project")

const Projects = () => {

    return (
        <PageContainer className="space-y-8 mt-6">
            <ProjectContent />
        </PageContainer>
    )
}


export default Projects;