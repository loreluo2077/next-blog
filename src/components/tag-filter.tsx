import { Badge } from "@/components/ui/badge";
import { getTagsData } from "@/lib/post-utils";
import Link from "next/link";

interface TagFilterProps {
    locale: string;
    currentTag?: string | null;
    tags: Record<string, number>;
}

const TagFilter = async ({ tags, locale, currentTag }: TagFilterProps) => {


    return (
        <div className="flex flex-wrap gap-2 mb-6">
            {Object.entries(tags).map(([tag, count]) => (
                <Link key={tag} href={currentTag === tag ? '/blog' : `/blog?tag=${tag}&locale=${locale}`}>
                    <Badge
                        variant={currentTag === tag ? "secondary" : "outline"}
                        className="cursor-pointer hover:bg-secondary/80"
                    >
                        #{tag} ({count})
                    </Badge>
                </Link>
            ))}
        </div>
    );
};

export default TagFilter; 