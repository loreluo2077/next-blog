import { Badge } from "@/components/ui/badge";
import { getTagsData } from "@/lib/post-utils";
import Link from "next/link";

interface TagFilterProps {
    locale: string;
    currentTag?: string | null;
}

const TagFilter = async ({ locale, currentTag }: TagFilterProps) => {
    const tags = await getTagsData(locale);

    return (
        <div className="flex flex-wrap gap-2 mb-6">
            {Object.entries(tags).map(([tag, count]) => (
                <Link key={tag} href={currentTag === tag ? '/blog' : `/blog?tag=${tag}`}>
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