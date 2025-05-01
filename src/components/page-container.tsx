import { cn } from "@/lib/utils"

const PageContainer = ({ children, className }: any) => {
    return (
        <div className={cn('container', className)}>
            {children}
        </div>
    )
}

export default PageContainer