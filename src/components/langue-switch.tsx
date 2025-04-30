'use client';
import { Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname, useRouter } from '@/i18n/navigation';
import { useParams } from 'next/navigation';

export function LangueSwitch() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as string;

  const switchLanguage = (newLocale: string) => {
    // 移除当前语言前缀
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '');
    // 确保路径以斜杠开头
    const cleanPath = pathWithoutLocale.startsWith('/') ? pathWithoutLocale : `/${pathWithoutLocale}`;

    router.replace(
      { pathname: cleanPath },
      { locale: newLocale }
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="none" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => switchLanguage('en')}>
          EN
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLanguage('zh')}>
          ZH
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
