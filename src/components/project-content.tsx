// 'use client';

import Link from "next/link";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { blogConfig } from "@/blog.config";
import { getTranslations } from "next-intl/server";

const ProjectContent = async ({ locale }: { locale: string }) => {
    const { projects, getStatus } = blogConfig.project
    const t = await getTranslations({ locale, namespace: 'ProjectPage' });
    return (
        <>
            {projects.map((project: any, index: number): any => {
                const { variant, text }: any = getStatus(project.status)
                return (
                    <div className={'not-prose'} key={index}>
                        <div className={'flex items-center mb-2 '}>
                            {project.href ?
                                <Link href={project.href} className={'underline underline-offset-4'}>
                                    <CardTitle>
                                        {t(project.name + '.name')}
                                    </CardTitle>
                                </Link>
                                :
                                <CardTitle>
                                    {t(project.name + '.name')}
                                </CardTitle>
                            }
                            {project.status && <Badge className={'ml-4'} variant={variant}>
                                {text}
                            </Badge>}
                            {project.github && <Button className={'ml-2'} variant={'ghost'} size={'icon'}>
                                <Link href={project.github}>
                                    <Github size={20} />
                                </Link>
                            </Button>}
                        </div>
                        <CardDescription className={'text-base'}>
                            {t(project.name + '.description')}
                        </CardDescription>
                    </div>
                )
            })}
        </>
    );
}

export default ProjectContent